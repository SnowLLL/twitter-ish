from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404, JsonResponse
from ..models import Tweet
from ..forms import TweetForm
import random
from django.utils.http import is_safe_url
# from django.db.models import Q

# for use REST FRAMEWORK
from django.conf import settings
from ..serializers import (
    TweetSerializer,
    ActionSerializer,
    TweetCreateSerializer
)
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.authentication import SessionAuthentication
from rest_framework.pagination import PageNumberPagination

# Create your views here.
# [use third party app - REST Framework]  serializer replace _view built in pure django


@ api_view(['GET'])
def detail_view(request, tweet_id, *args, **kwargs):
    ts = Tweet.objects.filter(id=tweet_id)
    print(ts)
    if not ts.exists():
        return Response({}, status=404)
    obj = ts.first()
    serializer = TweetSerializer(obj)
    return Response(serializer.data, status=200)


# combine DELETE && POST together on the same page
@ api_view(['DELETE', 'POST'])
# unprotection for react app to use
# @authentication_classes([SessionAuthentication])
@ permission_classes([IsAuthenticated])
def delete_view(request, tweet_id, *args, **kwargs):
    ts = Tweet.objects.filter(id=tweet_id)
    if not ts.exists():
        return Response({}, status=404)
    ts = ts.filter(user=request.user)
    if not ts.exists():
        return Response({"Message": "You cannot delete it"}, status=404)
    obj = ts.first()
    obj.delete()
    return Response({"Message": "You successfully delete it"}, status=200)


@ api_view(['POST'])
# unprotection for react app to use
# @authentication_classes([SessionAuthentication])
@ permission_classes([IsAuthenticated])
def action_view(request, *args, **kwargs):
    '''
    id is required
    Actions: like, unlike, retweet
    '''
    # in serializer, it has to be (dara=...)
    serializer = ActionSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        data = serializer.validated_data
        tweet_id = data.get("id")
        action = data.get("action")
        content = data.get("content")
        ts = Tweet.objects.filter(id=tweet_id)
        if not ts.exists():
            return Response({}, status=404)
        obj = ts.first()
        if action == "like":
            obj.likes.add(request.user)
            serializer = TweetSerializer(obj)
            return Response(serializer.data, status=200)
        elif action == "unlike":
            obj.likes.remove(request.user)
            serializer = TweetSerializer(obj)
            return Response(serializer.data, status=200)
        elif action == "retweet":
            new_tweet = Tweet.objects.create(
                user=request.user,
                parent=obj,
                content=content
            )
            serializer = TweetSerializer(new_tweet)
            return Response(serializer.data, status=201)
    return Response({}, status=200)


def get_paginated_queryset_response(qs, request):
    paginator = PageNumberPagination()
    paginator.page_size = 20
    paginated_qs = paginator.paginate_queryset(qs, request)
    serializer = TweetSerializer(
        paginated_qs, many=True)
    return paginator.get_paginated_response(serializer.data)


@ api_view(['GET'])
def tweets_list_view(request, *args, **kwargs):
    ts = Tweet.objects.all()
    # e.g ?username =Terry in the route path // App.props give a children named 'username'
    username = request.GET.get('username')  # ?username=Terry
    if username != None:
        # add all() b/c by_username() is not defined in TweetManager
        # ts = ts.by_username(username)
        ts = Tweet.objects.by_username(username)
        # -> move to TweetQuerySet
        # ts = ts.filter(user__username__iexact=username)
    return get_paginated_queryset_response(ts, request)


@ api_view(['GET'])
@ permission_classes([IsAuthenticated])
def tweets_feed_view(request, *args, **kwargs):
    qs = Tweet.objects.feed(request.user)
    return get_paginated_queryset_response(qs, request)

    # # 1st method: more effecient to do query -> move to TweetManager
    # feed_users_id = []
    # if request.user.following.exists():
    #     feed_users_id = request.user.following.values_list(
    #         'user__id', flat=True)
    #  # request users self and all following users
    #  # Q allowed do both query at the same time
    #  # distinct() do not repeat the same value
    # ts = Tweet.objects.filter(Q(user__id__in=feed_users_id) |
    #                           Q(user=request.user)).distinct().order_by('-timestamp')  # recently
    # serializer = TweetSerializer(ts, many=True)
    # return Response(serializer.data)

    # The second methon: less effecient to look up database
    # profiles = request.user.following.all()
    # feed_users_id = []
    # if profiles.exists():
    #     # request users self and all following users
    #     feed_users_id = [x.user.id for x in profiles]
    # feed_users_id.append(request.user.id)
    # ts = Tweet.objects.filter(
    #     user__id__in=feed_users_id).order_by('-timestamp')  # recently
    # serializer = TweetSerializer(ts, many=True)
    # return Response(serializer.data)

    # HTTP method the client === POST


@ api_view(['POST'])
# unprotection for react app to use
# default Session
# @ authentication_classes([SessionAuthentication])
@ permission_classes([IsAuthenticated])
def form_view(request, *args, **kwargs):
    # be careful (data=...) or maybe server errors
    serializer = TweetCreateSerializer(data=request.data)
    if serializer.is_valid(raise_exception=True):
        # ()solve null content errors
        serializer.save(user=request.user)
        return Response(serializer.data, status=201)
    return Response({}, status=400)

# ------------- Pure Django Below --------------------------


def detail_view_pure_django(request, tweet_id, *args, **kwargs):
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


def tweets_list_view_pure_django(request, *args, **kwargs):
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


def form_view_pure_django(request, *args, **kwargs):
    user = request.user
    if not request.user.is_authenticated:
        # default AnonymousUser = none
        user = None
        if request.is_ajax():
            return JsonResponse({}, status=401)
        return redirect(settings.LOGIN_URL)

    form = TweetForm(request.POST or None)
    # redirect users to url after they post sth
    next_url = request.POST.get("next") or None
    if form.is_valid():
        # create a form instance: If you call save() with commit=False, then it will return an object that hasn't yet been saved to the database.
        obj = form.save(commit=False)
        # Tweets is associated with user
        obj.user = user
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
