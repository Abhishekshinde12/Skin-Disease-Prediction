from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from rest_framework.parsers import MultiPartParser, FormParser
from .serializers import MyModelSerializer
from .models import MyModel

# ml model imports
from ml_model.model import predict
from .services import structured_model


class GetModelPredictionAPIView(APIView):
    serializer_class = MyModelSerializer
    parser_classes = [MultiPartParser, FormParser]

    def post(self, request, *args, **kwargs):
        serializer = MyModelSerializer(data=request.data)

        if not serializer.is_valid():
            print(serializer.errors)
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        # Save the uploaded image to the database (and media folder)
        instance = serializer.save()
        print(instance.__dict__)

        try:
            # Get the absolute path of the stored image file
            image_path = instance.image
            print(image_path)

            # Run the ML model prediction
            prediction_tuples = predict(image_path)
            print(prediction_tuples)

            formatted_predictions = [
                {"name": name, "confidence": round(confidence, 2)}
                for name, confidence in prediction_tuples
            ]

            response_data = {
                "id": instance.id,
                "name": instance.name,
                "image_url": instance.image.url,
                "predictions": formatted_predictions,
            }

            return Response(response_data, status=status.HTTP_200_OK)

        except Exception as e:
            return Response(
                {"error": f"Prediction failed: {str(e)}"},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )



class GetDiseaseInformationAPIView(APIView):
    def post(self, request, *args, **kwargs):
        disease_name = request.data.get('name', '')

        if not disease_name:
            return Response({"error": "Disease name not provided"}, status=status.HTTP_400_BAD_REQUEST)

        prompt = f'''
        So this is the name of an skin disease: {disease_name}. You have to get following details about it - symptoms, causes, home remedies and treatments
        '''

        try:
            result = structured_model.invoke(prompt)
            json_result = result.model_dump_json()
            return Response(json_result, status=status.HTTP_200_OK)

        except Exception as e:
            return Response({"error": f"Failed to get disease details: {str(e)}"}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)