# Issue Tracker API Service

A FastAPI server for the Issue Tracker Client.

## Requirements

- Python 3.11.2

## Run Local

### Setup virtual environment

```
python3 -m venv venv
source venv/bin/activate
```

### Install dependencies

```
pip3 install -r requirements.txt
```

### Run server

```
uvicorn app.main:app --reload --port 9000
```

## Run With Docker

### Run server

```
// From project root
docker-compose build --no-cache issue-tracker-api-service
docker-compose up -d
```

## API documentation (provided by Swagger UI)

```
http://localhost:8000/docs
```