from pydantic import BaseModel, EmailStr
from datetime import datetime
from typing import Optional, List


# User Schemas
class UserBase(BaseModel):
    email: EmailStr
    username: str
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    additional_info: Optional[str] = None


class UserCreate(UserBase):
    password: str


class UserUpdate(BaseModel):
    first_name: Optional[str] = None
    last_name: Optional[str] = None
    phone: Optional[str] = None
    city: Optional[str] = None
    country: Optional[str] = None
    additional_info: Optional[str] = None


class UserResponse(UserBase):
    id: int
    is_active: bool
    created_at: datetime

    class Config:
        from_attributes = True


# Trip Schemas
class TripBase(BaseModel):
    name: str
    description: Optional[str] = None
    start_date: datetime
    end_date: datetime
    status: Optional[str] = "upcoming"
    cover_image: Optional[str] = None
    is_public: Optional[bool] = False


class TripCreate(TripBase):
    pass


class TripUpdate(BaseModel):
    name: Optional[str] = None
    description: Optional[str] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    status: Optional[str] = None
    cover_image: Optional[str] = None
    is_public: Optional[bool] = None


class TripResponse(TripBase):
    id: int
    user_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# City Schemas
class CityBase(BaseModel):
    name: str
    country: str
    region: Optional[str] = None
    cost_index: Optional[str] = None
    popularity: Optional[str] = None
    description: Optional[str] = None
    image_url: Optional[str] = None
    latitude: Optional[float] = None
    longitude: Optional[float] = None


class CityCreate(CityBase):
    pass


class CityResponse(CityBase):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True


# Stop Schemas
class StopBase(BaseModel):
    city_id: int
    order_index: int
    start_date: datetime
    end_date: datetime
    notes: Optional[str] = None


class StopCreate(StopBase):
    trip_id: int


class StopUpdate(BaseModel):
    city_id: Optional[int] = None
    order_index: Optional[int] = None
    start_date: Optional[datetime] = None
    end_date: Optional[datetime] = None
    notes: Optional[str] = None


class StopResponse(StopBase):
    id: int
    trip_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Activity Schemas
class ActivityBase(BaseModel):
    name: str
    category: Optional[str] = None
    description: Optional[str] = None
    duration: Optional[str] = None
    cost: Optional[str] = None
    rating: Optional[float] = None
    scheduled_time: Optional[datetime] = None
    notes: Optional[str] = None
    image_url: Optional[str] = None


class ActivityCreate(ActivityBase):
    stop_id: int


class ActivityUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    description: Optional[str] = None
    duration: Optional[str] = None
    cost: Optional[str] = None
    rating: Optional[float] = None
    scheduled_time: Optional[datetime] = None
    notes: Optional[str] = None
    image_url: Optional[str] = None


class ActivityResponse(ActivityBase):
    id: int
    stop_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Budget Schemas
class BudgetBase(BaseModel):
    total_budget: float = 0.0
    transport_cost: float = 0.0
    accommodation_cost: float = 0.0
    food_cost: float = 0.0
    activities_cost: float = 0.0
    other_cost: float = 0.0
    currency: str = "USD"
    notes: Optional[str] = None


class BudgetCreate(BudgetBase):
    trip_id: int


class BudgetUpdate(BaseModel):
    total_budget: Optional[float] = None
    transport_cost: Optional[float] = None
    accommodation_cost: Optional[float] = None
    food_cost: Optional[float] = None
    activities_cost: Optional[float] = None
    other_cost: Optional[float] = None
    currency: Optional[str] = None
    notes: Optional[str] = None


class BudgetResponse(BudgetBase):
    id: int
    trip_id: int
    created_at: datetime
    updated_at: datetime

    class Config:
        from_attributes = True


# Auth Schemas
class Token(BaseModel):
    access_token: str
    token_type: str


class TokenData(BaseModel):
    username: Optional[str] = None


class LoginRequest(BaseModel):
    username: str
    password: str
