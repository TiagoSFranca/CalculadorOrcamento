import appActions from 'actions/appActions';
import HomeComponent from 'components/home/HomeComponent';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';

const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(appActions.changePageTitleAction("Início"))
    }, [dispatch]);

    return (
        <>
            <HomeComponent />
        </>
    );
};

export default Home;