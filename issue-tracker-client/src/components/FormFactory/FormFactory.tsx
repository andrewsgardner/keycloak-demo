import './FormFactory.scss';
import { TextField } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { FormType } from '../../enums/form-type.enum';
import { IFormConfig, IFormFields } from '../../interfaces/form-config.interface';

const FormFactory = (props: IFormConfig) => {
    const getField = (field: IFormFields): JSX.Element | undefined => {
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
                        onChange={field.onChange} />
                );
            default:
                return;
        }
    };
    
    return (
        <Grid
            container
            spacing={2}>
            {props.fields.map((f: IFormFields, index: number) => (
                <Grid key={index} {...props.grid}>
                    {getField(f)}
                </Grid>
            ))}
        </Grid>
    );
};

export default FormFactory;