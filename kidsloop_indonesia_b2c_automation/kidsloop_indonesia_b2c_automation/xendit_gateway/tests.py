import pytest

# from rest_framework.test import APIClient
from unittest.mock import Mock, patch

from django.conf import settings
from rest_framework.test import RequestsClient

from kidsloop_indonesia_b2c_automation.strapi_gateway.callbacks import (
    switch_strapi_cms_callback,
)
from kidsloop_indonesia_b2c_automation.xendit_gateway.api_requests import (
    Xendit,
)

callback_data = {
    "event": "entry.update",
    "model": "schedule",
    "entry": {
        "id": 2,
        "date": "2022-01-28",
        "time": "18:00:00",
        "parent_name": "alvian",
        "phone": "085840002746",
        "email": "alvian@kidsloop.live",
        "schedule_status": {
            "description": "interested"
        }
    },
}


xendit = Xendit()


@pytest.mark.django_db
@patch.object(
    Xendit,
    "create_invoice",
    return_value=Mock(status_code=201, json=lambda: {"status": "success"}),
)
def test_switch_strapi_cms_callback(*args):
    switch_strapi_cms_callback(callback_data)
    switch_strapi_cms_callback(callback_data)


@patch(
    "kidsloop_indonesia_b2c_automation.xendit_gateway.api_requests.requests.post",
    return_value=Mock(status_code=201, json=lambda: {"access_token": "random_token"}),
)
def test_create_invoice(*args):
    schedule_id = callback_data["entry"]["id"]
    phone = callback_data["entry"]["phone"]
    name = callback_data["entry"]["parent_name"]
    parent_email = callback_data["entry"]["email"]
    payload = xendit.create_invoce_payload(
            schedule_id, parent_email, name, f"0{phone}"
        )
    r = xendit.create_invoice(payload)
    assert r.status_code == 201


def test_get_access_token():
    assert xendit.get_access_token() == settings.XENDIT_TOKEN
