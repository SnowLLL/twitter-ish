from django.shortcuts import render, redirect
from django.http import HttpResponse, Http404, JsonResponse
from ..models import Profile
from django.contrib.auth import get_user_model
import random
from django.utils.http import is_safe_url
from rest_framework.response import Response
# ,  authentication_classes
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
# from rest_framework.authentication import SessionAuthentication

User = get_user_model()


# @ api_view(['POST'])
# @ permission_classes([IsAuthenticated])
# def user_profile_detail_view(request, username, *args, **kwargs):
#     currentUser = request.user

#     return Response({}, status=400)


@ api_view(['GET', 'POST'])
@ permission_classes([IsAuthenticated])
def user_follow_view(request, username, *args, **kwargs):
    me = request.user
    otherUser = User.objects.filter(username=username)
    if otherUser.exists() == False:
        raise Http404()
    # profile = Profile.objects.filter(user__username__iexact=username).first() #another way to find profile
    profile = otherUser.first().profile
    data = request.data or {}  # if not request.data being sent, it will give empty
    action = data.get("action")
    # toggle
    if action == 'follow':
        profile.followers.add(me)
    elif action == 'unfollow':
        profile.followers.remove(me)
    else:
        pass
    return Response({'count': profile.followers.all().count()}, status=200)
