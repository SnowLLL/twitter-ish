from django.db import models
import random

# Create your models here.


class Tweet(models.Model):
    # Maps to SQL data
    # id = models.AutoField(primary_key=True)
    content = models.CharField(blank=True, null=True, max_length=200)
    image = models.FileField(upload_to='image/', blank=True, null=True)

    class Meta:
        # make the new one comes first
        ordering = ['-id']

    def serialize(self):
        return {
            "id": self.id,
            "content": self.content,
            "likes": random.randint(0, 100)
        }
