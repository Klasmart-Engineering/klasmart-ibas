from rest_framework.decorators import (
    api_view,
    authentication_classes,
    permission_classes,
)
from rest_framework.response import Response
from . import tasks as xendit_tasks
from .permissions import XenditCallbackHeaderTokenPermission


@api_view(
    [
        "POST",
    ]
)
# custom auth class for checking headers
@permission_classes([XenditCallbackHeaderTokenPermission])
@authentication_classes([])
@permission_classes([])
def xendit_invoice_callback(request):
    callback_data = request.data
    xendit_tasks.invoice_callback_task.delay(callback_data=callback_data)
    return Response()
