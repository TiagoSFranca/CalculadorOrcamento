import appActions from 'actions/appActions';
import orcamentoActions from 'actions/orcamentoActions';
import CustomBreadcrumbs from 'components/app/breadcrumbs/CustomBreadcrumbs';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { withRouter } from 'react-router-dom';
import { ApplicationState } from 'store';
import { OrcamentoIndexBreadcrumb } from 'utils/breadcrumbs';

const OrcamentoEditarHeaderComponent = (props: any) => {
    const { history } = props;
    const id = props.match.params.id;

    const dispatch = useDispatch();

    const orcamentoStore = useSelector((s: ApplicationState) => s.orcamento);
    const { orcamento } = orcamentoStore;

    useEffect(() => {
        const getCallback = (error: any) => {
            if (error) {
                dispatch(appActions.showSnackBarAction(null, error));
                history.push('/orcamento');
            }
        }

        dispatch(orcamentoActions.selecionarOrcamento(id, getCallback));
    }, [dispatch, id, history]);

    useEffect(() => {
        dispatch(appActions.changePageTitleAction(orcamento ? orcamento.nome : ''))
    }, [orcamento, dispatch])

    return (<>
        <CustomBreadcrumbs showHome={true} itens={[OrcamentoIndexBreadcrumb, { name: orcamento ? orcamento.nome : '', to: '' }]} />
    </>)
}

export default withRouter(OrcamentoEditarHeaderComponent);
