import { Yorum } from '../../models/Yorum';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Haber } from 'src/app/models/Haber';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-haber',
  templateUrl: './haber.component.html',
  styleUrls: ['./haber.component.css']
})
export class HaberComponent implements OnInit {
  HaberId:number;
  haber: Haber;
  yorumlar: Yorum[];
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p=>{
      if(p['HaberId']){
        this.HaberId=p['HaberId'];
        this.HaberById();
        this.HaberYorumListe();
      }
    });
  }
  HaberById(){
    this.apiServis.HaberById(this.HaberId).subscribe((d:Haber)=>{
      this.haber = d;
      this.HaberOkunduYap();
    });
  }
  HaberOkunduYap(){
    this.haber.Okunma += 1;
    this.apiServis.HaberDuzenle(this.haber).subscribe();
  }
  HaberYorumListe(){
    this.apiServis.YorumListeByhaberId(this.HaberId).subscribe((d:Yorum[])=>{
      this.yorumlar= d;
  });
  }
  YorumEkle(yorumMetni:string){
    var yorum:Yorum= new Yorum();
    var uyeId: number= parseInt(localStorage.getItem('uid'));
    yorum.HaberId= this.HaberId;
    yorum.UyeId=uyeId;
    yorum.YorumIcerik=yorumMetni;
    yorum.Tarih= new Date();
    this.apiServis.YorumEkle(yorum).subscribe((d:Sonuc)=>{
      if(d.islem){
        this.HaberYorumListe();
      }
    });
  }
}
