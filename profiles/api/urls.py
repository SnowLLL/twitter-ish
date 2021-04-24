from django.urls import path
from .views import profile_detail_api_view  # , user_follow_view


# base endPoint /api/profiles/
urlpatterns = [
    # username should be the same as props in user_follow_view
    path('<str:username>/follow', profile_detail_api_view),
    path('<str:username>/', profile_detail_api_view),
]
