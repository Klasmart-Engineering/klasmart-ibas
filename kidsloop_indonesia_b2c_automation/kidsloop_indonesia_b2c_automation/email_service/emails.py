from django.conf import settings
from django.core.mail import send_mail

from kidsloop_indonesia_b2c_automation.utils.renderers import (
    render_schedule_callback_detail,
)


class ScheduleRegisterEmail:
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
        parent_name = callback_data["entry"]["parent_name"]
        subject = f"New Incoming Student from Parent {parent_name}"
        send_mail(subject, text_body, from_email, to_emails)

    def new_schedule_register_rendered_data(self, callback_data):
        rendered_register_detail = render_schedule_callback_detail(callback_data)
        return rendered_register_detail

    def new_schedule_register_copy(self, rendered_register_detail):
        admin_url = settings.LANDING_PAGE_ADMIN_URL
        return (
            f"Hi B2C KLID Operations!\n\nThere's a new incoming student, "
            f"the detail is below: {rendered_register_detail}\n"
            f"For more details, go download the student details {admin_url}.\n"
            f"Let's get in touch with them by following our SOP! \nThank you!"
        )


class PaymentSuccessEmail:
    def send_email_payment_success_to_sales(self, callback_data):
        email_to = settings.B2C_OPS_EMAIL
        rendered_payment_success_detail = self.payment_success_rendered_data(
            callback_data
        )
        text_body = self.payment_success_copy(rendered_payment_success_detail)
        from_email = settings.DEFAULT_FROM_EMAIL
        to_emails = [
            f"{email_to}",
        ]
        invoice_number = "" # TODO
        subject = f"Payment {invoice_number} has been paid!"
        send_mail(subject, text_body, from_email, to_emails)

    def payment_success_rendered_data(self, callback_data):
        rendered_payment_success_detail = render_schedule_callback_detail(callback_data)
        return rendered_payment_success_detail

    def payment_success_copy(self, rendered_payment_success_detail):
        return (
            f"Hi B2C KLID Operations!\nThere are students who have already paid"
            f" the bill with the following details:\n{rendered_payment_success_detail}\n"
            f"Register leads in B2C class and Remove them"
            f" from Demo class. Let's get in touch with them by following our SOP!\nThank you!"
        )


class ScheduleStatusRegisteredEmail:
    def send_email_payment_success_to_customer(self, callback_data):
        email_to = "customer_email"
        rendered_payment_success_detail = self.payment_success_rendered_data(
            callback_data
        )
        text_body = self.payment_success_copy(rendered_payment_success_detail)
        from_email = settings.DEFAULT_FROM_EMAIL
        to_emails = [
            f"{email_to}",
        ]
        subject = f"Terima kasih telah melakukan pembayaran kelas Badanamu ESL!"
        send_mail(subject, text_body, from_email, to_emails)

    def payment_success_rendered_data(self, callback_data):
        rendered_payment_success_detail = render_schedule_callback_detail(callback_data)
        return rendered_payment_success_detail

    def payment_success_copy(self, rendered_payment_success_detail):
        double_quote = '"'
        parent_name = ""
        class_name = ""
        student_name = ""
        date = ""
        start_date = ""
        period = ""
        link_youtube = ""
        return (
            f"Halo {parent_name},Terima kasih telah melakukan pembayaran kelas Badanamu ESL!\n"
            f"Berikut kami informasikan kelas {class_name} di Badanamu ESL:\n"
            f"Nama anak: {student_name}\nKelas: {class_name}\nJadwal: {date}\n"
            f"Tanggal mulai: {start_date}\nPeriode paket: {period}\n"
            f"Berikut adalah panduan untuk mengakses ke dalam kelas:\n"
            f"1. Akses: https://hub.kidsloop.id/\n"
            f"2. Masukkan alamat email dan kata sandi yang sudah dibuat\n"
            f"3. Centang {double_quote}saya menyetujui privasi KidsLoop{double_quote}\n"
            f"4. Klik {double_quote}Sign in/Masuk{double_quote}\n"
            f"5. Untuk panduan lengkapnya bisa dilihat pada tautan berikut ya: {link_youtube}\n"
            f"6. Mohon agar selalu hadir tepat waktu di kelas ya, biasanya kelas dapat"
            f" diakses 5 (lima) menit sebelum kelas dimulai.\n"
            f"Terimakasih!"
        )


class FreeTrialAlmostExpiredEmail:
    def send_email_to_customer(self, callback_data):
        email_to = ""
        rendered_payment_success_detail = self.payment_success_rendered_data(
            callback_data
        )
        text_body = self.payment_success_copy(rendered_payment_success_detail)
        from_email = settings.DEFAULT_FROM_EMAIL
        to_emails = [
            f"{email_to}",
        ]
        subject = f"Masa free trial kamu di Kidsloop akan segera habis."
        send_mail(subject, text_body, from_email, to_emails)

    def to_customer_copy(self):
        parent_name = ""
        kid_name = ""
        due_date = ""
        student_name = ""
        price = ""
        f"Halo Mommy/Daddy {parent_name}, Masa free trial {kid_name}"
        f" di Kidsloop akan segera berakhir pada {due_date}."
        f" Apabila {student_name} ingin melanjutkan kelas pembelajaran"
        f" ke level selanjutnya, kami memiliki penawaran sebesar"
        f" Rp{price} untuk pembelajaran selama 3 (tiga) bulan."
        f"Kami tunggu tanggapan dari Mommy/Daddy, ya!\n\n"
        f"Terimakasih!"

    def send_email_to_sales(self, callback_data):
        email_to = settings.B2C_OPS_EMAIL
        rendered_payment_success_detail = self.payment_success_rendered_data(
            callback_data
        )
        text_body = self.payment_success_copy(rendered_payment_success_detail)
        from_email = settings.DEFAULT_FROM_EMAIL
        to_emails = [
            f"{email_to}",
        ]
        subject = f"Trial Class Expiration"
        send_mail(subject, text_body, from_email, to_emails)

    def to_sales_copy(self, rendered_schedule_callback_detail):
        f"Hi B2C KLID Operations!There are student(s)' trial class period"
        f" is about to expire soon in these following details:"
        f"{rendered_schedule_callback_detail}"
        f"Let’s get in touch with them according to our SOP!\n\n"
        f"Thank you!"
