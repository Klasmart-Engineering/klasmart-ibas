from kidsloop_indonesia_b2c_automation.email_service.emails import Email
from kidsloop_indonesia_b2c_automation.qontak_gateway import tasks as qontak_tasks
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
    event = callback_data["event"]
    phone = callback_data["entry"]["phone"]
    name = callback_data["entry"]["parent_name"]
    parent_email = callback_data["entry"]["email"]
    status = ""
    if callback_data["entry"].get("schedule_status"):
        status = callback_data["entry"]["schedule_status"]["description"]
    when = render_date_time(
        callback_data["entry"]["date"], callback_data["entry"]["time"]
    )
    if model == "schedule" and event == "entry.create":
        # send wa
        wa_message = WhatsappMessage()
        body_parameters = wa_message.signup_info_body_parameters(name, when)
        r = wa_message.send_signup_info(
            phone_number=f"62{phone}", to_name=name, body_parameters=body_parameters
        )
        print(f"qontak send_signup_info status: {r.json()['status']}")

        email = Email()
        email.send_email_new_register_to_sales()
    elif model == "schedule" and event == "entry.update" and status == "interested":
        # check schedule id if invoice already created
        _, created = models.ScheduleInvoce.objects.get_or_create(
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
        payload = xendit.create_invoce_payload(schedule_id, parent_email, name, phone)
        r = xendit.create_invoice(payload)
        print(f"xendit create_invoice status: {r.json()['status']}")

        # save schedule invoice to db


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
