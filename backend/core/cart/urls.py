# urls.py
from django.urls import path
from .views import AddToCartView, ViewCartView, RemoveFromCartView, UpdateCartView

urlpatterns = [
    path('add-to-cart/', AddToCartView.as_view(), name='add_to_cart'),
    path('view-cart/', ViewCartView.as_view(), name='view_cart'),
    path('remove-from-cart/<int:cart_item_id>/', RemoveFromCartView.as_view(), name='remove_from_cart'),
    path('update-cart/<int:cart_item_id>/', UpdateCartView.as_view(), name='update_cart'),
]
