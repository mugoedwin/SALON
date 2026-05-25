from rest_framework.routers import DefaultRouter

from .views_api import SalonServiceViewSet

router = DefaultRouter()
router.register(r"services", SalonServiceViewSet, basename="service")

urlpatterns = router.urls
