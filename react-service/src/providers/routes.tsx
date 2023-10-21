import { RouteObject } from "react-router";
import TokenViz from "../components/TokenViz/TokenViz";
import { useKeycloak } from "@react-keycloak/web";

const routes: RouteObject[] = [
    {
        path: '/',
        //loader() { return true; },
        element: <TokenViz />
    },
];

export default routes;