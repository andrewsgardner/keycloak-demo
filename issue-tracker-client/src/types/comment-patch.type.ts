import { IComment } from "../interfaces/comment.interface";

export type CommentPatch = Pick<IComment, "id" | "comment_text">;