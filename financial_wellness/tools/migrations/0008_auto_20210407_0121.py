# Generated by Django 3.1.6 on 2021-04-07 05:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('tools', '0007_auto_20210406_1711'),
    ]

    operations = [
        migrations.AddField(
            model_name='retirementresults',
            name='IncomeFrequency',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='retirementresults',
            name='NRSIFrequency',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='retirementresults',
            name='RRSPFrequency',
            field=models.IntegerField(default=0),
        ),
        migrations.AddField(
            model_name='retirementresults',
            name='TFSAFrequency',
            field=models.IntegerField(default=0),
        ),
    ]
