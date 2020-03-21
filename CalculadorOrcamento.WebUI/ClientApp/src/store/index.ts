import * as App from './app/appStore'
import * as Orcamento from './orcamento/orcamentoStore';
import * as Auth from './auth/authStore';
import * as OrcamentoItemAplicacao from './orcamentoItemAplicacao/orcamentoItemAplicacaoStore'
import * as OrcamentoValor from './orcamentoValor/orcamentoValorStore'
import * as OrcamentoUsuario from './orcamentoUsuario/orcamentoUsuarioStore'
import * as OrcamentoPermissao from './orcamentoPermissao/orcamentoPermissaoStore'

// The top-level state object
export interface ApplicationState {
    app: App.AppState;
    orcamento: Orcamento.OrcamentoState;
    auth: Auth.AuthState;
    orcamentoItemAplicacao: OrcamentoItemAplicacao.OrcamentoItemAplicacaoState;
    orcamentoValor: OrcamentoValor.OrcamentoValorState;
    orcamentoUsuario: OrcamentoUsuario.OrcamentoUsuarioState;
    orcamentoPermissao: OrcamentoPermissao.OrcamentoPermissaoState;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    app: App.reducer,
    orcamento: Orcamento.reducer,
    auth: Auth.reducer,
    orcamentoItemAplicacao: OrcamentoItemAplicacao.reducer,
    orcamentoValor: OrcamentoValor.reducer,
    orcamentoUsuario: OrcamentoUsuario.reducer,
    orcamentoPermissao: OrcamentoPermissao.reducer
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
