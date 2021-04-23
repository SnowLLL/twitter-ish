from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse
from .models import Tweet
from .forms import TweetForm
import random
from django.utils.http import is_safe_url

# for use REST FRAMEWORK
from django.conf import settings


# Create your views here.


def home_view(request, *args, **kwargs):
    # print(args,kwargs) to see what they are
    # return HttpResponse("<h1>Tweet me homepage</h1>")
    return render(request, 'pages/feed.html')


def tweet_list_view_react(request, *args, **kwargs):
    return render(request, 'tweets/list.html')

# def tweet_detail_view_react(request, tweetId, *args, **kwargs):
#     return render(request, 'tweets/detail.html', context={"tweetId": tweetId})


def tweet_detail_view_react(request, tweet_id, *args, **kwargs):
    return render(request, "tweets/detail.html", context={"tweet_id": tweet_id})
