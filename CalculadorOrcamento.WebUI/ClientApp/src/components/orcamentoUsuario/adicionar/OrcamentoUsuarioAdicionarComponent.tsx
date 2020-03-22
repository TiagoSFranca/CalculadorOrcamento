import { Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Grid, IconButton, InputAdornment, TextField } from '@material-ui/core';
import FormControl from '@material-ui/core/FormControl';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormLabel from '@material-ui/core/FormLabel';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import orcamentoPermissaoActions from 'actions/orcamentoPermissaoActions';
import orcamentoUsuarioActions from 'actions/orcamentoUsuarioActions';
import NumberFormat from 'components/common/customNumberFormat/CustomNumberFormat';
import CustomController from 'components/common/hookForm/customController/CustomControllerComponent';
import LoadingButton from 'components/common/loadingButton/LoadingButtonComponent';
import React, { useEffect, useState } from 'react';
import { ErrorMessage, useForm } from "react-hook-form";
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router';
import { ApplicationState } from 'store';
import { AdicionarOrcamentoUsuario } from 'store/orcamentoUsuario/models';
import { greaterThanMessage, requiredMessage } from 'utils/hooksValidations';
import loadingHelper from 'utils/loadingHelper';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        noMargin: {
            marginTop: '0',
            marginBottom: '0'
        },
    }),
);

type Props = any & {
    buttonClassName: string
}

type OrcamentoUsuarioAdicionarForm = {
    idOrcamento: number;
    idUsuario: number;
    permissoes: number[];
    teste: boolean;
};

const LOADING_IDENTIFIER = "btnAdicionarOrcamentoUsuario";

const OrcamentoUsuarioAdicionarComponent = (props: Props) => {
    const classes = useStyles();
    const [open, setOpen] = useState(false);
    const [permissoesSelecionadas, setPermissoesSelecionadas] = useState<number[]>([]);

    const { control, errors, handleSubmit, register, watch, setValue, triggerValidation } = useForm<OrcamentoUsuarioAdicionarForm>();

    const appStore = useSelector((s: ApplicationState) => s.app);
    const orcamentoPermissaoStore = useSelector((s: ApplicationState) => s.orcamentoPermissao);

    const { loading } = appStore;
    const { orcamentoPermissoes } = orcamentoPermissaoStore

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
        data.idUsuario = +data.idUsuario;
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
                                        <TextField label="Usuario" error={errors.idUsuario ? true : false}
                                            fullWidth
                                            helperText={
                                                <ErrorMessage errors={errors} name="idUsuario" >
                                                    {({ message }) => message}
                                                </ErrorMessage>
                                            }
                                            InputProps={{
                                                inputComponent: NumberFormat as any,
                                                startAdornment: <InputAdornment position="start">R$</InputAdornment>,
                                            }}
                                            inputRef={register({
                                                validate: value => value > 0 || greaterThanMessage(0)
                                            })}
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