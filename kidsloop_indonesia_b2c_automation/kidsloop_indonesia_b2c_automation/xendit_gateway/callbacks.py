from django.conf import settings


def invoice_callback(callback_data):
    invoice_status = callback_data["status"]
    if invoice_status == "PAID":
        from kidsloop_indonesia_b2c_automation.strapi_gateway import (
            api_requests,
            models,
        )

        paid_id = settings.STRAPI_STATUS_PAID_ID
        external_id = callback_data["external_id"]
        schedule_id = models.ScheduleInvoce.objects.get(
            external_id=external_id
        ).schedule_id
        update_strapi = api_requests.UpdateStrapiSchedule(schedule_id)
        payload = update_strapi.update_schedule_status_payload(paid_id)
        response = update_strapi.update_schedule(payload)
        print(f"update strapi schedule: {response.status_code}")
