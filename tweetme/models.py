from django.db import models
import random
from django.conf import settings

# Create your models here.

User = settings.AUTH_USER_MODEL


class Tweet(models.Model):
    # Maps to SQL data
    # id = models.AutoField(primary_key=True)

    # if delete uses, all of users' tweets will be deleted
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    content = models.CharField(blank=True, null=True, max_length=200)
    image = models.FileField(upload_to='image/', blank=True, null=True)

    # display id's content
    def __str__(self):
        return self.content

    class Meta:
        # make the new one comes first
        ordering = ['-id']

    def serialize(self):
        return {
            "id": self.id,
            "content": self.content,
            "likes": random.randint(0, 100)
        }
