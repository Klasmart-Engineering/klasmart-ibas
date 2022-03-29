from uuid import uuid4
from django.db import models


class ScheduleInvoce(models.Model):
    schedule_id = models.BigIntegerField()
    invoice_id = models.CharField(
        max_length=255, 
        default=f"{uuid4()}", 
        unique=True
    )
