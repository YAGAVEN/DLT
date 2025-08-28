
from dotenv import load_dotenv
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker, declarative_base
<<<<<<< HEAD
from dotenv import load_dotenv
=======
>>>>>>> 021d8933522b0a97177ebcdf22e1a4837b27798b
import os

load_dotenv()

<<<<<<< HEAD
DATABASE_URL = os.getenv("DATABASE_URL")
engine = create_engine(DATABASE_URL)
=======
DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "mysql+pymysql://root:05252005@localhost:3306/document_tracker",
)

engine = create_engine(DATABASE_URL, pool_pre_ping=True)
>>>>>>> 021d8933522b0a97177ebcdf22e1a4837b27798b
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()
