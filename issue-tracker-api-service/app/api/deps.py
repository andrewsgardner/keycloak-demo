from typing import Annotated, Generator
from fastapi import Security, Depends, HTTPException, status
from fastapi.security import OAuth2AuthorizationCodeBearer
from sqlmodel import Session
from keycloak import KeycloakOpenID
from app.db.engine import engine
from app.models import TokenUser
from app.core.config import settings

oauth2_scheme = OAuth2AuthorizationCodeBearer(
    authorizationUrl = f"{settings.KC_SERVER_URL}/realms/{settings.KC_REALM}/protocol/openid-connect/auth",
    tokenUrl = f"{settings.KC_SERVER_URL}/realms/{settings.KC_REALM}/protocol/openid-connect/token"
)

keycloak_openid = KeycloakOpenID(
    server_url = settings.KC_SERVER_URL,
    client_id = settings.KC_CLIENT_ID,
    realm_name = settings.KC_REALM,
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
            detail = str(e),
            headers = {"WWW-Authenticate": "Bearer"},
        )

async def get_user_info(payload: dict = Depends(get_payload)) -> TokenUser:
    try:
        return TokenUser(
            id = payload.get("sub"),
            username = payload.get("preferred_username"),
            email = payload.get("email"),
            first_name = payload.get("given_name"),
            last_name = payload.get("family_name"),
            realm_roles = payload.get("realm_access", {}).get("roles", []),
            client_roles = payload.get("realm_access", {}).get("roles", [])
        )
    except Exception as e:
        raise HTTPException(
            status_code = status.HTTP_400_BAD_REQUEST,
            detail = str(e),
            headers = {"WWW-Authenticate": "Bearer"},
        )

def get_db() -> Generator:
    with Session(engine) as session:
        yield session

SessionDep = Annotated[Session, Depends(get_db)]

TokenDep = Annotated[str, Depends(get_user_info)]