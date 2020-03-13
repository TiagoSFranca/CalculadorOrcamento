import { Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, TextField } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import appActions from 'actions/appActions';
import orcamentoItemAplicacaoActions from 'actions/orcamentoItemAplicacaoActions';
import NumberFormat from 'components/common/customNumberFormat/CustomNumberFormat';
import CustomController from 'components/common/hookForm/customController/CustomControllerComponent';
import LoadingButton from 'components/common/loadingButton/LoadingButtonComponent';
import React from 'react';
import { ErrorMessage, useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { ApplicationState } from 'store';
import { AdicionarOrcamentoItem } from 'store/orcamentoItemAplicacao/models';
import { maxLengthMessage, minValueMessage, requiredMessage } from 'utils/hooksValidations';
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

type OrcamentoItemAplicacaoAdicionarForm = {
    idOrcamento: number;
    nome: string;
    descricao: string;
    observacao: string;
    duracaoBack: number | null;
    duracaoFront: number | null;
    duracaoTotal: number | null;
};

const LOADING_IDENTIFIER = "btnAdicionarOrcamentoItemAplicacao";

const OrcamentoItemAplicacaoAdicionarComponent = (props: Props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const { control, errors, handleSubmit, watch, setValue, triggerValidation } = useForm<OrcamentoItemAplicacaoAdicionarForm>();

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

    const onSubmit = (data: OrcamentoItemAplicacaoAdicionarForm) => {
        data.idOrcamento = +id;
        data.duracaoBack = data.duracaoBack != null && data.duracaoBack >= 0 ? +data.duracaoBack : null;
        data.duracaoFront = data.duracaoFront != null && data.duracaoFront >= 0 ? +data.duracaoFront : null;
        data.duracaoTotal = data.duracaoTotal != null && data.duracaoTotal >= 0 ? +data.duracaoTotal : null;
        dispatch(orcamentoItemAplicacaoActions.adicionarOrcamentoItemAplicacao(data as AdicionarOrcamentoItem, callback, LOADING_IDENTIFIER));
    };

    return (
        <>
            <IconButton color="primary" className={props.buttonClassName} onClick={handleClickOpen}>
                <AddIcon />
            </IconButton>
            <Dialog open={open} aria-labelledby="form-dialog-title" fullWidth={true}>
                <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                    <DialogTitle id="form-dialog-title">Adicionar Item</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={3} className={classes.noMargin}>
                            <Grid item xs={6} >
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
                                    rules={{ required: requiredMessage() }}
                                    watch={watch}
                                    setValue={setValue}
                                    triggerValidation={triggerValidation}
                                    trim="ALL" />
                            </Grid>

                            <Grid item xs={12} >
                                <CustomController
                                    as={
                                        <TextField label="Descrição" error={errors.descricao ? true : false}
                                            fullWidth
                                            helperText={
                                                <ErrorMessage errors={errors} name="descricao" >
                                                    {({ message }) => message}
                                                </ErrorMessage>
                                            }
                                            multiline
                                            rows={2}
                                            rowsMax={6}
                                        />
                                    }
                                    name="descricao"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        maxLength: maxLengthMessage(512),
                                    }}
                                    watch={watch}
                                    setValue={setValue}
                                    triggerValidation={triggerValidation}
                                    trim="ALL" />
                            </Grid>

                            <Grid item xs={12} >
                                <CustomController
                                    as={
                                        <TextField label="Observações" error={errors.observacao ? true : false}
                                            fullWidth
                                            helperText={
                                                <ErrorMessage errors={errors} name="observacao" >
                                                    {({ message }) => message}
                                                </ErrorMessage>
                                            }
                                            multiline
                                            rows={2}
                                            rowsMax={6}
                                        />
                                    }
                                    name="observacao"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        maxLength: maxLengthMessage(1024),
                                    }}
                                    watch={watch}
                                    setValue={setValue}
                                    triggerValidation={triggerValidation}
                                    trim="ALL" />
                            </Grid>

                            <Grid item xs={4} >
                                <CustomController
                                    as={
                                        <TextField label="Duração Back-end" error={errors.duracaoBack ? true : false}
                                            fullWidth
                                            helperText={
                                                <ErrorMessage errors={errors} name="duracaoBack" >
                                                    {({ message }) => message}
                                                </ErrorMessage>
                                            }
                                            InputProps={{ inputComponent: NumberFormat as any }}
                                        />
                                    }
                                    name="duracaoBack"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        min: minValueMessage(0)
                                    }}
                                    watch={watch}
                                    setValue={setValue}
                                    triggerValidation={triggerValidation}
                                    trim="ALL" />
                            </Grid>

                            <Grid item xs={4} >
                                <CustomController
                                    as={
                                        <TextField label="Duração Front-end" error={errors.duracaoFront ? true : false}
                                            fullWidth
                                            helperText={
                                                <ErrorMessage errors={errors} name="duracaoFront" >
                                                    {({ message }) => message}
                                                </ErrorMessage>
                                            }
                                            InputProps={{ inputComponent: NumberFormat as any }}
                                        />
                                    }
                                    name="duracaoFront"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        min: minValueMessage(0)
                                    }}
                                    watch={watch}
                                    setValue={setValue}
                                    triggerValidation={triggerValidation}
                                    trim="ALL" />
                            </Grid>

                            <Grid item xs={4} >
                                <CustomController
                                    as={
                                        <TextField label="Duração Total" error={errors.duracaoTotal ? true : false}
                                            fullWidth
                                            helperText={
                                                <ErrorMessage errors={errors} name="duracaoTotal" >
                                                    {({ message }) => message}
                                                </ErrorMessage>
                                            }
                                            InputProps={{ inputComponent: NumberFormat as any }}
                                        />
                                    }
                                    name="duracaoTotal"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        min: minValueMessage(0)
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

export default withRouter(OrcamentoItemAplicacaoAdicionarComponent);