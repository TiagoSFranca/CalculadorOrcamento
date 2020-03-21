import { Usuario } from 'store/auth/models'
import { OrcamentoPermissao } from 'store/orcamentoPermissao/models'


export interface OrcamentoUsuario {
    id: number;
    idOrcamento: number;
    idUsuario: number;
    usuario: Usuario;
    orcamentoUsuarioPermissoes: OrcamentoUsuarioPermissao[];
}

export interface OrcamentoUsuarioPermissao {
    id: number;
    idOrcamentoUsuario: number;
    idPermissao: number;
    permite: boolean;
    permissao: OrcamentoPermissao;
}

export interface AdicionarOrcamentoUsuario {
    idOrcamento: number;
    valorHora: number;
    multiplicador: number;
}

export interface EditarOrcamentoUsuario {
    id: number;
    idOrcamento: number;
    valorHora: number;
    multiplicador: number;
}
