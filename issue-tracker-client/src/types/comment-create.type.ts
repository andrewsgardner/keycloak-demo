import { IComment } from "../interfaces/comment.interface";

export type CommentCreate = Pick<IComment, "comment_text" | "related_issue_id" | "userid">;