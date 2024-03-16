import { IProject } from "../interfaces/project.interface";

export type ProjectCreate = Pick<IProject, "project_name" | "created_by">;