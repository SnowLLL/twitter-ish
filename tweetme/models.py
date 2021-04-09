from django.db import models

# Create your models here.


class Tweet(models.Model):
    content = models.CharField(blank=True, null=True, max_length=200)
    image = models.FileField(upload_to='image/', blank=True, null=True)
