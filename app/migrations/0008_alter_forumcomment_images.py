# Generated by Django 4.0.3 on 2022-05-07 16:06

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('app', '0007_alter_forumpost_images'),
    ]

    operations = [
        migrations.AlterField(
            model_name='forumcomment',
            name='images',
            field=models.ManyToManyField(blank=True, related_name='forum_comments', to='app.forumimage'),
        ),
    ]
