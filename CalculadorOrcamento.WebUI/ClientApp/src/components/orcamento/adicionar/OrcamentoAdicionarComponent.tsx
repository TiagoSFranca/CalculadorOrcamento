import { Card, CardActions, CardContent, Grid } from "@material-ui/core";
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import SaveIcon from '@material-ui/icons/Save';
import orcamentoActions from 'actions/orcamentoActions';
import CustomController from 'components/common/hookForm/customController/CustomControllerComponent';
import LoadingButton from 'components/common/loadingButton/LoadingButtonComponent';
import React from "react";
import { ErrorMessage, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { withRouter } from 'react-router';
import { ApplicationState } from 'store';
import { AdicionarOrcamento } from "store/orcamento/models";
import { maxLengthMessage, requiredMessage } from 'utils/hooksValidations';
import loadingHelper from "utils/loadingHelper";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            marginTop: theme.spacing(2),
        },
    }),
);

type OrcamentoAdicionarForm = {
    nome: string;
    descricao: string;
};

const LOADING_IDENTIFIER = "btnAdicionarOrcamento";

const OrcamentoAdicionarComponent = (props: any) => {
    const classes = useStyles();

    const orcamentoStore = useSelector((s: ApplicationState) => s.app);
    const { loading } = orcamentoStore;

    const { control, errors, handleSubmit, watch, setValue, triggerValidation } = useForm<OrcamentoAdicionarForm>();

    const dispatch = useDispatch();

    const callback = (sucesso: boolean) => {
        if (sucesso) {
            props.history.push('/orcamento');
        }
    }

    const onSubmit = (data: any) => {
        dispatch(orcamentoActions.adicionarOrcamento(data as AdicionarOrcamento, callback, LOADING_IDENTIFIER));
    };

    return (<>
        <Grid container justify="center">
            <Grid item xs={12} >
                <Card>
                    <CardContent>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate autoComplete="off">
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

                            <CardActions
                                className={classes.container}>
                                <Grid item xs={12} >
                                    <LoadingButton
                                        isLoading={loadingHelper.checkIsLoading(loading, LOADING_IDENTIFIER)}
                                        type="submit"
                                        variant="outlined"
                                        color="primary"
                                        size="large"
                                        startIcon={<SaveIcon />}
                                        text="Adicionar" />
                                </Grid>
                            </CardActions>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>

    </>);
};

export default withRouter(OrcamentoAdicionarComponent);
