# Generated by Django 4.0.3 on 2022-05-02 18:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0005_cohort_calendar_key'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='lesson',
            name='markdown_url',
        ),
        migrations.AddField(
            model_name='lesson',
            name='lesson_file_path',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
    ]