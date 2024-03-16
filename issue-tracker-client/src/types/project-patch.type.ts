import { IProject } from "../interfaces/project.interface";

export type ProjectPatch = Pick<IProject, "id" | "project_name" | "modified_by">;