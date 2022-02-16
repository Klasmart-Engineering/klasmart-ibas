import pytest

from rest_framework.test import APIClient
from unittest.mock import Mock, patch

from rest_framework.test import RequestsClient

from .callbacks import (
    switch_strapi_cms_callback,
)
from .tasks import switch_strapi_cms_callback_task
from kidsloop_indonesia_b2c_automation.qontak_gateway.api_requests import (
    WhatsappMessage,
)


callback_data = {
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


@pytest.mark.django_db
def test_strapi_cms_callback_success(*args):
    client = RequestsClient()
    response = client.post("http://testserver/strapi_cms_callback/", json=callback_data)
    assert response.status_code == 200


@patch.object(
    WhatsappMessage,
    "send_signup_info",
    return_value=Mock(status_code=201, json=lambda: {"status": "success"}),
)
def test_switch_strapi_cms_callback(*args):
    switch_strapi_cms_callback(callback_data)


@patch(
    "kidsloop_indonesia_b2c_automation.strapi_gateway.callbacks.WhatsappMessage.send_signup_info",
    return_value=Mock(status_code=201, json=lambda: {"status": "success"}),
)
def test_switch_strapi_cms_callback_task(*args):
    switch_strapi_cms_callback_task(callback_data)
