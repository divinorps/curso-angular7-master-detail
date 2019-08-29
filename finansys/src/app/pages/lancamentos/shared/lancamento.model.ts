import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';
import { Categoria } from '../../categorias/shared/categoria.model';

export class Lancamento extends BaseResourceModel {
    constructor(
        public nome?: string,
        public descricao?: string,
        public tipo?: string,
        public valor?: string,
        public data?: string,
        public paga?: boolean,
        public categoriaId?: number,
        public categoria?: Categoria) {
          super();
        }

    static tipos = {
        despesa: 'Despesa',
        receita: 'Receita'
    };

    get pagaText(): string {
        return this.paga ? 'Pago' : 'Pendente';
    }

}
