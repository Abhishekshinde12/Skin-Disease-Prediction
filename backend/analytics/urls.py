from django.urls import path
from .views import GetModelPredictionAPIView, GetDiseaseInformationAPIView

urlpatterns = [
    path('prediction/', GetModelPredictionAPIView.as_view()),
    path('details/', GetDiseaseInformationAPIView.as_view())
]