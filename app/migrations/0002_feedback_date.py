# Generated by Django 4.0.3 on 2022-05-07 11:26

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='feedback',
            name='date',
            field=models.DateField(auto_now_add=True, default=datetime.datetime(2022, 5, 7, 11, 26, 23, 57800, tzinfo=utc)),
            preserve_default=False,
        ),
    ]
