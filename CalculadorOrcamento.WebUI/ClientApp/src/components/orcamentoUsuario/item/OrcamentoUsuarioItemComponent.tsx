import { Button, Card, CardActions, CardContent, Grid } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import orcamentoUsuarioActions from 'actions/orcamentoUsuarioActions';
import ConfirmDialog from 'components/common/confirmDialog/ConfirmDialogComponent';
import LoadingButton from 'components/common/loadingButton/LoadingButtonComponent';
import React, { useState } from 'react';
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from 'store';
import { EditarOrcamentoUsuario, OrcamentoUsuario } from 'store/orcamentoUsuario/models';
import loadingHelper from 'utils/loadingHelper';

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

const LOADING_IDENTIFIER_DELETE = "btnExcluirOrcamentoUsuario";
const LOADING_IDENTIFIER_EDIT = "btnEditarOrcamentoUsuario";

const OrcamentoUsuarioItemComponent = (props: Props) => {
    const classes = useStyles();

    const { handleSubmit } = useForm<OrcamentoUsuarioEditarForm>();

    const appStore = useSelector((s: ApplicationState) => s.app);
    const { loading } = appStore;

    const dispatch = useDispatch();

    const [edit, setEdit] = useState(false);
    const [openDialogDelete, setOpenDialogDelete] = useState(false);

    const callback = (sucesso: boolean) => {
        if (sucesso)
            setEdit(false);
    }

    const callbackDelete = (sucesso: boolean) => {
        if (sucesso)
            setOpenDialogDelete(false);
    }

    const onSubmit = (data: OrcamentoUsuarioEditarForm) => {
        data.id = props.orcamentoUsuario.id;
        data.idOrcamento = props.orcamentoUsuario.idOrcamento;
        data.valorHora = +data.valorHora;
        data.multiplicador = +data.multiplicador;

        dispatch(orcamentoUsuarioActions.editarOrcamentoUsuario(data.id, data as EditarOrcamentoUsuario, callback, LOADING_IDENTIFIER_EDIT));
    };

    const dialogActions = () => {
        return (<>
            <LoadingButton size="small" onClick={onCloseDialog} color="inherit" text="Cancelar" isLoading={loadingHelper.checkIsLoading(loading, LOADING_IDENTIFIER_DELETE)} />
            <LoadingButton size="small" onClick={confirmDelete} color="secondary" text="Excluir" isLoading={loadingHelper.checkIsLoading(loading, LOADING_IDENTIFIER_DELETE)} />
        </>)
    }

    const onCloseDialog = () => {
        if (!loadingHelper.checkIsLoading(loading, LOADING_IDENTIFIER_DELETE))
            setOpenDialogDelete(false);
    }

    const confirmDelete = () => {
        dispatch(orcamentoUsuarioActions.excluirOrcamentoUsuario(props.orcamentoUsuario.id, callbackDelete, LOADING_IDENTIFIER_DELETE));
    }

    return (
        <>
            <ConfirmDialog open={openDialogDelete} actions={dialogActions()} description={`Deseja excluir o item?`} onClose={onCloseDialog} title={"Excluir"} />

            <Card >
                <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12}>
                            </Grid>
                            <Grid item xs={12}>
                            </Grid>
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
                                    <LoadingButton size="small" onClick={() => setEdit(false)} color="inherit" text="Cancelar" isLoading={loadingHelper.checkIsLoading(loading, LOADING_IDENTIFIER_EDIT)} />
                                    <LoadingButton size="small" color="primary" text="Salvar" type="submit" isLoading={loadingHelper.checkIsLoading(loading, LOADING_IDENTIFIER_EDIT)} />
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