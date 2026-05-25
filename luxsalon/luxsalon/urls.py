from django.contrib import admin
from pathlib import Path

from django.conf import settings
from django.urls import include, path, re_path
from django.views.static import serve

from salon import views as salon_views

urlpatterns = [
    path("django-admin/", admin.site.urls),
    path("api/", include("salon.api_urls")),
]

dist_dir = Path(settings.BASE_DIR) / "frontend" / "dist"

urlpatterns += [
    re_path(r"^assets/(?P<path>.*)$", serve, {"document_root": str(dist_dir / "assets")}),
    re_path(r"^images/(?P<path>.*)$", serve, {"document_root": str(dist_dir / "images")}),
]

if settings.DEBUG:
    urlpatterns += [
        re_path(r"^media/(?P<path>.*)$", serve, {"document_root": str(settings.MEDIA_ROOT)}),
    ]

# Catch-all: let the React router handle client-side routes.
urlpatterns += [re_path(r"^.*$", salon_views.react_app, name="react_app")]
