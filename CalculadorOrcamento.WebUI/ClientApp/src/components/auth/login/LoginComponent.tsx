import { IconButton, InputAdornment } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import appActions from 'actions/appActions';
import authActions from 'actions/authActions';
import CustomController from 'components/common/hookForm/customController/CustomControllerComponent';
import LoadingButton from 'components/common/loadingButton/LoadingButtonComponent';
import React, { useState } from 'react';
import { ErrorMessage, useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { Link as RouterLink, withRouter } from 'react-router-dom';
import { ApplicationState } from 'store';
import { AutenticarUsuario } from 'store/auth/models';
import { requiredMessage } from 'utils/hooksValidations';
import messages from 'utils/messages';
import { ISnackBarType } from 'utils/snackBar';

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
    }));

type LoginForm = {
    login: string;
    senha: string;
}

const LoginComponent = (props: any) => {
    const classes = useStyles();

    const authStore = useSelector((s: ApplicationState) => s.auth);
    const { isLoading } = authStore;

    const dispatch = useDispatch();

    const { control, errors, handleSubmit, watch, setValue, triggerValidation } = useForm<LoginForm>();

    const callback = (error: any) => {
        if (error) {
            dispatch(appActions.showSnackBarAction(null, error))
        }
        else {
            dispatch(appActions.showSnackBarAction({ message: messages.OPERACAO_SUCESSO, type: ISnackBarType.sucesso, title: messages.TITULO_SUCESSO }));
            props.history.push('/');
        }
    }

    const onSubmit = (data: any) => {
        dispatch(authActions.autenticarUsuario(data as AutenticarUsuario, callback));
    };

    const [showSenha, setShowSenha] = useState(false);

    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
    };

    return (
        <>
            <Grid container justify="center" spacing={3} className={classes.paper}>
                <Grid item xs={12} lg={6} sm={8} xl={4}>
                    <Grid container justify="center" alignContent="center" alignItems="center" direction="column">
                        <Grid>
                            <Avatar className={classes.avatar}>
                                <LockOutlinedIcon />
                            </Avatar>
                        </Grid>
                        <Grid>
                            <Typography component="h1" variant="h5">Entrar</Typography>
                        </Grid>
                    </Grid>
                    <form noValidate onSubmit={handleSubmit(onSubmit)}>
                        <Grid container justify="center" spacing={3}>
                            <Grid item xs={12}>
                                <CustomController
                                    as={
                                        <TextField label="Login ou E-mail" error={errors.login ? true : false}
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
                                        required: requiredMessage()
                                    }}
                                    watch={watch}
                                    setValue={setValue}
                                    triggerValidation={triggerValidation} />
                            </Grid>
                            <Grid item xs={12}>
                                <CustomController
                                    as={
                                        <TextField label="Senha" error={errors.senha ? true : false}
                                            fullWidth
                                            type={showSenha ? 'text' : 'password'}
                                            helperText={
                                                <ErrorMessage errors={errors} name="senha" >
                                                    {({ message }) => message}
                                                </ErrorMessage>
                                            }
                                            InputProps={{
                                                endAdornment: (
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
                                        />
                                    }
                                    name="senha"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: requiredMessage()
                                    }}
                                    watch={watch}
                                    setValue={setValue}
                                    triggerValidation={triggerValidation} />
                            </Grid>
                            <Grid item xs={12}>
                                <LoadingButton
                                    full={true}
                                    fullWidth
                                    text="Entrar"
                                    type="submit"
                                    variant="contained"
                                    color="primary"
                                    isLoading={isLoading}
                                    size="large" />
                            </Grid>
                        </Grid>
                    </form>
                    <Grid container spacing={1}>
                        <Grid item xs>
                            <Link href="#" variant="body2">
                                Forgot password?
              </Link>
                        </Grid>
                        <Grid item>
                            <Link variant="body2" component={RouterLink as any} to="/register">
                                {"Não possui conta? Registre-se"}
                            </Link>
                        </Grid>
                    </Grid>
                </Grid>
            </Grid>
        </>
    );
};

export default withRouter(LoginComponent);