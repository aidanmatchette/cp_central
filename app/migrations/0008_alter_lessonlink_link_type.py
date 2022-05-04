# Generated by Django 4.0.3 on 2022-05-04 16:10

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_lesson_markdown'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lessonlink',
            name='link_type',
            field=models.IntegerField(choices=[(0, 'Supplement'), (1, 'Challenge'), (2, 'Assessment'), (3, 'Student')], default=1),
        ),
    ]