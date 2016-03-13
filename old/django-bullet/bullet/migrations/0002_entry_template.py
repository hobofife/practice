# -*- coding: utf-8 -*-
from __future__ import unicode_literals

from django.db import models, migrations
import datetime
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('make_site', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='entry',
            name='template',
            field=models.CharField(default=datetime.datetime(2015, 8, 30, 18, 24, 14, 743947, tzinfo=utc), max_length=200),
            preserve_default=False,
        ),
    ]
