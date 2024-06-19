export interface ICommentProps {
    id: string;
    userid: string;
    modified_date: string;
    comment_text: string;
    onCommentChange: (update: string) => void;
}