import requests
from datetime import timedelta

from django.conf import settings
from django.utils import timezone


class Strapi:
    STRAPI_BASE_URL = settings.STRAPI_BASE_URL
    CREATE_SUBSCRIPTION_URL = f"{STRAPI_BASE_URL}/subscriptions"

    def send_post_request(self, url: str, payload: dict):
        # TODO: add auth to call to strapi
        response = requests.post(
            url,
            json=payload,
        )
        return response

    def send_put_request(self, url: str, payload: dict):
        # TODO: add auth to call to strapi
        response = requests.put(
            url,
            json=payload,
        )
        return response


class StrapiSubscription(Strapi):
    def create_subscription_payload(self, parent_email, callback_data, is_free_trial):
        package = callback_data["entry"]["package"]

        # TODO: refactor as generate subs duration function
        now = timezone.now()
        now_date = now.date()
        duration = package["duration_number"]
        if package["duration_type"] == "months":
            duration = 30 * package["duration_number"]
        elif package["duration_type"] == "years":
            duration = 356 * package["duration_number"]
        end_date = now + timedelta(days=duration)
        # END

        payload = {
            "customer_email": parent_email,
            "is_free_trial": is_free_trial,
            "paid_price": package["price"],
            "subscription_name": package["package_name"],
            "duration_number": package["duration_number"],
            "duration_type": package["duration_type"],
            "start_date": f"{now_date}",
            "end_date": f"{end_date.date()}",
        }
        return {"data": payload}

    def create_subscription(self, create_subscription_payload):
        url = self.CREATE_SUBSCRIPTION_URL
        response = self.send_post_request(url, create_subscription_payload)
        return response


class UpdateStrapiSchedule(Strapi):
    def __init__(self, schedule_id: int) -> None:
        super().__init__()
        self.schedule_id = schedule_id

    def update_schedule_status_payload(self, status: int):
        return {"data": {"schedule_status": status}}

    def update_schedule(self, create_subscription_payload):
        url = f"{self.STRAPI_BASE_URL}/schedules/{self.schedule_id}"
        response = self.send_put_request(url, create_subscription_payload)
        return response
