from sqlalchemy import create_engine
from sqlalchemy.orm import DeclarativeBase, sessionmaker

DATABASE_URL = 'sqlite:///./support_crm.db'

engine = create_engine(DATABASE_URL)

sessionlocal = sessionmaker(
    autoflush=False,
    autocommit = False,
    bind=engine
)

class Base(DeclarativeBase) :
    pass


def get_db():
    with sessionlocal() as db:
        yield db