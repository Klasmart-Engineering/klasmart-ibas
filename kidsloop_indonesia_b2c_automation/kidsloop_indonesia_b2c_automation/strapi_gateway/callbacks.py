from kidsloop_indonesia_b2c_automation.email_service.emails import ScheduleRegisterEmail
from kidsloop_indonesia_b2c_automation.qontak_gateway.api_requests import (
    WhatsappMessage,
)
from kidsloop_indonesia_b2c_automation.xendit_gateway.api_requests import (
    Xendit,
)
from kidsloop_indonesia_b2c_automation.utils.renderers import render_date_time
from . import models


def switch_strapi_cms_callback(callback_data):
    print("callback_data", callback_data)
    schedule_id = callback_data["entry"]["id"]
    model = callback_data["model"]
    if model != "schedule":
        return
    event = callback_data["event"]
    phone = callback_data["entry"]["phone"]
    name = callback_data["entry"]["parent_name"]
    parent_email = callback_data["entry"]["email"]
    status = ""
    if callback_data["entry"].get("schedule_status"):
        status = callback_data["entry"]["schedule_status"]["description"]

    package = {"price": 750_000, "description": "Invoice Demo #123"}
    if callback_data["entry"].get("package"):
        package = callback_data["entry"]["package"]
    when = render_date_time(
        callback_data["entry"]["date"], callback_data["entry"]["time"]
    )

    if event == "entry.create":
        # send wa
        wa_message = WhatsappMessage()
        body_parameters = wa_message.signup_info_body_parameters(name, when)
        r = wa_message.send_signup_info(
            phone_number=f"62{phone}", to_name=name, body_parameters=body_parameters
        )
        print(f"qontak send_signup_info status: {r.json()['status']}")

        email = ScheduleRegisterEmail()
        email.send_email_new_register_to_sales(callback_data)
        print(f"ses send_email_new_register_to_sales sent")
    elif event == "entry.update" and status == "interested":
        # check schedule id if invoice already created if not, then create
        schedule_invoice, created = models.ScheduleInvoce.objects.get_or_create(
            schedule_id=schedule_id
        )
        if not created:
            print(
                f"invoice already created for schedule_id {schedule_id}, not recreating xendit invoice"
            )
            return
        # create invoice
        print("create invoice")
        xendit = Xendit()
        payload = xendit.create_invoce_payload(
            schedule_id, parent_email, name, f"0{phone}", package
        )
        r = xendit.create_invoice(payload)
        response = r.json()
        print(f"xendit create_invoice status: {r.status_code}")
        if r.status_code == 200:
            external_id = payload["external_id"]
            schedule_invoice.external_id = external_id
            schedule_invoice.save()

    elif event == "entry.update" and status == "free_trial":
        # _, created = models.ScheduleFreeTrial.objects.get_or_create(
        #     schedule_id=schedule_id
        # )
        # if not created:
        #     print(
        #         f"free trial already created for schedule_id {schedule_id}, not recreating subscription again"
        #     )
        #     return
        # callback strapi create subscription entry
        from kidsloop_indonesia_b2c_automation.strapi_gateway import api_requests

        is_free_trial = True
        strapi_subscription = api_requests.StrapiSubscription()
        payload = strapi_subscription.create_subscription_payload(
            parent_email, callback_data, is_free_trial
        )
        response = strapi_subscription.create_subscription(payload)
        print(f"call strapi response: {response.json()}")

    elif event == "entry.update" and status == "paid":
        from kidsloop_indonesia_b2c_automation.strapi_gateway import api_requests

        is_free_trial = False
        strapi_subscription = api_requests.StrapiSubscription()
        payload = strapi_subscription.create_subscription_payload(
            parent_email, callback_data, is_free_trial
        )
        response = strapi_subscription.create_subscription(payload)
        print(f"call strapi response: {response.json()}")


# callback_data = {
#     "event": "entry.create",
#     "created_at": "2022-01-26T14:43:28.957Z",
#     "model": "schedule",
#     "entry": {
#         "id": 2,
#         "date": "2022-01-28",
#         "time": "18:00:00",
#         "parent_name": "bapak",
#         "email": "alvian@kidsloop.live",
#         "phone": "09030123877",
#         "child_name": None,
#         "child_age": None,
#         "child_grade": None,
#         "school_name": None,
#         "status": None,
#         "created_at": "2022-01-26T14:43:28.930Z",
#         "updated_at": "2022-01-26T14:43:28.950Z",
#         "children": [
#             {"age": "6", "name": "Des Jr", "grade": "1", "school_name": "JiS"},
#             {
#                 "age": "4",
#                 "name": "DES 3rd",
#                 "grade": "A",
#                 "school_name": "Big Bird Kindergarten ",
#             },
#         ],
#         "schedule_status": None,
#     },
# }
