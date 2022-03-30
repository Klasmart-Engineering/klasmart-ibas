from celery.utils.log import get_task_logger

from config.celery_app import app as celery_app_instance
from .callbacks import invoice_callback


logger = get_task_logger(__name__)


@celery_app_instance.task(bind=True)
def invoice_callback_task(self, callback_data):
    """successfully"""
    invoice_callback(callback_data)
