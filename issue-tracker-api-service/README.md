# Issue Tracker API Service

A FastAPI server for the Issue Tracker Client.

## Requirements

- Python 3.11.2

## Environment Variables

| Name   | Type |
|--------|-----|
| SERVER_HOST | str |
| SERVER_PORT | int |
| POSTGRES_SERVER | str |
| POSTGRES_USER | str |
| POSTGRES_PASSWORD | str |
| POSTGRES_DB | str |
| KC_SERVER_URL | str |
| KC_AUTH_URL | str |
| KC_TOKEN_URL | str |
| KC_CLIENT_ID | str |
| KC_REALM | str |

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
uvicorn main:app --reload --port 9000
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