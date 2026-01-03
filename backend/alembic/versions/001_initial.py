"""Initial migration

Revision ID: 001
Revises: 
Create Date: 2026-01-03

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '001'
down_revision = None
branch_labels = None
depends_on = None


def upgrade() -> None:
    # This will be auto-generated when you run:
    # alembic revision --autogenerate -m "Initial migration"
    pass


def downgrade() -> None:
    pass
