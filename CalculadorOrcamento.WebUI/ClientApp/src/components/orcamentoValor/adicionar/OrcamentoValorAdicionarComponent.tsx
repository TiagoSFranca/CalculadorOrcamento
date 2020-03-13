import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, InputAdornment, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import appActions from 'actions/appActions';
import orcamentoValorActions from 'actions/orcamentoValorActions';
import NumberFormat from 'components/common/customNumberFormat/CustomNumberFormat';
import CustomController from 'components/common/hookForm/customController/CustomControllerComponent';
import LoadingButton from 'components/common/loadingButton/LoadingButtonComponent';
import React from 'react';
import { ErrorMessage, useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { ApplicationState } from 'store';
import { AdicionarOrcamentoValor } from 'store/orcamentoValor/models';
import { greaterThanMessage, requiredMessage } from 'utils/hooksValidations';
import loadingHelper from 'utils/loadingHelper';
import messages from 'utils/messages';
import { ISnackBarType } from 'utils/snackBar';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        noMargin: {
            marginTop: '0',
            marginBottom: '0'
        },
    }),
);

type Props = any & {
    buttonClassName: string
}

type OrcamentoValorAdicionarForm = {
    idOrcamento: number;
    valorHora: number;
    multiplicador: number;
};

const LOADING_IDENTIFIER = "btnAdicionarOrcamentoValor";

const OrcamentoValorAdicionarComponent = (props: Props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const { control, errors, handleSubmit, register, watch, setValue, triggerValidation } = useForm<OrcamentoValorAdicionarForm>();

    const appStore = useSelector((s: ApplicationState) => s.app);
    const { loading } = appStore;

    const dispatch = useDispatch();

    const id = props.match.params.id;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const callback = (error: any) => {
        if (error) {
            dispatch(appActions.showSnackBarAction(null, error))
        }
        else {
            dispatch(appActions.showSnackBarAction({ message: messages.OPERACAO_SUCESSO, type: ISnackBarType.sucesso, title: messages.TITULO_SUCESSO }));
            setOpen(false);
        }
    }

    const onSubmit = (data: OrcamentoValorAdicionarForm) => {
        data.idOrcamento = +id;
        data.valorHora = +data.valorHora;
        data.multiplicador = +data.multiplicador;
        dispatch(orcamentoValorActions.adicionarOrcamentoValor(data as AdicionarOrcamentoValor, callback, LOADING_IDENTIFIER));
    };

    return (
        <>
            <IconButton color="primary" className={props.buttonClassName} onClick={handleClickOpen}>
                <AddIcon />
            </IconButton>
            <Dialog open={open} aria-labelledby="form-dialog-title" fullWidth={true}>
                <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                    <DialogTitle id="form-dialog-title">Adicionar Valor</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={3} className={classes.noMargin}>
                            <Grid item xs={6}>
                                <CustomController
                                    as={
                                        <TextField label="Valor da hora" error={errors.valorHora ? true : false}
                                            fullWidth
                                            helperText={
                                                <ErrorMessage errors={errors} name="valorHora" >
                                                    {({ message }) => message}
                                                </ErrorMessage>
                                            }
                                            InputProps={{
                                                inputComponent: NumberFormat as any,
                                                startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                            }}
                                            inputRef={register({
                                                validate: value => value > 0 || greaterThanMessage(0)
                                            })}
                                        />
                                    }
                                    name="valorHora"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: requiredMessage()
                                    }}
                                    watch={watch}
                                    setValue={setValue}
                                    triggerValidation={triggerValidation}
                                    trim="ALL" />
                            </Grid>

                            <Grid item xs={6}>
                                <CustomController
                                    as={
                                        <TextField label="Multiplicador" error={errors.multiplicador ? true : false}
                                            fullWidth
                                            helperText={
                                                <ErrorMessage errors={errors} name="multiplicador" >
                                                    {({ message }) => message}
                                                </ErrorMessage>
                                            }
                                            InputProps={{
                                                inputComponent: NumberFormat as any,
                                                startAdornment: <InputAdornment position="start">x</InputAdornment>,
                                            }}
                                            inputRef={register({
                                                validate: value => value > 0 || greaterThanMessage(0)
                                            })}
                                        />
                                    }
                                    name="multiplicador"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: requiredMessage()
                                    }}
                                    watch={watch}
                                    setValue={setValue}
                                    triggerValidation={triggerValidation}
                                    trim="ALL" />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <LoadingButton onClick={handleClose} color="primary" text="Cancelar" isLoading={loadingHelper.checkIsLoading(loading, LOADING_IDENTIFIER)} />
                        <LoadingButton color="primary" text="Adicionar" type="submit" isLoading={loadingHelper.checkIsLoading(loading, LOADING_IDENTIFIER)} />
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}

export default withRouter(OrcamentoValorAdicionarComponent);