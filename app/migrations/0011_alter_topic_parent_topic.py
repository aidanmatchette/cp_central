# Generated by Django 4.0.3 on 2022-05-01 16:29

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0010_lessonlink_link_type'),
    ]

    operations = [
        migrations.AlterField(
            model_name='topic',
            name='parent_topic',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.CASCADE, related_name='topics', to='app.topic'),
        ),
    ]
