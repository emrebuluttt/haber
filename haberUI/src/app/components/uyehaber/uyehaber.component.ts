import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Haber } from 'src/app/models/Haber';
import { Kategori } from 'src/app/models/Kategori';
import { Uye } from 'src/app/models/Uye';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-uyehaber',
  templateUrl: './uyehaber.component.html',
  styleUrls: ['./uyehaber.component.css']
})
export class UyehaberComponent implements OnInit {
  haberler: Haber[];
  UyeId:  number;
  uye: Uye;
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p=>{
      if(p['UyeId']){
        this.UyeId=p['UyeId'];
        this.UyeById();
        this.HaberListeByUyeId();
      }
    });
  }
  UyeById(){
    this.apiServis.UyeById(this.UyeId).subscribe((d:Uye)=>{
      this.uye= d;
    });
  }
  HaberListeByUyeId(){
    this.apiServis.HaberListeByUyeId(this.UyeId).subscribe((d:Haber[]) =>{
      this.haberler = d;
    });    
  }

}

