import requests

from django.conf import settings


class Xendit:
    XENDIT_BASE_URL = settings.XENDIT_BASE_URL
    CREATE_INVOICE_URL = f"{XENDIT_BASE_URL}/v2/invoices"

    def get_access_token(self) -> str:
        access_token = settings.XENDIT_TOKEN
        return access_token

    def create_invoce_payload(
        self, schedule_id, parent_email, parent_name, parent_phone
    ):
        amount = 750_000
        biggest_invoice_id = settings.XENDIT_BIGGEST_INVOICE_ID
        external_id = f"E1-00{schedule_id + biggest_invoice_id}"
        description = "Invoice Demo #123"
        return {
            "external_id": external_id,
            "amount": amount,
            "payer_email": parent_email,
            "description": description,
            "customer": {
                "given_names": parent_name,
                "email": parent_email,
                "mobile_number": parent_phone,
            },
        }

    def send_post_request(self, url: str, payload: dict):
        xendit_token = self.get_access_token()
        response = requests.post(
            url,
            json=payload,
            auth=(
                xendit_token,
                "",
            ),  # https://developers.xendit.co/api-reference/#authentication
        )
        return response

    def create_invoice(self, create_invoice_payload):
        url = self.CREATE_INVOICE_URL
        response = self.send_post_request(url, create_invoice_payload)
        return response
