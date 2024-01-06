import { SetPostAction } from "../enums/set-post-action.enum";
import { IPost } from "./post.interface";

export interface ISetPost {
    action: SetPostAction;
    payload: IPost;
}