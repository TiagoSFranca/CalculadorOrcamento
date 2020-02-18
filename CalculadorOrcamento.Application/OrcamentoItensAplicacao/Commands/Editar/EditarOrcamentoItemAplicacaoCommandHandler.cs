using AutoMapper;
using CalculadorOrcamento.Application.Exceptions;
using CalculadorOrcamento.Application.OrcamentoItensAplicacao.Models;
using CalculadorOrcamento.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace CalculadorOrcamento.Application.OrcamentoItensAplicacao.Commands.Editar
{
    public class EditarOrcamentoItemAplicacaoCommandHandler : IRequestHandler<EditarOrcamentoItemAplicacaoCommand, OrcamentoItemAplicacaoViewModel>
    {
        private readonly CalculadorOrcamentoContext _context;
        private readonly IMapper _mapper;
        public EditarOrcamentoItemAplicacaoCommandHandler(CalculadorOrcamentoContext context, IMapper mapper)
        {
            _context = context;
            _mapper = mapper;
        }

        public async Task<OrcamentoItemAplicacaoViewModel> Handle(EditarOrcamentoItemAplicacaoCommand request, CancellationToken cancellationToken)
        {
            var entidade = await _context.orcamentoItemAplicacoes.FindAsync(request.Id);
            if (entidade == null)
                throw new NotFoundException("Item", request.Id);

            if (entidade.IdOrcamento != request.IdOrcamento)
                throw new BusinessException("Item não pertence ao orçamento");

            var existe = await _context.orcamentoItemAplicacoes.AnyAsync(e => e.Id != entidade.Id && e.IdOrcamento == request.IdOrcamento && e.Nome.ToLower().Equals(request.Nome.ToLower()));
            if (existe)
                throw new BusinessException(string.Format("Item já cadastrado com esse nome [{0}]", request.Nome));

            try
            {
                _mapper.Map(request, entidade);

                entidade.DataAtualizacao = DateTime.Now;

                _context.orcamentoItemAplicacoes.Update(entidade);

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
