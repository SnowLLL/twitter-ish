from django.db import models
from django.conf import settings
from django.db.models.signals import post_save
# Create your models here.


User = settings.AUTH_USER_MODEL


class ProfileRelation(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    profile = models.ForeignKey('Profile', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now_add=True)


class Profile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    location = models.CharField(max_length=200, blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    upatedTime = models.DateTimeField(auto_now=True)

    followers = models.ManyToManyField(
        User, related_name='following', blank=True)
    '''
    project_obj = Profile.objects.first()
    project_obj.followers.all() -> All users following this profile
    user.following.all() ->All user profiles I follow
    '''


def user_did_save(sender, instance, created, *args, **kwargs):
    if created:
        Profile.objects.get_or_create(user=instance)


# connect(receiver, sender)
# User after save will trigger receiver function
post_save.connect(user_did_save, sender=User)

# after he user login, then verify the user
