# Generated by Django 4.0.3 on 2022-05-04 21:01

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0009_lessonlink_originator'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='markdown',
            field=models.TextField(blank=True, default='', null=True),
        ),
    ]
