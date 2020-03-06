using AutoMapper;
using CalculadorOrcamento.Application.Exceptions;
using CalculadorOrcamento.Application.Interfaces.BaseApplications;
using CalculadorOrcamento.Application.Orcamentos.Models;
using CalculadorOrcamento.Domain.Entities;
using CalculadorOrcamento.Domain.Seeds;
using CalculadorOrcamento.Persistence;
using MediatR;
using System;
using System.Threading;
using System.Threading.Tasks;

namespace CalculadorOrcamento.Application.Orcamentos.Commands.Editar
{
    public class EditarOrcamentoCommandHandler : IRequestHandler<EditarOrcamentoCommand, OrcamentoViewModel>
    {
        private readonly CalculadorOrcamentoContext _context;
        private readonly IMapper _mapper;
        private readonly IOrcamentoAuthBaseApplication _orcamentoAuthBaseApplication;

        public EditarOrcamentoCommandHandler(CalculadorOrcamentoContext context, IMapper mapper, IOrcamentoAuthBaseApplication orcamentoAuthBaseApplication)
        {
            _context = context;
            _mapper = mapper;
            _orcamentoAuthBaseApplication = orcamentoAuthBaseApplication;
        }

        public async Task<OrcamentoViewModel> Handle(EditarOrcamentoCommand request, CancellationToken cancellationToken)
        {
            await _orcamentoAuthBaseApplication.VerificarPermissao(request.Id, OrcamentoPermissaoEnum.EDITAR);

            var entidade = await _context.Orcamentos.FindAsync(request.Id);

            if (entidade == null)
                throw new NotFoundException(nameof(Orcamento), request.Id);

            try
            {
                _mapper.Map(request, entidade);

                _context.Orcamentos.Update(entidade);

                await _context.SaveChangesAsync();
            }
            catch (Exception ex)
            {
                throw new PersistenceException(ex);
            }

            return _mapper.Map<OrcamentoViewModel>(entidade);
        }
    }
}
