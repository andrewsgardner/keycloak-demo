export interface IIssueDescriptionProps {
    issue_description: string | null;
    onIssueDescriptionChange: (update: string | null) => void;
}