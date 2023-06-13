using haber02.Models;
using haber02.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace haber02.Auth
{
    public class UyeServis
    {
        public class UyeService
        {
            haber02DBEntities db = new haber02DBEntities();

            public UyeModel UyeOturumAc(string kadi, string parola)
            {
                UyeModel uye = db.Uye.Where(s => s.KullaniciAdi == kadi && s.Sifre == parola).Select(x => new UyeModel()
                {
                    UyeId = x.UyeId,
                    AdSoyad = x.AdSoyad,
                    Email = x.Email,
                    KullaniciAdi = x.KullaniciAdi,
                    Foto = x.Foto,
                    Sifre = x.Sifre,
                    UyeAdmin = x.UyeAdmin
                }).SingleOrDefault();
                return uye;

            }
        }
    }
}