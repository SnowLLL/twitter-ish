from django.test import TestCase
from django.contrib.auth import get_user_model
from .models import Profile
from django.test import TestCase
from rest_framework.test import APIClient
# Create your tests here.

User = get_user_model()
# Create your tests here.
User = get_user_model()


class ProfileTestCase (TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='Terry', password='2244')
        self.userb = User.objects.create_user(
            username='Terry2', password='2244')

    def get_client(self):
        # Make all requests in the context of a logged in session.
        client = APIClient()
        client.login(username=self.user.username, password='2244')
        return client

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

    def test_follow_api_endpoint(self):
        client = self.get_client()
        response = client.post(f'/api/profiles/{self.userb.username}/follow',
                               {'action': 'follow'}, format='json')
        count = response.json().get('count')
        self.assertEqual(count, 1)

    def test_unfollow_api_endpoint(self):
        self.userb.profile.followers.add(self.user)
        client = self.get_client()
        # return text/html not json b/c worng format or test logic problems
        response = client.post(f'/api/profiles/{self.userb.username}/follow',
                               {'action': 'unfollow'}, format='json')
        count = response.json().get('count')
        self.assertEqual(count, 0)
