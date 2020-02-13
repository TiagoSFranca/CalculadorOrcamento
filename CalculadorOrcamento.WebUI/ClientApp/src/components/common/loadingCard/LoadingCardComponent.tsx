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
        none: {
            opacity: 0
        },
        default: {

        }
    }),
);

export default function LoadingCard(props: { children?: React.ReactNode, size?: number, isLoading?: boolean }) {
    const classes = useStyles();
    return (
        <>
            <Card >
                <LinearProgress color="primary" className={props.isLoading ? classes.default : classes.none} />
                <CardContent>
                    {props.children}
                </CardContent>
            </Card>
        </>
    );
}
