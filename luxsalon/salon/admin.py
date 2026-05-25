from django.contrib import admin
from .models import SalonService


@admin.register(SalonService)
class SalonServiceAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "category",
        "price",
        "currency",
        "duration",
        "is_visible",
        "booking_source",
        "tags",
    )
    list_filter = ("category", "currency", "is_visible", "booking_source")
    search_fields = ("title", "category", "description", "booking_source", "tags")
    ordering = ("-id",)
