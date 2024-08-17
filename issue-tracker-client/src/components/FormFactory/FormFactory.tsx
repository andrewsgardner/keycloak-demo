import './FormFactory.scss';
import { FormControl, FormHelperText, InputLabel, MenuItem, Select, TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { FormType } from '../../enums/form-type.enum';
import { IFormConfig, IFormFields } from '../../interfaces/form-config.interface';

const FormFactory = (props: IFormConfig) => {
    const getField = (field: IFormFields, index: number): JSX.Element | undefined => {
        switch (field.type) {
            case FormType.Text:
                return (
                    <TextField
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
                            error={field.errorFlag}
                            labelId={`form-factory-select-${index}-label`}
                            label={field.label}
                            value={field.value}
                            size="small"
                            margin="dense"
                            onChange={() => field.onChange}>
                                {field.options?.map((value: string, index: number) => (
                                    <MenuItem key={index} value={value}>{value}</MenuItem>
                                ))}
                        </Select>
                        {field.errorFlag ? <FormHelperText>{field.errorMsg}</FormHelperText> : null}
                    </FormControl>
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
        </Grid>
    );
};

export default FormFactory;