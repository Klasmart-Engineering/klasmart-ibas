import imp
from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.response import Response

from . import tasks as strapi_tasks
from .permissions import StrapiCallbackHeaderTokenPermission


@api_view(
    [
        "POST",
    ]
)
# custom auth class for checking headers
@authentication_classes([])
@permission_classes([StrapiCallbackHeaderTokenPermission])
def strapi_cms_callback(request):
    callback_data = request.data
    # process callback async
    strapi_tasks.switch_strapi_cms_callback_task.delay(callback_data)
    return Response()
