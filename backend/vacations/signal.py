from django.db.models.signals import post_save, post_delete, pre_save
from django.dispatch import receiver
from .models import Vacation
from classes.models import ClassSession

@receiver(post_save, sender=Vacation)
def suspend_classes_on_vacation(sender, instance, created, **kwargs):
    if created:
        ClassSession.objects.filter(
            date__gte=instance.start_date,
            date__lte=instance.end_date
        ).update(is_suspended=True)
    else:
        if instance.tracker.has_changed('start_date') or instance.tracker.has_changed('end_date'):
            old_start = instance.tracker.previous('start_date')
            old_end = instance.tracker.previous('end_date')

            old_affected = ClassSession.objects.filter(
                date__gte = old_start,
                date__lte = old_end,
                is_suspended = True
            )

            for i in old_affected:
                other_vacations = Vacation.objects.filter(
                    start_date__lte=old_start,
                    end_date__gte=old_end
                ).exclude(id=instance.id)

                if not other_vacations.exists():
                    i.is_suspended = False
                    i.save()

            ClassSession.objects.filter(
                date__gte=instance.start_date,
                date__lte=instance.end_date
            ).update(is_suspended=True)
            




@receiver(post_delete, sender=Vacation)
def unsuspend_classes_after_vacation_delete(sender, instance, **kwargs):
    print(sender, instance)
    affected_classes = ClassSession.objects.filter(
        date__gte=instance.start_date,
        date__lte=instance.end_date,
        is_suspended=True
    )

    for session in affected_classes:
        other_vacations = Vacation.objects.filter(
            start_date__lte=session.date,
            end_date__gte=session.date
        ).exclude(id=instance.id)

        if not other_vacations.exists():
            session.is_suspended = False
            session.save()
