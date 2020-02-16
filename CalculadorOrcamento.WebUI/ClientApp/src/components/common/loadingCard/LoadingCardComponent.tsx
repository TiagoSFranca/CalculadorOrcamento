import { CardContent, LinearProgress, CardHeader } from '@material-ui/core';
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

export default function LoadingCard(props: { children?: React.ReactNode, size?: number, isLoading?: boolean, title?: string }) {
    const classes = useStyles();
    return (
        <>
            <Card variant="elevation">
                <LinearProgress color="primary" className={props.isLoading ? classes.default : classes.none} />
                {props.title && <CardHeader title={props.title} />}
                <CardContent>
                    {props.children}
                </CardContent>
            </Card>
        </>
    );
}
