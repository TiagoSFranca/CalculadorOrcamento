using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CalculadorOrcamento.Application.Exceptions;
using CalculadorOrcamento.Application.Interfaces.BaseApplications;
using CalculadorOrcamento.Domain.Entities;
using CalculadorOrcamento.Domain.Seeds;
using CalculadorOrcamento.Persistence;
using MediatR;

namespace CalculadorOrcamento.Application.Orcamentos.Commands.Excluir
{
    public class ExcluirOrcamentosCommandHandler : IRequestHandler<ExcluirOrcamentosCommand, string>
    {
        private readonly CalculadorOrcamentoContext _context;
        private readonly IMapper _mapper;
        private readonly IOrcamentoAuthBaseApplication _orcamentoAuthBaseApplication;

        public ExcluirOrcamentosCommandHandler(CalculadorOrcamentoContext context, IMapper mapper, IOrcamentoAuthBaseApplication orcamentoAuthBaseApplication)
        {
            _context = context;
            _mapper = mapper;
            _orcamentoAuthBaseApplication = orcamentoAuthBaseApplication;
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
                    await _orcamentoAuthBaseApplication.VerificarPermissao(id, OrcamentoPermissaoEnum.EXCLUIR);
                    item = _context.Orcamentos.Find(id);
                    if (item == null)
                        throw new NotFoundException(nameof(Orcamento), id);

                    _context.Orcamentos.Remove(item);

                    await _context.SaveChangesAsync();
                }
                catch (AuthorizationException)
                {
                    throw;
                }
                catch (ForbiddenException)
                {
                    mensagem += Environment.NewLine + string.Format("Você não tem permissão para excluir o orçamento [{0}]", id);
                    countErrors++;
                }
                catch (NotFoundException ex)
                {
                    mensagem += Environment.NewLine + ex.Message;
                    countErrors++;
                }
                catch (Exception)
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
