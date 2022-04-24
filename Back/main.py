from typing import Optional
import KNN_model as knnpred
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import json
app = FastAPI()
origins = [
    "http://localhost:4200",
    
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
class movie : 
    def __init__(self, title, imdb,sinopsis,date,image): 
        self.title = title
        self.imdb = imdb
        self.sinopsis = sinopsis
        self.date = date
        self.image = image
        
@app.get("/recommend")
def read_root(user:int):
    a =knnpred.recomendation_movie(user)
    listOfReading= reading_list(a)  
    return listOfReading

@app.get("/listLikeMovies")
def read_root(user:int):
    a =knnpred.moviesLikebyUser(user)
    listOfReading= reading_list(a)  
    return listOfReading

def reading_list(df)->list:
    return list(map(lambda x:movie(title=x[0],imdb=x[1],sinopsis=x[2],date=x[3],image=x[4]),df.values.tolist()))