import Divider from '@material-ui/core/Divider';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';
import HomeIcon from '@material-ui/icons/Home';
import MailIcon from '@material-ui/icons/Mail';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ApplicationState } from 'store';
import * as AppStore from 'store/AppStore';

export interface DrawerRouteItem {
    title: string,
    path: string,
    icon: any
}

const useStyles = makeStyles(() =>
    createStyles({
        list: {
            width: 250,
        },
        fullList: {
            width: 'auto',
        },
    }),
);

const DrawerMenu = (props: any) => {
    const appStore = useSelector((s: ApplicationState) => s.app);
    const dispatch = useDispatch();
    const classes = useStyles();

    const { toggleDrawer } = appStore;

    const drawerRoutes: DrawerRouteItem[] = [
        {
            title: 'Inicio',
            path: '/',
            icon: <HomeIcon />
        },
        {
            title: 'Contador',
            path: '/counter',
            icon: null
        },
        {
            title: 'Obter Dados',
            path: '/fetch-data/',
            icon: null
        },
        {
            title: 'Orçamentos',
            path: '/orcamento/',
            icon: <AttachMoneyIcon />
        },
    ]

    const onToggleDrawer = () => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        toggle();
    };

    const toggle = () => {
        dispatch(AppStore.actionCreators.toggleDrawerAction())
    }

    const sideList = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={onToggleDrawer()}
            onKeyDown={onToggleDrawer()}
        >
            <List>
                {drawerRoutes.map((el, index) => (
                    <ListItem button key={index} component={Link} to={el.path} onClick={() => { dispatch(AppStore.actionCreators.changePageTitleAction(el.title)) }}>
                        {el.icon ?
                            <ListItemIcon>{el.icon}</ListItemIcon> :
                            null}
                        <ListItemText primary={el.title} />
                    </ListItem>
                ))}
            </List>
            <Divider />
            <List>
                {['All mail', 'Trash', 'Spam'].map((text, index) => (
                    <ListItem button key={text}>
                        <ListItemIcon>{index % 2 === 0 ? <InboxIcon /> : <MailIcon />}</ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItem>
                ))}
            </List>
        </div>
    );


    return (
        <Drawer anchor="left" open={toggleDrawer} onClose={onToggleDrawer()}>
            {sideList()}
        </Drawer>
    );
};

export default DrawerMenu;