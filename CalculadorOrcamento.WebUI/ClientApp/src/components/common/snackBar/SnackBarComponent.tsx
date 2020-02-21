﻿import Snackbar from '@material-ui/core/Snackbar';
import { AlertTitle } from '@material-ui/lab';
import MuiAlert, { AlertProps } from '@material-ui/lab/Alert';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from 'store';
import * as AppStore from 'store/AppStore';
import { ISnackBarType } from 'utils/snackBar';

function Alert(props: AlertProps) {
    return <MuiAlert elevation={10} variant="filled" {...props} />;
}

const CustomSnackBar = () => {
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