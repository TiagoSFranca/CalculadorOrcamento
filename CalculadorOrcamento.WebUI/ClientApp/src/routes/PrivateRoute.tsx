import authActions from 'actions/authActions';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { ApplicationState } from 'store';

const PrivateRoute = (props: any) => {
    const appStore = useSelector((s: ApplicationState) => s.auth);
    const { isAuth } = appStore;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(authActions.checkIsAuthAction())
    }, [])

    return (
        <Route
            {...props}
            render={({ location }) =>
                isAuth ? (
                    props.children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/login",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    );
}

export default PrivateRoute;