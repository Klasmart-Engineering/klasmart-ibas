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
        "email": "alvian@kidsloop.live",
        "schedule_status": {"description": "interested"},
        "package": {
            "duration_number": 1,
            "duration_type": "months",
            "package_name": "test",
            "price": 100
        }
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


from kidsloop_indonesia_b2c_automation.strapi_gateway.api_requests import StrapiSubscription

strapi_subscription = StrapiSubscription()

@patch.object(
    StrapiSubscription,
    "create_subscription",
    return_value=Mock(status_code=201, json=lambda: {"status": "success"}),
)
def test_switch_strapi_cms_callback_free_trial(*args):
    callback_data["event"] = "entry.update"
    callback_data["entry"]["schedule_status"]["description"] = "free_trial"
    switch_strapi_cms_callback(callback_data)


@patch.object(
    StrapiSubscription,
    "create_subscription",
    return_value=Mock(status_code=201, json=lambda: {"status": "success"}),
)
def test_switch_strapi_cms_callback_paid(*args):
    callback_data["event"] = "entry.update"
    callback_data["entry"]["schedule_status"]["description"] = "paid"
    callback_data["entry"]["package"]["duration_type"] = "years"
    switch_strapi_cms_callback(callback_data)


@patch.object(
    StrapiSubscription,
    "create_subscription",
    return_value=Mock(status_code=201, json=lambda: {"status": "success"}),
)
def test_switch_strapi_cms_not_schedule(*args):
    callback_data["model"] = "anything_else"
    switch_strapi_cms_callback(callback_data)


@patch(
    "kidsloop_indonesia_b2c_automation.strapi_gateway.api_requests.requests.post",
    return_value=Mock(status_code=200, json={}),
)
def test_send_post_request(*args):
    strapi_subscription.send_post_request("http://testserver/random/", {})


@patch(
    "kidsloop_indonesia_b2c_automation.strapi_gateway.api_requests.requests.post",
    return_value=Mock(status_code=200, json={}),
)
def test_create_subscription(*args):
    strapi_subscription.create_subscription({})
