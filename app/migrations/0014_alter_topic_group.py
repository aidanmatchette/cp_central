# Generated by Django 4.0.3 on 2022-05-01 16:34

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
        ('app', '0013_alter_topic_sub_topics'),
    ]

    operations = [
        migrations.AlterField(
            model_name='topic',
            name='group',
            field=models.ForeignKey(default=1, on_delete=django.db.models.deletion.CASCADE, related_name='topics', to='auth.group'),
        ),
    ]
