from django import forms

class RenderConfirmForm(forms.Form):
    port = forms.CharField(max_length=300)
