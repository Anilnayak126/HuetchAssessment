# views.py
from rest_framework import status, permissions
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404
from .models import Cart, CartItem
from .serializers import CartSerializer
from products.models import Product  # Assuming Product model is imported

class AddToCartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        user = request.user
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity', 1)

        if not product_id:
            return Response({"message": "Product ID is required"}, status=status.HTTP_400_BAD_REQUEST)

        # Get product by ID
        product = get_object_or_404(Product, id=product_id)

        # Get or create the cart for the user
        cart, created = Cart.objects.get_or_create(user=user)

        # Check if product is already in the cart
        cart_item, created = CartItem.objects.get_or_create(cart=cart, product=product)

        # Update quantity if product already in cart
        if not created:
            cart_item.quantity += quantity
            cart_item.save()
        else:
            cart_item.quantity = quantity
            cart_item.save()

        return Response({"message": "Product added to cart successfully"}, status=status.HTTP_201_CREATED)

class ViewCartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request):
        user = request.user
        cart = Cart.objects.filter(user=user).first()

        if not cart:
            return Response({"message": "Your cart is empty"}, status=status.HTTP_404_NOT_FOUND)

        # Serialize the cart and return
        serializer = CartSerializer(cart)
        return Response(serializer.data, status=status.HTTP_200_OK)

class RemoveFromCartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def delete(self, request, cart_item_id):
        user = request.user
        cart = Cart.objects.filter(user=user).first()

        if not cart:
            return Response({"message": "Your cart is empty"}, status=status.HTTP_404_NOT_FOUND)

        # Get the cart item to remove
        cart_item = get_object_or_404(CartItem, id=cart_item_id, cart=cart)

        # Remove the cart item
        cart_item.delete()

        return Response({"message": "Product removed from cart"}, status=status.HTTP_204_NO_CONTENT)

class UpdateCartView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, cart_item_id):
        user = request.user
        cart = Cart.objects.filter(user=user).first()

        if not cart:
            return Response({"message": "Your cart is empty"}, status=status.HTTP_404_NOT_FOUND)

        # Get the cart item to update
        cart_item = get_object_or_404(CartItem, id=cart_item_id, cart=cart)

        # Update the quantity
        quantity = request.data.get('quantity')

        if quantity is not None:
            if quantity <= 0:
                return Response({"message": "Quantity must be greater than zero"}, status=status.HTTP_400_BAD_REQUEST)
            cart_item.quantity = quantity
            cart_item.save()
            return Response({"message": "Cart updated successfully"}, status=status.HTTP_200_OK)

        return Response({"message": "Quantity is required"}, status=status.HTTP_400_BAD_REQUEST)
