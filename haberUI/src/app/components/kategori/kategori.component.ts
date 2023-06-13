import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Haber } from 'src/app/models/Haber';
import { Kategori } from 'src/app/models/Kategori';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-kategori',
  templateUrl: './kategori.component.html',
  styleUrls: ['./kategori.component.css']
})
export class KategoriComponent implements OnInit {
  haberler: Haber[];
  katId:  number;
  kat:Kategori;
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p=>{
      if(p['katId']){
        this.katId=p['katId'];
        this.KategoriById();
        this.HaberListeByKatId();
      }
    });
  }
  KategoriById(){
    this.apiServis.KategoriById(this.katId).subscribe((d:Kategori)=>{
      this.kat= d;
    });
  }
  HaberListeByKatId(){
    this.apiServis.HaberListeByKatId(this.katId).subscribe((d:Haber[]) =>{
      this.haberler = d;
    });    
  }

}
