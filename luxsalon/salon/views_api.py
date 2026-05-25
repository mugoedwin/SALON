from rest_framework import filters, status, viewsets
from rest_framework.decorators import action
from rest_framework.parsers import FormParser, JSONParser, MultiPartParser
from rest_framework.permissions import AllowAny
from rest_framework.response import Response

from .default_services import seed_default_services
from .models import SalonService
from .serializers import SalonServiceSerializer


class SalonServiceViewSet(viewsets.ModelViewSet):
    queryset = SalonService.objects.all().order_by("-id")
    serializer_class = SalonServiceSerializer
    permission_classes = [AllowAny]
    parser_classes = [JSONParser, FormParser, MultiPartParser]
    filter_backends = [filters.OrderingFilter]
    ordering_fields = [
        "id",
        "title",
        "category",
        "price",
        "duration",
        "currency",
        "is_visible",
    ]
    ordering = ["-id"]

    def get_queryset(self):
        queryset = super().get_queryset()
        visible_param = self.request.query_params.get("visible")
        if visible_param is None:
            visible_param = self.request.query_params.get("is_visible")

        if visible_param is not None and visible_param.lower() in {"1", "true", "yes"}:
            queryset = queryset.filter(is_visible=True)
        return queryset

    @action(detail=False, methods=["post"], url_path="restore-defaults")
    def restore_defaults(self, request):
        result = seed_default_services(SalonService)
        return Response(
            {
                "message": "Default services restored.",
                **result,
            },
            status=status.HTTP_200_OK,
        )
