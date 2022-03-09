import pytest

from rest_framework.test import APIClient
from unittest.mock import Mock, patch

from rest_framework.test import RequestsClient

from .caches import get_cache_qontak_access_token, set_cache_qontak_access_token
from .tasks import send_wa_signup_info_task

from .api_requests import WhatsappMessage


callback_data = {
    "event": "entry.create",
    "model": "schedule",
    "entry": {
        "id": 2,
        "date": "2022-01-28",
        "time": "18:00:00",
        "parent_name": "alvian",
        "phone": "085840002746",
        "email": "alvian@kidsloop.live"
    },
}

wa = WhatsappMessage()


@patch("kidsloop_indonesia_b2c_automation.qontak_gateway.tasks.logger.info")
def test_send_wa_signup_info_task(*args):
    send_wa_signup_info_task(callback_data)


def test_get_cache_qontak_access_token():
    access_token = get_cache_qontak_access_token()
    assert access_token is None


def test_set_cache_qontak_access_token():
    access_token = "abc"
    set_cache_qontak_access_token(access_token)
    assert access_token == get_cache_qontak_access_token()
    set_cache_qontak_access_token(None)


def test_signup_info_payload():
    assert wa.signup_info_payload("085840002746", "aya", []) == {
        "channel_integration_id": "ca320d7a-145a-4a18-b635-24b6e98b576a",
        "language": {"code": "id"},
        "message_template_id": "b80191b2-dc5d-4846-be34-c1e234f7a153",
        "parameters": {"body": []},
        "to_name": "aya",
        "to_number": "085840002746",
    }


@patch.object(
    WhatsappMessage,
    "request_oauth_token",
    return_value={"access_token": "random_token"},
)
def test_authenticated_headers(*args):
    assert wa.authenticated_headers() == {
        "Authorization": "Bearer random_token",
        "Content-Type": "application/json",
    }


@patch(
    "kidsloop_indonesia_b2c_automation.qontak_gateway.api_requests.requests.post",
    return_value=Mock(status_code=201, json=lambda: {"access_token": "random_token"}),
)
def test_request_oauth_token(*args):
    assert wa.request_oauth_token() == {"access_token": "random_token"}


@patch(
    "kidsloop_indonesia_b2c_automation.qontak_gateway.api_requests.requests.post",
    return_value=Mock(status_code=201, json=lambda: {"access_token": "random_token"}),
)
def test_send_whatsapp_success(*args):
    assert (
        wa.send_whatsapp(
            "http://testserver/mock-server/qontak/success/api/open/v1/broadcasts/whatsapp/direct",
            {},
        ).status_code
        == 201
    )


@patch(
    "kidsloop_indonesia_b2c_automation.qontak_gateway.api_requests.requests.post",
    return_value=Mock(status_code=401, json=lambda: {"access_token": "random_token"}),
)
def test_send_whatsapp_error(*args):
    assert (
        wa.send_whatsapp(
            "http://testserver/mock-server/qontak/success/api/open/v1/broadcasts/whatsapp/direct",
            {},
        ).status_code
        == 401
    )


@patch(
    "kidsloop_indonesia_b2c_automation.qontak_gateway.api_requests.requests.post",
    return_value=Mock(status_code=201, json=lambda: {"access_token": "random_token"}),
)
def test_send_signup_info(*args):
    assert wa.send_signup_info("085840002746", "aya", []).status_code == 201
