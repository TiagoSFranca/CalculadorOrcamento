using System.Collections.Generic;
using CalculadorOrcamento.Domain.Entities;

namespace CalculadorOrcamento.Domain.Seeds
{
    public static class OrcamentoPermissaoSeed
    {
        public static OrcamentoPermissao Admin => new OrcamentoPermissao() { Id = 1, Nome = "Admin", Descricao = "Permissão para tudo" };
        public static OrcamentoPermissao Editar => new OrcamentoPermissao() { Id = 2, Nome = "Editar", Descricao = "Permissão para editar orçamento e seus itens" };
        public static OrcamentoPermissao Excluir => new OrcamentoPermissao() { Id = 3, Nome = "Excluir", Descricao = "Permissão para excluir orçamento e seus itens" };
        public static OrcamentoPermissao Visualizar => new OrcamentoPermissao() { Id = 4, Nome = "Visualizar", Descricao = "Permissão para visualizar orçamento e seus itens" };

        public static List<OrcamentoPermissao> Seeds => new List<OrcamentoPermissao>()
        {
            Admin,
            Editar,
            Excluir,
            Visualizar
        };
    }

    public enum OrcamentoPermissaoEnum
    {
        ADMIN = 1,
        EDITAR = 2,
        EXCLUIR = 3,
        VISUALIZAR = 4
    }
}
