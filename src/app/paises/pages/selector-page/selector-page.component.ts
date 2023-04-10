import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { switchMap, tap } from 'rxjs/operators';
import { PaisesService } from '../services/paises.service';
import { PaisSmall } from '../interfaces/paises.inteface';

@Component({
  selector: 'app-selector-page',
  templateUrl: './selector-page.component.html',
  styles: []
})
export class SelectorPageComponent implements OnInit {

  miFormulario: FormGroup = this.formBuilder.group({
    region: ['', Validators.required],
    pais: ['', Validators.required],
    frontera: [''],
  })

  regiones: string[] = [];
  paises: PaisSmall[] = [];
  // fronteras: string[] = [];
  fronteras: PaisSmall[] = [];

  cargando: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private paisesService: PaisesService
  ) { }

  ngOnInit(): void {

    this.regiones = this.paisesService.regiones;

    // this.miFormulario.get('region')?.valueChanges
    //   .subscribe(region => {
    //     console.log(region);

    //     this.paisesService.getPaisesPorRegion(region)
    //       .subscribe(paises => {
    //         console.log(paises);
    //         this.paises = paises;
    //       })
    //   });
    this.miFormulario.get('region')?.valueChanges
      .pipe(
        tap(
          (_) => {
            this.miFormulario.get('pais')?.reset('');
            this.cargando = true;
          }
        ),
        switchMap(
          region => this.paisesService.getPaisesPorRegion(region)
        )
      )
      .subscribe(paises => {
        this.paises = paises;
        this.cargando = false;
      });

    this.miFormulario.get('pais')?.valueChanges
      .pipe(
        tap(
          () => {
            this.miFormulario.get('frontera')?.reset('');
            this.cargando = true;
          }
        ),
        switchMap(codigo => this.paisesService.getPaisPorCodigo(codigo)),
        switchMap(pais => this.paisesService.getPaisesPorCodigos(pais?.borders!))
      )
      .subscribe(paises => {
        this.fronteras = paises;
        //si no tiene paises fronterizos remueve el control y no lo requiere
        if (this.fronteras.length < 1) {
          this.miFormulario.removeControl("frontera");
        }
        else {
          //en caso de tener paises fronterizos, lo vuelve requerido
          this.miFormulario.addControl("frontera", new FormControl("", [Validators.required]));
        }
        this.cargando = false;
      })
    // .subscribe(pais => {
    //   this.fronteras = pais?.borders || [];
    //   this.cargando = false;
    // });
  }




  guardar() {
    console.log(this.miFormulario.value);
  }
}
