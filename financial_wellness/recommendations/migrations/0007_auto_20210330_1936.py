# Generated by Django 3.1.5 on 2021-03-31 01:36

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('recommendations', '0006_auto_20210330_1901'),
    ]

    operations = [
        migrations.RenameField(
            model_name='userrecommendation',
            old_name='users',
            new_name='user',
        ),
    ]
