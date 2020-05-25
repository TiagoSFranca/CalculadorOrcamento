import { Button, Card, CardActions, CardContent, Checkbox, Grid, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import orcamentoUsuarioActions from 'actions/orcamentoUsuarioActions';
import ConfirmDialog from 'components/common/confirmDialog/ConfirmDialogComponent';
import CustomController from 'components/common/hookForm/customController/CustomControllerComponent';
import LoadingButton from 'components/common/loadingButton/LoadingButtonComponent';
import React, { useState, useEffect } from 'react';
import { ErrorMessage, useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from 'store';
import { EditarOrcamentoUsuario, OrcamentoUsuario, OrcamentoUsuarioPermissao } from 'store/orcamentoUsuario/models';
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
        },
        noPadding: {
            paddingTop: '0 !important',
            paddingBottom: '0 !important'
        },
        noMargin: {
            marginTop: '0',
            marginBottom: '0'
        },
    }),
);

type Props = {
    orcamentoUsuario: OrcamentoUsuario
}

type OrcamentoUsuarioEditarForm = {
    id: number;
    idOrcamento: number;
    idUsuario: number | null;
    permissoes: number[];
    teste: boolean;
};

const LOADING_IDENTIFIER_DELETE = "btnExcluirOrcamentoUsuario";
const LOADING_IDENTIFIER_EDIT = "btnEditarOrcamentoUsuario";

const getPermissoesSelecionadas = (lista: OrcamentoUsuarioPermissao[]) => {
    const permissoes: number[] = [];
    lista.forEach(e => { if (e.permite) permissoes.push(e.idPermissao) });
    return permissoes;
}

const OrcamentoUsuarioItemComponent = (props: Props) => {
    const classes = useStyles();
    const { orcamentoUsuario } = props;

    const { control, errors, handleSubmit, register, watch, setValue, triggerValidation } = useForm<OrcamentoUsuarioEditarForm>();

    const appStore = useSelector((s: ApplicationState) => s.app);
    const { loading } = appStore;

    const dispatch = useDispatch();

    const [edit, setEdit] = useState(false);
    const [openDialogDelete, setOpenDialogDelete] = useState(false);
    const [permissoesSelecionadas, setPermissoesSelecionadas] = useState<number[]>(getPermissoesSelecionadas(orcamentoUsuario.orcamentoUsuarioPermissoes));

    const callback = (sucesso: boolean) => {
        if (sucesso)
            setEdit(false);
    }

    const callbackDelete = (sucesso: boolean) => {
        if (sucesso)
            setOpenDialogDelete(false);
    }

    const onSubmit = (data: OrcamentoUsuarioEditarForm) => {
        data.id = orcamentoUsuario.id;
        data.idOrcamento = orcamentoUsuario.idOrcamento;

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
        dispatch(orcamentoUsuarioActions.excluirOrcamentoUsuario(orcamentoUsuario.id, callbackDelete, LOADING_IDENTIFIER_DELETE));
    }

    const handleSetPermissoesSelecionadas = (el: number) => {
        if (permissoesSelecionadas.includes(el)) {
            let lista = permissoesSelecionadas.filter(e => e !== el);
            setPermissoesSelecionadas(lista);
        } else {
            setPermissoesSelecionadas([...permissoesSelecionadas, el]);
        }
    }

    useEffect(() => {
        setValue("permissoes", permissoesSelecionadas, true)
        triggerValidation("permissoes")
    }, [permissoesSelecionadas, setValue, triggerValidation])


    useEffect(() => { console.log("PERMISSOES", permissoesSelecionadas) }, [permissoesSelecionadas])

    return (
        <>
            <ConfirmDialog open={openDialogDelete} actions={dialogActions()} description={`Deseja excluir o item?`} onClose={onCloseDialog} title={"Excluir"} />

            <Card >
                <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                    <CardContent>
                        <Grid container spacing={3}>
                            <Grid item xs={12} className={classes.noPadding}>
                                <Typography variant="caption" className={classes.label}>Nome</Typography>
                                <Typography variant="overline" className={classes.marginLeft}>
                                    {orcamentoUsuario.usuario.nomeCompleto}
                                </Typography>
                            </Grid>
                            <Grid item xs={12} className={classes.noPadding}>
                                <Typography variant="caption" className={classes.label}>E-mail</Typography>
                                <Typography variant="overline" className={classes.marginLeft}>
                                    {orcamentoUsuario.usuario.email}
                                </Typography>
                            </Grid>
                            <Grid item xs={4} className={classes.noPadding}>
                                <Typography variant="caption" className={classes.label}>Login</Typography>
                                <Typography variant="caption" className={classes.marginLeft}>
                                    {orcamentoUsuario.usuario.login}
                                </Typography>
                            </Grid>
                            <Grid item xs={8} className={classes.noPadding}>
                                <Typography variant="caption" className={classes.label}>Cód.</Typography>
                                <Typography variant="caption" className={classes.marginLeft}>
                                    {orcamentoUsuario.usuario.codigo}
                                </Typography>
                            </Grid>
                            <Grid item xs={12}>
                                <CustomController
                                    as={
                                        <FormControl error={errors.permissoes ? true : false} component="fieldset" disabled={!edit}>
                                            <FormLabel component="legend">
                                                <Typography variant="caption" className={classes.label}>Permissões</Typography>
                                            </FormLabel>
                                            <FormGroup>
                                                {
                                                    orcamentoUsuario.orcamentoUsuarioPermissoes && orcamentoUsuario.orcamentoUsuarioPermissoes.map((orcamentoPermissao) => (
                                                        <FormControlLabel
                                                            key={orcamentoPermissao.idPermissao}
                                                            control={
                                                                <Checkbox
                                                                    checked={permissoesSelecionadas.includes(orcamentoPermissao.idPermissao)}
                                                                    color="primary"
                                                                    ref={register}
                                                                    onChange={() => {
                                                                        handleSetPermissoesSelecionadas(orcamentoPermissao.idPermissao);
                                                                    }}
                                                                />
                                                            }
                                                            label={(
                                                                <Typography variant="caption">
                                                                    {orcamentoPermissao.permissao.nome}
                                                                </Typography>
                                                            )}
                                                        />
                                                    ))
                                                }
                                            </FormGroup>
                                            <ErrorMessage errors={errors} name="permissoes" >
                                                {({ message }) => <FormHelperText className={classes.noMargin}>{message}</FormHelperText>}
                                            </ErrorMessage>
                                        </FormControl>
                                    }
                                    name="permissoes"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: {
                                            value: true,
                                            message: "Necessário selecionar ao menos uma permissão"
                                        },
                                        validate: (value: number[]) => value.length > 0 || "Necessário selecionar ao menos uma permissão"
                                    }}
                                    watch={watch}
                                    setValue={setValue}
                                    triggerValidation={triggerValidation} />
                            </Grid>

                            {
                                //    orcamentoUsuario.orcamentoUsuarioPermissoes.map(permissao =>
                                //    (<Grid item xs={12} className={classes.noPadding}>

                                //        <FormControlLabel disabled control={<Checkbox name="permissoes" checked={permissao.permite} />} label={(
                                //            <Typography variant="caption">
                                //                {permissao.permissao.nome}
                                //            </Typography>
                                //        )} />
                                //    </Grid>)
                                //)
                            }
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