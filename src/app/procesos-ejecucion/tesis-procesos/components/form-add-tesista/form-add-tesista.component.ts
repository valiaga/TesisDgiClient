import { Component, OnInit, ViewContainerRef } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { startWith, map, switchMap } from 'rxjs/operators';
import { TesistasService } from '../../../../tesistas/shared/tesistas.service';
import { TdDialogService } from '@covalent/core';
import { getMessageConfirm } from 'config/general';
import { MESSAGES } from 'config/messages';

@Component({
  selector: 'dgi-form-add-tesista',
  templateUrl: './form-add-tesista.component.html',
  styleUrls: ['./form-add-tesista.component.scss']
})
export class FormAddTesistaComponent implements OnInit {
  public addTesistaForm: FormGroup;
  public filteredOptions: Observable<any[]>;

  constructor(private formBuilder: FormBuilder,
    private viewContainerRef: ViewContainerRef,
    private tdDialogService: TdDialogService,
    private tesistasService: TesistasService) { }

  ngOnInit() {
    this.buildForm();
    this.subscribeFieldAutocomplete();

  }

  private subscribeFieldAutocomplete() {
    if (this.addTesistaForm) {
      this.filteredOptions = this.addTesistaForm.controls['tesista']
        .valueChanges
        .pipe(
          startWith<string | any>(''),
          map(value => typeof value === 'string' ? value : value && value.nombres || null),
          switchMap(nombres => nombres ? this.getTesistas(nombres) : [])
        );
    }
  }

  private getTesistas(query) {
    const params = { query: query, fields: 'nombres,apellido_paterno,apellido_materno' };
    return this.tesistasService.getWithQuery$(params).pipe(map(response => response.results));
  }

  public displayFn(user?: any): string | undefined {
    return user ? `${user.nombres} ${user.apellido_paterno} ${user.apellido_materno}` : undefined;
  }

  private buildForm() {
    const controls = this.initializeControls();
    this.addTesistaForm = this.formBuilder.group(controls);
  }

  private initializeControls() {
    const controls = {
      tesista: ['', [Validators.required]],
    };
    return controls;
  }

  public onSubmit() {
    const valid = this.addTesistaForm.valid;
    const value = this.addTesistaForm.value;

    if (valid) {

      this.tdDialogService.openConfirm(getMessageConfirm(MESSAGES.tesisProceso.confirmAddTesista, this.viewContainerRef))
        .afterClosed().subscribe((accept: boolean) => {
          if (accept) {
            // this.tesistaService.add$(value).subscribe(tesista => {
              // this.snackBar.open(MESSAGES.tesista.post, MESSAGES.actions.post, snackBarDuration);
              // this.dialogRef.close(true);
              console.log(value);
              this.addTesistaForm.reset();
            // });
          } else {
          }
        });

    }
  }
}
