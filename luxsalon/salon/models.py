from django.db import models


class SalonService(models.Model):
    title = models.CharField(max_length=150)
    category = models.CharField(max_length=120, default="Protective Styling")
    price = models.DecimalField(max_digits=10, decimal_places=2)
    currency = models.CharField(max_length=10, default="AED")
    description = models.TextField()
    tags = models.TextField(blank=True, default="")
    duration = models.CharField(max_length=50)
    is_visible = models.BooleanField(default=True)
    booking_source = models.CharField(max_length=100, default="Website + WhatsApp")
    image = models.ImageField(upload_to="services/", blank=True, null=True)

    def __str__(self):
        return self.title

    class Meta:
        ordering = ["-id"]
