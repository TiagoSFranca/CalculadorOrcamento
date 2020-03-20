import { IconButton, InputAdornment } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import CustomController, { Props as CustomControllerProps } from 'components/common/hookForm/customController/CustomControllerComponent';
import React, { useState } from 'react';
import { ErrorMessage, FieldErrors, FieldValues } from "react-hook-form";

type Props = CustomControllerProps & {
    hasError: boolean;
    label: string;
    errors: FieldErrors<FieldValues>;
    inputRef?: React.Ref<any>;
    mostrarSenha: boolean;
}

const PasswordInputComponent = (props: Props) => {

    const { hasError, label, name, errors, inputRef, mostrarSenha } = props;

    const [showSenha, setShowSenha] = useState(false);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    const controller = { ...props, as: "string", hasError: undefined, label: undefined, errors: undefined, inputRef: undefined, mostrarSenha: undefined };

    delete controller.as;
    delete controller.hasError;
    delete controller.label;
    delete controller.errors;
    delete controller.inputRef;
    delete controller.mostrarSenha

    return (<>
        <CustomController
            as={
                <TextField label={label} error={hasError ? true : false}
                    autoComplete='new-password'
                    fullWidth
                    type={showSenha ? 'text' : 'password'}
                    helperText={
                        <ErrorMessage errors={errors} name={name} >
                            {({ message }) => message}
                        </ErrorMessage>
                    }
                    InputProps={{
                        endAdornment: mostrarSenha && (
                            <InputAdornment position="end">
                                <IconButton
                                    aria-label="toggle password visibility"
                                    onClick={() => setShowSenha(!showSenha)}
                                    onMouseDown={handleMouseDownPassword}
                                >
                                    {showSenha ? <Visibility /> : <VisibilityOff />}
                                </IconButton>
                            </InputAdornment>)
                    }}
                    inputProps={{
                        autoComplete: 'new-password',
                    }}
                    inputRef={inputRef}
                />
            }
            {...controller}
        />
    </>);
}

export default PasswordInputComponent;