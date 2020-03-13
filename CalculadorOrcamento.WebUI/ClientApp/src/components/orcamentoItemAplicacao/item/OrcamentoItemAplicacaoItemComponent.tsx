import { Button, Divider, ExpansionPanel, ExpansionPanelActions, ExpansionPanelDetails, ExpansionPanelSummary, Grid, TextField, Typography } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import appActions from 'actions/appActions';
import orcamentoItemAplicacaoActions from 'actions/orcamentoItemAplicacaoActions';
import ConfirmDialog from 'components/common/confirmDialog/ConfirmDialogComponent';
import NumberFormat from 'components/common/customNumberFormat/CustomNumberFormat';
import CustomController from 'components/common/hookForm/customController/CustomControllerComponent';
import LoadingButton from 'components/common/loadingButton/LoadingButtonComponent';
import React, { useState } from 'react';
import { ErrorMessage, useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from 'store';
import { EditarOrcamentoItemAplicacao, OrcamentoItemAplicacao } from 'store/orcamentoItemAplicacao/models';
import formatter from 'utils/formatter';
import { maxLengthMessage, minValueMessage, requiredMessage } from 'utils/hooksValidations';
import loadingHelper from 'utils/loadingHelper';
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
    orcamentoItemAplicacao: OrcamentoItemAplicacao
}

type OrcamentoItemAplicacaoEditarForm = {
    id: number;
    idOrcamento: number;
    nome: string;
    descricao: string;
    observacao: string;
    duracaoBack: number | null;
    duracaoFront: number | null;
    duracaoTotal: number | null;
};

const LOADING_IDENTIFIER_DELETE = "btnExcluirOrcamentoItemAplicacao";
const LOADING_IDENTIFIER_EDIT = "btnEditarOrcamentoItemAplicacao";

const OrcamentoItemAplicacaoItemComponent = (props: Props) => {
    const classes = useStyles();

    const { control, errors, handleSubmit, watch, setValue, triggerValidation } = useForm<OrcamentoItemAplicacaoEditarForm>();

    const appStore = useSelector((s: ApplicationState) => s.app);
    const { loading } = appStore;

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

    const onSubmit = (data: OrcamentoItemAplicacaoEditarForm) => {
        data.id = props.orcamentoItemAplicacao.id;
        data.idOrcamento = props.orcamentoItemAplicacao.idOrcamento;
        data.duracaoBack = data.duracaoBack != null && data.duracaoBack >= 0 ? +data.duracaoBack : null;
        data.duracaoFront = data.duracaoFront != null && data.duracaoFront >= 0 ? +data.duracaoFront : null;
        data.duracaoTotal = data.duracaoTotal != null && data.duracaoTotal >= 0 ? +data.duracaoTotal : null;

        dispatch(orcamentoItemAplicacaoActions.editarOrcamentoItemAplicacao(data.id, data as EditarOrcamentoItemAplicacao, callback, LOADING_IDENTIFIER_EDIT));
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
        dispatch(orcamentoItemAplicacaoActions.excluirOrcamentoItemAplicacao(props.orcamentoItemAplicacao.id, callbackDelete, LOADING_IDENTIFIER_DELETE));
    }

    const onExpansionPanelChange = (event: React.ChangeEvent<{}>, newExpanded: boolean) => {
        if (!newExpanded)
            setEdit(false);
    }

    return (
        <>
            <ConfirmDialog open={openDialogDelete} actions={dialogActions()} description={`Deseja excluir o item ${props.orcamentoItemAplicacao.nome}?`} onClose={onCloseDialog} title={"Excluir"} />

            <ExpansionPanel onChange={onExpansionPanelChange}>
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
                                        defaultValue={props.orcamentoItemAplicacao.nome}
                                        rules={{ required: requiredMessage() }}
                                        watch={watch}
                                        setValue={setValue}
                                        triggerValidation={triggerValidation}
                                        trim="ALL" />
                                </Grid>}
                            <Grid item xs={12}>
                                {!edit ? <Typography variant="body2">{props.orcamentoItemAplicacao.descricao}</Typography>
                                    : (
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
                                            defaultValue={props.orcamentoItemAplicacao.descricao}
                                            rules={{
                                                maxLength: maxLengthMessage(512),
                                            }}
                                            watch={watch}
                                            setValue={setValue}
                                            triggerValidation={triggerValidation}
                                            trim="ALL" />
                                    )}
                            </Grid>
                            <Grid item xs={12}>
                                {!edit ? (
                                    <>
                                        <Typography variant="overline" className={classes.label}>Observações:</Typography>
                                        <Typography variant="caption" className={classes.marginLeft}>{props.orcamentoItemAplicacao.observacao}</Typography>
                                    </>
                                ) : (
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
                                            defaultValue={props.orcamentoItemAplicacao.observacao}
                                            rules={{
                                                maxLength: maxLengthMessage(1024),
                                            }}
                                            watch={watch}
                                            setValue={setValue}
                                            triggerValidation={triggerValidation}
                                            trim="ALL" />
                                    )}
                            </Grid>
                            <Grid item xs={4}>
                                {!edit ? (
                                    <>
                                        <Typography variant="overline" className={classes.label}>Duração Back-end:</Typography>
                                        <Typography variant="caption" className={classes.marginLeft}>{formatter.formatarNumero(props.orcamentoItemAplicacao.duracaoBack)}</Typography>
                                    </>
                                ) : (
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
                                            defaultValue={props.orcamentoItemAplicacao.duracaoBack}
                                            rules={{
                                                min: minValueMessage(0)
                                            }}
                                            watch={watch}
                                            setValue={setValue}
                                            triggerValidation={triggerValidation}
                                            trim="ALL" />
                                    )}
                            </Grid>
                            <Grid item xs={4}>
                                {!edit ? (
                                    <>
                                        <Typography variant="overline" className={classes.label}>Duração Front-end:</Typography>
                                        <Typography variant="caption" className={classes.marginLeft}>{formatter.formatarNumero(props.orcamentoItemAplicacao.duracaoFront)}</Typography>
                                    </>
                                ) : (
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
                                            defaultValue={props.orcamentoItemAplicacao.duracaoFront}
                                            rules={{
                                                min: minValueMessage(0)
                                            }}
                                            watch={watch}
                                            setValue={setValue}
                                            triggerValidation={triggerValidation}
                                            trim="ALL" />
                                    )}
                            </Grid>
                            <Grid item xs={4}>
                                {!edit ? (
                                    <>
                                        <Typography variant="overline" className={classes.label}>Duração Total:</Typography>
                                        <Typography variant="caption" className={classes.marginLeft}>{formatter.formatarNumero(props.orcamentoItemAplicacao.duracaoTotal)}</Typography>
                                    </>
                                ) : (
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
                                            defaultValue={props.orcamentoItemAplicacao.duracaoTotal}
                                            rules={{
                                                min: minValueMessage(0)
                                            }}
                                            watch={watch}
                                            setValue={setValue}
                                            triggerValidation={triggerValidation}
                                            trim="ALL" />
                                    )}
                            </Grid>
                        </Grid>
                    </ExpansionPanelDetails>
                    <Divider />
                    <ExpansionPanelActions>
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
                    </ExpansionPanelActions>
                </form>
            </ExpansionPanel>
        </>
    );
}

export default OrcamentoItemAplicacaoItemComponent;