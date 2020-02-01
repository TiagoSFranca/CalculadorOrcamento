import React from 'react';
import { connect } from 'react-redux';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import * as AppState from 'store/App';
import { ApplicationState } from 'store';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';
import { Link } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import AttachMoneyIcon from '@material-ui/icons/AttachMoney';

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
    const toggle = props.toggleDrawer;
    const classes = useStyles();

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

    const toggleDrawer = () => (
        event: React.KeyboardEvent | React.MouseEvent,
    ) => {
        if (
            event.type === 'keydown' &&
            ((event as React.KeyboardEvent).key === 'Tab' ||
                (event as React.KeyboardEvent).key === 'Shift')
        ) {
            return;
        }

        props.toggleDrawerAction();
    };

    const sideList = () => (
        <div
            className={classes.list}
            role="presentation"
            onClick={toggleDrawer()}
            onKeyDown={toggleDrawer()}
        >
            <List>
                {drawerRoutes.map((el, index) => (
                    <ListItem button key={index} component={Link} to={el.path} onClick={() => { props.changePageTitleAction(el.title) }}>
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
        <Drawer anchor="left" open={toggle} onClose={toggleDrawer()}>
            {sideList()}
        </Drawer>
    );
};

export default connect(
    (state: ApplicationState) => state.app,
    AppState.actionCreators
)(DrawerMenu);