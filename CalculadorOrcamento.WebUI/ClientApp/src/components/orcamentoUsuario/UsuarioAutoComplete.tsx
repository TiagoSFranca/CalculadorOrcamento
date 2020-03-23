import React, { useState, useEffect } from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';
import CircularProgress from '@material-ui/core/CircularProgress';
import orcamentoUsuarioActions from 'actions/orcamentoUsuarioActions';
import { useDispatch, useSelector } from 'react-redux';
import { Usuario } from 'store/auth/models';
import { ApplicationState } from 'store';
import { withRouter } from 'react-router';
import loadingHelper from 'utils/loadingHelper';

const LOADING_IDENTIFIER = "buscaUsuarios";

const OrcamentoUsuarioAutoCompleteComponent = (props: any) => {

    const id = props.match.params.id;

    const orcamentoUsuarioStore = useSelector((s: ApplicationState) => s.orcamentoUsuario);
    const appStore = useSelector((s: ApplicationState) => s.app);

    const { usuarios } = orcamentoUsuarioStore;
    const { loading } = appStore;

    const [open, setOpen] = React.useState(false);
    const [options, setOptions] = useState<Usuario[]>([]);
    const dispatch = useDispatch();

    useEffect(() => {
        if (!open) {
            setOptions([]);
        }
    }, [open]);

    useEffect(() => {
        setOptions(usuarios ? usuarios : []);
    }, [usuarios])

    const handleOnChange = (event: object, value: string, reason: string) => {
        if (value && reason === "input") {
            dispatch(orcamentoUsuarioActions.requestUsuarios(id, value, LOADING_IDENTIFIER));
        }
    }

    return (
        <Autocomplete
            id="asynchronous-demo"
            open={open}
            onOpen={() => {
                setOpen(true);
            }}
            onClose={() => {
                setOpen(false);
            }}
            getOptionSelected={(option, value) => option.nome === value.nome}
            getOptionLabel={option => option.nome}
            options={options}
            loading={loadingHelper.checkIsLoading(loading, LOADING_IDENTIFIER)}
            onInputChange={handleOnChange}
            renderInput={params => (
                <TextField
                    {...params}
                    label="Usuário"
                    fullWidth
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <React.Fragment>
                                {loadingHelper.checkIsLoading(loading, LOADING_IDENTIFIER) ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </React.Fragment>
                        ),
                    }}
                />
            )}
        />
    );
}

export default withRouter(OrcamentoUsuarioAutoCompleteComponent);