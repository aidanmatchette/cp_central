# Generated by Django 4.0.3 on 2022-05-05 15:22

import datetime
from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0011_alter_user_metadata'),
    ]

    operations = [
        migrations.AddField(
            model_name='activity',
            name='date',
            field=models.DateField(default=datetime.date(2022, 5, 5)),
        ),
    ]
