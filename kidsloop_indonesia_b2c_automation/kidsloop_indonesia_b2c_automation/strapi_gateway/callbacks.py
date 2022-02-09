from kidsloop_indonesia_b2c_automation.qontak_gateway import tasks as qontak_tasks
from kidsloop_indonesia_b2c_automation.qontak_gateway.api_requests import (
    WhatsappMessage,
)
from kidsloop_indonesia_b2c_automation.utils.renderers import render_date_time


def switch_strapi_cms_callback(callback_data):
    model = callback_data["model"]
    event = callback_data["event"]
    phone = callback_data["entry"]["phone"]
    name = callback_data["entry"]["parent_name"]
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
        print(f"send_signup_info status: {r.json()['status']}")
        return r


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
