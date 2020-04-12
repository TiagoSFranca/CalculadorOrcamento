﻿import { Grid } from "@material-ui/core";
import TextField from '@material-ui/core/TextField';
import EditIcon from '@material-ui/icons/Edit';
import orcamentoActions from 'actions/orcamentoActions';
import CustomController from 'components/common/hookForm/customController/CustomControllerComponent';
import LoadingButton from 'components/common/loadingButton/LoadingButtonComponent';
import LoadingCard from "components/common/loadingCard/LoadingCardComponent";
import React, { useEffect } from "react";
import { Controller, ErrorMessage, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from 'react-router';
import { ApplicationState } from 'store';
import { EditarOrcamento } from 'store/orcamento/models';
import formatter from "utils/formatter";
import { maxLengthMessage, requiredMessage } from 'utils/hooksValidations';
import loadingHelper from 'utils/loadingHelper';

type OrcamentoEditarForm = {
    id: number;
    codigo: string;
    nome: string;
    descricao: string;
    dataCriacao: string;
    dataAtualizacao: string;
};

const LOADING_IDENTIFIER = "btnEditarOrcamento";

const OrcamentoAdicionarComponent = (props: any) => {
    const id = props.match.params.id;

    const orcamentoStore = useSelector((s: ApplicationState) => s.orcamento);
    const appStore = useSelector((s: ApplicationState) => s.app);

    const { orcamento } = orcamentoStore;
    const { isLoading, loading } = appStore;

    const { control, errors, handleSubmit, reset, watch, setValue, triggerValidation } = useForm<OrcamentoEditarForm>();

    const dispatch = useDispatch();

    const callback = (sucesso: boolean) => { }

    const onSubmit = (data: any) => {
        dispatch(orcamentoActions.editarOrcamento(id, data as EditarOrcamento, callback, LOADING_IDENTIFIER));
    };

    useEffect(() => {
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

        setForm();
    }, [orcamento, reset]);

    return (<>
        <LoadingCard isLoading={isLoading && !loadingHelper.checkIsLoading(loading, LOADING_IDENTIFIER)}>
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
                                isLoading={loadingHelper.checkIsLoading(loading, LOADING_IDENTIFIER)}
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
