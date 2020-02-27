using AutoMapper;
using CalculadorOrcamento.Application.Exceptions;
using CalculadorOrcamento.Domain.Entities;
using CalculadorOrcamento.Persistence;
using MediatR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;

namespace CalculadorOrcamento.Application.Orcamentos.Commands.Excluir
{
    public class ExcluirOrcamentosCommandHandler : IRequestHandler<ExcluirOrcamentosCommand, string>
    {
        private readonly CalculadorOrcamentoContext _context;
        private readonly IMapper _mapper;

        public ExcluirOrcamentosCommandHandler(CalculadorOrcamentoContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<string> Handle(ExcluirOrcamentosCommand request, CancellationToken cancellationToken)
        {
            var ids = (request.Ids ?? new List<int>()).Distinct().ToList();

            var mensagem = string.Empty;

            int countErrors = 0;

            foreach (var id in ids)
            {
                Orcamento item = null;
                try
                {
                    item = _context.Orcamentos.Find(id);
                    if (item == null)
                        throw new NotFoundException(nameof(Orcamento), id);

                    _context.Orcamentos.Remove(item);

                    await _context.SaveChangesAsync();
                }
                catch (NotFoundException ex)
                {
                    mensagem += Environment.NewLine + ex.Message;
                    countErrors++;
                }
                catch (Exception ex)
                {
                    countErrors++;
                    if (item != null)
                        mensagem += Environment.NewLine + string.Format("Não foi possível excluir o orçamento [{0}]", item.Nome);
                    else
                        break;
                }
            }

            if (countErrors == ids.Count())
                throw new BusinessException("Ocorreu um erro ao tentar excluir os orçamentos.");

            if (!string.IsNullOrEmpty(mensagem))
                return "Orçamentos excluidos com sucesso, contudo:" + mensagem;

            return mensagem;
        }
    }
}
