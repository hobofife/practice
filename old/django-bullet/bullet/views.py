import os
import subprocess

from django.http import HttpResponse, HttpResponseRedirect
from django.shortcuts import render
from django.core.urlresolvers import reverse
from django.template import Context, loader

from . models import Entry, SiteSettings
from bullet.lib import build_site, remove_existing, render_content, sync_site

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

def index(request):
    return HttpResponse('index')

def render_html(request):
    context = {}
    return render(request, 'bullet/render.html', context)

def _render_template(entry):
    template_name = entry.template
    template = loader.get_template(template_name)
    content = render_content(entry.content)
    site_settings = SiteSettings.objects.get(pk=1)
    hostname = ''
    static_url = "{}/{}".format(hostname, site_settings.static_dir)
    context = Context({'content':content, 'STATIC_URL':static_url})
    return template.render(context)

def build(request):
    if request.method == 'POST':
        output_path = "out/"
        remove_existing(output_path)
        entries = Entry.objects.all()
        for entry in entries:
            entry_output_path = os.path.join(output_path, entry.url.strip('/'))
            content = _render_template(entry)
            build_site(entry.url, content, entry_output_path)

        return HttpResponseRedirect(reverse('bullet:preview'))
        # return HttpResponse([entry.url for entry in entries])
    return HttpResponseRedirect(reverse('bullet:render'))

def preview(request, site_pk=None):
    site_settings = SiteSettings.objects.get(pk=1)
    subprocess.call(['cp', '-r', site_settings.static_dir, 'out'])
    return HttpResponse("Ready for preview")

def publish(request):
    return render(request, 'bullet/publish.html')

def sync(request):
    if request.method == 'POST':
        site_settings = SiteSettings.objects.get(pk=1)    
        sync_output = sync_site('out', site_settings.s3bucket)
        return HttpResponse(sync_output)
    else:
        return HttpResponseRedirect(reverse('bullet:publish'))
    

