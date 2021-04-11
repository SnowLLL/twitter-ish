from django.contrib import admin
from .models import Tweet, TweetLikes

# Register your models here.


class TweetLikesAdmin (admin.TabularInline):
    model = TweetLikes


class TweetAdmin(admin.ModelAdmin):
    # __ double '_'
    # add and change in admin page
    inlines = [TweetLikesAdmin]
    # str means tweet's id
    list_display = ['__str__', 'user']
    search_fields = ['user__username', 'user__email', 'content']

    class Meta:
        model = Tweet


admin.site.register(Tweet, TweetAdmin)
