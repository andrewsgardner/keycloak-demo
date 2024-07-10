import { CommentPatch } from "../types/comment-patch.type";

export interface ICommentProps {
    id: string;
    authUsername: string;
    userid: string;
    modified_date: string;
    comment_text: string;
    onCommentChange: (update: CommentPatch) => void;
    onCommentDelete: (id: string) => void;
}