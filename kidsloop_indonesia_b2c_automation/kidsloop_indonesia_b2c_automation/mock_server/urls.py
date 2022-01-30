from django.urls import path

from . import views


urlpatterns = [
    path(
        "qontak/success/oauth/token",
        views.qontak_oauth_token_success,
        name="qontak_oauth_token_success",
    ),
    path(
        "qontak/success/api/open/v1/broadcasts/whatsapp/direct",
        views.qontak_send_whatsapp,
        name="qontak_send_whatsapp",
    ),
]
