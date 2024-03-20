import { RouteObject } from "react-router";
import ProjectList from "./pages/ProjectList/ProjectList";

const routes: RouteObject[] = [
    {
        path: '/',
        //loader() { return true; },
        element: <ProjectList />
    },
];

export default routes;