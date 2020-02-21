import DateFnsUtils from '@date-io/date-fns';
import { Card, CardActions, CardContent, createStyles, Grid, makeStyles, TextField, Theme } from '@material-ui/core';
import FindReplaceIcon from '@material-ui/icons/FindReplace';
import SearchIcon from '@material-ui/icons/Search';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import LoadingButton from 'components/common/loadingButton/LoadingButtonComponent';
import 'date-fns';
import ptLocale from "date-fns/locale/pt-BR";
import * as React from 'react';
import { Controller, useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from 'store';
import * as OrcamentoStore from 'store/OrcamentoStore';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        marginLeft: {
            marginLeft: theme.spacing(2),
        },
    }),
);

type OrcamentoFiltrarForm = {
    codigo: string;
    nome: string;
    descricao: string;
    dataCriacaoInicial: Date | null;
    dataCriacaoFinal: Date | null;
    dataAtualizacaoInicial: Date | null;
    dataAtualizacaoFinal: Date | null;
};

const OrcamentoFilter = (props: any) => {
    const classes = useStyles();

    const orcamentoStore = useSelector((s: ApplicationState) => s.orcamento);
    const dispatch = useDispatch();
    const { isLoading, search } = orcamentoStore;
    const { control, handleSubmit, reset, getValues } = useForm<OrcamentoFiltrarForm>();

    const [dataCriacaoInicial, setDataCriacaoInicial] = React.useState<Date | null>(null);
    const [dataCriacaoFinal, setDataCriacaoFinal] = React.useState<Date | null>(null);
    const [dataAtualizacaoInicial, setDataAtualizacaoInicial] = React.useState<Date | null>(null);
    const [dataAtualizacaoFinal, setDataAtualizacaoFinal] = React.useState<Date | null>(null);

    const onSubmit = (data: OrcamentoFiltrarForm, reset: boolean) => {
        if (!reset) {
            data.dataCriacaoInicial = dataCriacaoInicial;
            data.dataCriacaoFinal = dataCriacaoFinal;
            data.dataAtualizacaoInicial = dataAtualizacaoInicial;
            data.dataAtualizacaoFinal = dataAtualizacaoFinal;
        }

        dispatch(OrcamentoStore.actionCreators.filtrarOrcamentos(data as OrcamentoStore.FiltroOrcamento));
    };

    const onLimpar = () => {
        reset({
            codigo: '',
            nome: '',
            descricao: '',
            dataAtualizacaoFinal: null,
            dataAtualizacaoInicial: null,
            dataCriacaoFinal: null,
            dataCriacaoInicial: null,
        });

        setDataCriacaoInicial(null);
        setDataCriacaoFinal(null);
        setDataAtualizacaoInicial(null);
        setDataAtualizacaoFinal(null);

        onSubmit(getValues(), true)
    }

    return (
        <>
            <div>
                <Card>
                    <CardContent>
                        <form onSubmit={handleSubmit((data) => onSubmit(data, false))} noValidate autoComplete="off">
                            <Grid container spacing={3}>
                                <Grid item xs={3}>
                                    <Controller as={
                                        <TextField label="Codigo" fullWidth />
                                    } name="codigo" control={control} defaultValue="" />
                                </Grid>
                                <Grid item xs={3} >
                                    <Controller as={
                                        <TextField label="Nome" fullWidth />
                                    } name="nome" control={control} defaultValue="" />
                                </Grid>
                                <Grid item xs={6} >
                                    <Controller as={
                                        <TextField label="Descrição" fullWidth />
                                    } name="descricao" control={control} defaultValue="" />
                                </Grid>
                                <Grid item xs={3} >
                                    <Controller as={
                                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptLocale}>
                                            <KeyboardDatePicker
                                                fullWidth
                                                disableToolbar
                                                variant="inline"
                                                format="dd/MM/yyyy"
                                                margin="normal"
                                                label="Data de Criação Inicial"
                                                value={dataCriacaoInicial}
                                                onChange={setDataCriacaoInicial}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    } name="dataCriacaoInicial" control={control} defaultValue="" />
                                </Grid>
                                <Grid item xs={3} >
                                    <Controller as={
                                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptLocale}>
                                            <KeyboardDatePicker
                                                fullWidth
                                                disableToolbar
                                                variant="inline"
                                                format="dd/MM/yyyy"
                                                margin="normal"
                                                label="Data de Criação Final"
                                                value={dataCriacaoFinal}
                                                onChange={setDataCriacaoFinal}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    } name="dataCriacaoFinal" control={control} defaultValue="" />
                                </Grid>
                                <Grid item xs={3} >
                                    <Controller as={
                                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptLocale}>
                                            <KeyboardDatePicker
                                                fullWidth
                                                disableToolbar
                                                variant="inline"
                                                format="dd/MM/yyyy"
                                                margin="normal"
                                                label="Data de Atualização Inicial"
                                                value={dataAtualizacaoInicial}
                                                onChange={setDataAtualizacaoInicial}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    } name="dataAtualizacaoInicial" control={control} defaultValue="" />
                                </Grid>
                                <Grid item xs={3} >
                                    <Controller as={
                                        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={ptLocale}>
                                            <KeyboardDatePicker
                                                fullWidth
                                                disableToolbar
                                                variant="inline"
                                                format="dd/MM/yyyy"
                                                margin="normal"
                                                label="Data de Atualização Final"
                                                value={dataAtualizacaoFinal}
                                                onChange={setDataAtualizacaoFinal}
                                                KeyboardButtonProps={{
                                                    'aria-label': 'change date',
                                                }}
                                            />
                                        </MuiPickersUtilsProvider>
                                    } name="dataAtualizacaoFinal" control={control} defaultValue="" />
                                </Grid>
                                <Grid item xs={12} >
                                    <LoadingButton
                                        text="Limpar"
                                        isLoading={isLoading && search}
                                        variant="outlined"
                                        color="primary"
                                        size="large"
                                        startIcon={<FindReplaceIcon />}
                                        onClick={() => onLimpar()} />
                                    <LoadingButton
                                        className={classes.marginLeft}
                                        text="Pesquisar"
                                        isLoading={isLoading && search}
                                        type="submit"
                                        variant="outlined"
                                        color="primary"
                                        size="large"
                                        startIcon={<SearchIcon />} />
                                </Grid>
                            </Grid>
                            <CardActions>
                            </CardActions>
                        </form>
                    </CardContent>
                </Card>
            </div>

        </>
    );
};

export default OrcamentoFilter;