import Card from '@material-ui/core/Card';
import React from 'react';
import { CircularProgress, Grid, CardContent } from '@material-ui/core';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex',
            '& > * + *': {
                marginLeft: theme.spacing(2),
            },
        },
    }),
);

export default function LoadingCard(props: { children?: React.ReactNode, size?: number, isLoading?: boolean }) {
    const classes = useStyles();
    return (
        <>
            <Card >
                <CardContent>
                    {props.isLoading ?
                        <Grid className={classes.root} justify="center"
                            alignItems="center">
                            <CircularProgress color="secondary" size={props.size ? props.size : 100} />
                        </Grid>
                        :
                        props.children}
                </CardContent>
            </Card>
        </>
    );
}
