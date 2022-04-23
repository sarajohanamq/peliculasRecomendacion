from typing import Optional
import KNN_model as knnpred
from fastapi import FastAPI
import pandas as pd
import json
app = FastAPI()
versiones_plone = [2.1, 2.5, 3.6, 4, 5, 6]
class movie : 
    def __init__(self, title, imdb,sinopsis,date,image): 
        self.title = title
        self.imdb = imdb
        self.sinopsis = sinopsis
        self.date = date
        self.image = image
        
@app.get("/")
def read_root():
    list = []
    a =knnpred.recomendation_movie(258)
    print(a.to_markdown())
    listOfReading= reading_list(a)  
  
    return listOfReading

def reading_list(df)->list:
    return list(map(lambda x:movie(title=x[0],imdb=x[1],sinopsis=x[2],date=x[3],image=x[4]),df.values.tolist()))