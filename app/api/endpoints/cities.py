from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.models.models import City
from app.schemas.schemas import CityCreate, CityResponse

router = APIRouter()


@router.post("/", response_model=CityResponse)
def create_city(city: CityCreate, db: Session = Depends(get_db)):
    db_city = City(**city.dict())
    db.add(db_city)
    db.commit()
    db.refresh(db_city)
    return db_city


@router.get("/", response_model=List[CityResponse])
def get_cities(
    skip: int = 0, 
    limit: int = 100, 
    region: str = None,
    search: str = None,
    db: Session = Depends(get_db)
):
    query = db.query(City)
    
    if region:
        query = query.filter(City.region == region)
    
    if search:
        query = query.filter(
            (City.name.ilike(f"%{search}%")) | 
            (City.country.ilike(f"%{search}%"))
        )
    
    cities = query.offset(skip).limit(limit).all()
    return cities


@router.get("/{city_id}", response_model=CityResponse)
def get_city(city_id: int, db: Session = Depends(get_db)):
    city = db.query(City).filter(City.id == city_id).first()
    if not city:
        raise HTTPException(status_code=404, detail="City not found")
    return city
