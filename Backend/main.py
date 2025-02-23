from typing import Optional, List, Dict, Any
from pydantic import BaseModel, Field
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from typing import List, Optional
import firebase_admin
from firebase_admin import credentials, firestore

# Initialize Firebase Admin SDK with your service account
cred = credentials.Certificate(
    "./jobssite-c0d81-firebase-adminsdk-fbsvc-d971f1e7ea.json")
firebase_admin.initialize_app(cred)
db = firestore.client()

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Adjust allowed origins as needed
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Define the Job model


class Job(BaseModel):
    id: Optional[str] = None
    logo: str
    title: str
    company: str
    description: str
    workLocation: str
    employmentType: str
    careerLevel: str
    custom_questions: List[Dict[str, Any]] = Field(default_factory=list)

# Create a new job


@app.post("/jobs", response_model=Job)
def create_job(job: Job):
    doc_ref = db.collection('jobs').document()
    job.id = doc_ref.id
    # Store the job data including custom_questions; we exclude the id since it's auto-assigned.
    doc_ref.set(job.dict(exclude={"id"}))
    return job


# Get all jobs


@app.get("/jobs", response_model=List[Job])
def get_jobs():
    jobs_ref = db.collection('jobs')
    docs = jobs_ref.stream()
    jobs = []
    for doc in docs:
        job_data = doc.to_dict()
        job_data["id"] = doc.id
        jobs.append(job_data)
    return jobs


# Get a single job by id


@app.get("/jobs/{job_id}", response_model=Job)
def get_job(job_id: str):
    doc_ref = db.collection('jobs').document(job_id)
    doc = doc_ref.get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Job not found")
    job_data = doc.to_dict()
    job_data["id"] = doc.id
    return job_data

# Delete a job by id


@app.delete("/jobs/{job_id}")
def delete_job(job_id: str):
    doc_ref = db.collection('jobs').document(job_id)
    doc = doc_ref.get()
    if not doc.exists:
        raise HTTPException(status_code=404, detail="Job not found")
    doc_ref.delete()
    return {"message": "Job deleted successfully."}
