from django.conf import settings
from rest_framework import serializers
from .models import Tweet
from profiles.serializer import PublicProfileSerializer

# almost the same as forms.py

TWEET_ACTION_OPTIONS = settings.TWEET_ACTION_OPTIONS


class ActionSerializer (serializers.Serializer):
    id = serializers.IntegerField()
    action = serializers.CharField()
    content = serializers.CharField(allow_blank=True, required=False)

    def validate_action(self, value):
        value = value.lower().strip()
        if not value in TWEET_ACTION_OPTIONS:
            raise serializers.ValidationError("Not valid action")
        return value


class TweetCreateSerializer(serializers.ModelSerializer):
    # user = serializers.SerializerMethodField(read_only=True)
    user = PublicProfileSerializer(source='user.profile', read_only=True)
    likes = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Tweet
        fields = ['user', "id", "content", "likes", 'timestamp']

    def get_likes(self, obj):
        return obj.likes.count()

    def validate_content(self, value):
        if len(value) > settings.MAX_LENGTH:
            raise serializers.ValidationError("It is too long")
        return value


class TweetSerializer(serializers.ModelSerializer):
    user = PublicProfileSerializer(source='user.profile', read_only=True)
    likes = serializers.SerializerMethodField(read_only=True)
    parent = TweetCreateSerializer(read_only=True)

    class Meta:
        model = Tweet
        fields = ['user', 'id', 'content', 'likes',
                  'is_retweet', 'parent', 'timestamp']

    # after get data, then it can display in fields
    def get_likes(self, obj):
        return obj.likes.count()
