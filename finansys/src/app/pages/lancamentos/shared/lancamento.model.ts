import { Categoria } from '../../categorias/shared/categoria.model';

export class Lancamento {
    constructor(
        public id?: number,
        public nome?: string,
        public descricao?: string,
        public tipo?: string,
        public valor?: string,
        public data?: string,
        public paga?: boolean,
        public categoriaId?: number,
        public categoria?: Categoria) {}

    static tipos = {
        despesa: 'Despesa',
        receita: 'Receita'
    };

    get pagaText(): string {
        return this.paga ? 'Pago' : 'Pendente';
    }

}
