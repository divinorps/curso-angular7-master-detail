import { OnInit } from '@angular/core';
import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resources.services';

export class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

  resources: T[] = [];

  constructor(private baseResourceService: BaseResourceService<T>) { }

  ngOnInit() {
    this.baseResourceService.getAll().subscribe(
      resources => this.resources = resources,
      error => alert('Erro ao carregar registros' + error.json())
    );
  }

  removeResource(resource: T) {
    const confirmouExclusao = confirm('Deseja realmente remover este registro?');
    if (confirmouExclusao) {
      this.baseResourceService.delete(resource.id).subscribe(
        () => this.resources = this.resources.filter(res => res !== resource),
        () => alert('Erro ao tentar excluir registro!')
      );
    }
  }

}

