export interface ICommentProps {
    comment_text: string;
    onCommentChange: (update: string) => void;
}