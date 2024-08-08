import React, { useContext, useEffect } from 'react';

import './FormDialog.scss';
import { Dialog, DialogContent, DialogTitle } from '@mui/material';
import FormFactory from '../components/FormFactory/FormFactory';
import { AppContext } from '../contexts/AppContext';
import { ReducerActionKind } from '../interfaces/reducer-state.interface';
import { FormDialogType } from '../enums/form-dialog-type.enum';
import { IFormConfig } from '../interfaces/form-config.interface';
import { FormType } from '../enums/form-type.enum';
import { FormDetails } from '../types/form-details.type';

const FormDialog = () => {
    const appCtx = useContext(AppContext);
    const newProjectConfig = (onChange: (value: string, field: string) => void, formDetails: FormDetails): IFormConfig => ({
        grid: { xs: 12, },
        fields: [
            {
                label: 'Name',
                type: FormType.Text,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value, 'project_name'),
                value: formDetails.value,
                errorFlag: false,
                errorMsg: 'Please enter a name.',
            }
        ],
    });
    const newIssueConfig = (onChange: (value: string, field: string) => void, formDetails: FormDetails): IFormConfig => {
        return {
            grid: { xs: 12, sm: 6, },
            fields: [
                {
                    label: 'Summary',
                    type: FormType.Text,
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value, 'issue_summary'),
                    value: formDetails.value,
                    errorFlag: false,
                    errorMsg: 'Please enter a summary.',
                },
                {
                    label: 'Description',
                    type: FormType.Text, // TODO: change to textarea type...
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value, 'issue_description'),
                    value: formDetails.value,
                    errorFlag: false,
                    errorMsg: 'Please enter a description.',
                },
                {
                    label: 'Priority',
                    type: FormType.Text, // TODO: change to select type...
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value, 'issue_priority'),
                    value: formDetails.value,
                    errorFlag: false,
                    errorMsg: 'Please select a priority.',
                },
                {
                    label: 'assignee',
                    type: FormType.Text, // TODO: change to select type...
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value, 'assigned_to'),
                    value: formDetails.value,
                    errorFlag: false,
                    errorMsg: 'Please select an assignee.',
                },
                {
                    label: 'Target Resolution Date',
                    type: FormType.Text, // TODO: change to date type...
                    onChange: (e: React.ChangeEvent<HTMLInputElement>) => onChange(e.target.value, 'target_resolution_date'),
                    value: formDetails.value,
                    errorFlag: false,
                    errorMsg: 'Please enter a target resolution date.',
                },
            ],
        };
    };
    const [formDetails, setFormDetails] = React.useState<FormDetails>({});
    const [formConfig, setFormConfig] = React.useState<IFormConfig>({
        grid: {},
        fields: [],
    });

    useEffect(() => {
        if (appCtx.state.formDialogStatus.type) {
            setFormConfig(getFormConfig(appCtx.state.formDialogStatus.type));
        }
    }, [appCtx.state.formDialogStatus.type]);

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