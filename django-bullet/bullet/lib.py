import codecs
import os
import shutil
import subprocess


def remove_existing(out_path):
    if os.path.exists(out_path):
        shutil.rmtree(out_path)

def render_content(content):
    with open('tmp.md', 'w') as fh:
        fh.write(content)
    return codecs.decode(subprocess.check_output(['pandoc', 'tmp.md', '-t', 'html']))

def build_site(path, content, out_path):
    out_file = os.path.join(out_path, 'index.html')
    if os.path.exists(out_path):
        if path == "/":
            pass
        else:
            raise Exception("Path already exists: %s" % out_path)
    else:
        os.makedirs(out_path)
    with open(out_file, 'w') as fh:
        fh.write(content)

def sync_site(path, bucket):
    bucket = 's3://{}'.format(bucket)
    return subprocess.check_output(['aws', 's3', 'sync', path, bucket])
