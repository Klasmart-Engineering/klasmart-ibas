from celery.utils.log import get_task_logger

from config.celery_app import app as celery_app_instance


logger = get_task_logger(__name__)


@celery_app_instance.task(bind=True)
def send_wa_signup_info_task(self, callback):
    """sends  successfully"""
    logger.info(f"Sent wa {callback}")
