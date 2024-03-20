import { RouteObject } from "react-router";
import ProjectList from "./pages/ProjectList/ProjectList";
import ProjectDetail from "./pages/ProjectDetail/ProjectDetail";

const routes: RouteObject[] = [
    {
        path: '/',
        //loader() { return true; },
        element: <ProjectList />
    },
    {
        path: 'projects/:id',
        //loader() { return true; },
        element: <ProjectDetail />
    }
];

export default routes;