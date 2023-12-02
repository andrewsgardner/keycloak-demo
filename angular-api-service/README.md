# Angular API Service

A FastAPI server for Angular Client.

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
uvicorn app.main:app --reload
```

## API documentation (provided by Swagger UI)

```
http://localhost:8000/docs
```