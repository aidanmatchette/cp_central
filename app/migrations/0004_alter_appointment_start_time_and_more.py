# Generated by Django 4.0.3 on 2022-05-01 01:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0003_activity_feedback_filledquestionnaire_lesson_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='appointment',
            name='start_time',
            field=models.DateTimeField(),
        ),
        migrations.AlterField(
            model_name='appointment',
            name='stop_time',
            field=models.DateTimeField(),
        ),
    ]
