import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Categoria } from './categorias/shared/categoria.model';
import { Lancamento } from './lancamentos/shared/lancamento.model';

export class InMemoryDatabase implements InMemoryDbService {
  createDb() {
    const categorias: Categoria[] = [
      {id: 1, nome: 'Moradia', descricao: 'Pagamentos de contas da casa'},
      {id: 2, nome: 'Saúde', descricao: 'Pagamentos de saúde e remédios'},
      {id: 3, nome: 'Lazer', descricao: 'Cinama, parques, praia, etc'},
      {id: 4, nome: 'Salário', descricao: 'Recebimento de salário'},
      {id: 5, nome: 'Freelas', descricao: 'Trabalhos como freelancer'}
    ];

    const lancamentos: Lancamento[] = [
      {id: 1, nome: 'Gás de cozinha', descricao: 'Gás de cozinha', tipo: 'despesa', valor: '90,00', data: '10/08/2019',  paga: true,  categoriaId: categorias[0].id, categoria: categorias[0]},
      {id: 2, nome: 'Taxa de condomínio', categoriaId: categorias[0].id, categoria: categorias[0], paga: true, data: '26/08/2019', valor: '614,00', tipo: 'despesa', descricao: 'Taxa de condomínio' },
      {id: 3, nome: 'Energia elétrica', categoriaId: categorias[0].id, categoria: categorias[0], paga: true, data: '21/08/2019', valor: '200,00', tipo: 'despesa', descricao: 'Tarifa de energia elétrica' },
      {id: 4, nome: 'Plano de saúde', categoriaId: categorias[1].id, categoria: categorias[1], paga: true, data: '21/08/2019', valor: '500,00', tipo: 'despesa', descricao: 'Pagamento do plano de saúde' },
      {id: 5, nome: 'Mensalidade da ASSEJUS', categoriaId: categorias[2].id, categoria: categorias[2], paga: true, data: '21/08/2019', valor: '70,00', tipo: 'despesa', descricao: 'Mensalidade da Assejus' },
      {id: 6, nome: 'Recebimento de saláriio', categoriaId: categorias[3].id, categoria: categorias[3], paga: true, data: '21/08/2019', valor: '10000,00', tipo: 'receita', descricao: 'Recebimento de Salário' }
    ];
    return { categorias, lancamentos };
  }
}
