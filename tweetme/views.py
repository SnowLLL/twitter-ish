from django.shortcuts import render
from django.http import HttpResponse, Http404, JsonResponse
from .models import Tweet
import random

# Create your views here.


def home_view(request, *args, **kwargs):
    # print(args,kwargs) to see what they are
    # return HttpResponse("<h1>Tweet me homepage</h1>")
    return render(request, 'pages/home.html', context={}, status=200)


def detail_view(request, tweet_id, *args, **kwargs):
    '''
    REST API
    '''
    data = {
        'id': tweet_id,
    }
    obj = Tweet.objects.get(id=tweet_id)
    status = 200
    try:
        data['content'] = obj.content
    except:
        data['message'] = "Not Found"
        status = 404
    # add f to use {}
    return JsonResponse(data, status=status)


def tweets_list_view(request, tweet_id, *args, **kwargs):
    '''
    REST API
    '''
    return HttpResponse(f"<h1>Hello {tweet_id}</h1>")
