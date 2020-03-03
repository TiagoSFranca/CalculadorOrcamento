import Layout from 'components/app/Layout';
import * as React from 'react';
import { Route, withRouter, Switch } from 'react-router';
import { routes } from 'routes';
import PrivateRoute from 'routes/PrivateRoute';

const privateRoutes = routes.filter(e => e.isPrivate);
const publicRoutes = routes.filter(e => !e.isPrivate);

const App = () => {
    return (
        <Layout>
            {
                publicRoutes.map((el, index) => (
                    el.exact ?
                        <Route exact path={el.path} component={el.component} key={index} /> :
                        <Route path={el.path} component={el.component} key={index} />
                ))
            }
            {
                privateRoutes.map((el, index) => (
                    el.exact ?
                        (<PrivateRoute exact path={el.path} key={index}  >
                            <el.component />
                        </PrivateRoute>) :
                        (<PrivateRoute path={el.path} key={index} >
                            <el.component />
                        </PrivateRoute>)
                ))
            }
        </Layout>
    );
};

export default withRouter(App);