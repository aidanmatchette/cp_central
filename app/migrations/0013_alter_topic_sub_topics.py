# Generated by Django 4.0.3 on 2022-05-01 16:33

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0012_remove_topic_parent_topic_topic_sub_topics'),
    ]

    operations = [
        migrations.AlterField(
            model_name='topic',
            name='sub_topics',
            field=models.ManyToManyField(blank=True, to='app.topic'),
        ),
    ]
