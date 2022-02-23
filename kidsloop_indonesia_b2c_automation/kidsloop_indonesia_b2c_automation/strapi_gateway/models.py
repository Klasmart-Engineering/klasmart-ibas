import sched
from django.db import models


class ScheduleInvoce(models.Model):
    schedule_id = models.BigIntegerField()
