from rest_framework import serializers

from .models import SalonService


class SalonServiceSerializer(serializers.ModelSerializer):
    imageUrl = serializers.SerializerMethodField()
    image_url = serializers.SerializerMethodField()

    class Meta:
        model = SalonService
        fields = "__all__"
        read_only_fields = ("imageUrl", "image_url")

    def get_imageUrl(self, instance):
        if not instance.image:
            return None

        request = self.context.get("request")
        image_url = instance.image.url
        if request is None:
            return image_url
        return request.build_absolute_uri(image_url)

    def get_image_url(self, instance):
        return self.get_imageUrl(instance)
