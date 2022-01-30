from django.shortcuts import render

from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.response import Response


@api_view(
    [
        "POST",
    ]
)
@authentication_classes([])
@permission_classes([])
def qontak_oauth_token_success(request):
    expires_in = 29823918  # dynamic
    created_at = 1594354514  # dynamic
    response = {
        "access_token": "random_dummy_access_token_string",
        "token_type": "Bearer",
        "expires_in": expires_in,
        "refresh_token": "random_dummy_refresh_token_string",
        "created_at": created_at,
    }

    return Response(response, status=200)


@api_view(
    [
        "POST",
    ]
)
@authentication_classes([])
@permission_classes([])
def qontak_send_whatsapp(request):
    response = request.data
    print("response", response)

    return Response(response, status=200)
