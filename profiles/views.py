from django.shortcuts import render
from django.http import Http404
from .models import Profile

# Create your views here.


def profile_detail_view(request, username, *args, **kwargs):
    qs = Profile.objects.filter(user__username=username)
    if not qs.exists():
        raise Http404()
    # the first one of objects
    profile_obj = qs.first()
    context = {
        'username': username,
        'profile': profile_obj
    }
    # get the profile for the passed username
    return render(request, 'profiles/detail.html', context)
