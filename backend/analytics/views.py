from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.core.files.storage import default_storage
from django.core.files.base import ContentFile
import os

# ml model imports
from ml_model.model import predict
from .services import structured_model

# Create your views here.
# this path exists only on the server, absolure path on backend file system 
# where the file is physically stored on your server
# file_path = 'uploads/skin_123.jpg'

# public HTTP URL so frontend can access
# full_path = '/Users/abhishek/project/media/uploads/skin_123.jpg'
class GetModelPredictionAPIView(APIView):
    def post(self, request):
        image = request.FILES.get('image')

        if not image:
            return Response({"error": "No file uploaded"}, status=status.HTTP_400_BAD_REQUEST)

        # temp save
        file_path = default_storage.save(f'uploads/{image.name}', ContentFile(image.read()))

        # get full path to saved file
        full_path = default_storage.path(file_path)

        try:
            prediction_tuples = predict(full_path)
            formatted_predictions = [
                {"name": name, "confidence": round(confidence, 2)} for name, confidence in prediction_tuples
            ]
            response_data = {"predictions": formatted_predictions}
            
            return Response(response_data, status=status.HTTP_200_OK)
        
        except Exception as e:
            # Handle potential errors during prediction
            return Response({"error": f"Prediction failed: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        finally:
            # Clean up the saved file after prediction
            if default_storage.exists(file_path):
                default_storage.delete(file_path)



class GetDiseaseInformationAPIView(APIView):
    def post(self, request):
        disease_name = request.POST.get('name', '')

        if not disease_name:
            return Response({"error": "Disease name not provided"}, status=status.HTTP_400_BAD_REQUEST)

        prompt = f'''
        So this is the name of an skin disease: {disease_name}. You have to get following details about it - symptoms, causes, home remedies and treatments
        '''

        try:
            result = structured_model.invoke(prompt)
            response_data = result.model_dump()
            return Response(response_data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": f"Failed to get disease details: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
