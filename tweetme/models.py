from django.db import models
import random
from django.conf import settings
from django.db.models import Q
# Create your models here.

User = settings.AUTH_USER_MODEL


class TweetQuerySet(models.QuerySet):
    def by_username(self, username):
        return self.filter(user__username__iexact=username)

    # self = model's object

    def feed(self, user):
        feed_users_id = []
        if user.following.exists():
            feed_users_id = user.following.values_list(
                'user__id', flat=True)
        # users self and all following users
        # Q allowed do both query at the same time
        # distinct() do not repeat the same value
        return self.filter(Q(user__id__in=feed_users_id) |
                           Q(user=user)).distinct().order_by("-timestamp")  # recently not working?


class TweetManager(models.Manager):
    def getQuerySet(self, *args, **kwargs):
        # An example user.save(using=self._db) usually defined as "default" from your database configuration in settings.py
        return TweetQuerySet(self.model, using=self._db)

    def feed(self, user):
        return self.getQuerySet().feed(user)

# another sheet


class TweetLikes(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    tweet = models.ForeignKey('Tweet', on_delete=models.CASCADE)
    timestamp = models.DateTimeField(auto_now=True)


class Tweet(models.Model):
    # Maps to SQL data
    # id = models.AutoField(primary_key=True)

    # if delete parent, it will only delete itself which display null
    # For instance, when you delete a User, you might want to keep the comments
    # he posted on blog posts, but say it was posted by an anonymous (or deleted) user.
    parent = models.ForeignKey('self', null=True, on_delete=models.SET_NULL)
    # if delete uses, all of users' tweets will be deleted
    # If you don't specify a related_name, Django automatically creates one using the name
    # of your model with the suffix _set, for instance User.map_set.all()
    # Now, > User.tweets.all() b/c related name replaced User.tweet_set.all()
    user = models.ForeignKey(
        User, related_name='tweets', on_delete=models.CASCADE)
    # > User.tweetlikes_set.all()
    likes = models.ManyToManyField(
        User, related_name='tweet_user', blank=True, through=TweetLikes)
    content = models.CharField(blank=True, null=True, max_length=200)
    image = models.FileField(upload_to='image/', blank=True, null=True)
    timestamp = models.DateTimeField(auto_now_add=True)
    objects = TweetManager()

    class Meta:
        # make the new one comes first
        ordering = ['-id']

    @property
    def is_retweet(self):
        return self.parent != None

    # old way serializing

    # display id's content
    # def __str__(self):
    #     return self.content

    # def serialize(self):
    #     return {
    #         "id": self.id,
    #         "content": self.content,
    #         "likes": random.randint(0, 100)
    #     }
