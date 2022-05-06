# Generated by Django 4.0.3 on 2022-05-05 15:36

import datetime
from django.db import migrations, models
from django.utils.timezone import utc


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0013_alter_activity_date'),
    ]

    operations = [
        migrations.AddField(
            model_name='activity',
            name='size',
            field=models.IntegerField(default=2),
            preserve_default=False,
        ),
        migrations.AlterField(
            model_name='activity',
            name='date',
            field=models.DateField(default=datetime.datetime(2022, 5, 5, 15, 35, 45, 105982, tzinfo=utc)),
        ),
    ]