from typing import Annotated, Generator
from fastapi import Security, Depends, HTTPException, status
from fastapi.security import OAuth2AuthorizationCodeBearer
from sqlmodel import Session
from keycloak import KeycloakOpenID
from app.db.engine import engine
from app.models import User

oauth2_scheme = OAuth2AuthorizationCodeBearer(
    authorizationUrl="http://localhost:8080/realms/demo/protocol/openid-connect/auth",
    tokenUrl="http://localhost:8080/realms/demo/protocol/openid-connect/token"
)

keycloak_openid = KeycloakOpenID(
    server_url="http://localhost:8080",
    client_id="blog-api",
    realm_name="demo",
    # client_secret_key=settings.client_secret,
    verify=True
)

async def get_idp_public_key():
    return (
        "-----BEGIN PUBLIC KEY-----\n"
        f"{keycloak_openid.public_key()}"
        "\n-----END PUBLIC KEY-----"
    )

async def get_payload(token: str = Security(oauth2_scheme)) -> dict:
    try:
        return keycloak_openid.decode_token(
            token,
            key = await get_idp_public_key(),
            options = {
                "verify_signature": True,
                "verify_aud": False,
                "exp": True
            }
        )
    except Exception as e:
        raise HTTPException(
            status_code = status.HTTP_401_UNAUTHORIZED,
            detail = str(e), # "Invalid authentication credentials",
            headers = {"WWW-Authenticate": "Bearer"},
        )

async def get_user_info(payload: dict = Depends(get_payload)) -> User:
    try:
        return User(
            id = payload.get("sub"),
            username = payload.get("preferred_username"),
            email = payload.get("email"),
            last_name = payload.get("family_name"),
            realm_roles = payload.get("realm_access", {}).get("roles", []),
            client_roles = payload.get("realm_access", {}).get("roles", [])
        )
    except Exception as e:
        raise HTTPException(
            status_code = status.HTTP_400_BAD_REQUEST,
            detail = str(e), # "Invalid authentication credentials",
            headers = {"WWW-Authenticate": "Bearer"},
        )

def get_db() -> Generator:
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_db)]