import Snackbar from '@material-ui/core/Snackbar';
import { makeStyles, Theme } from '@material-ui/core/styles';
import { AlertTitle } from '@material-ui/lab';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import React, { useState } from 'react';
import { ApplicationState } from 'store';
import * as AppStore from 'store/AppStore';
import { useSelector, useDispatch } from 'react-redux';
import { ISnackBarType } from 'utils/snackBar';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={10} variant="filled" {...props} />;
}

const useStyles = makeStyles((theme: Theme) => ({
    root: {
        width: '100%',
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));

const CustomSnackBar = () => {
    const classes = useStyles();
    const appStore = useSelector((s: ApplicationState) => s.app);
    const dispatch = useDispatch();

    const { snackBar } = appStore;

    const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        dispatch(AppStore.actionCreators.hideSnackBarAction());
    };

    const getSeverity = (type: ISnackBarType) => {
        switch (type) {
            case ISnackBarType.erro:
                return "error";
            case ISnackBarType.info:
                return "info";
            default:
                return "success"
        }
    }

    return (
        snackBar != null ? (
            <Snackbar open={snackBar != null} autoHideDuration={6000} onClose={handleClose}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}>
                <Alert onClose={handleClose} severity={getSeverity(snackBar.type)}>
                    {
                        snackBar.title != null ? (<AlertTitle>{snackBar.title}</AlertTitle>) : (null)
                    }
                    {snackBar.message}
                </Alert>
            </Snackbar >) : null
    );
}

export default CustomSnackBar;