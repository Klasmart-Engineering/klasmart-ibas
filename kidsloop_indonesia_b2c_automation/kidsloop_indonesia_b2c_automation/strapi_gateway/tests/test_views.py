import pytest

from rest_framework.test import APIClient
from unittest.mock import patch

from rest_framework.test import RequestsClient

from kidsloop_indonesia_b2c_automation.qontak_gateway.api_requests import (
    WhatsappMessage,
)


@pytest.mark.django_db
@patch.object(WhatsappMessage, "send_signup_info")
def test_strapi_cms_callback_success(*args):
    request_json = {
        "event": "entry.create",
        "model": "schedule",
        "entry": {
            "id": 2,
            "date": "2022-01-28",
            "time": "18:00:00",
            "parent_name": "alvian",
            "phone": "085840002746",
        },
    }

    client = RequestsClient()
    response = client.post("http://testserver/strapi_cms_callback/")
    assert response.status_code == 200
