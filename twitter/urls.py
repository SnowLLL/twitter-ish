"""twitter URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.conf import settings
from django.conf.urls.static import static
from django.urls import path, include, re_path
from tweetme.views import (
    tweet_list_view_react,
    tweet_detail_view_react,)
# from django.views.generic import TemplateView

from accounts.views import (
    login_view,
    register_view,
    logout_view
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('',  tweet_list_view_react),
    path('login/', login_view),
    path('register/', register_view),
    path('logout/', logout_view),
    path('<int:tweet_id>',  tweet_detail_view_react),
    # username/tweet_id from views(request,props)
    # include > tweetme folder > api folder > urls,py
    path('api/tweets/', include('tweetme.api.urls')),
    # ? means s is optional
    re_path(r'profiles?/', include('profiles.urls')),
    re_path(r'api/profiles?/', include('profiles.api.urls')),

    # path('tweets/<int:tweet_id>', detail_view),
    # path('api/tweets/', tweets_list_view),
    # path('create-tweets/', form_view),

    # path('api/tweets/action', action_view),
    # path('api/tweets/<int:tweet_id>/delete', delete_view),
    # path('react/', TemplateView.as_view(template_name='react.html')),
    # # since react.html is not dynamic, it has to be separate in different django views
]

if settings.DEBUG:
    urlpatterns += static(settings.STATIC_URL,
                          document_root=settings.STATIC_ROOT)
