from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("salon", "0004_salonservice_image"),
    ]

    operations = [
        migrations.AddField(
            model_name="salonservice",
            name="category",
            field=models.CharField(default="Protective Styling", max_length=120),
        ),
        migrations.AddField(
            model_name="salonservice",
            name="tags",
            field=models.TextField(blank=True, default=""),
        ),
    ]
