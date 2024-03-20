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
        children: [
            {
                index: true,
                //loader() { return true; },
                element: <ProjectList />
            },
            {
                path: ':id',
                //loader() { return true; },
                element: <ProjectDetail />
            }
        ]
    },
    {
        path: 'issues',
        children: [
            {
                index: true,
                //loader() { return true; },
                element: <IssueList />
            },
            {
                path: ':id',
                //loader() { return true; },
                element: <IssueDetail />
            }
        ]
    }
];

export default routes;