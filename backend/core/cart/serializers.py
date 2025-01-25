from rest_framework import serializers
from .models import Cart, CartItem
from products.models import Product  # Assuming Product model is imported

class CartItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)
    product_price = serializers.DecimalField(source='product.price', read_only=True, max_digits=10, decimal_places=2)
    total_price = serializers.SerializerMethodField()
    image_url = serializers.CharField(source='product.image_url', read_only=True)

    class Meta:
        model = CartItem
        fields = ['id', 'product', 'product_name', 'image_url', 'quantity', 'product_price', 'total_price']  # Added missing comma

    def get_total_price(self, obj):
        return obj.total_price()



class CartSerializer(serializers.ModelSerializer):
    items = CartItemSerializer(many=True, read_only=True)  # No need for source='items'

    total_cart_price = serializers.SerializerMethodField()

    class Meta:
        model = Cart
        fields = ['id', 'user', 'items', 'total_cart_price']

    def get_total_cart_price(self, obj):
        return sum(item.total_price() for item in obj.items.all())
