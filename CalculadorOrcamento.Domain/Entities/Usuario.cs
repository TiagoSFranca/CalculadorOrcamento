using System;
using System.Collections.Generic;
using CalculadorOrcamento.Domain.Entities.GenericModels;

namespace CalculadorOrcamento.Domain.Entities
{
    public class Usuario : RegistroTempo
    {
        public Usuario()
        {
            Orcamentos = new HashSet<Orcamento>();
            OrcamentoUsuarios = new HashSet<OrcamentoUsuario>();
        }

        public int Id { get; set; }
        public Guid Codigo { get; set; }
        public string Nome { get; set; }
        public string Sobrenome { get; set; }
        public string Email { get; set; }
        public string Login { get; set; }
        public string Senha { get; set; }
        public bool ConfirmouEmail { get; set; }
        public string NomeCompleto
        {
            get
            {
                var nomeCompleto = Nome;
                
                if (!string.IsNullOrEmpty(Sobrenome))
                    nomeCompleto += " " + Sobrenome;

                return nomeCompleto;
            }
        }

        public virtual ICollection<Orcamento> Orcamentos { get; set; }
        public virtual ICollection<OrcamentoUsuario> OrcamentoUsuarios { get; set; }
    }
}
