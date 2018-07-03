from django.apps import AppConfig


class StreamappConfig(AppConfig):
    name = 'Streamapp'

    def ready(self):
    	from . import signals
