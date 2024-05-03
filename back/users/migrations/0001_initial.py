from django.db import migrations, models
import uuid

from django.db import migrations, models
import django.utils.timezone
import uuid

class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('auth', '0012_alter_user_first_name_max_length'),
    ]

    operations = [
        migrations.CreateModel(
            name='User',
            fields=[
                ('id', models.AutoField(primary_key=True)),
                ('username', models.CharField(max_length=255, unique=True)),
                ('email', models.EmailField(max_length=255, unique=True, db_index=True)),
                ('sex', models.CharField(max_length=1, choices=[('M', 'Male'), ('F', 'Female'), ("U", None),], null=True, blank=True)),
                ('birth_date', models.DateField(null=True)),
                ('password', models.CharField(max_length=255)),
                ('is_active', models.BooleanField(default=True, null=False)),
                ('is_staff', models.BooleanField(default=False, null=False)),
            ],
            options={
                'abstract': False,
            },
            bases=(models.Model,),
        ),
    ]