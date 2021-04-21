from django.urls import path
from .views import user_follow_view


# base endPoint /api/profiles/
urlpatterns = [
    # username should be the same as props in user_follow_view
    path('<str:username>/follow', user_follow_view),
]