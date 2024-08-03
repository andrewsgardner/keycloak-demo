import { FormDialogType } from "../enums/form-dialog-type.enum";

export interface IFormDialogStatus {
    type: FormDialogType | null,
    isOpen: boolean;
}