from django.test import TestCase
from .models import Tweet
from django.contrib.auth import get_user_model
from rest_framework.test import APIClient
# Create your tests here.

User = get_user_model()


class TweetTestCase(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username='Terry', password='2244')

    def test_user_created(self):
        self.assertEqual(self.user.username, 'Terry')

    def get_client(self):
        # Make all requests in the context of a logged in session.
        client = APIClient()
        client.login(username=self.user.username, password='2244')
        return client

    def test_tweet_list(self):
        client = self.get_client()
        response = client.get('/api/tweets/', format='json')
        self.assertEqual(response.status_code, 200)

    def test_action_like(self):
        client = self.get_client()
        response = client.post('/api/tweets/action/',
                               {'id': 120, 'action': 'like'})
        # print(response.get('ajax'))
        # like_count = response.json().get('likes')
        # self.assertEqual(like_count, 1)
        self.assertEqual(self.user.tweetlikes_set.count(),
                         self.user.tweet_user.count())

    def test_tweets_related_name(self):
        self.assertEqual(self.user.tweets.count(), 0)
