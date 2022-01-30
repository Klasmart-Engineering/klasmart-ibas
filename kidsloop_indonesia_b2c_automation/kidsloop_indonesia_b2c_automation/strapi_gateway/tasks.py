from celery.utils.log import get_task_logger

from config.celery_app import app as celery_app_instance
from .callbacks import switch_strapi_cms_callback


logger = get_task_logger(__name__)


@celery_app_instance.task
def switch_strapi_cms_callback_task(callback_data):
    """successfully"""
    switch_strapi_cms_callback(callback_data)
