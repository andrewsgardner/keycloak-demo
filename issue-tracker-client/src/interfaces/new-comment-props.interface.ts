import { IUser } from "./user.interface";

export interface INewCommentProps {
    authUser: IUser;
    onNewComment: (comment_text: string) => void;
    onCloseIssue: (resolution_summary: string) => void;
}