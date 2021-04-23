from django.shortcuts import render, redirect
from django.http import Http404
from .models import Profile
from .forms import ProfileForm
# Create your views here.


def profile_detail_view(request, username, *args, **kwargs):
    qs = Profile.objects.filter(user__username=username)
    if not qs.exists():
        raise Http404()
    # the first one of objects
    profile_obj = qs.first()
    is_following = False
    if request.user.is_authenticated:
        is_following = request.user in profile_obj.followers.all()  # return true or false
        # is_following = profile_obj in request.user.following.all()  # the same result
    context = {
        'username': username,
        'profile': profile_obj,
        'is_following': is_following
    }
    # get the profile for the passed username
    return render(request, 'profiles/detail.html', context)


def profile_update_view(request, *args, **kwargs):
    if not request.user.is_authenticated:
        # after login go to /profile/update
        return redirect('/login?next=/profile/update')
    # create a form like a Profile model
    # b/c the model name is Profile and is one to one field
    user_data = {
        'first_name': request.user.first_name,
        'last_name': request.user.last_name,
        'email': request.user.email,
    }
    form = ProfileForm(request.POST or None,
                       instance=request.user.profile, initial=user_data)
    if form.is_valid():
        # save form but not to database
        profile_obj = form.save(commit=False)
        # update user's info
        request.user.first_name = form.cleaned_data.get('first_name')
        request.user.last_name = form.cleaned_data.get('last_name')
        request.user.email_address = form.cleaned_data.get('email')
        request.user.save()
        profile_obj.save()
    context = {
        'form': form,
        'btn_label': 'Save',
        'title': 'Update Profile'
    }
    return render(request, 'profiles/updateprofiles.html', context)
