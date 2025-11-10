from langchain_google_genai import ChatGoogleGenerativeAI
from pydantic import BaseModel, Field
from typing import List

model = ChatGoogleGenerativeAI(model='gemini-2.5-flash')

class Remedy(BaseModel):
    title: str = Field(description="A brief, actionable title for the remedy on advice")
    description: str = Field(description='A short explanation of the remedy')


class DiseaseInfoModel(BaseModel):
    symptoms: List[str] = Field(description='List of Symptoms related to the Disease')
    causes: List[str] = Field(description='List of Causes related to the Disease')
    home_remedy: List[str] = Field(description='List of Home Remedies for the Disease')
    treatment: List[str] = Field(description='List of Treatments for the Disease')


structured_model = model.with_structured_output(DiseaseInfoModel)