import { OrcamentoUsuario } from "./models";
import { Usuario } from "store/auth/models";

export interface ReceiveOrcamentoUsuariosAction {
    type: 'RECEIVE_ORCAMENTO_USUARIOS';
    orcamentoUsuarios: OrcamentoUsuario[];
}

export interface AdicionarOrcamentoUsuarioAction {
    type: 'ADICIONAR_ORCAMENTO_USUARIO';
    orcamentoUsuario?: OrcamentoUsuario;
}

export interface IsLoadingOrcamentoUsuarioAction {
    type: 'IS_LOADING_ORCAMENTO_USUARIO';
    value: boolean;
}

export interface SetSearchOrcamentoUsuario {
    type: 'SET_SEARCH_ORCAMENTO_USUARIO';
    value: boolean;
}

export interface ReceiveUsuariosOrcamentoUsuarioAction {
    type: 'RECEIVE_USUARIOS_ORCAMENTO_USUARIO';
    usuarios: Usuario[];
}
