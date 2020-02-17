﻿import { Grid, IconButton } from '@material-ui/core';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import NumberFormat from 'components/common/customNumberFormat/CustomNumberFormat';
import LoadingButton from 'components/common/loadingButton/LoadingButtonComponent';
import React from 'react';
import { Controller, ErrorMessage, useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { ApplicationState } from 'store';
import * as AppStore from 'store/AppStore';
import * as OrcamentoItemAplicacaoStore from 'store/OrcamentoItemAplicacaoStore';
import messages from 'utils/messages';
import { ISnackBarType } from 'utils/snackBar';
import { Theme, createStyles, makeStyles } from '@material-ui/core/styles';

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

type OrcamentoItemAdicionarForm = {
    idOrcamento: number;
    nome: string;
    descricao: string;
    observacao: string;
    duracaoBack: number | null;
    duracaoFront: number | null;
    duracaoTotal: number | null;
};

const OrcamentoItemAdicionarComponent = (props: Props) => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);

    const { control, errors, handleSubmit } = useForm<OrcamentoItemAdicionarForm>();

    const orcamentoItemStore = useSelector((s: ApplicationState) => s.orcamentoItemAplicacao);
    const { isLoading } = orcamentoItemStore;

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
            dispatch(AppStore.actionCreators.showSnackBarAction(null, error))
        }
        else {
            dispatch(AppStore.actionCreators.showSnackBarAction({ message: messages.OPERACAO_SUCESSO, type: ISnackBarType.sucesso, title: messages.TITULO_SUCESSO }));
            setOpen(false);
        }
    }


    const onSubmit = (data: OrcamentoItemAdicionarForm) => {
        data.idOrcamento = +id;
        data.duracaoBack = data.duracaoBack != null && data.duracaoBack >= 0 ? +data.duracaoBack : null;
        data.duracaoFront = data.duracaoFront != null && data.duracaoFront >= 0 ? +data.duracaoFront : null;
        data.duracaoTotal = data.duracaoTotal != null && data.duracaoTotal >= 0 ? +data.duracaoTotal : null;
        dispatch(OrcamentoItemAplicacaoStore.actionCreators.adicionarItem(data as OrcamentoItemAplicacaoStore.AdicionarOrcamentoItem, callback));
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
                                <Controller as={
                                    <TextField label="Nome" error={errors.nome ? true : false}
                                        fullWidth
                                        helperText={
                                            <ErrorMessage errors={errors} name="nome" >
                                                {({ message }) => message}
                                            </ErrorMessage>
                                        }
                                    />
                                } name="nome" control={control} defaultValue="" rules={{ required: "Campo obrigatório" }} />
                            </Grid>

                            <Grid item xs={12} >
                                <Controller as={
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
                                } name="descricao" control={control} defaultValue="" rules={{
                                    maxLength: {
                                        value: 512,
                                        message: "Tamanho máxio de 512 chars"
                                    }
                                }} />
                            </Grid>

                            <Grid item xs={12} >
                                <Controller as={
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
                                } name="observacao" control={control} defaultValue="" rules={{
                                    maxLength: {
                                        value: 1024,
                                        message: "Tamanho máxio de 1024 chars"
                                    }
                                }} />
                            </Grid>

                            <Grid item xs={4} >
                                <Controller as={
                                    <TextField label="Duração Back-end" error={errors.duracaoBack ? true : false}
                                        fullWidth
                                        helperText={
                                            <ErrorMessage errors={errors} name="duracaoBack" >
                                                {({ message }) => message}
                                            </ErrorMessage>
                                        }
                                        InputProps={{ inputComponent: NumberFormat as any }}
                                    />
                                } name="duracaoBack" control={control} defaultValue="" />
                            </Grid>

                            <Grid item xs={4} >
                                <Controller as={
                                    <TextField label="Duração Front-end" error={errors.duracaoFront ? true : false}
                                        fullWidth
                                        helperText={
                                            <ErrorMessage errors={errors} name="duracaoFront" >
                                                {({ message }) => message}
                                            </ErrorMessage>
                                        }
                                        InputProps={{ inputComponent: NumberFormat as any }}
                                    />
                                } name="duracaoFront" control={control} defaultValue="" />
                            </Grid>

                            <Grid item xs={4} >
                                <Controller as={
                                    <TextField label="Duração Total" error={errors.duracaoTotal ? true : false}
                                        fullWidth
                                        helperText={
                                            <ErrorMessage errors={errors} name="duracaoTotal" >
                                                {({ message }) => message}
                                            </ErrorMessage>
                                        }
                                        InputProps={{ inputComponent: NumberFormat as any }}
                                    />
                                } name="duracaoTotal" control={control} defaultValue="" />
                            </Grid>
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <LoadingButton onClick={handleClose} color="primary" text="Cancelar" loading={isLoading} />
                        <LoadingButton color="primary" text="Adicionar" loading={isLoading} type="submit" />
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}

export default withRouter(OrcamentoItemAdicionarComponent);