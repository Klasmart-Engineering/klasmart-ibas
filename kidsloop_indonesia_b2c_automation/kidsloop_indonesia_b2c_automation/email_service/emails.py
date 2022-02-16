from django.core.mail import send_mail


class Email:
    def send_email_new_register_to_sales(self):
        send_mail(
          "Subject", 
          "text body", 
          "from@example.com",
          ["to@example.com"]
        )
