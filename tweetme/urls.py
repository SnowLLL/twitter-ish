
from django.urls import path
from .views import (detail_view,
                    tweets_list_view, form_view, delete_view, action_view)

# internal urls in APP
# endpoint api/tweets/
urlpatterns = [
    path('<int:tweet_id>/', detail_view),
    path('', tweets_list_view),
    path('create/', form_view),
    path('<int:tweet_id>/delete/', delete_view),
    path('action', action_view)
]
