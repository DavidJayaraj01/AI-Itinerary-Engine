from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from typing import List
from app.db.database import get_db
from app.models.models import Trip, User
from app.schemas.schemas import TripCreate, TripUpdate, TripResponse

router = APIRouter()


@router.post("/", response_model=TripResponse, status_code=status.HTTP_201_CREATED)
def create_trip(trip: TripCreate, user_id: int, db: Session = Depends(get_db)):
    # Verify user exists
    user = db.query(User).filter(User.id == user_id).first()
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    
    db_trip = Trip(**trip.dict(), user_id=user_id)
    db.add(db_trip)
    db.commit()
    db.refresh(db_trip)
    return db_trip


@router.get("/", response_model=List[TripResponse])
def get_trips(user_id: int, skip: int = 0, limit: int = 100, db: Session = Depends(get_db)):
    trips = db.query(Trip).filter(Trip.user_id == user_id).offset(skip).limit(limit).all()
    return trips


@router.get("/{trip_id}", response_model=TripResponse)
def get_trip(trip_id: int, db: Session = Depends(get_db)):
    trip = db.query(Trip).filter(Trip.id == trip_id).first()
    if not trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    return trip


@router.put("/{trip_id}", response_model=TripResponse)
def update_trip(trip_id: int, trip_update: TripUpdate, db: Session = Depends(get_db)):
    db_trip = db.query(Trip).filter(Trip.id == trip_id).first()
    if not db_trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    
    update_data = trip_update.dict(exclude_unset=True)
    for field, value in update_data.items():
        setattr(db_trip, field, value)
    
    db.commit()
    db.refresh(db_trip)
    return db_trip


@router.delete("/{trip_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_trip(trip_id: int, db: Session = Depends(get_db)):
    db_trip = db.query(Trip).filter(Trip.id == trip_id).first()
    if not db_trip:
        raise HTTPException(status_code=404, detail="Trip not found")
    
    db.delete(db_trip)
    db.commit()
    return None
