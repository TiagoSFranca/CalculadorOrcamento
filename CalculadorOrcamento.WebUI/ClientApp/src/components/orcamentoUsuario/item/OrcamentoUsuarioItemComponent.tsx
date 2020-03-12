import { Card, CardActions, CardContent, Grid, InputAdornment, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import appActions from 'actions/appActions';
import orcamentoUsuarioActions from 'actions/orcamentoUsuarioActions';
import ConfirmDialog from 'components/common/confirmDialog/ConfirmDialogComponent';
import NumberFormat from 'components/common/customNumberFormat/CustomNumberFormat';
import LoadingButton from 'components/common/loadingButton/LoadingButtonComponent';
import React, { useState } from 'react';
import { Controller, ErrorMessage, useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from 'store';
import { EditarOrcamentoUsuario, OrcamentoUsuario } from 'store/orcamentoUsuario/models';
import formatter from 'utils/formatter';
import { requiredMessage } from 'utils/hooksValidations';
import messages from 'utils/messages';
import { ISnackBarType } from 'utils/snackBar';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        heading: {
            fontSize: theme.typography.pxToRem(15),
        },
        label: {
            color: theme.palette.text.secondary,
        },
        marginLeft: {
            marginLeft: theme.spacing(1)
        },
        actions: {
            padding: theme.spacing(1)
        }
    }),
);

type Props = {
    orcamentoUsuario: OrcamentoUsuario
}

type OrcamentoUsuarioEditarForm = {
    id: number;
    idOrcamento: number;
    valorHora: number;
    multiplicador: number;
};

const OrcamentoUsuarioItemComponent = (props: Props) => {
    const classes = useStyles();

    const { control, errors, handleSubmit, register } = useForm<OrcamentoUsuarioEditarForm>();

    const orcamentoUsuarioStore = useSelector((s: ApplicationState) => s.orcamentoUsuario);
    const { isLoading } = orcamentoUsuarioStore;

    const dispatch = useDispatch();

    const [edit, setEdit] = useState(false);
    const [openDialogDelete, setOpenDialogDelete] = useState(false);

    const callback = (error: any) => {
        if (error) {
            dispatch(appActions.showSnackBarAction(null, error))
        }
        else {
            dispatch(appActions.showSnackBarAction({ message: messages.OPERACAO_SUCESSO, type: ISnackBarType.sucesso, title: messages.TITULO_SUCESSO }));
            setEdit(false);
        }
    }

    const callbackDelete = (error: any) => {
        if (error) {
            dispatch(appActions.showSnackBarAction(null, error))
        }
        else {
            dispatch(appActions.showSnackBarAction({ message: messages.OPERACAO_SUCESSO, type: ISnackBarType.sucesso, title: messages.TITULO_SUCESSO }));
            setOpenDialogDelete(false);
        }
    }

    const onSubmit = (data: OrcamentoUsuarioEditarForm) => {
        data.id = props.orcamentoUsuario.id;
        data.idOrcamento = props.orcamentoUsuario.idOrcamento;
        data.valorHora = +data.valorHora;
        data.multiplicador = +data.multiplicador;

        dispatch(orcamentoUsuarioActions.editarUsuario(data.id, data as EditarOrcamentoUsuario, callback));
    };

    const dialogActions = () => {
        return (<>
            <LoadingButton size="small" onClick={onCloseDialog} color="inherit" text="Cancelar" isLoading={isLoading} />
            <LoadingButton size="small" onClick={confirmDelete} color="secondary" text="Excluir" isLoading={isLoading} />
        </>)
    }

    const onCloseDialog = () => {
        if (!isLoading)
            setOpenDialogDelete(false);
    }

    const confirmDelete = () => {
        dispatch(orcamentoUsuarioActions.excluirUsuario(props.orcamentoUsuario.id, callbackDelete));
    }

    return (
        <>
            <ConfirmDialog open={openDialogDelete} actions={dialogActions()} description={`Deseja excluir o item?`} onClose={onCloseDialog} title={"Excluir"} />

            <Card >
                <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                    <CardContent>
                        <Grid container spacing={3}>
                        </Grid>
                    </CardContent>
                    <CardActions>
                        <Grid container item xs={12} justify="flex-end" className={classes.actions}>
                            {!edit && (
                                <>
                                    <Button size="small" color="secondary" onClick={() => setOpenDialogDelete(true)}>Excluir</Button>
                                    <Button size="small" color="primary" onClick={() => setEdit(true)}>Editar</Button>
                                </>
                            )}
                            {edit && (
                                <>
                                    <LoadingButton size="small" onClick={() => setEdit(false)} color="inherit" text="Cancelar" isLoading={isLoading} />
                                    <LoadingButton size="small" color="primary" text="Salvar" isLoading={isLoading} type="submit" />
                                </>
                            )}
                        </Grid>
                    </CardActions>
                </form>
            </Card>
        </>
    );
}

export default OrcamentoUsuarioItemComponent;