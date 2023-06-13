import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialogRef, MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Haber } from 'src/app/models/Haber';
import { AlertService } from 'src/app/services/Myalert.service';
import { ApiService } from 'src/app/services/api.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { HaberDialogComponent } from '../../dialogs/haber-dialog/haber-dialog.component';
import { Kategori } from 'src/app/models/Kategori';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-admin-haber',
  templateUrl: './admin-haber.component.html',
  styleUrls: ['./admin-haber.component.css']
})
export class AdminHaberComponent implements OnInit {
  haberler: Haber[];
  kategoriler: Kategori[];
  secKat: Kategori;
  katId: number;
  UyeId: number;
  dataSource: any;
  displayedColumns = ['Baslik', 'Tarih','UyeKadi','Okunma','detay'];
  @ViewChild(MatSort) sort:MatSort
  @ViewChild(MatPaginator) paginator:MatPaginator
  dialogRef:MatDialogRef<HaberDialogComponent>;
  dialogaRefConfirm: MatDialogRef<ConfirmDialogComponent>;

  constructor(
    public apiServis: ApiService,
    public matDialog : MatDialog,
    public alert : AlertService,
    public route : ActivatedRoute
  ) { }

  ngOnInit() {
    this.KategoriListele();
    this.UyeId=parseInt(localStorage.getItem("uid"));
    this.route.params.subscribe(p=>{
      if(p['katId']){
      this.katId = p['katId'];
      this.KategoriById();
      }
    });
  }
  KategoriById(){
    this.apiServis.KategoriById(this.katId).subscribe((d:Kategori) =>{
      this.secKat = d;
      this.HaberListele();
    });
  }

  HaberListele(){
    this.apiServis.HaberListeByKatId(this.katId).subscribe(d=>{
      this.haberler = d;
      this.dataSource = new MatTableDataSource(this.haberler);
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
    });
  }
  
  KategoriListele(){
    this.apiServis.KategoriListe().subscribe(d=>{
      this.kategoriler = d;
    });
  }
  KategoriSec(katId:number){
   
    this.katId = katId;
    this.HaberListele();
  }

  Ekle(){
    var yeniKayit: Haber = new Haber();
    this.dialogRef= this.matDialog.open(HaberDialogComponent,{
      width: '800px',
      data:{
        kayit:yeniKayit,
        islem: 'ekle'
      }
    });
    this.dialogRef.afterClosed().subscribe(d => {
    if(d){
      yeniKayit= d;
      yeniKayit.Foto = "foto.jpg";
      yeniKayit.Tarih = new Date();
      yeniKayit.Okunma= 0;
      yeniKayit.UyeId=this.UyeId;
      this.apiServis.HaberEkle(yeniKayit).subscribe((s:any)=>{
        this.alert.AlertUygula(s);
        if(s.islem){
          this.HaberListele();
        }
      });
    }
    });
  }

  Duzenle(kayit:Haber){
    this.dialogRef= this.matDialog.open(HaberDialogComponent,{
      width: '800px',
      data:{
        kayit:kayit,
        islem: 'duzenle'
      }
   });
   this.dialogRef.afterClosed().subscribe(d => {
    if(d){
      kayit.KategoriAdi =d.KategoriAdi;
      this.apiServis.HaberDuzenle(kayit).subscribe((s:any)=>{
        this.alert.AlertUygula(s);
        if(s.islem){
          this.HaberListele();
        }
      });
    }
   });
  }

  Detay(kayit:Haber){
    this.dialogRef= this.matDialog.open(HaberDialogComponent,{
      width: '800px',
      data:{
        kayit:kayit,
        islem: 'detay'
      }
   });
  }

  Sil(kayit:Haber){
    this.dialogaRefConfirm =this.matDialog.open(ConfirmDialogComponent,{
      width: '400px',
    });
    this.dialogaRefConfirm.componentInstance.dialogMesaj=kayit.Baslik + " Başlıklı haber silinecektir onaylıyor musunuz?";
    this.dialogaRefConfirm.afterClosed().subscribe(d=>{
      if (d){
        this.apiServis.HaberSil(kayit.HaberId).subscribe((s:any)=>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.HaberListele();
          }
        });
      }
    });
  }
}

