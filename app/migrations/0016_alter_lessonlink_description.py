# Generated by Django 4.0.3 on 2022-05-01 16:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0015_alter_lessonlink_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lessonlink',
            name='description',
            field=models.TextField(blank=True, null=True),
        ),
    ]
