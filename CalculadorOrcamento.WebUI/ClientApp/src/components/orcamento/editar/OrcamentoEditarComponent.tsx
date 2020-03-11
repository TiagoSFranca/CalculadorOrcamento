import { Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import LoadingButton from 'components/common/loadingButton/LoadingButtonComponent';
import LoadingCard from "components/common/loadingCard/LoadingCardComponent";
import React, { useEffect } from "react";
import { Controller, ErrorMessage, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from 'react-router';
import { ApplicationState } from 'store';
import * as AppStore from 'store/AppStore';
import * as OrcamentoStore from 'store/OrcamentoStore';
import formatter from "utils/formatter";
import messages from 'utils/messages';
import { ISnackBarType } from 'utils/snackBar';
import { requiredMessage, maxLengthMessage } from "utils/hooksValidations";
import CustomController from 'components/common/hookForm/customController/CustomControllerComponent';

type OrcamentoEditarForm = {
    id: number;
    codigo: string;
    nome: string;
    descricao: string;
    dataCriacao: string;
    dataAtualizacao: string;
};

const OrcamentoAdicionarComponent = (props: any) => {
    const id = props.match.params.id;

    const orcamentoStore = useSelector((s: ApplicationState) => s.orcamento);
    const { isLoading, orcamento } = orcamentoStore;

    const { control, errors, handleSubmit, reset, watch, setValue, triggerValidation } = useForm<OrcamentoEditarForm>();

    const dispatch = useDispatch();

    const callback = (error: any) => {
        if (error) {
            dispatch(AppStore.actionCreators.showSnackBarAction(null, error))
        }
        else {
            dispatch(AppStore.actionCreators.showSnackBarAction({ message: messages.OPERACAO_SUCESSO, type: ISnackBarType.sucesso, title: messages.TITULO_SUCESSO }));
        }
    }

    const onSubmit = (data: any) => {
        dispatch(OrcamentoStore.actionCreators.editarOrcamento(id, data as OrcamentoStore.EditarOrcamento, callback));
    };

    useEffect(() => {
        setForm();
    }, [orcamento]);

    const setForm = () => {
        if (orcamento)
            reset({
                codigo: orcamento.codigo,
                nome: orcamento.nome,
                descricao: orcamento.descricao,
                dataCriacao: formatter.formatarData(orcamento.dataCriacao),
                dataAtualizacao: formatter.formatarData(orcamento.dataAtualizacao)
            })
    }

    return (<>
        <LoadingCard isLoading={isLoading}>
            {orcamento &&
                <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                    <Grid container spacing={3}>
                        <Grid item xs={6} >
                            <Controller
                                as={
                                    <TextField label="Codigo"
                                        fullWidth
                                        disabled
                                    />
                                }
                                name="codigo"
                                control={control}
                                defaultValue="" />
                        </Grid>
                        <Grid item xs={3} >
                            <Controller
                                as={
                                    <TextField label="Data de criação"
                                        fullWidth
                                        disabled
                                    />
                                }
                                name="dataCriacao"
                                control={control}
                                defaultValue="" />
                        </Grid>
                        <Grid item xs={3} >
                            <Controller
                                as={
                                    <TextField label="Data de atualização"
                                        fullWidth
                                        disabled
                                    />
                                }
                                name="dataAtualizacao"
                                control={control}
                                defaultValue="" />
                        </Grid>
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
                                rules={{
                                    required: requiredMessage()
                                }}
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
                                    maxLength: maxLengthMessage(512)
                                }}
                                watch={watch}
                                setValue={setValue}
                                triggerValidation={triggerValidation}
                                trim="ALL" />
                        </Grid>

                        <Grid item xs={12} >
                            <LoadingButton
                                text="Editar"
                                isLoading={isLoading}
                                type="submit"
                                variant="outlined"
                                color="primary"
                                size="large"
                                startIcon={<EditIcon />} />
                        </Grid>
                    </Grid>
                </form>
            }
        </LoadingCard>
    </>);
};

export default withRouter(OrcamentoAdicionarComponent);
