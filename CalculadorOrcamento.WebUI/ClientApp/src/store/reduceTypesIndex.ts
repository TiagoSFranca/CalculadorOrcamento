import * as AppActions from './app/reduceTypes';
import * as AuthActions from './auth/reduceTypes';
import * as OrcamentoActions from "./orcamento/reduceTypes";
import * as OrcamentoItemAplicacaoActions from './orcamentoItemAplicacao/reduceTypes';
import * as OrcamentoPermissaoActions from './orcamentoPermissao/reduceTypes';
import * as OrcamentoUsuarioActions from './orcamentoUsuario/reduceTypes';
import * as OrcamentoValorActions from './orcamentoValor/reduceTypes';

type KnownAction =
    OrcamentoActions.ReceiveOrcamentosAction | OrcamentoActions.AdicionarOrcamentoAction | OrcamentoActions.IsLoadingOrcamentoAction |
    OrcamentoActions.FiltrarOrcamentoAction | OrcamentoActions.SelecionarOrcamentoAction | OrcamentoActions.SetTabAction | OrcamentoActions.SetSearchOrcamento |

    AuthActions.CheckIsAuthAction | AuthActions.IsLoadingAction | AuthActions.SetIsAuthAction |

    OrcamentoItemAplicacaoActions.ReceiveOrcamentoItensAction | OrcamentoItemAplicacaoActions.AdicionarOrcamentoItemAction |
    OrcamentoItemAplicacaoActions.IsLoadingOrcamentoItemAction | OrcamentoItemAplicacaoActions.SetSearchOrcamentoItem |
    AppActions.ToggleDrawerAction | AppActions.ChangePageTitleAction | AppActions.ShowSnackBarAction | AppActions.HideSnackBarAction |

    OrcamentoPermissaoActions.ReceiveOrcamentoPermissoesAction | OrcamentoPermissaoActions.IsLoadingOrcamentoPermissaoAction |
    OrcamentoPermissaoActions.SetSearchOrcamentoPermissao |

    OrcamentoUsuarioActions.ReceiveOrcamentoItensAction | OrcamentoUsuarioActions.AdicionarOrcamentoUsuarioAction | OrcamentoUsuarioActions.IsLoadingOrcamentoUsuarioAction |
    OrcamentoUsuarioActions.SetSearchOrcamentoUsuario |

    OrcamentoValorActions.ReceiveOrcamentoItensAction | OrcamentoValorActions.AdicionarOrcamentoItemAction | OrcamentoValorActions.IsLoadingOrcamentoItemAction |
    OrcamentoValorActions.SetSearchOrcamentoItem;

export default KnownAction;