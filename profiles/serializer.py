from rest_framework import serializers
from .models import Profile


class PublicProfileSerializer (serializers.ModelSerializer):
    first_name = serializers.SerializerMethodField(read_only=True)
    last_name = serializers.SerializerMethodField(read_only=True)
    username = serializers.SerializerMethodField(read_only=True)
    follower_count = serializers.SerializerMethodField(read_only=True)
    following_count = serializers.SerializerMethodField(read_only=True)
    is_following = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Profile
        fields = ['id', 'first_name', 'last_name', 'username',
                  'location', 'bio', 'follower_count', 'following_count', 'is_following', 'timestamp']

    # tell serializer where to find these fields' data
    def get_first_name(self, obj):
        # obj means one of profiles
        return obj.user.first_name

    def get_last_name(self, obj):
        # obj means one of profiles
        return obj.user.last_name

    def get_username(self, obj):
        # obj means one of profiles
        return obj.user.username

    def get_follower_count(self, obj):
        # obj means one of profiles
        return obj.followers.count()

    def get_following_count(self, obj):
        # obj means one of profiles
        return obj.user.following.count()

    def get_is_following(self, obj):
        is_following = False
        request = self.context.get("request")
        if request:
            is_following = request.user in obj.followers.all()  # return true or false
            # is_following = profile_obj in request.user.following.all()  # the same result
        return is_following
