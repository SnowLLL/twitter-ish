from django.urls import path
from .views import profile_detail_view, profile_update_view
from .views import profile_tweet_detail_view_react

urlpatterns = [
    path('edit/',  profile_update_view),
    path('<str:username>/',  profile_detail_view),
    path('<str:username>/<int:tweet_id>',  profile_tweet_detail_view_react),
    # username/tweet_id from views(request,props)
]
