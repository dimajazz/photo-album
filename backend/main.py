from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles

from routes import user_routes, post_routes

from db import models
from db.database import engine

app = FastAPI()

app.include_router(user_routes.router)
app.include_router(post_routes.router)


@app.get('/')
def root():
    return 'Hello world!'


models.Base.metadata.create_all(engine)

app.mount('/images',
          StaticFiles(directory='assets/uploaded_files/images'),
          name='images')
