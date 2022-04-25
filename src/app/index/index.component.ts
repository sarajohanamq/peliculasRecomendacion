import { HttpClient } from '@angular/common/http';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbCarousel, NgbSlideEvent, NgbSlideEventSource } from '@ng-bootstrap/ng-bootstrap';
import { NgbCarouselConfig } from '@ng-bootstrap/ng-bootstrap';
import {MatFormFieldModule} from '@angular/material/form-field';
import { Opciones } from '../opciones';
@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {
  
  

  constructor(private http: HttpClient,config: NgbCarouselConfig) { 
    config.interval = 5000;
    config.wrap = true;
    config.keyboard = true;
    config.pauseOnHover = true;
  }
  opciones: Opciones[] = [
    {value: 0, viewValue: 'cosine'},
    {value: 1, viewValue: 'manhattan'},
    {value: 2, viewValue: 'euclidean'},
    {value: 3, viewValue: 'minkowski'},

  ];
  user:number=0;
  preferidas:any[]=[];
  recomendacion:any[]=[];
  userrecomedar:any[]=[];
  miFomulario = new FormGroup({
    id: new FormControl('', [Validators.required,Validators.min(0)]),
    select: new FormControl('', Validators.required),
    
  });
  ngOnInit(): void {
    this.miFomulario = new FormGroup({
      id: new FormControl(1, [Validators.required,Validators.min(0)]),
      select: new FormControl(0, Validators.required),
      
    });
   


  }
  enviar(values:any){
   
    this.user=values.id;
    this.http.get<any>('http://localhost:8000/recommend?user='+values.id+'&mettho='+values.select).subscribe(data => {
      console.log(data)
      this.recomendacion=data;
      let count=0;
      this.recomendacion.forEach(element =>{
        if (count !=0){
          this.userrecomedar.push(element)
        }
        count=1;
        
      });
      count=0;
        this.http.get<any>('http://localhost:8000/listLikeMovies?user='+values.id).subscribe(data => {
        console.log(data)

        this.preferidas=data;
        this.preferidas.push(this.recomendacion[0])
        
       
      });
    });
   
  }
  selecVolver(){
    this.user=0;
    this.preferidas=[];
    this.userrecomedar=[];
    this.recomendacion=[];
  }
  
}
