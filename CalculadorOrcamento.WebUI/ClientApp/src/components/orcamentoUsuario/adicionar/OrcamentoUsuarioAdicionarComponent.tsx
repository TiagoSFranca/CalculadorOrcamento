import { Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, Typography } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { RenderOptionState } from '@material-ui/lab/Autocomplete';
import orcamentoPermissaoActions from 'actions/orcamentoPermissaoActions';
import orcamentoUsuarioActions from 'actions/orcamentoUsuarioActions';
import HighlightComponent from 'components/common/highlight/HighlightComponent';
import CustomController from 'components/common/hookForm/customController/CustomControllerComponent';
import LoadingButton from 'components/common/loadingButton/LoadingButtonComponent';
import AutoCompeteComponent from 'components/common/autoComplete/AutoCompleteComponent';
import React, { useEffect, useState } from 'react';
import { ErrorMessage, useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { ApplicationState } from 'store';
import { Usuario } from 'store/auth/models';
import { AdicionarOrcamentoUsuario } from 'store/orcamentoUsuario/models';
import { requiredMessage } from 'utils/hooksValidations';
import loadingHelper from 'utils/loadingHelper';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        noMargin: {
            marginTop: '0',
            marginBottom: '0'
        },
        text: {
            flexGrow: 1,
        },
        label: {
            color: theme.palette.text.secondary,
            fontSize: "0.6rem"
        },
        marginLeft: {
            marginLeft: theme.spacing(1)
        },
    }),
);

type Props = any & {
    buttonClassName: string
}

type OrcamentoUsuarioAdicionarForm = {
    idOrcamento: number;
    idUsuario: number | null;
    permissoes: number[];
    teste: boolean;
};

const LOADING_IDENTIFIER = "btnAdicionarOrcamentoUsuario";
const LOADING_IDENTIFIER_AUTOCOMPLETE = "autoCompleteUsurio";

const OrcamentoUsuarioAdicionarComponent = (props: Props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [permissoesSelecionadas, setPermissoesSelecionadas] = useState<number[]>([]);
    const [usuarioSelecionado, setUsuarioSelecionado] = useState<number | null>(null);

    const { control, errors, handleSubmit, register, watch, setValue, triggerValidation } = useForm<OrcamentoUsuarioAdicionarForm>();

    const appStore = useSelector((s: ApplicationState) => s.app);
    const orcamentoPermissaoStore = useSelector((s: ApplicationState) => s.orcamentoPermissao);
    const orcamentoUsuarioStore = useSelector((s: ApplicationState) => s.orcamentoUsuario);

    const { loading } = appStore;
    const { orcamentoPermissoes } = orcamentoPermissaoStore
    const { usuarios } = orcamentoUsuarioStore;

    const dispatch = useDispatch();

    const id = props.match.params.id;

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const callback = (sucesso: boolean) => {
        if (sucesso)
            setOpen(false);
    }

    const onSubmit = (data: OrcamentoUsuarioAdicionarForm) => {
        data.idOrcamento = +id;
        data.idUsuario = data.idUsuario ? +data.idUsuario : 0;
        data.permissoes = permissoesSelecionadas;
        dispatch(orcamentoUsuarioActions.adicionarOrcamentoUsuario(data as AdicionarOrcamentoUsuario, callback, LOADING_IDENTIFIER));
    };

    const handleSetPermissoesSelecionadas = (el: number) => {
        if (permissoesSelecionadas.includes(el)) {
            let lista = permissoesSelecionadas.filter(e => e !== el);
            setPermissoesSelecionadas(lista);
        } else {
            setPermissoesSelecionadas([...permissoesSelecionadas, el]);
        }
    }

    useEffect(() => {
        dispatch(orcamentoPermissaoActions.requestOrcamentoPermissoes(() => { }));
    }, []);

    useEffect(() => {
        setValue("permissoes", permissoesSelecionadas, true)
        triggerValidation("permissoes")
    }, [permissoesSelecionadas])

    useEffect(() => {
        setValue("idUsuario", usuarioSelecionado, true)
        triggerValidation("idUsuario")
        console.log(usuarioSelecionado)
    }, [usuarioSelecionado]);

    const renderUsuarioOptions = (option: Usuario, state: RenderOptionState) => {
        const { inputValue } = state;

        return (<>
            <React.Fragment>
                <div className={classes.text}>
                    <Grid container>
                        <Grid item xs={12} className={classes.noMargin}>
                            <Typography variant="caption" className={classes.label}>Nome</Typography>
                            <Typography variant="overline" className={classes.marginLeft}>
                                <HighlightComponent value={option.nomeCompleto} partValue={inputValue} />
                            </Typography>
                        </Grid>
                        <Grid item xs={12} className={classes.noMargin}>
                            <Typography variant="caption" className={classes.label}>E-mail</Typography>
                            <Typography variant="overline" className={classes.marginLeft}>
                                <HighlightComponent value={option.email} partValue={inputValue} />
                            </Typography>
                        </Grid>
                        <Grid item xs={4} className={classes.noMargin}>
                            <Typography variant="caption" className={classes.label}>Login</Typography>
                            <Typography variant="caption" className={classes.marginLeft}>
                                <HighlightComponent value={option.login} partValue={inputValue} />
                            </Typography>
                        </Grid>
                        <Grid item xs={8} className={classes.noMargin}>
                            <Typography variant="caption" className={classes.label}>Cód.</Typography>
                            <Typography variant="caption" className={classes.marginLeft}>
                                <HighlightComponent value={option.codigo} partValue={inputValue} />
                            </Typography>
                        </Grid>
                    </Grid>
                </div>
            </React.Fragment>
        </>);
    }

    const pesquisar = (termo: string) => {
        dispatch(orcamentoUsuarioActions.requestUsuarios(id, termo, LOADING_IDENTIFIER_AUTOCOMPLETE));
    }

    return (
        <>
            <IconButton color="primary" className={props.buttonClassName} onClick={handleClickOpen}>
                <AddIcon />
            </IconButton>
            <Dialog open={open} aria-labelledby="form-dialog-title" fullWidth={true}>
                <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
                    <DialogTitle id="form-dialog-title">Adicionar Usuario</DialogTitle>
                    <DialogContent>
                        <Grid container spacing={3} className={classes.noMargin}>
                            <Grid item xs={12}>
                                <CustomController
                                    as={
                                        <AutoCompeteComponent<Usuario>
                                            loading={loadingHelper.checkIsLoading(loading, LOADING_IDENTIFIER_AUTOCOMPLETE)}
                                            renderOption={renderUsuarioOptions}
                                            getOptionLabel={option => option.email}
                                            getOptionSelected={(option, value) => option.email === value.email}
                                            dados={usuarios || []}
                                            onKeyPress={pesquisar}
                                            onSelect={(value) => setUsuarioSelecionado(value ? value.id : null)}
                                            error={errors.idUsuario ? true : false}
                                            helperText={
                                                <ErrorMessage errors={errors} name="idUsuario" >
                                                    {({ message }) => message}
                                                </ErrorMessage>
                                            }
                                        />
                                    }
                                    name="idUsuario"
                                    control={control}
                                    defaultValue=""
                                    rules={{
                                        required: requiredMessage()
                                    }}
                                    watch={watch}
                                    setValue={setValue}
                                    triggerValidation={triggerValidation} />
                            </Grid>
                            <Divider />
                            <Grid item xs={12}>
                                <CustomController
                                    as={
                                        <FormControl error={errors.permissoes ? true : false} component="fieldset">
                                            <FormLabel component="legend">Permissões</FormLabel>
                                            <FormGroup>
                                                {
                                                    orcamentoPermissoes && orcamentoPermissoes.map((orcamentoPermissao) => (
                                                        <FormControlLabel
                                                            key={orcamentoPermissao.id}
                                                            control={
                                                                <Checkbox
                                                                    color="primary"
                                                                    ref={register}
                                                                    onChange={() => {
                                                                        handleSetPermissoesSelecionadas(orcamentoPermissao.id);
                                                                    }}
                                                                />
                                                            }
                                                            label={orcamentoPermissao.nome}
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
                        </Grid>
                    </DialogContent>
                    <DialogActions>
                        <LoadingButton onClick={handleClose} color="primary" text="Cancelar" isLoading={loadingHelper.checkIsLoading(loading, LOADING_IDENTIFIER)} />
                        <LoadingButton color="primary" text="Adicionar" type="submit" isLoading={loadingHelper.checkIsLoading(loading, LOADING_IDENTIFIER)} />
                    </DialogActions>
                </form>
            </Dialog>
        </>
    );
}

export default withRouter(OrcamentoUsuarioAdicionarComponent);