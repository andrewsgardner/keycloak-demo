import { RouteObject } from "react-router";
import ProjectList from "./pages/ProjectList/ProjectList";
import ProjectDetail from "./pages/ProjectDetail/ProjectDetail";
import IssueList from "./pages/IssueList/IssueList";
import IssueDetail from "./pages/IssueDetail/IssueDetail";
import { redirect } from "react-router-dom";

const routes: RouteObject[] = [
    {
        path: '/',
        loader() { 
            return redirect('projects'); 
        }
    },
    {
        path: 'projects',
        //loader() { return true; },
        element: <ProjectList />
    },
    {
        path: 'projects/:id',
        //loader() { return true; },
        element: <ProjectDetail />
    },
    {
        path: 'issues',
        //loader() { return true; },
        element: <IssueList />,
    },
    {
        path: 'issues/:id',
        //loader() { return true; },
        element: <IssueDetail />
    }
];

export default routes;