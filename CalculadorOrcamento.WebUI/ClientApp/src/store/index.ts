import * as WeatherForecasts from './WeatherForecasts';
import * as Counter from './Counter';
import * as App from './AppStore'
import * as Orcamento from './OrcamentoStore';
import * as Auth from './AuthStore';
import * as OrcamentoItemAplicacao from './OrcamentoItemAplicacaoStore'
import * as OrcamentoValor from './OrcamentoValorStore'
import * as OrcamentoUsuario from './OrcamentoUsuarioStore'

// The top-level state object
export interface ApplicationState {
    counter: Counter.CounterState | undefined;
    weatherForecasts: WeatherForecasts.WeatherForecastsState | undefined;
    app: App.AppState;
    orcamento: Orcamento.OrcamentoState;
    auth: Auth.AuthState;
    orcamentoItemAplicacao: OrcamentoItemAplicacao.OrcamentoItemAplicacaoState;
    orcamentoValor: OrcamentoValor.OrcamentoValorState;
    orcamentoUsuario: OrcamentoUsuario.OrcamentoUsuarioState;
}

// Whenever an action is dispatched, Redux will update each top-level application state property using
// the reducer with the matching name. It's important that the names match exactly, and that the reducer
// acts on the corresponding ApplicationState property type.
export const reducers = {
    counter: Counter.reducer,
    weatherForecasts: WeatherForecasts.reducer,
    app: App.reducer,
    orcamento: Orcamento.reducer,
    auth: Auth.reducer,
    orcamentoItemAplicacao: OrcamentoItemAplicacao.reducer,
    orcamentoValor: OrcamentoValor.reducer,
    orcamentoUsuario: OrcamentoUsuario.reducer,
};

// This type can be used as a hint on action creators so that its 'dispatch' and 'getState' params are
// correctly typed to match your store.
export interface AppThunkAction<TAction> {
    (dispatch: (action: TAction) => void, getState: () => ApplicationState): void;
}
