from datetime import datetime
from django.template import Template, Context


def render_date_time(date: str, time: str):
    datetime_object = datetime.strptime(f"{date} {time}", "%Y-%m-%d  %H:%M:%S")
    t = Template(
        '{% load l10n %}{{date_time.date|date:"l, j F Y"|localize  }} jam {{date_time.time|time:"H:i" }}'
    )
    c = Context({"date_time": datetime_object})
    return t.render(c)
