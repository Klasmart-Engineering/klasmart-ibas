from rest_framework import permissions

from django.conf import settings


class XenditCallbackHeaderTokenPermission(permissions.BasePermission):
    """
    Views permission check for xendit header token.
    """

    def has_permission(self, request, view):
        header_token = request.headers.get('x-callback-token')
        if header_token == settings.XENDIT_HEADER_TOKEN:
            return True
        else:
            return False
