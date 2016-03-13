from django.contrib import admin

from .models import Entry, SiteSettings

admin.site.register(Entry)
admin.site.register(SiteSettings)
