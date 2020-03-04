import AppBar from '@material-ui/core/AppBar';
import IconButton from '@material-ui/core/IconButton';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import MenuIcon from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import ConfirmDialog from 'components/common/confirmDialog/ConfirmDialogComponent';
import LoadingButton from 'components/common/loadingButton/LoadingButtonComponent';
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from 'store';
import * as AppStore from 'store/AppStore';
import * as AuthStore from 'store/AuthStore';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        toolbar: {
            color: theme.palette.primary.main,
            backgroundColor: "white"
        },
        title: {
            flexGrow: 1,
            color: "#6c757d"
        }
    }),
);

interface Props {
    window?: () => Window;
    children: React.ReactElement;
}

function ElevationScroll(props: Props) {
    const { children, window } = props;
    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 0,
        target: window ? window() : undefined,
    });

    return React.cloneElement(children, {
        elevation: trigger ? 4 : 0,
    });
}

const NavMenu = (props: any) => {
    const classes = useStyles();
    const appStore = useSelector((s: ApplicationState) => s.app);
    const dispatch = useDispatch();

    const [openDialogLogout, setOpenDialogLogout] = useState(false);

    const dialogActions = () => {
        return (<>
            <LoadingButton size="small" onClick={onCloseDialog} color="inherit" text="Cancelar" isLoading={false} />
            <LoadingButton size="small" onClick={confirmLogout} color="secondary" text="Sair" isLoading={false} />
        </>)
    }

    const handleLogout = () => {
        setOpenDialogLogout(true);
    }

    const onCloseDialog = () => {
        setOpenDialogLogout(false);
    }

    const confirmLogout = () => {
        dispatch(AuthStore.actionCreators.logout());
    }

    return (
        <div className={classes.root}>
            <ElevationScroll {...props}>
                <AppBar className={classes.toolbar}>
                    <Toolbar>
                        <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => { dispatch(AppStore.actionCreators.toggleDrawerAction()) }}>
                            <MenuIcon />
                        </IconButton>
                        <Typography variant="h6" className={classes.title} color="inherit">{appStore.pageTitle}</Typography>
                        <IconButton color="inherit">
                            <SettingsIcon />
                        </IconButton>
                        <IconButton color="inherit" edge="end" onClick={handleLogout}>
                            <ExitToAppIcon />
                        </IconButton>
                    </Toolbar >
                </AppBar>
            </ElevationScroll>
            <Toolbar id="back-to-top-anchor" />

            <ConfirmDialog open={openDialogLogout} actions={dialogActions()} description={`Deseja sair?`} onClose={onCloseDialog} title={"Sair"} />
        </div>
    );
};

export default NavMenu;
