from django.shortcuts import render, redirect
from django.contrib.auth import login, logout
from django.contrib.auth.forms import AuthenticationForm, UserCreationForm
# Create your views here.

# function based views to class based views


def login_view(request, *args, **kwargs):
    # we could use customed ModelForm as well; username_= authenticate(form.cleaned_data.get("username"),password)
    form = AuthenticationForm(request, data=request.POST or None)

    if form.is_valid():  # donot forget (); return true or false
        user_ = form.get_user()
        login(request, user_)
        return redirect('/')  # go back to homepage after login
    context = {
        'form': form,
        'btn_label': 'Login',
        'title': 'Login'
    }
    return render(request, 'accounts/auth.html', context)


def register_view(request, *args, **kwargs):
    form = UserCreationForm(request.POST or None)
    if form.is_valid():
        # print(form.cleaned_data)
        # create a form instance: If you call save() with commit=true, then it will return an object saved to the database.
        user = form.save(commit=True)
        user.set_password(form.cleaned_data.get("password1"))
        # send an email to verify
        login(request, user)
        return redirect('/')
    context = {
        'form': form,
        'btn_label': 'Sign up',
        'title': 'Please sign up'
    }
    return render(request, 'accounts/auth.html', context)


def logout_view(request, *args, **kwargs):
    if request.method == 'POST':
        logout(request)
        return redirect('/login')  # go back to login page after logout
    context = {
        'form': None,  # donot need form here
        'description': 'Are you sure you want to logout?',
        'btn_label': 'Click to confirm?',
        'title': 'Logout'
    }
    return render(request, 'accounts/auth.html', context)
