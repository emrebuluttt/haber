import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Haber } from 'src/app/models/Haber';
import { Kategori } from 'src/app/models/Kategori';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-haber-dialog',
  templateUrl: './haber-dialog.component.html',
  styleUrls: ['./haber-dialog.component.css']
})
export class HaberDialogComponent implements OnInit {
  dialogBaslik:string;
  yeniKayit: Haber;
  islem: string;
  frm: UntypedFormGroup;
  kategoriler: Kategori[];
  jconfig: {};

  constructor(
    public dialogRef: MatDialogRef<HaberDialogComponent>,
    public frmBuild: UntypedFormBuilder,
    @Inject(MAT_DIALOG_DATA) public data: any,
    public apiServis: ApiService
  ) { 
    this.islem = data.islem;

    if(this.islem=="ekle"){
      this.dialogBaslik= "Haber Ekle";
      this.yeniKayit= new Haber();
    }
    if(this.islem=="duzenle"){
      this.dialogBaslik= "Haber Düzenle"
      this.yeniKayit= data.kayit;
    }
    if(this.islem=="detay"){
      this.dialogBaslik= "Haber Detay"
      this.yeniKayit= data.kayit;
    }
    this.frm = this.FormOlustur();
  }

  ngOnInit() {
    this.KategoriListele();
  }
  FormOlustur(){
    return this.frmBuild.group({
      Baslik: (this.yeniKayit.Baslik),
      Icerik: (this.yeniKayit.Icerik),
      KategoriId: (this.yeniKayit.KategoriId)
    });
  }
  KategoriListele(){
    this.apiServis.KategoriListe().subscribe(d=>{
      this.kategoriler = d;
    });
  }
}
