import { CardContent, LinearProgress, CardHeader } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';
import Backdrop from '@material-ui/core/Backdrop';
import CircularProgress from '@material-ui/core/CircularProgress';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > * + *': {
                marginLeft: theme.spacing(2),
            },
        },
        none: {
            opacity: 0
        },
        default: {

        },
        backdrop: {
            zIndex: 30,
            color: theme.palette.primary.main,
            position: "absolute",
            backgroundColor: '#00000000'
        },
        rootBd: {
            position: "relative"
        },
        opacity:{
            opacity: .3
        }
    }),
);

export default function LoadingCard(props: { children?: React.ReactNode, size?: number, isLoading?: boolean, title?: string }) {
    const classes = useStyles();
    return (
        <>
            <Card variant="elevation">
                <div className={classes.rootBd}>
                    <Backdrop className={classes.backdrop} open={props.isLoading == true ? true : false}>
                        <CircularProgress color="inherit" />
                    </Backdrop>
                    {props.title && <CardHeader title={props.title} />}
                    <CardContent className={props.isLoading == true ? classes.opacity : ''}>
                        {props.children}
                    </CardContent>
                </div>
            </Card>
        </>
    );
}
