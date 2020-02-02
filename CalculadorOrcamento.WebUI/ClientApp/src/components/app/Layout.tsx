import * as React from 'react';
import NavMenu from './NavMenu';
import { Container } from '@material-ui/core';
import DrawerMenu from './DrawerMenu';

export default (props: { children?: React.ReactNode }) => (
    <React.Fragment>
        <NavMenu />
        <DrawerMenu />
        <Container maxWidth='xl'>
            {props.children}
        </Container>
    </React.Fragment>
);
