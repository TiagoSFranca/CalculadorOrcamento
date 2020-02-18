﻿import { Grid, TextField } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelActions from '@material-ui/core/ExpansionPanelActions';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import React, { useState } from 'react';
import formatter from 'utils/formatter';
import { Controller, ErrorMessage, useForm } from "react-hook-form";
import NumberFormat from 'components/common/customNumberFormat/CustomNumberFormat';
import LoadingButton from 'components/common/loadingButton/LoadingButtonComponent';
import { ApplicationState } from 'store';
import * as AppStore from 'store/AppStore';
import * as OrcamentoItemAplicacaoStore from 'store/OrcamentoItemAplicacaoStore';
import { useSelector, useDispatch } from 'react-redux';
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
        }
    }),
);

type Props = {
    orcamentoItemAplicacao: OrcamentoItemAplicacaoStore.OrcamentoItemAplicacao
}

type OrcamentoItemEditarForm = {
    id: number;
    idOrcamento: number;
    nome: string;
    descricao: string;
    observacao: string;
    duracaoBack: number | null;
    duracaoFront: number | null;
    duracaoTotal: number | null;
};

const OrcamentoItemComponent = (props: Props) => {
    const classes = useStyles();

    const { control, errors, handleSubmit } = useForm<OrcamentoItemEditarForm>();

    const orcamentoItemStore = useSelector((s: ApplicationState) => s.orcamentoItemAplicacao);
    const { isLoading } = orcamentoItemStore;

    const dispatch = useDispatch();

    const [edit, setEdit] = useState(false);

    const onDelete = () => {
        console.log("ID", props.orcamentoItemAplicacao.id)
    }

    const callback = (error: any) => {
        if (error) {
            dispatch(AppStore.actionCreators.showSnackBarAction(null, error))
        }
        else {
            dispatch(AppStore.actionCreators.showSnackBarAction({ message: messages.OPERACAO_SUCESSO, type: ISnackBarType.sucesso, title: messages.TITULO_SUCESSO }));
            setEdit(false);
        }
    }

    const onSubmit = (data: OrcamentoItemEditarForm) => {
        data.id = props.orcamentoItemAplicacao.id;
        data.idOrcamento = props.orcamentoItemAplicacao.idOrcamento;
        data.duracaoBack = data.duracaoBack != null && data.duracaoBack >= 0 ? +data.duracaoBack : null;
        data.duracaoFront = data.duracaoFront != null && data.duracaoFront >= 0 ? +data.duracaoFront : null;
        data.duracaoTotal = data.duracaoTotal != null && data.duracaoTotal >= 0 ? +data.duracaoTotal : null;

        dispatch(OrcamentoItemAplicacaoStore.actionCreators.editarItem(data.id, data as OrcamentoItemAplicacaoStore.EditarOrcamentoItem, callback));
    };

    return (
        <ExpansionPanel>
            <ExpansionPanelSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel-content"
                id="panel-header"
            >
                {!edit && (<Typography className={classes.heading}>{props.orcamentoItemAplicacao.nome}</Typography>)}

            </ExpansionPanelSummary>
            <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                <ExpansionPanelDetails>
                    <Grid container spacing={3}>
                        {edit &&
                            <Grid item xs={12}>
                                <Controller as={
                                    <TextField label="Nome" error={errors.nome ? true : false}
                                        fullWidth
                                        helperText={
                                            <ErrorMessage errors={errors} name="nome" >
                                                {({ message }) => message}
                                            </ErrorMessage>
                                        }
                                    />
                                } name="nome" control={control} defaultValue={props.orcamentoItemAplicacao.nome} rules={{ required: "Campo obrigatório" }} />
                            </Grid>}
                        <Grid item xs={12}>
                            {!edit ? <Typography variant="body2">{props.orcamentoItemAplicacao.descricao}</Typography>
                                : (
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
                                    } name="descricao" control={control} defaultValue={props.orcamentoItemAplicacao.descricao} rules={{
                                        maxLength: {
                                            value: 512,
                                            message: "Tamanho máxio de 512 chars"
                                        }
                                    }} />
                                )}
                        </Grid>
                        <Grid item xs={12}>
                            {!edit ? (
                                <>
                                    <Typography variant="overline" className={classes.label}>Observações:</Typography>
                                    <Typography variant="caption" className={classes.marginLeft}>{props.orcamentoItemAplicacao.observacao}</Typography>
                                </>
                            ) : (
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
                                    } name="observacao" control={control} defaultValue={props.orcamentoItemAplicacao.observacao} rules={{
                                        maxLength: {
                                            value: 1024,
                                            message: "Tamanho máxio de 1024 chars"
                                        }
                                    }} />
                                )}
                        </Grid>
                        <Grid item xs={4}>
                            {!edit ? (
                                <>
                                    <Typography variant="overline" className={classes.label}>Duração Back-end:</Typography>
                                    <Typography variant="caption" className={classes.marginLeft}>{formatter.formatarNumero(props.orcamentoItemAplicacao.duracaoBack)}</Typography>
                                </>
                            ) : (
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
                                    } name="duracaoBack" control={control} defaultValue={props.orcamentoItemAplicacao.duracaoBack} />
                                )}
                        </Grid>
                        <Grid item xs={4}>
                            {!edit ? (
                                <>
                                    <Typography variant="overline" className={classes.label}>Duração Front-end:</Typography>
                                    <Typography variant="caption" className={classes.marginLeft}>{formatter.formatarNumero(props.orcamentoItemAplicacao.duracaoFront)}</Typography>
                                </>
                            ) : (
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
                                    } name="duracaoFront" control={control} defaultValue={props.orcamentoItemAplicacao.duracaoFront} />
                                )}
                        </Grid>
                        <Grid item xs={4}>
                            {!edit ? (
                                <>
                                    <Typography variant="overline" className={classes.label}>Duração Total:</Typography>
                                    <Typography variant="caption" className={classes.marginLeft}>{formatter.formatarNumero(props.orcamentoItemAplicacao.duracaoTotal)}</Typography>
                                </>
                            ) : (
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
                                    } name="duracaoTotal" control={control} defaultValue={props.orcamentoItemAplicacao.duracaoTotal} />
                                )}
                        </Grid>
                    </Grid>
                </ExpansionPanelDetails>
                <Divider />
                <ExpansionPanelActions>
                    {!edit && (
                        <>
                            <Button size="small" color="secondary" onClick={onDelete}>Excluir</Button>
                            <Button size="small" color="primary" onClick={() => setEdit(true)}>Editar</Button>
                        </>
                    )}
                    {edit && (
                        <>
                            <LoadingButton size="small" onClick={() => setEdit(false)} color="inherit" text="Cancelar" loading={isLoading} />
                            <LoadingButton size="small" color="primary" text="Salvar" loading={isLoading} type="submit" />
                        </>
                    )}
                </ExpansionPanelActions>
            </form>
        </ExpansionPanel>
    );
}

export default OrcamentoItemComponent;