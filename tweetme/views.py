from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404, JsonResponse
from .models import Tweet
from .forms import TweetForm
import random
from django.utils.http import is_safe_url
from django.conf import settings

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
    status = 200
    try:
        obj = Tweet.objects.get(id=tweet_id)
        data['content'] = obj.content
    except:
        data['message'] = "Not Found"
        status = 404
    # add f to use {}
    return JsonResponse(data, status=status)


def tweets_list_view(request, *args, **kwargs):
    '''
    REST API
    '''
    ts = Tweet.objects.all()
    tweets_list = [x.serialize() for x in ts]
    data = {
        "isUser": False,
        "response": tweets_list
    }
    return JsonResponse(data)


def form_view(request, *args, **kwargs):
    form = TweetForm(request.POST or None)
    # redirect users to url after they post sth
    next_url = request.POST.get("next") or None
    if form.is_valid():
        # create a form instance: If you call save() with commit=False, then it will return an object that hasn't yet been saved to the database.
        obj = form.save(commit=False)
        obj.save()
        # id request is # ajax (Javascript + XML), return JsonResponse and won't go to redirect
        if request.is_ajax():
            # 201 created items
            return JsonResponse(obj.serialize(), status=201)
        # redirect users to url after they post sth
        if next_url != None and is_safe_url(next_url, settings.ALLOWED_HOSTS):
            return redirect(next_url)
        # initial form after save data
        form = TweetForm()

    if form.errors:
        if request.is_ajax():
            return JsonResponse(form.errors, status=400)
    # if url not safe or not working, it will go to form.html
    return render(request, 'components/form.html', context={'form': form})
