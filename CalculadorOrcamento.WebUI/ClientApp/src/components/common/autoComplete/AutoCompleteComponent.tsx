import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import Autocomplete, { RenderOptionState } from '@material-ui/lab/Autocomplete';
import React, { ChangeEvent } from 'react';

type Props<T extends object> = {
    dados: T[];
    loading: boolean;
    onKeyPress: (value: string) => void;
    getOptionLabel: (item: T) => string;
    getOptionSelected: (option: T, value: T) => boolean;
    renderOption: (option: T, state: RenderOptionState) => React.ReactNode;
    error: boolean;
    helperText?: React.ReactNode;
    onSelect: (value: T | null) => void;
}

function AutoCompleteComponent<T extends object>(props: Props<T>) {
    const {
        loading, dados,
        onKeyPress, getOptionLabel,
        getOptionSelected, renderOption,
        error, helperText, onSelect
    } = props;

    const [open, setOpen] = React.useState(false);

    const handleOnInputChange = (event: object, value: string, reason: string) => {
        if (value && reason === "input") {
            onKeyPress(value)
        }
    }

    const handleOnChange = (event: ChangeEvent<{}>, value: T | null) => {
        onSelect(value);
    }

    return (
        <Autocomplete
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionSelected={getOptionSelected}
            getOptionLabel={getOptionLabel}
            options={dados}
            loading={loading}
            onInputChange={handleOnInputChange}
            renderOption={renderOption}
            noOptionsText="Nenhum resultado encontrado."
            onChange={handleOnChange}
            renderInput={params => (
                <TextField
                    error={error}
                    {...params}
                    label="Usuário"
                    fullWidth
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                    helperText={helperText ? helperText : ''}
                />
            )}
        />
    );
}

export default AutoCompleteComponent;