import LoadingCard from 'components/common/loadingCard/LoadingCardComponent';
import * as React from 'react';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ApplicationState } from 'store';
import * as OrcamentoStore from 'store/OrcamentoStore';

const OrcamentoListComponent = (props: any) => {

    const orcamentoStore = useSelector((s: ApplicationState) => s.orcamento);
    const dispatch = useDispatch();

    const { isLoading, orcamentos } = orcamentoStore;

    useEffect(() => {
        if (!isLoading) {
            dispatch(OrcamentoStore.actionCreators.requestOrcamentos(1));
        }
    }, []);

    useEffect(() => {
        console.log(orcamentos);
    })

    return (
        <div>
            <LoadingCard isLoading={props.isLoading}>
                TESTE
            </LoadingCard>
        </div>
    )
};

export default OrcamentoListComponent;