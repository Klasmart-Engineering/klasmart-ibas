from django.core.mail import send_mail


class Email:
    def send_email_new_register_to_sales(self):
        email_to = "b2c_opsid@kidsloop.live"
        text_body = self.new_schedule_register_copy()
        from_email = "from@example.com"
        to_emails = [
            f"{email_to}",
        ]
        subject = "New Incoming Student"
        send_mail(subject, text_body, from_email, to_emails)

    def new_schedule_register_copy(self):
        rendered_register_detail = ""
        admin_url = "https://client-yello.vercel.app/admin"
        return (
            f"Hi B2C KLID Operations!There's a new incoming student, "
            f"the detail is below: \n{rendered_register_detail} \n\n"
            f"For more details, go download the student details {admin_url}.\n"
            f"Let’s get in touch with them by following our SOP! \nThank you!"
        )
