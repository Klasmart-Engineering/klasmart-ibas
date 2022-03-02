from datetime import datetime
from django.template import Template, Context


def render_date_time(date: str, time: str):
    datetime_object = datetime.strptime(f"{date} {time}", "%Y-%m-%d  %H:%M:%S")
    t = Template(
        '{% load l10n %}{{date_time.date|date:"l, j F Y"|localize  }} jam {{date_time.time|time:"H:i" }} WIB'
    )
    c = Context({"date_time": datetime_object})
    return t.render(c)


def render_new_schedule_register(callback_data):
    date = callback_data["entry"]["date"]
    time = callback_data["entry"]["time"]
    datetime_object = datetime.strptime(f"{date} {time}", "%Y-%m-%d  %H:%M:%S")
    t = Template(
        """

        Parent Name: {{ callback_data.entry.parent_name }}
        Parent Email: {{ callback_data.entry.email }}
        Parent Phone: 0{{ callback_data.entry.phone }}

        Children:
        {% for child in callback_data.entry.children %}    Name: {{ child.name }}
            Age: {{ child.age }}
            School Name: {{ child.school_name }}
            Grade: {{ child.grade }}

        {% endfor %}Selecting schedule on {{date_time.date|date:"l, j F Y"  }} {{date_time.time|time:"H:i" }} WIB
        """
    )
    c = Context({"callback_data": callback_data, "date_time": datetime_object})
    return t.render(c)
