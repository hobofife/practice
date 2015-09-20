from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.index, name='index'),
    url(r'^render/$', views.render_html, name='render'),
    url(r'^build/$', views.build, name='build'),
    url(r'^preview/(?P<site_pk>[0-9]*)/$', views.preview, name='preview'),
    url(r'^preview/$', views.preview, name='preview'),
    url(r'^publish/$', views.publish, name='publish'),
    url(r'^sync/$', views.sync, name='sync'),
]
