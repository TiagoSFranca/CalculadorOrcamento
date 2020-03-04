import { Container } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import CustomSnackBar from 'components/common/snackBar/SnackBarComponent';
import * as React from 'react';
import { useSelector } from 'react-redux';
import { ApplicationState } from 'store';
import DrawerMenu from './DrawerMenu';
import NavMenu from './NavMenu';
import BackToTop from 'components/app/ScrollToTop'

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            marginTop: theme.spacing(2),
        },
    }),
);

export default (props: { children?: React.ReactNode }) => {
    const classes = useStyles();

    const appStore = useSelector((s: ApplicationState) => s.auth);
    const { isAuth } = appStore;

    return (
        <React.Fragment>
            {isAuth && <NavMenu />}
            {isAuth && <DrawerMenu />}
            <Container maxWidth='xl' className={classes.container}>
                {props.children}
                <CustomSnackBar />
            </Container>
            {isAuth && <BackToTop {...props} />}
        </React.Fragment>);
};
