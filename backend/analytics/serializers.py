from rest_framework import serializers
from .models import MyModel

class MyModelSerializer(serializers.ModelSerializer):
    class Meta:
        model = MyModel
        fields = ['id', 'name', 'image']
        # This tells DRF that the 'name' field is not required during validation
        extra_kwargs = {
            'name': {'required': False}
        }