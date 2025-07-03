from django.db import models
from model_utils import FieldTracker

class Vacation(models.Model):
    start_date = models.DateField()
    end_date = models.DateField()
    reason = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    tracker = FieldTracker()

    def __str__(self):
        return f"{self.start_date} to {self.end_date} - {self.reason}"

