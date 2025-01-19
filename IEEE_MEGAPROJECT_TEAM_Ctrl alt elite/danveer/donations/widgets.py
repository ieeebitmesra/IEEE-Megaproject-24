from django import forms

class LocationWidget(forms.MultiWidget):
    def __init__(self, attrs=None):
        widgets = [
            forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Locality'}),
            forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'City'}),
            forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'State'}),
            forms.TextInput(attrs={'class': 'form-control', 'placeholder': 'Pin Code'}),
        ]
        super().__init__(widgets, attrs)

    def decompress(self, value):
        if value:
            return value.split(',')
        return ['', '', '', '']

class LocationField(forms.MultiValueField):
    widget = LocationWidget

    def __init__(self, *args, **kwargs):
        fields = [
            forms.CharField(),
            forms.CharField(),
            forms.CharField(),
            forms.CharField(),
        ]
        super().__init__(fields, *args, **kwargs)

    def compress(self, data_list):
        return ','.join(data_list)