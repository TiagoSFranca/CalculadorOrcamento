import HomeComponent from 'components/home/HomeComponent';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import * as AppStore from 'store/AppStore';


const Home = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(AppStore.actionCreators.changePageTitleAction("Início"))
    }, []);

    return (
        <>
            <HomeComponent />
        </>
    );
};

export default Home;