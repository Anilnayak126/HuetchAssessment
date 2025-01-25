# models.py
from django.db import models

class Product(models.Model):
    name = models.CharField(max_length=100)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    image_url = models.CharField(
        max_length=255,
        default="https://via.placeholder.com/150",  # Default placeholder image URL
        blank=True
    )

    def __str__(self):
        return self.name
