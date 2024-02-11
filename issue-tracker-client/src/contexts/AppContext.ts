import React from "react";
import { IReducerState } from "../interfaces/reducer-state.interface";

export interface IAppContextSchema {
    state: IReducerState;
    dispatch: React.Dispatch<any>;
}

export const AppContext = React.createContext<IAppContextSchema>({} as IAppContextSchema);