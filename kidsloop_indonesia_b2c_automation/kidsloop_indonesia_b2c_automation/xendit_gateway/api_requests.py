import requests

from django.conf import settings
from django.utils import timezone


class Xendit:
    XENDIT_BASE_URL = settings.XENDIT_BASE_URL
    CREATE_INVOICE_URL = f"{XENDIT_BASE_URL}/v2/invoices"

    def get_access_token(self) -> str:
        access_token = settings.XENDIT_TOKEN
        return access_token

    def create_invoice_id(self, schedule_id):
        now_date = timezone.now()
        now_month_year = now_date.strftime("%m%y")

        biggest_invoice_id = settings.XENDIT_BIGGEST_INVOICE_ID
        invoice_queue_id = str(schedule_id + biggest_invoice_id)
        return f"I{now_month_year}{invoice_queue_id.rjust(4, '0')}"

    def create_invoce_payload(
        self, schedule_id, parent_email, parent_name, parent_phone, package
    ):
        amount = package["price"]
        description = package["description"]

        external_id = self.create_invoice_id(schedule_id)
        
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
