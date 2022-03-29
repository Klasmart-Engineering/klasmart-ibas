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
# custom auth class for checking headers
# @permission_classes([XenditCallbackHeaderToken])
@authentication_classes([])
@permission_classes([])
def xendit_invoice_callback(request):
    callback_data = request.data
    # process xendit callback async
    
    return Response()