from django import forms
from .models import Tweet
from django.core.exceptions import ValidationError
from django.conf import settings


class TweetForm(forms.ModelForm):
    class Meta:
        model = Tweet
        # default content
        # content = forms.CharField()
        # NOT single field
        fields = ["content"]
        # data will automatically to DATABASE

    # space is important: def is the same level as class
    def clean_content(self):
        content = self.cleaned_data.get("content")
        # errors not working, why?
        if len(content) > settings.MAX_LENGTH:
            raise ValidationError("It is too long")
        return content
