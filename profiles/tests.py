from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Profile

# Create your tests here.
User = get_user_model()


class ProfileTestCase (TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='Terry', password='2244')
        self.userb = User.objects.create_user(
            username='Terry2', password='2244')

    def test_profile_created_via_signal(self):
        self.assertEqual(Profile.objects.all().count(), 2)

    def test_following(self):
        # add a follower (user B) to user A
        self.user.profile.followers.add(self.userb)
        # from a user, check other user is being followed
        self.assertEqual(self.userb.following.filter(
            user=self.user).count(), 1)
        self.assertTrue(self.userb.following.filter(
            user=self.user).exists())
        # check new user has no following anyone
        self.assertFalse(self.user.following.all().exists())
