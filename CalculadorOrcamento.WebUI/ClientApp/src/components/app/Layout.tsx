import * as React from 'react';
import NavMenu from './NavMenu';
import { Container } from '@material-ui/core';
import DrawerMenu from './DrawerMenu';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CustomSnackBar from 'components/common/snackBar/SnackBarComponent'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            marginTop: theme.spacing(2),
        },
    }),
);

export default (props: { children?: React.ReactNode }) => {
    const classes = useStyles();
    return (
        <React.Fragment>
            <NavMenu />
            <DrawerMenu />
            <Container maxWidth='xl' className={classes.container}>
                {props.children}
                <CustomSnackBar />
            </Container>
        </React.Fragment>);
};
