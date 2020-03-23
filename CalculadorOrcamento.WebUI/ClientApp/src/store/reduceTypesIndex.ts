import * as AppActions from './app/reduceTypes';
import * as AuthActions from './auth/reduceTypes';
import * as OrcamentoActions from "./orcamento/reduceTypes";
import * as OrcamentoItemAplicacaoActions from './orcamentoItemAplicacao/reduceTypes';
import * as OrcamentoPermissaoActions from './orcamentoPermissao/reduceTypes';
import * as OrcamentoUsuarioActions from './orcamentoUsuario/reduceTypes';
import * as OrcamentoValorActions from './orcamentoValor/reduceTypes';

type KnownAction =
    OrcamentoActions.ReceiveOrcamentosAction | OrcamentoActions.AdicionarOrcamentoAction |
    OrcamentoActions.FiltrarOrcamentoAction | OrcamentoActions.SelecionarOrcamentoAction | OrcamentoActions.SetTabAction | OrcamentoActions.SetSearchOrcamento |

    AuthActions.CheckIsAuthAction | AuthActions.IsLoadingAction | AuthActions.SetIsAuthAction |

    OrcamentoItemAplicacaoActions.ReceiveOrcamentoItensAction | OrcamentoItemAplicacaoActions.AdicionarOrcamentoItemAction |
    OrcamentoItemAplicacaoActions.SetSearchOrcamentoItem |

    AppActions.ToggleDrawerAction | AppActions.ChangePageTitleAction | AppActions.ShowSnackBarAction | AppActions.HideSnackBarAction | AppActions.IsLoadingAppAction |
    AppActions.SetLoadingComponent |

    OrcamentoPermissaoActions.ReceiveOrcamentoPermissoesAction | OrcamentoPermissaoActions.IsLoadingOrcamentoPermissaoAction |
    OrcamentoPermissaoActions.SetSearchOrcamentoPermissao |

    OrcamentoUsuarioActions.ReceiveOrcamentoUsuariosAction | OrcamentoUsuarioActions.AdicionarOrcamentoUsuarioAction | OrcamentoUsuarioActions.IsLoadingOrcamentoUsuarioAction |
    OrcamentoUsuarioActions.SetSearchOrcamentoUsuario | OrcamentoUsuarioActions.ReceiveUsuariosOrcamentoUsuarioAction |

    OrcamentoValorActions.ReceiveOrcamentoItensAction | OrcamentoValorActions.AdicionarOrcamentoItemAction | OrcamentoValorActions.SetSearchOrcamentoItem;

export default KnownAction;