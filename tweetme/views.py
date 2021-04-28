from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse
from .models import Tweet
from .forms import TweetForm
import random
from django.utils.http import is_safe_url
from rest_framework.permissions import IsAuthenticated

# for use REST FRAMEWORK
from django.conf import settings


# Create your views here.


def home_view(request, *args, **kwargs):
    if request.user.is_authenticated:
        return render(request, 'pages/feed.html')
    return render(request, 'pages/feed.html')


def tweet_list_view_react(request, *args, **kwargs):
    return render(request, 'tweets/list.html')

# def tweet_detail_view_react(request, tweetId, *args, **kwargs):
#     return render(request, 'tweets/detail.html', context={"tweetId": tweetId})


def tweet_detail_view_react(request, tweet_id, *args, **kwargs):
    return render(request, "tweets/detail.html", context={"tweet_id": tweet_id})
