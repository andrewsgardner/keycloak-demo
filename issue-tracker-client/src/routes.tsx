import { RouteObject } from "react-router";
import ProjectList from "./components/ProjectList/ProjectList";

const routes: RouteObject[] = [
    {
        path: '/',
        //loader() { return true; },
        element: <ProjectList />
    },
];

export default routes;