import { CardContent, LinearProgress } from '@material-ui/core';
import Card from '@material-ui/core/Card';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

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
                {props.isLoading &&
                    <LinearProgress color="primary" />}
                <CardContent>
                    {props.children}
                </CardContent>
            </Card>
        </>
    );
}
