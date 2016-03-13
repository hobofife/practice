from django.db import models


class Entry(models.Model):
    url = models.CharField(max_length=200)
    template = models.CharField(max_length=200)
    content = models.TextField()

    def save(self, *args, **kwargs):
        if len(self.url) > 1:
            self.url = self.url.strip('/')
        super(Entry, self).save(*args, **kwargs)
    
    def __str__(self):
        return self.url

class SiteSettings(models.Model):
    static_dir = models.CharField(max_length=200)
    s3bucket = models.CharField(max_length=200)

    def save(self, *args, **kwargs):
        if len(self.static_dir) > 1:
            self.static_dir = self.static_dir.strip('/')
        super(SiteSettings, self).save(*args, **kwargs)
    
    def __str__(self):
        return "Site Settings"
