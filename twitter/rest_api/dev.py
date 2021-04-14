from rest_framework import authentication
from django.contrib.auth import get_user_model

User = get_user_model()


# random user for auth
class DevAuthentication (authentication.BasicAuthentication):
    def authenticate(self, request):
        users = User.objects.all()
        user = users.order_by("?").first()
        print(user)
        # ? means random
        return(user, None)

    def authenticate_header(self, request):
        pass
