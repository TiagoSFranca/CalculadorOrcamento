using AutoMapper;
using CalculadorOrcamento.Application.Exceptions;
using CalculadorOrcamento.Application.Interfaces.BaseApplications;
using CalculadorOrcamento.Application.OrcamentoValores.Models;
using CalculadorOrcamento.Domain.Seeds;
using CalculadorOrcamento.Persistence;
using MediatR;
using Microsoft.EntityFrameworkCore;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace CalculadorOrcamento.Application.OrcamentoValores.Commands.Editar
{
    public class EditarOrcamentoValorCommandHandler : IRequestHandler<EditarOrcamentoValorCommand, OrcamentoValorViewModel>
    {
        private readonly CalculadorOrcamentoContext _context;
        private readonly IMapper _mapper;
        private readonly IOrcamentoAuthBaseApplication _orcamentoAuthBaseApplication;

        public EditarOrcamentoValorCommandHandler(CalculadorOrcamentoContext context, IMapper mapper, IOrcamentoAuthBaseApplication orcamentoAuthBaseApplication)
        {
            _context = context;
            _mapper = mapper;
            _orcamentoAuthBaseApplication = orcamentoAuthBaseApplication;
        }

        public async Task<OrcamentoValorViewModel> Handle(EditarOrcamentoValorCommand request, CancellationToken cancellationToken)
        {
            await _orcamentoAuthBaseApplication.VerificarPermissao(request.IdOrcamento, OrcamentoPermissaoEnum.EDITAR);

            var entidade = await _context.OrcamentoValores.FindAsync(request.Id);
            if (entidade == null)
                throw new NotFoundException("Valor", request.Id);

            if (entidade.IdOrcamento != request.IdOrcamento)
                throw new BusinessException("Valor não pertence ao orçamento");

            var existe = await _context.OrcamentoValores.AnyAsync(e => e.Id != request.Id && e.IdOrcamento == request.IdOrcamento && e.ValorHora == request.ValorHora && e.Multiplicador == request.Multiplicador);
            if (existe)
                throw new BusinessException(string.Format("Valor já cadastrado com esse valor hora [{0}] e multiplicador [{1}]", request.ValorHora, request.Multiplicador));

            try
            {
                _mapper.Map(request, entidade);

                _context.OrcamentoValores.Update(entidade);

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new PersistenceException(ex);
            }

            return _mapper.Map<OrcamentoValorViewModel>(entidade);
        }
    }
}
