# Generated by Django 3.2.11 on 2022-03-30 16:19

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('strapi_gateway', '0002_scheduleinvoce_invoice_id'),
    ]

    operations = [
        migrations.AddField(
            model_name='scheduleinvoce',
            name='external_id',
            field=models.CharField(db_index=True, default='2599ff21-70c0-4e89-b6d0-f012c4cc101f', max_length=255),
        ),
        migrations.AlterField(
            model_name='scheduleinvoce',
            name='invoice_id',
            field=models.CharField(db_index=False, default='', max_length=255),
        ),
    ]
