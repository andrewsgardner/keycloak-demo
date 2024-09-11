import { FormType } from "../enums/form-type.enum";

export interface IFormFields {
    label: string;
    type: FormType;
    required: boolean;
    fieldName: string;
    pattern?: string;
    isValid: boolean;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    defaultValue?: string | undefined;
    value: string;
    options?: string[] | undefined;
    errorFlag: boolean;
    errorMsg: string;
}

export interface IFormConfig {
    grid: Object;
    fields: IFormFields[];
    submitBtnLabel: string;
    isFormValid: boolean;
    onSubmit?: (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}