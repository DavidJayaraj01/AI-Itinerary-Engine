from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Boolean, Text
from sqlalchemy.orm import relationship
from datetime import datetime
from app.db.database import Base


class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    email = Column(String, unique=True, index=True, nullable=False)
    username = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    first_name = Column(String)
    last_name = Column(String)
    phone = Column(String)
    city = Column(String)
    country = Column(String)
    additional_info = Column(Text)
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    trips = relationship("Trip", back_populates="user")


class Trip(Base):
    __tablename__ = "trips"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String, nullable=False)
    description = Column(Text)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    status = Column(String, default="upcoming")  # upcoming, completed, archived
    cover_image = Column(String)
    is_public = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    user = relationship("User", back_populates="trips")
    stops = relationship("Stop", back_populates="trip", cascade="all, delete-orphan")
    budget = relationship("Budget", back_populates="trip", uselist=False, cascade="all, delete-orphan")


class City(Base):
    __tablename__ = "cities"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, nullable=False)
    country = Column(String, nullable=False)
    region = Column(String)
    cost_index = Column(String)  # $, $$, $$$, $$$$
    popularity = Column(String)  # Low, Medium, High, Very High
    description = Column(Text)
    image_url = Column(String)
    latitude = Column(Float)
    longitude = Column(Float)
    created_at = Column(DateTime, default=datetime.utcnow)

    stops = relationship("Stop", back_populates="city")


class Stop(Base):
    __tablename__ = "stops"

    id = Column(Integer, primary_key=True, index=True)
    trip_id = Column(Integer, ForeignKey("trips.id"), nullable=False)
    city_id = Column(Integer, ForeignKey("cities.id"), nullable=False)
    order_index = Column(Integer, nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    trip = relationship("Trip", back_populates="stops")
    city = relationship("City", back_populates="stops")
    activities = relationship("Activity", back_populates="stop", cascade="all, delete-orphan")


class Activity(Base):
    __tablename__ = "activities"

    id = Column(Integer, primary_key=True, index=True)
    stop_id = Column(Integer, ForeignKey("stops.id"), nullable=False)
    name = Column(String, nullable=False)
    category = Column(String)  # Sightseeing, Food & Drink, Adventure, Culture, Relaxation
    description = Column(Text)
    duration = Column(String)
    cost = Column(String)  # $, $$, $$$, $$$$
    rating = Column(Float)
    scheduled_time = Column(DateTime)
    notes = Column(Text)
    image_url = Column(String)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    stop = relationship("Stop", back_populates="activities")


class Budget(Base):
    __tablename__ = "budgets"

    id = Column(Integer, primary_key=True, index=True)
    trip_id = Column(Integer, ForeignKey("trips.id"), nullable=False)
    total_budget = Column(Float, default=0.0)
    transport_cost = Column(Float, default=0.0)
    accommodation_cost = Column(Float, default=0.0)
    food_cost = Column(Float, default=0.0)
    activities_cost = Column(Float, default=0.0)
    other_cost = Column(Float, default=0.0)
    currency = Column(String, default="USD")
    notes = Column(Text)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)

    trip = relationship("Trip", back_populates="budget")
