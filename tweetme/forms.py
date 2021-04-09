from django import forms
from .models import Tweet

MAX_TWEET_LENGTH = 240


class TweetForm(forms.ModelForm):
    class Meta:
        # default content
        # content = forms.CharField()
        model = Tweet
        # NOT single field
        fields = ["content"]

    # space is important: def is the same level as class
    def clean_content(self):
        content = self.cleaned_data.get("content")
        if len(content) > MAX_TWEET_LENGTH:
            raise forms.ValidationError("It is too long")
        return content
