import { Component, OnInit } from '@angular/core';
import { Categoria } from '../shared/categoria.model';
import { CategoriaService } from '../shared/categoria.service';

@Component({
  selector: 'app-categoria-list',
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.css']
})
export class CategoriaListComponent implements OnInit {
  categorias: Categoria[] = [];

  constructor(private categoriaService: CategoriaService) { }

  ngOnInit() {
    this.categoriaService.getAll().subscribe(
      categorias => this.categorias = categorias,
      error => alert('Erro ao listar categorias')
    );
  }

  removeCategoria(categoria: Categoria) {
    const confirmouExclusao = confirm('Deseja realmente remover esta categoria?');
    if (confirmouExclusao) {
      this.categoriaService.delete(categoria.id).subscribe(
        () => this.categorias = this.categorias.filter(cat => cat !== categoria),
        () => alert('Erro ao tentar excluir categoria!')
      );
    }
  }

}
