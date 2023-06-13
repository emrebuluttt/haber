using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace haber02.ViewModel
{
    public class HaberModel
    {

        public int HaberId { get; set; }
        public string Baslik { get; set; }
        public string Icerik { get; set; }
        public string Foto { get; set; }
        public System.DateTime Tarih { get; set; }
        public int KategoriId { get; set; }
        public int UyeId { get; set; }
        public string Okunma { get; set; }
        public string UyeKadi { get; set; }
        public string KategoriAdi { get; set; }

    }
}