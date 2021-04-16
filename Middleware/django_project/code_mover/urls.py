from django.conf.urls import url
from . import views

urlpatterns = [
    url(r'jira_hub/?$',views.jira_hub)
]