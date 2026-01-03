from fastapi import APIRouter
from app.api.endpoints import auth, trips, cities

api_router = APIRouter()

api_router.include_router(auth.router, prefix="/auth", tags=["authentication"])
api_router.include_router(trips.router, prefix="/trips", tags=["trips"])
api_router.include_router(cities.router, prefix="/cities", tags=["cities"])
