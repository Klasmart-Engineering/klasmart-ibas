import requests

from django.conf import settings

from . import caches

# TODO s:
# register and tutorial register link as constance
# create new qontak wa template
# test the new wa template
# write tests (unit and integration)
# serializers
# mock server url for failed scenario
# implement 2 factor auth for admin users


class QontakChat:
    BASE_URL = settings.QONTAK_CHAT_BASE_URL
    OAUTH_URL = f"{BASE_URL}/oauth/token"
    SEND_WHATSAPP_SIGNUP_INFO_URL = f"{BASE_URL}/api/open/v1/broadcasts/whatsapp/direct"

    def common_headers(self) -> dict:
        return {"Content-Type": "application/json"}

    def request_oauth_token(self):
        # https://docs.qontak.com/docs/omnichannel-hub/ZG9jOjE1MzEwMzc4-authentication
        payload = {
            "username": settings.QONTAK_USERNAME,
            "password": settings.QONTAK_PASSWORD,
            "client_id": settings.QONTAK_CLIENT_ID,
            "client_secret": settings.QONTAK_CLIENT_SECRET,
            "grant_type": "password",
        }
        headers = self.common_headers()
        url = self.OAUTH_URL

        response = requests.post(url, json=payload, headers=headers)
        return response.json()

    def get_access_token(self, new_access_token: bool = False) -> str:
        access_token = None
        if not new_access_token:
            access_token = caches.get_cache_qontak_access_token()

        if not access_token or new_access_token:
            oauth_tokens = self.request_oauth_token()
            access_token = oauth_tokens["access_token"]
            caches.set_cache_qontak_access_token(access_token)

        return access_token

    def authenticated_headers(self, new_access_token=False) -> dict:
        access_token = self.get_access_token(new_access_token)
        headers = {
            **self.common_headers(),
            "Authorization": f"Bearer {access_token}",
        }
        return headers

    def send_whatsapp(self, url: str, payload: dict):
        headers = self.authenticated_headers()
        response = requests.post(url, json=payload, headers=headers)
        if response.status_code == 401:
            # retry on error response 401 because invalid access token
            headers = self.authenticated_headers(new_access_token=True)
            response = requests.post(url, json=payload, headers=headers)
        return response


class WhatsappMessage(QontakChat):
    def signup_info_body_parameters(self, name: str, when: str):
        return [
            {"key": "1", "value": "name", "value_text": name},
            {"key": "2", "value": "when", "value_text": when},
        ]

    def signup_info_payload(
        self, phone_number: str, to_name: str, body_parameters: list
    ):
        template_id = settings.QONTAK_WHATSAPP_SIGNUP_INFO_TEMPLATE_ID
        channel_integration_id = settings.QONTAK_WHATSAPP_CHANNEL_INTEGRATION_ID
        payload = {
            "to_number": phone_number,
            "to_name": to_name,
            "message_template_id": template_id,
            "channel_integration_id": channel_integration_id,
            "language": {"code": "id"},
            "parameters": {"body": body_parameters},
        }
        return payload

    def send_signup_info(self, phone_number: str, to_name: str, body_parameters: list):
        payload = self.signup_info_payload(
            phone_number=phone_number, to_name=to_name, body_parameters=body_parameters
        )
        url = self.SEND_WHATSAPP_SIGNUP_INFO_URL
        response = self.send_whatsapp(url, payload)
        return response
