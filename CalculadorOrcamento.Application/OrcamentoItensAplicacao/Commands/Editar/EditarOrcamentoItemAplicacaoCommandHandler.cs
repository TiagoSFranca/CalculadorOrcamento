using System;
using System.Threading;
using System.Threading.Tasks;
using AutoMapper;
using CalculadorOrcamento.Application.Exceptions;
using CalculadorOrcamento.Application.Interfaces.BaseApplications;
using CalculadorOrcamento.Application.OrcamentoItensAplicacao.Models;
using CalculadorOrcamento.Domain.Seeds;
using CalculadorOrcamento.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;

namespace CalculadorOrcamento.Application.OrcamentoItensAplicacao.Commands.Editar
{
    public class EditarOrcamentoItemAplicacaoCommandHandler : IRequestHandler<EditarOrcamentoItemAplicacaoCommand, OrcamentoItemAplicacaoViewModel>
    {
        private readonly CalculadorOrcamentoContext _context;
        private readonly IMapper _mapper;
        private readonly IOrcamentoAuthBaseApplication _orcamentoAuthBaseApplication;

        public EditarOrcamentoItemAplicacaoCommandHandler(CalculadorOrcamentoContext context, IMapper mapper, IOrcamentoAuthBaseApplication orcamentoAuthBaseApplication)
        {
            _context = context;
            _mapper = mapper;
            _orcamentoAuthBaseApplication = orcamentoAuthBaseApplication;
        }

        public async Task<OrcamentoItemAplicacaoViewModel> Handle(EditarOrcamentoItemAplicacaoCommand request, CancellationToken cancellationToken)
        {
            await _orcamentoAuthBaseApplication.VerificarPermissao(request.IdOrcamento, OrcamentoPermissaoEnum.EDITAR);

            var entidade = await _context.OrcamentoItemAplicacoes.FindAsync(request.Id);
            if (entidade == null)
                throw new NotFoundException("Item", request.Id);

            if (entidade.IdOrcamento != request.IdOrcamento)
                throw new BusinessException("Item não pertence ao orçamento");

            var existe = await _context.OrcamentoItemAplicacoes.AnyAsync(e => e.Id != entidade.Id && e.IdOrcamento == request.IdOrcamento && e.Nome.ToLower().Equals(request.Nome.ToLower()));
            if (existe)
                throw new BusinessException(string.Format("Item já cadastrado com esse nome [{0}]", request.Nome));

            try
            {
                _mapper.Map(request, entidade);

                _context.OrcamentoItemAplicacoes.Update(entidade);

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new PersistenceException(ex);
            }

            return _mapper.Map<OrcamentoItemAplicacaoViewModel>(entidade);
        }
    }
}
