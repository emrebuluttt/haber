import { Observable } from 'rxjs';
import { Haber } from '../models/Haber';
import { Yorum } from './../models/Yorum';
import { Uye } from './../models/Uye';
import { Kategori } from './../models/Kategori';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Sonuc } from '../models/Sonuc';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  apiUrl = "http://localhost:52373/api/";

  constructor(
    public http: HttpClient
  ) { }

  /*   Oturum İşlemleri Başla  */
  tokenAl(kadi: string, parola: string) {
    var data = "username=" + kadi + "&password=" + parola + "&grant_type=password";
    var reqHeader = new HttpHeaders({ "Content-Type": "application/x-www-form-urlencoded" });
    return this.http.post(this.apiUrl + "/token", data, { headers: reqHeader });
  }
  oturumKontrol() {
    if (localStorage.getItem("token")) {
      return true;
    }
    else {
      return false;
    }
  }

  yetkiKontrol(yetkiler: any[]) {
    var sonuc: boolean = false;

    var uyeYetkiler: string[] = JSON.parse(localStorage.getItem("uyeYetkileri"));

    if (uyeYetkiler) {
      yetkiler.forEach(element => {
        if (uyeYetkiler.indexOf(element) > -1) {
          sonuc = true;
        }
      });
    }

    return sonuc;
  }

  /*   Oturum İşlemleri Bitiş  */


  /*  API  */

  KategoriListe(): Observable<Kategori[]> {
    return this.http.get<Kategori[]>(this.apiUrl + "/kategoriliste");
  }
  KategoriById(katId: number): Observable<Kategori> {
    return this.http.get<Kategori>(this.apiUrl + "/kategoribyid/" + katId);
  }
  KategoriEkle(kat: Kategori): Observable<any> {
    return this.http.post<Sonuc>(this.apiUrl + "/kategoriekle", kat);
  }
  KategoriDuzenle(kat: Kategori): Observable<any> {
    return this.http.put<Sonuc>(this.apiUrl + "/kategoriduzenle", kat);
  }
  KategoriSil(katId: number): Observable<any> {
    return this.http.delete<Sonuc>(this.apiUrl + "/kategorisil/" + katId);
  }

  HaberListe(): Observable<Haber[]> {
    return this.http.get<Haber[]>(this.apiUrl + "/haberliste");
  }
  HaberListeSonEklenenler(s: number): Observable<Haber[]> {
    return this.http.get<Haber[]>(this.apiUrl + "/haberlistesoneklenenler/" + s);
  }
  HaberListeByKatId(katId: number): Observable<Haber[]> {
    return this.http.get<Haber[]>(this.apiUrl + "/haberlistebykatid/" + katId);
  }
  HaberListeByUyeId(uyeId: number): Observable<Haber[]> {
    return this.http.get<Haber[]>(this.apiUrl + "/haberlistebyuyeid/" + uyeId);
  }
  HaberById(HaberId: number): Observable<Haber> {
    return this.http.get<Haber>(this.apiUrl + "/haberbyid/" + HaberId);
  }
  HaberEkle(haber: Haber): Observable<any> {
    return this.http.post<Sonuc>(this.apiUrl + "/haberekle", haber);
  }
  HaberDuzenle(haber: Haber): Observable<any> {
    return this.http.put<Sonuc>(this.apiUrl + "/haberduzenle", haber);
  }
  HaberSil(HaberId: number): Observable<any> {
    return this.http.delete<Sonuc>(this.apiUrl + "/habersil/" + HaberId);
  }


  UyeListe(): Observable<Uye[]> {
    return this.http.get<Uye[]>(this.apiUrl + "/uyeliste");
  }
  UyeById(uyeId: number): Observable<Uye> {
    return this.http.get<Uye>(this.apiUrl + "/uyebyid/" + uyeId);
  }
  UyeEkle(uye: Uye): Observable<any> {
    return this.http.post<Sonuc>(this.apiUrl + "/uyeekle", uye);
  }
  UyeDuzenle(uye: Uye): Observable<any> {
    return this.http.put<Sonuc>(this.apiUrl + "/uyeduzenle", uye);
  }
  UyeSil(uyeId: number): Observable<any> {
    return this.http.delete<Sonuc>(this.apiUrl + "/uyesil/" + uyeId);
  }

  YorumListe(): Observable<Yorum[]> {
    return this.http.get<Yorum[]>(this.apiUrl + "/yorumliste");
  }
  YorumListeByUyeId(uyeId: number): Observable<Yorum[]> {
    return this.http.get<Yorum[]>(this.apiUrl + "/yorumlistebyuyeid/" + uyeId);
  }
  YorumListeByhaberId(HaberId: number): Observable<Yorum[]> {
    return this.http.get<Yorum[]>(this.apiUrl + "/yorumlistesoneklenenler/" + HaberId);
  }
  YorumListeSonEklenenler(s: number): Observable<Yorum[]> {
    return this.http.get<Yorum[]>(this.apiUrl + "/yorumliste/" + s);
  }
  YorumById(yorumId: number): Observable<Yorum> {
    return this.http.get<Yorum>(this.apiUrl + "/yorumbyid/" + yorumId);
  }
  YorumEkle(yorum: Yorum): Observable<any> {
    return this.http.post<Sonuc>(this.apiUrl + "/yorumekle", yorum);
  }
  YorumDuzenle(yorum: Yorum): Observable<any> {
    return this.http.put<Sonuc>(this.apiUrl + "/yorumduzenle", yorum);
  }
  YorumSil(yorumId: number): Observable<any> {
    return this.http.delete<Sonuc>(this.apiUrl + "/yorumsil/" + yorumId);
  }
}
