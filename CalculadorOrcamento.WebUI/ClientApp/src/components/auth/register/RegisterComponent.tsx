﻿import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import appActions from 'actions/appActions';
import authActions from 'actions/authActions';
import CustomController from 'components/common/hookForm/customController/CustomControllerComponent';
import LoadingButton from 'components/common/loadingButton/LoadingButtonComponent';
import React, { useRef } from 'react';
import { ErrorMessage, useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { ApplicationState } from 'store';
import { CadastrarUsuario } from 'store/auth/models';
import { maxLengthMessage, minLengthMessage, requiredMessage } from 'utils/hooksValidations';
import messages from 'utils/messages';
import { ISnackBarType } from 'utils/snackBar';
import PasswordInputComponent from '../../common/hookForm/passwordInput/PasswordInputComponent';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        paper: {
            marginTop: theme.spacing(8),
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
        avatar: {
            margin: theme.spacing(1),
            backgroundColor: theme.palette.secondary.main,
        },
        marginBottom: {
            marginBottom: theme.spacing(3)
        }
    }));

type RegisterForm = {
    nome: string;
    sobrenome: string;
    email: string;
    login: string;
    senha: string;
    confirmarSenha: string;
    [key: string]: string;
}

const RegisterComponent = (props: any) => {
    const classes = useStyles();

    const authStore = useSelector((s: ApplicationState) => s.auth);
    const { isLoading } = authStore;

    const { control, errors, handleSubmit, register, watch, setValue, triggerValidation } = useForm<RegisterForm>({
        mode: 'onChange'
    });

    const dispatch = useDispatch();

    const callback = (error: any) => {
        if (error) {
            dispatch(appActions.showSnackBarAction(null, error))
        }
        else {
            dispatch(appActions.showSnackBarAction({ message: messages.OPERACAO_SUCESSO, type: ISnackBarType.sucesso, title: messages.TITULO_SUCESSO }));
            props.history.push('/login');
        }
    }

    const onSubmit = (data: any) => {
        dispatch(authActions.cadastrarUsuario(data as CadastrarUsuario, callback));
    };

    const password = useRef({});
    password.current = watch("senha", "");

    const checkPassword = (value: any) => {
        return password.current && value && value === password.current
    }

    return (
        <>
            <Grid container justify="center" spacing={3} className={classes.paper}>
                <Grid item xs={12} lg={6} sm={8} xl={4}>
                    <Grid container justify="center" alignContent="center" alignItems="center" direction="column" className={classes.marginBottom}>
                        <Grid>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                        </Grid>
                        <Grid>
                            <Typography component="h1" variant="h5">Cadastre-se</Typography>
                        </Grid>
                    </Grid>
                    <form noValidate onSubmit={handleSubmit(onSubmit)}>
                        <Grid container justify="center" spacing={3}>
                            <Grid item xs={5}>
                                <CustomController
                                    as={
                                        <TextField label="Nome" error={errors.nome ? true : false}
                                            fullWidth
                                            helperText={
                                                <ErrorMessage errors={errors} name="nome" >
                                                    {({ message }) => message}
                                                </ErrorMessage>
                                            }
                                        />
                                    }
                                    name="nome"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: requiredMessage(),
                                        maxLength: maxLengthMessage(64),
                                        minLength: minLengthMessage(3),
                                    }}
                                    watch={watch}
                                    setValue={setValue}
                                    triggerValidation={triggerValidation}
                                    trim="ALL" />
                            </Grid>
                            <Grid item xs={7}>
                                <CustomController
                                    as={
                                        <TextField label="Sobrenome" error={errors.sobrenome ? true : false}
                                            fullWidth
                                            helperText={
                                                <ErrorMessage errors={errors} name="sobrenome" >
                                                    {({ message }) => message}
                                                </ErrorMessage>
                                            }
                                        />
                                    }
                                    name="sobrenome"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: requiredMessage(),
                                        maxLength: maxLengthMessage(256)
                                    }}
                                    watch={watch}
                                    setValue={setValue}
                                    triggerValidation={triggerValidation}
                                    trim="ALL" />
                            </Grid>
                            <Grid item xs={7}>
                                <CustomController
                                    as={
                                        <TextField label="E-mail" error={errors.email ? true : false}
                                            fullWidth
                                            helperText={
                                                <ErrorMessage errors={errors} name="email" >
                                                    {({ message }) => message}
                                                </ErrorMessage>
                                            }
                                        />
                                    }
                                    name="email"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: requiredMessage(),
                                        maxLength: maxLengthMessage(256),
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                                            message: "E-mail inválido"
                                        }

                                    }}
                                    watch={watch}
                                    setValue={setValue}
                                    triggerValidation={triggerValidation}
                                    trim="ALL" />
                            </Grid>
                            <Grid item xs={5}>
                                <CustomController
                                    as={
                                        <TextField label="Login" error={errors.login ? true : false}
                                            fullWidth
                                            helperText={
                                                <ErrorMessage errors={errors} name="login" >
                                                    {({ message }) => message}
                                                </ErrorMessage>
                                            }
                                        />
                                    }
                                    name="login"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: requiredMessage(),
                                        maxLength: maxLengthMessage(64),
                                        minLength: minLengthMessage(5),
                                        pattern: {
                                            value: /^\S*$/i,
                                            message: "Não pode conter espaços em branco"
                                        }
                                    }}
                                    watch={watch}
                                    setValue={setValue}
                                    triggerValidation={triggerValidation}
                                    trim="ALL" />
                            </Grid>
                            <Grid item xs={6}>
                                <PasswordInputComponent
                                    label="Senha"
                                    errors={errors}
                                    name="senha"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: requiredMessage(),
                                        maxLength: maxLengthMessage(64),
                                        minLength: minLengthMessage(6),
                                    }}
                                    watch={watch}
                                    setValue={setValue}
                                    triggerValidation={triggerValidation}
                                    trim="ALL"
                                    hasError={errors.senha ? true : false}
                                    as="Senha"
                                    mostrarSenha={true}
                                />
                            </Grid>
                            <Grid item xs={6}>
                                <PasswordInputComponent
                                    label="Confirmar Senha"
                                    errors={errors}
                                    name="confirmarSenha"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: requiredMessage(),
                                        maxLength: maxLengthMessage(64),
                                        minLength: minLengthMessage(6),
                                    }}
                                    watch={watch}
                                    setValue={setValue}
                                    triggerValidation={triggerValidation}
                                    trim="ALL"
                                    hasError={errors.confirmarSenha ? true : false}
                                    as="Confirmar Senha"
                                    inputRef={register({
                                        validate: value =>
                                            checkPassword(value) || "Senhas diferem"
                                    })}
                                    mostrarSenha={true}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <LoadingButton
                                    full={true}
                                    fullWidth
                                    text="Cadastrar"
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    isLoading={isLoading}
                                    size="large" />
                            </Grid>
                        </Grid>
                    </form>
                    <Grid container spacing={1}>
                        <Grid item>
                            <Link variant="body2" component={RouterLink as any} to="/login">
                                {"Já possui conta? Logar"}
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default withRouter(RegisterComponent);