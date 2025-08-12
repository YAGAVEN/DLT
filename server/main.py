from fastapi import FastAPI, HTTPException, Depends
from sqlalchemy.orm import Session
from typing import List
from pydantic import BaseModel
from server import models
from server.database import SessionLocal, engine

# Create database tables
models.Base.metadata.create_all(bind=engine)

app = FastAPI()

# Dependency to get a DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ---------------------- Pydantic Schemas ----------------------

# User Schemas
class UserBase(BaseModel):
    name: str
    mobile_number: str
    email: str
    password_hash: str  # storing plain text

class UserDisplay(BaseModel):
    user_id: int
    name: str
    mobile_number: str
    email: str
    password_hash: str

    class Config:
        from_attributes = True  # replaces orm_mode in Pydantic v2

# Document Schemas
class DocumentBase(BaseModel):
    user_id: int
    document_type: str
    expiry_date: str  # using str to allow "YYYY-MM-DD" format

class DocumentDisplay(BaseModel):
    doc_id: int
    user_id: int
    document_type: str
    expiry_date: str

    class Config:
        from_attributes = True

# ---------------------- USERS CRUD ----------------------

@app.post("/users/", response_model=UserDisplay)
def create_user(user: UserBase, db: Session = Depends(get_db)):
    # Check for duplicate email
    existing_user = db.query(models.User).filter(models.User.email == user.email).first()
    if existing_user:
        raise HTTPException(status_code=400, detail="Email already registered")

    db_user = models.User(
        name=user.name,
        mobile_number=user.mobile_number,
        email=user.email,
        password_hash=user.password_hash
    )
    db.add(db_user)
    db.commit()
    db.refresh(db_user)
    return db_user

@app.get("/users/", response_model=List[UserDisplay])
def get_users(db: Session = Depends(get_db)):
    return db.query(models.User).all()

@app.get("/users/{user_id}", response_model=UserDisplay)
def get_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    return db_user

@app.put("/users/{user_id}", response_model=UserDisplay)
def update_user(user_id: int, user: UserBase, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")

    # db_user.name = user.name
    # db_user.mobile_number = user.mobile_number
    # db_user.email = user.email
    db_user.password_hash = user.password_hash
    db.commit()
    db.refresh(db_user)
    return db_user
@app.delete("/users/{user_id}")
def delete_user(user_id: int, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.user_id == user_id).first()
    if not db_user:
        raise HTTPException(status_code=404, detail="User not found")
    db.delete(db_user)
    db.commit()
    return {"detail": "User deleted successfully"}

# ---------------------- DOCUMENTS CRUD ----------------------

@app.post("/documents/", response_model=DocumentDisplay)
def create_document(document: DocumentBase, db: Session = Depends(get_db)):
    # Optional: check if user exists before adding document
    user_exists = db.query(models.User).filter(models.User.user_id == document.user_id).first()
    if not user_exists:
        raise HTTPException(status_code=400, detail="User does not exist")

    db_doc = models.Document(
        user_id=document.user_id,
        document_type=document.document_type,
        expiry_date=document.expiry_date
    )
    db.add(db_doc)
    db.commit()
    db.refresh(db_doc)
    return db_doc

@app.get("/documents/", response_model=List[DocumentDisplay])
def get_documents(db: Session = Depends(get_db)):
    return db.query(models.Document).all()

@app.get("/documents/{doc_id}", response_model=DocumentDisplay)
def get_document(doc_id: int, db: Session = Depends(get_db)):
    db_doc = db.query(models.Document).filter(models.Document.doc_id == doc_id).first()
    if not db_doc:
        raise HTTPException(status_code=404, detail="Document not found")
    return db_doc

@app.put("/documents/{doc_id}", response_model=DocumentDisplay)
def update_document(doc_id: int, document: DocumentBase, db: Session = Depends(get_db)):
    db_doc = db.query(models.Document).filter(models.Document.doc_id == doc_id).first()
    if not db_doc:
        raise HTTPException(status_code=404, detail="Document not found")

    db_doc.user_id = document.user_id
    db_doc.document_type = document.document_type
    db_doc.expiry_date = document.expiry_date
    db.commit()
    db.refresh(db_doc)
    return db_doc

@app.delete("/documents/{doc_id}")
def delete_document(doc_id: int, db: Session = Depends(get_db)):
    db_doc = db.query(models.Document).filter(models.Document.doc_id == doc_id).first()
    if not db_doc:
        raise HTTPException(status_code=404, detail="Document not found")
    db.delete(db_doc)
    db.commit()
    return {"detail": "Document deleted successfully"}
