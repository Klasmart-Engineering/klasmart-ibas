import pytest

# from rest_framework.test import APIClient
from unittest.mock import Mock, patch

from django.conf import settings
from rest_framework.test import RequestsClient

from kidsloop_indonesia_b2c_automation.strapi_gateway.callbacks import (
    switch_strapi_cms_callback,
)
from kidsloop_indonesia_b2c_automation.strapi_gateway import (
    models as strapi_gateway_models,
)
from kidsloop_indonesia_b2c_automation.xendit_gateway.api_requests import (
    Xendit,
)
from .callbacks import invoice_callback
from .tasks import invoice_callback_task


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
        "schedule_status": {"description": "interested"},
    },
}


xendit = Xendit()


@pytest.mark.django_db
@patch.object(
    Xendit,
    "create_invoice",
    return_value=Mock(status_code=200, json=lambda: {"status": "success"}),
)
def test_switch_strapi_cms_callback(*args):
    switch_strapi_cms_callback(callback_data)
    switch_strapi_cms_callback(callback_data)


@patch(
    "kidsloop_indonesia_b2c_automation.xendit_gateway.api_requests.requests.post",
    return_value=Mock(status_code=200, json=lambda: {"access_token": "random_token"}),
)
def test_create_invoice(*args):
    schedule_id = 2
    phone = "085840002746"
    name = "alvian"
    parent_email = "alvian@kidsloop.live"
    payload = xendit.create_invoce_payload(
        schedule_id,
        parent_email,
        name,
        f"0{phone}",
        {"price": 1000, "description": "test desc"},
    )
    r = xendit.create_invoice(payload)
    assert r.status_code == 200


def test_get_access_token():
    assert xendit.get_access_token() == settings.XENDIT_TOKEN


@pytest.mark.django_db
@patch(
    "kidsloop_indonesia_b2c_automation.strapi_gateway.api_requests.requests.put",
    return_value=Mock(status_code=201),
)
def test_invoice_callback(*args):
    strapi_gateway_models.ScheduleInvoce.objects.create(
        external_id="external_id", invoice_id="invoice_id", schedule_id=1
    )
    callback_data = {"external_id": "external_id", "status": "PAID"}
    invoice_callback(callback_data)


@pytest.mark.django_db
@patch(
    "kidsloop_indonesia_b2c_automation.strapi_gateway.api_requests.requests.put",
    return_value=Mock(status_code=201),
)
def test_invoice_callback_task(*args):
    strapi_gateway_models.ScheduleInvoce.objects.create(
        external_id="external_id", invoice_id="invoice_id", schedule_id=1
    )
    callback_data = {"external_id": "external_id", "status": "PAID"}
    invoice_callback_task(callback_data)


@patch(
    "kidsloop_indonesia_b2c_automation.strapi_gateway.api_requests.requests.put",
    return_value=Mock(status_code=201),
)
@pytest.mark.django_db
def test_invoice_callback_view(*args):
    strapi_gateway_models.ScheduleInvoce.objects.create(
        external_id="external_id_2", invoice_id="invoice_id_2", schedule_id=2
    )
    callback_data = {"external_id": "external_id_2", "status": "PAID"}
    client = RequestsClient()
    response = client.post(
        "http://testserver/xendit_invoice_callback/", 
        json=callback_data,
        headers={"x-callback-token": "defg"}
    )
    assert response.status_code == 200


@pytest.mark.django_db
def test_invoice_callback_view_invalid_header(*args):
    strapi_gateway_models.ScheduleInvoce.objects.create(
        external_id="external_id_2", invoice_id="invoice_id_2", schedule_id=2
    )
    callback_data = {"external_id": "external_id_2", "status": "PAID"}
    client = RequestsClient()
    response = client.post(
        "http://testserver/xendit_invoice_callback/", 
        json=callback_data,
        headers={"x-callback-token": "dasdaj"}
    )
    assert response.status_code == 403
