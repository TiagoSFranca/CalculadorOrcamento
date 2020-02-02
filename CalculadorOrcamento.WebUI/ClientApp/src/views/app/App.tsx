import Layout from 'components/app/Layout';
import * as React from 'react';
import { Route } from 'react-router';
import { routes } from 'routes';

export default () => (
    <Layout>
        {
            routes.map((el, index) => (
                el.exact ?
                    <Route exact path={el.path} component={el.component} key={index} /> :
                    <Route path={el.path} component={el.component} key={index} />
            ))
        }
    </Layout>
);
