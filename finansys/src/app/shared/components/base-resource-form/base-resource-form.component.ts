import { AfterContentChecked, Injector, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { switchMap } from 'rxjs/operators';
import { BaseResourceModel } from '../../models/base-resource.model';
import { BaseResourceService } from '../../services/base-resources.services';

export abstract class BaseResourceFormComponent<T extends BaseResourceModel> implements OnInit, AfterContentChecked {

  currentAction: string;
  resourceForm: FormGroup;
  pageTitulo: string;
  ServerErrorMessages: string[] = null;
  submmitingForm = false;
  protected route: ActivatedRoute;
  protected router: Router;
  protected formBuilder: FormBuilder;

  constructor(
    protected injector: Injector,
    public resource: T,
    private resourceService: BaseResourceService<T>,
    protected toastr: ToastrService,
    protected jsonDataToResourceFn: (jsonData) => T
    ) {
      this.route = this.injector.get(ActivatedRoute);
      this.router = this.injector.get(Router);
      this.formBuilder = this.injector.get(FormBuilder);
    }

  ngOnInit() {
    this.setCurrentAction();
    this.buildResourceForm();
    this.loadResource();
  }

  ngAfterContentChecked(): void {
    this.setPageTitle();
  }

  enviarForm() {
    this.submmitingForm = true;
    if (this.currentAction === 'new') {
      this.adicionarResource();
    } else {
      this.atualizarResource();
    }
  }

  protected setCurrentAction() {
    if (this.route.snapshot.url[0].path === 'new') {
      this.currentAction = 'new';
    } else {
      this.currentAction = 'edit';
    }
  }

  protected loadResource() {
    if (this.currentAction === 'edit') {
      this.route.paramMap.pipe(
        switchMap(params => this.resourceService.getPorId(+params.get('id')))
      )
      .subscribe(
        (resource) => {
          this.resource = resource;
          this.resourceForm.patchValue(resource);
        },
        (error) => alert ('Ocorreu um erro no servidor. Tente novamente mais tarde!')
        );
    }
  }

  setPageTitle() {
    if (this.currentAction === 'new') {
      this.pageTitulo = this.novaPaginaTitulo();
    } else {
      this.pageTitulo = this.editarPaginaTitulo();
    }
  }

  protected novaPaginaTitulo(): string {
    return 'Novo';
  }
  protected editarPaginaTitulo(): string {
    return 'Alterando';
  }
  protected adicionarResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    this.resourceService.adiciona(resource)
    .subscribe(
      (res) => this.actionsForSuccess(res)),
      (error: any) => this.actionsForError(error);
  }

  protected atualizarResource() {
    const resource: T = this.jsonDataToResourceFn(this.resourceForm.value);
    this.resourceService.atualiza(resource)
    .subscribe(
      (res) => this.actionsForSuccess(res)),
      (error: any) => this.actionsForError(error);
  }

  protected actionsForSuccess(resource: T) {
    this.toastr.success('Solicitação processada com sucesso.');
    const baseURLComponent = this.route.snapshot.parent.url[0].path;
    this.router.navigateByUrl(baseURLComponent, { skipLocationChange: true}).then(
      () => this.router.navigate([baseURLComponent, resource.id, 'edit'])
    );

  }

  protected actionsForError(error: any) {
    this.toastr.error('Ocorreu um erro ao processar sua solicitação');
    this.submmitingForm = false;
    if (error.status === 422) {
      this.ServerErrorMessages = JSON.parse(error._body).errors;
    } else {
      this.ServerErrorMessages = ['Falha na comiunicação com o servidor. Tente novamente mais tarde!'];
    }
  }

  protected abstract buildResourceForm();
}
