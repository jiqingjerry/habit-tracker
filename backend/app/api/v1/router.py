"""
Main API v1 router that combines all endpoint routers
"""

from fastapi import APIRouter

from app.api.v1 import activities

api_router = APIRouter()

# Include all sub-routers
api_router.include_router(activities.router, prefix="/activities", tags=["activities"])
