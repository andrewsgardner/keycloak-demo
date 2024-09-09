import './FormFactory.scss';
import { ChangeEvent } from 'react';
import { DateTime } from 'luxon';
import { Button, FormControl, FormHelperText, InputLabel, MenuItem, Select, SelectChangeEvent, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterLuxon } from '@mui/x-date-pickers/AdapterLuxon';
import Grid from '@mui/material/Unstable_Grid2';
import { FormType } from '../../enums/form-type.enum';
import { IFormConfig, IFormFields } from '../../interfaces/form-config.interface';

const FormFactory = (props: IFormConfig) => {
    const getField = (field: IFormFields, index: number): JSX.Element | undefined => {
        switch (field.type) {
            case FormType.Text:
                return (
                    <TextField
                        required={field.required}
                        error={field.errorFlag}
                        label={field.label}
                        value={field.value}
                        helperText={field.errorFlag ? field.errorMsg : null}
                        size="small"
                        margin="dense"
                        sx={{ display: 'flex' }}
                        onChange={field.onChange} />
                );
            case FormType.Textarea:
                return (
                    <TextField
                        multiline
                        rows={3}
                        required={field.required}
                        error={field.errorFlag}
                        label={field.label}
                        value={field.value}
                        helperText={field.errorFlag ? field.errorMsg : null}
                        size="small"
                        margin="dense"
                        sx={{ display: 'flex' }}
                        onChange={field.onChange} />
                );
            case FormType.Select:
                return (
                    <FormControl 
                        size="small"
                        sx={{ 
                            display: 'flex',
                            margin: '8px 0 4px 0',
                        }}>
                        <InputLabel id={`form-factory-select-${index}-label`}>{field.label}</InputLabel>
                        <Select
                            required={field.required}
                            error={field.errorFlag}
                            labelId={`form-factory-select-${index}-label`}
                            label={field.label}
                            defaultValue={field.defaultValue}
                            value={field.value}
                            size="small"
                            margin="dense"
                            onChange={(e: SelectChangeEvent<string>) => field.onChange(e as ChangeEvent<HTMLInputElement>)}>
                                {field.options?.map((value: string, index: number) => (
                                    <MenuItem key={index} value={value}>{value}</MenuItem>
                                ))}
                        </Select>
                        {field.errorFlag ? <FormHelperText>{field.errorMsg}</FormHelperText> : null}
                    </FormControl>
                );
            case FormType.Date:
                return (
                    <LocalizationProvider dateAdapter={AdapterLuxon}>
                        <DatePicker 
                            label={field.label}
                            defaultValue={DateTime.fromISO(new Date().toISOString().substring(0, 10))}
                            value={DateTime.fromISO(field.value)}
                            slotProps={{
                                textField: {
                                    required: field.required,
                                    error: field.errorFlag,
                                    helperText: field.errorFlag ? field.errorMsg : null,
                                    size: "small",
                                    margin: "dense",
                                },
                            }}
                            sx={{ display: 'flex' }}
                            onChange={(e: DateTime<true> | DateTime<false> | null) => {
                                return field.onChange({target: {value: e?.toString().substring(0, 10)}} as ChangeEvent<HTMLInputElement>);
                            }} />
                    </LocalizationProvider>
                );
            default:
                return;
        }
    };
    
    return (
        <Grid
            container
            spacing={2}>
            {props.fields.map((f: IFormFields, i: number) => (
                <Grid key={i} {...props.grid}>
                    {getField(f, i)}
                </Grid>
            ))}
            <Grid xs={12}>
                <Button
                    fullWidth
                    disabled={!props.isFormValid}
                    variant="contained">
                    {props.submitBtnLabel}
                </Button>
            </Grid>
        </Grid>
    );
};

export default FormFactory;