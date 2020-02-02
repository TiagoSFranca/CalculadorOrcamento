import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Redirect, Route } from 'react-router';
import { ApplicationState } from 'store';
import * as AuthStore from 'store/AuthStore';

const PrivateRoute = (props: any) => {
    const appStore = useSelector((s: ApplicationState) => s.auth);
    const { isAuth } = appStore;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(AuthStore.actionCreators.checkIsAuthAction())
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