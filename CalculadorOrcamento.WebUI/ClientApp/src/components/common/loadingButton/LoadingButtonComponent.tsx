import Button, { ButtonProps } from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { green } from '@material-ui/core/colors';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import React from 'react';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'inline-flex',
            alignItems: 'center',
        },
        wrapper: {
            position: 'relative',
        },
        buttonProgress: {
            color: green[500],
            position: 'absolute',
            top: '50%',
            left: '50%',
            marginTop: -12,
            marginLeft: -12,
        },
    }),
);

type Props = ButtonProps & {
    loading: boolean;
    text: string;
}

const LoadingButtonComponent = (props: Props) => {
    const classes = useStyles();
    return (
        <>
            <div className={classes.root}>
                <div className={classes.wrapper}>
                    <Button {...props} disabled={props.loading}>
                        {props.text}
                    </Button>
                    {props.loading && <CircularProgress size={24} className={classes.buttonProgress}/>}
                </div>
            </div>
        </>
    );
}

export default LoadingButtonComponent;