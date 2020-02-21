﻿import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions, { DialogActionsProps } from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

type Props = {
    open: boolean;
    onClose: Function;
    title: string;
    description: string;
    actions: any
}

const ConfirmDialogComponent = (props: Props) => {

    return (
        <Dialog
            open={props.open}
            onClose={() => props.onClose()}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{props.title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {props.description}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                {props.actions}
            </DialogActions>
        </Dialog>
    );
}

export default ConfirmDialogComponent;