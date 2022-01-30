from django.core.cache import cache


CACHE_KEY_QONTAK_ACCESS_TOKEN = "cache_qontak_access_token"


def get_cache_qontak_access_token():
    return cache.get(CACHE_KEY_QONTAK_ACCESS_TOKEN)


def set_cache_qontak_access_token(access_token):
    return cache.set(CACHE_KEY_QONTAK_ACCESS_TOKEN, access_token, 31556952)
