import { RouteObject } from "react-router";
import Dashboard from "./pages/Dashboard/Dashboard";

const routes: RouteObject[] = [
    {
        path: '/',
        //loader() { return true; },
        element: <Dashboard />
    },
];

export default routes;