import * as React from 'react';
import LoadingCard from 'components/common/loadingCard/LoadingCardComponent';
import { ApplicationState } from 'store';
import * as OrcamentoStore from 'store/OrcamentoStore';
import { connect } from 'react-redux';
import { useEffect } from 'react';

const OrcamentoListComponent = (props: any) => {

    useEffect(() => {
        if (!props.isLoading) {
            props.requestOrcamentos(1)
        }
    }, []);

    useEffect(() => {
        console.log(props.orcamentos);
    })

    return (
        <div>
            <LoadingCard isLoading={props.isLoading}>
                TESTE
            </LoadingCard>
        </div>
    )
};

export default connect(
    (state: ApplicationState) => state.orcamento,
    OrcamentoStore.actionCreators
)(OrcamentoListComponent);