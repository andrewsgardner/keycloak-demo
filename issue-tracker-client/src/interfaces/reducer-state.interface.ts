import { PaletteMode } from "@mui/material";
import { UserProfile } from "oidc-client-ts";

export enum ReducerActionKind {
    UPDATE_COLOR_MODE = 'UPDATE_COLOR_MODE',
    UPDATE_PROFILE = 'UPDATE_PROFILE',
    UPDATE_ACCESS_TOKEN = 'UPDATE_ACCESS_TOKEN',
    UPDATE_ACCESS_TOKEN_PARSED = 'UPDATE_ACCESS_TOKEN_PARSED',
    UPDATE_ID_TOKEN_PARSED = 'UPDATE_ID_TOKEN_PARSED',
    UPDATE_REFRESH_TOKEN_PARSED = 'UPDATE_REFRESH_TOKEN_PARSED',
    UPDATE_ROLES = 'UPDATE_ROLES',
}

export interface IReducerState {
    colorMode: PaletteMode;
    profile: UserProfile | undefined;
    accessToken: string | undefined;
    accessTokenParsed: any;
    idTokenParsed: any;
    refreshTokenParsed: any;
    roles: string[];
}

export interface IReducerAction {
    type: ReducerActionKind;
    payload: any;
}