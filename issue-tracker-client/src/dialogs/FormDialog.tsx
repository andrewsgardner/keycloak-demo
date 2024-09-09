import React, { useContext, useEffect } from 'react';

import './FormDialog.scss';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import FormFactory from '../components/FormFactory/FormFactory';
import { AppContext } from '../contexts/AppContext';
import { ReducerActionKind } from '../interfaces/reducer-state.interface';
import { FormDialogType } from '../enums/form-dialog-type.enum';
import { IFormConfig, IFormFields } from '../interfaces/form-config.interface';
import { FormType } from '../enums/form-type.enum';
import { FormDetails } from '../types/form-details.type';
import { IssuePriority } from '../enums/issue-priority.enum';
import { IUser } from '../interfaces/user.interface';

const FormDialog = () => {
    const appCtx = useContext(AppContext);
    const newProjectConfig = (onChange: (value: string, field: string) => void, formDetails: FormDetails): IFormConfig => ({
        grid: { xs: 12, },
        fields: [
            {
                label: 'Name',
                type: FormType.Text,
                required: true,
                pattern: '.',
                isValid: false,
                fieldName: 'project_name',
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value, 'project_name'),
                value: formDetails.value,
                errorFlag: false,
                errorMsg: 'Please enter a name.',
            }
        ],
        submitBtnLabel: 'Create Project',
        isFormValid: false,
    });
    const newIssueConfig = (onChange: (value: string, field: string) => void, formDetails: FormDetails): IFormConfig => {
        return {
            grid: { xs: 12, sm: 6, },
            fields: [
                {
                    label: 'Summary',
                    type: FormType.Text,
                    required: true,
                    pattern: '.',
                    isValid: false,
                    fieldName: 'issue_summary',
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value, 'issue_summary'),
                    value: formDetails.value,
                    errorFlag: false,
                    errorMsg: 'Please enter a summary.',
                },
                {
                    label: 'Description',
                    type: FormType.Textarea,
                    required: false,
                    isValid: true,
                    fieldName: 'issue_description',
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value, 'issue_description'),
                    value: formDetails.value,
                    errorFlag: false,
                    errorMsg: 'Please enter a description.',
                },
                {
                    label: 'Priority',
                    type: FormType.Select,
                    required: false,
                    isValid: true,
                    fieldName: 'issue_priority',
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value, 'issue_priority'),
                    defaultValue: IssuePriority.High,
                    value: formDetails.value,
                    options: Object.values(IssuePriority),
                    errorFlag: false,
                    errorMsg: 'Please select a priority.',
                },
                {
                    label: 'Assignee',
                    type: FormType.Select,
                    required: false,
                    isValid: true,
                    fieldName: 'assigned_to',
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value, 'assigned_to'),
                    defaultValue: appCtx.state.profile?.preferred_username,
                    value: formDetails.value,
                    options: appCtx.state.users.map((x: IUser) => x.username),
                    errorFlag: false,
                    errorMsg: 'Please select an assignee.',
                },
                {
                    label: 'Target Resolution Date',
                    type: FormType.Date,
                    required: false,
                    isValid: true,
                    fieldName: 'target_resolution_date',
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value, 'target_resolution_date'),
                    value: formDetails.value,
                    errorFlag: false,
                    errorMsg: 'Please enter a valid target resolution date.',
                },
            ],
            submitBtnLabel: 'Create Issue',
            isFormValid: false,
        };
    };
    const [formDetails, setFormDetails] = React.useState<FormDetails>({});
    const [formConfig, setFormConfig] = React.useState<IFormConfig>({
        grid: {},
        fields: [],
        submitBtnLabel: 'Create',
        isFormValid: false,
    });

    useEffect(() => {
        if (appCtx.state.formDialogStatus.type) {
            setFormConfig(getFormConfig(appCtx.state.formDialogStatus.type));
        }
    }, [appCtx.state.formDialogStatus.type]);

    useEffect(() => {
        const updateFormConfig: IFormConfig = formConfig;

        for (const i in formDetails) {
            const index: number = updateFormConfig.fields.findIndex((x: IFormFields) => x.fieldName === i);
            const required: boolean = updateFormConfig.fields[index].required;
            const pattern: string | undefined = updateFormConfig.fields[index].pattern;

            if (required && pattern) {
                updateFormConfig.fields[index].errorFlag = new RegExp(i).test(pattern);
                updateFormConfig.fields[index].isValid = !updateFormConfig.fields[index].errorFlag && formDetails[i].length > 0;
            }
        }
        
        updateFormConfig.isFormValid = updateFormConfig.fields.every((x: IFormFields) => x.isValid);
        setFormConfig((prev) => ({...prev, updateFormConfig}));
    }, [formConfig, formDetails]);

    const onChange = (value: string, dataLabel: string): void => {
        setFormDetails({
            ...formDetails,
            [dataLabel]: value,
        });
    };

    const handleUpdateFormDialogStatus = (): void => {
        appCtx.dispatch({
            type: ReducerActionKind.UPDATE_FORM_DIALOG_STATUS,
            payload: {
                type: null,
                isOpen: false,
            },
        });
    };

    const getFormConfig = (type: FormDialogType): IFormConfig => {
        switch (type) {
            case FormDialogType.Project:
                return newProjectConfig(onChange, formDetails);
            case FormDialogType.Issue:
                return newIssueConfig(onChange, formDetails);
            default:
                console.error(`Unknown FormDialogType: '${type}'`);
                return {
                    grid: {},
                    fields: [],
                    submitBtnLabel: 'Create',
                    isFormValid: false,
                }
        }
    };

    const getDialogTitle = (): string => {
        switch (appCtx.state.formDialogStatus.type) {
            case FormDialogType.Project:
                return 'New Project';
            case FormDialogType.Issue:
                return 'New Issue';
            default:
                return '';
        }
    };

    return (
        <Dialog
            open={appCtx.state.formDialogStatus.isOpen}
            onClose={handleUpdateFormDialogStatus}
            aria-labelledby="form-dialog-title"
            aria-describedby="form-dialog-description">
            <DialogTitle id="alert-dialog-title">{getDialogTitle()}</DialogTitle>
            <DialogContent>
                <form>
                    <FormFactory {...formConfig} />
                </form>
            </DialogContent>
        </Dialog>
    );
};

export default FormDialog;