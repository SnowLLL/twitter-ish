from rest_framework import authentication
from django.contrib.auth import get_user_model

User = get_user_model()


# random user for auth
class DevAuthentication (authentication.BasicAuthentication):
    # donot forget to remove SessionAuth & isAuth if you do not to be protected views
    def authenticate(self, request):
        users = User.objects.filter(id=0)
        user = users.order_by("?").first()
        print(user)
        # ? means random
        return(user, None)

    def authenticate_header(self, request):
        pass
