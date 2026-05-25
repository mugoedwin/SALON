from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile
from rest_framework.test import APIClient

from .default_services import DEFAULT_SERVICE_CATALOG
from .models import SalonService


class SalonServiceApiTests(TestCase):
    def setUp(self):
        self.client = APIClient()

    def test_service_crud_round_trip(self):
        test_image = SimpleUploadedFile(
            "service.gif",
            b"GIF89a\x01\x00\x01\x00\x80\x01\x00\x00\x00\x00\xff\xff\xff!\xf9\x04\x01\x00\x00\x00\x00,\x00\x00\x00\x00\x01\x00\x01\x00\x00\x02\x02D\x01\x00;",
            content_type="image/gif",
        )

        create_response = self.client.post(
            "/api/services/",
            {
                "title": "Moroccan Bath",
                "price": "120.00",
                "currency": "AED",
                "description": "Traditional exfoliating body ritual...",
                "duration": "1 hr",
                "is_visible": True,
                "booking_source": "Website + WhatsApp",
                "image": test_image,
            },
            format="multipart",
        )

        self.assertEqual(create_response.status_code, 201)
        self.assertEqual(create_response.data["title"], "Moroccan Bath")
        self.assertEqual(create_response.data["currency"], "AED")
        self.assertIn("/media/services/", create_response.data["imageUrl"])

        service_id = create_response.data["id"]

        list_response = self.client.get("/api/services/")
        self.assertEqual(list_response.status_code, 200)
        self.assertEqual(len(list_response.data), 1)

        patch_response = self.client.patch(
            f"/api/services/{service_id}/",
            {"is_visible": False},
            format="json",
        )
        self.assertEqual(patch_response.status_code, 200)
        self.assertFalse(patch_response.data["is_visible"])

        filtered_response = self.client.get("/api/services/?visible=true")
        self.assertEqual(filtered_response.status_code, 200)
        self.assertEqual(filtered_response.data, [])

        delete_response = self.client.delete(f"/api/services/{service_id}/")
        self.assertEqual(delete_response.status_code, 204)
        self.assertEqual(SalonService.objects.count(), 0)

    def test_restore_defaults_populates_catalog(self):
        response = self.client.post("/api/services/restore-defaults/")

        self.assertEqual(response.status_code, 200)
        self.assertEqual(response.data["created"], len(DEFAULT_SERVICE_CATALOG))
        self.assertEqual(SalonService.objects.count(), len(DEFAULT_SERVICE_CATALOG))
        self.assertTrue(SalonService.objects.filter(title="Braids").exists())
