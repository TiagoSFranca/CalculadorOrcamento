export interface Usuario {
    id: number;
    codigo: string;
    nome: string;
    sobrenome: string;
    email: string;
    login: string;
}

export interface UsuarioAutenticado extends Usuario {
    token: string;
    refreshToken: string;
}

export interface CadastrarUsuario {
    nome: string;
    sobrenome: string;
    email: string;
    login: string;
    senha: string;
    confirmarSenha: string;
}

export interface AutenticarUsuario {
    login: string;
    senha: string;
}
