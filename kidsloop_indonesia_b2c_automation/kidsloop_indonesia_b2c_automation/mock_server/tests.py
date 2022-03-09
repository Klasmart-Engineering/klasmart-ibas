import pytest

from rest_framework.test import APIClient
from unittest.mock import Mock, patch

from rest_framework.test import RequestsClient


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


@pytest.mark.django_db
def test_qontak_oauth_token_success(*args):
    client = RequestsClient()
    response = client.post(
        "http://testserver/mock-server/qontak/success/oauth/token", json=callback_data
    )
    assert response.status_code == 200


@pytest.mark.django_db
def test_qontak_send_whatsapp(*args):
    client = RequestsClient()
    response = client.post(
        "http://testserver/mock-server/qontak/success/api/open/v1/broadcasts/whatsapp/direct",
        json=callback_data,
    )
    assert response.status_code == 200
