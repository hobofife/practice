import codecs
import datetime
import glob
import hashlib
import json
import os
import re
import time

from lxml import etree
import requests

import settings

class HackerNewsDownload:
    def __init__(self, url="https://news.ycombinator.com/newcomments", pages=5, path='./'):
        self.url = url
        self.pages = pages
        self.path = path
        self.base_url = 'https://news.ycombinator.com/'
        self.html = ''
        self.selector = {
            'next_page':"//td[contains(concat(' ',@class,' '), ' title ')]\
            /a[contains(text(), 'More')]"}

    def get_filename(self):
        digest = hashlib.md5(self.url + str(datetime.datetime.now())).hexdigest()
        return '{}{}.html'.format(self.path, digest)
        
    def download(self):
        r = requests.get(self.url)
        self.html = r.text
        with codecs.open(self.filename, 'w', 'utf-8') as fh:
            fh.write(r.text)

    def get_next_url(self):
        parser = etree.HTMLParser()
        root = etree.fromstring(self.html, parser)
        doc = etree.ElementTree(root)
        more = doc.xpath(self.selector['next_page'])
        return '{}{}'.format(self.base_url, more[0].attrib['href'])

    def main(self):
        while self.pages > 0:
            self.filename = self.get_filename()
            self.download()
            self.url = self.get_next_url()
            self.pages -= 1

            
class ParseComment:
    def __init__(self, comment, keywords=settings.keywords):
        self.comment = comment
        self.keywords = [r'((?<!\S{1})\S{0,2}' + word + r'\S{0,5}(?!\S{1}))' for word in keywords]
        self.base_url = 'https://news.ycombinator.com/'
        self.text = ''
        self.keyword = ''
        self.selector = {'text':".//span[contains(concat(' ',@class,' '), ' c00 ')]",
                         'link':".//a[contains(@href, 'item')]"}
        

    def get_text(self):
        comment_text = self.comment.xpath(self.selector['text'])
        for element in comment_text:
            for text in element.itertext():
                self.text += text

    def get_permalink(self):
        try:
            rel_link = self.comment.xpath(self.selector['link'])[0].attrib['href']
            self.permalink = '{}{}'.format(self.base_url, rel_link)
        except IndexError:
            self.permalink = None

    def trigger_warning(self):
        tw = False
        matches = [re.search(word, self.text, re.IGNORECASE) for word in self.keywords]
        for match in matches:
            if match:
                self.keyword = match.group(0)
                tw = True
        return tw

    
class HackerNewsComments:
    def __init__(self, path='./', out_path='./'):
        self.path = path
        self.out_path = out_path
        self.selector = {
            'comments':"//tr[contains(concat(' ',@class,' '), ' athing ')]\
            /td[contains(concat(' ',@class,' '), ' default ')]"}
        self.export = []
        
    def get_filenames(self):
        return glob.glob('{}/*.html'.format(self.path))

    def get_doc(self, filename):
        with codecs.open(filename, 'r', 'utf-8') as fh:
            html = fh.read()
        parser = etree.HTMLParser()
        root = etree.fromstring(html, parser)
        return etree.ElementTree(root)

    def get_comments(self, doc):
        return doc.xpath(self.selector['comments'])

    def save_comments(self):
        out = json.dumps(self.export)
        out_hash = hashlib.md5(out).hexdigest()
        out_file = '{}comment-{}.json'.format(self.out_path, out_hash)
        with codecs.open(out_file, 'w', 'utf-8') as fh:
            fh.write(out)
    
    def main(self):
        comments = []
        for filename in self.get_filenames():
            doc = self.get_doc(filename)
            comments = self.get_comments(doc)
            for comment in comments:
                this_comment = ParseComment(comment)
                this_comment.get_text()
                this_comment.get_permalink()
                if this_comment.trigger_warning():
                    self.export.append({'keyword':this_comment.keyword,
                                        'permalink':this_comment.permalink,
                                        'text':this_comment.text.strip()})
        self.save_comments()

def download():
    hn = HackerNewsDownload(pages=settings.pages, path=settings.download_path)
    hn.main()
    
def parse():
    the_comments = HackerNewsComments(path=settings.download_path, out_path=settings.out_path)
    the_comments.main()

def remove_files():
    to_remove = glob.glob('{}*'.format(settings.download_path))
    [os.remove(filename) for filename in to_remove]
    
if __name__ == '__main__':
    while True:
        download()
        parse()
        remove_files()
        print("Comments checked")
        time.sleep(settings.wait)
