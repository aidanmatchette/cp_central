# Generated by Django 4.0.3 on 2022-05-02 18:20

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0004_cohort'),
    ]

    operations = [
        migrations.AddField(
            model_name='cohort',
            name='calendar_key',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]