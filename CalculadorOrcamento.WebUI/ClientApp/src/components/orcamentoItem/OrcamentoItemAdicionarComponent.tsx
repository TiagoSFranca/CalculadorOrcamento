import { Grid, IconButton } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import SaveIcon from '@material-ui/icons/Save';
import LoadingButton from 'components/common/loadingButton/LoadingButtonComponent';
import React from 'react';
import { Controller, ErrorMessage, useForm } from "react-hook-form";
import * as AppStore from 'store/AppStore';
import * as OrcamentoItemAplicacaoStore from 'store/OrcamentoItemAplicacaoStore';
import { withRouter } from 'react-router';
import { ISnackBarType } from 'utils/snackBar';
import messages from 'utils/messages';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from 'store';


type Props = any & {
    buttonClassName: string
}

type OrcamentoItemAdicionarForm = {
    idOrcamento: number;
    nome: string;
    descricao: string;
};

const OrcamentoItemAdicionarComponent = (props: Props) => {
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
                        <Grid item xs={12} >
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