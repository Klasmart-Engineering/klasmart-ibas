from django.conf import settings
from django.core.mail import send_mail

from kidsloop_indonesia_b2c_automation.utils.renderers import (
    render_new_schedule_register,
)


class Email:
    def send_email_new_register_to_sales(self, callback_data):
        email_to = settings.B2C_OPS_EMAIL
        rendered_register_detail = self.new_schedule_register_rendered_data(
            callback_data
        )
        text_body = self.new_schedule_register_copy(rendered_register_detail)
        from_email = settings.DEFAULT_FROM_EMAIL
        to_emails = [
            f"{email_to}",
        ]
        parent_name = callback_data["entry"]["email"]
        subject = f"New Incoming Student from Parent {parent_name}"
        send_mail(subject, text_body, from_email, to_emails)

    def new_schedule_register_rendered_data(self, callback_data):
        rendered_register_detail = render_new_schedule_register(callback_data)
        return rendered_register_detail

    def new_schedule_register_copy(self, rendered_register_detail):
        admin_url = settings.LANDING_PAGE_ADMIN_URL
        return (
            f"Hi B2C KLID Operations!\n\nThere's a new incoming student, "
            f"the detail is below: {rendered_register_detail}\n"
            f"For more details, go download the student details {admin_url}.\n"
            f"Let’s get in touch with them by following our SOP! \nThank you!"
        )
