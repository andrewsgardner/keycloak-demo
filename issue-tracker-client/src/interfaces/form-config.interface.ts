import { FormType } from "../enums/form-type.enum";

export interface IFormFields {
    label: string;
    type: FormType;
    onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    value: string;
    options?: string[] | undefined;
    errorFlag: boolean;
    errorMsg: string;
}

export interface IFormConfig {
    grid: Object;
    fields: IFormFields[];
}