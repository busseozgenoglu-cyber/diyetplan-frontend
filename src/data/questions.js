// 60 Diyet Programı Sorusu

export const QUESTIONS = [
  // ── Kişisel Bilgiler (1–5) ──
  {
    id: 6, category: "Fiziksel Bilgiler", icon: "📏",
    text: "Boyunuz kaç santimetre?",
    type: "number", placeholder: "Örn: 170", min: 100, max: 250, unit: "cm",
  },
  {
    id: 7, category: "Fiziksel Bilgiler", icon: "⚖️",
    text: "Şu anki kilonuz kaç kilogram?",
    type: "number", placeholder: "Örn: 75", min: 30, max: 300, unit: "kg",
  },
  {
    id: 8, category: "Fiziksel Bilgiler", icon: "🎯",
    text: "Hedef kilonuz nedir?",
    type: "number", placeholder: "Örn: 65", min: 30, max: 300, unit: "kg",
  },
  {
    id: 9, category: "Fiziksel Bilgiler", icon: "🪞",
    text: "Beden yapınızı nasıl tanımlarsınız?",
    type: "single_choice",
    options: ["İnce / Zayıf", "Normal / Orta", "Hafif Kilolu", "Kilolu", "Obez"],
  },
  {
    id: 10, category: "Fiziksel Bilgiler", icon: "📐",
    text: "Bel çevrenizi biliyor musunuz? (Opsiyonel)",
    type: "number", placeholder: "cm cinsinden (boş bırakabilirsiniz)", min: 40, max: 200, unit: "cm", optional: true,
  },
  {
    id: 11, category: "Fiziksel Bilgiler", icon: "🔍",
    text: "Kilonuz vücudunuzun hangi bölgesinde daha fazla birikmiş?",
    type: "single_choice",
    options: ["Karın / Göbek bölgesi", "Kalça ve basen", "Bacaklar", "Genel vücut", "Dengeli dağılım"],
  },
  {
    id: 12, category: "Fiziksel Bilgiler", icon: "📊",
    text: "Son 1 yılda kilonuzda önemli bir değişim oldu mu?",
    type: "single_choice",
    options: ["Evet, kilo verdim", "Evet, kilo aldım", "Hayır, kilom stabil kaldı"],
  },

  // ── Sağlık Durumu (13–22) ──
  {
    id: 13, category: "Sağlık Durumu", icon: "🏥",
    text: "Herhangi bir kronik hastalığınız var mı?",
    type: "single_choice",
    options: ["Evet", "Hayır", "Emin değilim"],
  },
  {
    id: 14, category: "Sağlık Durumu", icon: "📋",
    text: "Hangi kronik hastalıklara sahipsiniz? (Yoksa 'yok' yazın)",
    type: "text", placeholder: "Örn: kalp hastalığı, astım...", optional: true,
  },
  {
    id: 15, category: "Sağlık Durumu", icon: "🩸",
    text: "Diyabet (şeker hastalığı) tanınız var mı?",
    type: "single_choice",
    options: ["Evet, Tip 1 Diyabet", "Evet, Tip 2 Diyabet", "Pre-diyabet (sınırda)", "Hayır"],
  },
  {
    id: 16, category: "Sağlık Durumu", icon: "🦋",
    text: "Tiroid probleminiz var mı?",
    type: "single_choice",
    options: ["Evet, Hipotiroid (düşük tiroid)", "Evet, Hipertiroid (yüksek tiroid)", "Hayır", "Bilmiyorum"],
  },
  {
    id: 17, category: "Sağlık Durumu", icon: "💉",
    text: "Kolesterol probleminiz var mı?",
    type: "single_choice",
    options: ["Evet, yüksek kolesterol", "Hayır", "Bilmiyorum"],
  },
  {
    id: 18, category: "Sağlık Durumu", icon: "❤️",
    text: "Tansiyon probleminiz var mı?",
    type: "single_choice",
    options: ["Evet, yüksek tansiyon", "Evet, düşük tansiyon", "Hayır"],
  },
  {
    id: 19, category: "Sağlık Durumu", icon: "💊",
    text: "Düzenli kullandığınız ilaç var mı?",
    type: "single_choice",
    options: ["Evet", "Hayır"],
  },
  {
    id: 20, category: "Sağlık Durumu", icon: "📝",
    text: "Hangi ilaçları kullanıyorsunuz? (Yoksa 'yok' yazın)",
    type: "text", placeholder: "İlaç adlarını belirtiniz", optional: true,
  },
  {
    id: 21, category: "Sağlık Durumu", icon: "🚫",
    text: "Herhangi bir gıda alerjiniz veya intoleransınız var mı?",
    type: "single_choice",
    options: ["Evet", "Hayır"],
  },
  {
    id: 22, category: "Sağlık Durumu", icon: "🍞",
    text: "Hangi gıdalara alerji/intoleransınız var? (Yoksa 'yok' yazın)",
    type: "text", placeholder: "Örn: laktoz, gluten, fıstık...", optional: true,
  },

  // ── Günlük Yaşam (23–30) ──
  {
    id: 23, category: "Günlük Yaşam", icon: "🚶",
    text: "Günlük hareket seviyenizi nasıl tanımlarsınız?",
    type: "single_choice",
    options: [
      "Çok hareketsiz (neredeyse hiç hareket etmem)",
      "Az hareketli",
      "Orta düzeyde aktif",
      "Oldukça aktif",
      "Çok aktif (sürekli hareket halindeyim)",
    ],
  },
  {
    id: 24, category: "Günlük Yaşam", icon: "🏢",
    text: "İş veya eğitim türünüz nedir?",
    type: "single_choice",
    options: [
      "Masa başı (ofis, bilgisayar)",
      "Ayakta çalışma (öğretmen, satış vb.)",
      "Fiziksel iş (inşaat, taşıma vb.)",
      "Ev hanımı / ev ile ilgileniyorum",
      "Öğrenci",
      "Çalışmıyorum",
    ],
  },
  {
    id: 25, category: "Günlük Yaşam", icon: "👣",
    text: "Günlük ortalama kaç adım atıyorsunuz?",
    type: "single_choice",
    options: ["2.000'den az", "2.000 – 5.000", "5.000 – 8.000", "8.000 – 12.000", "12.000'den fazla"],
  },
  {
    id: 26, category: "Günlük Yaşam", icon: "🚗",
    text: "İşe veya okula nasıl gidiyorsunuz?",
    type: "single_choice",
    options: ["Araba ile", "Toplu taşıma + yürüyüş", "Bisiklet", "Yürüyerek", "Uzaktan çalışıyorum / evden"],
  },
  {
    id: 27, category: "Günlük Yaşam", icon: "☕",
    text: "Gün içinde düzenli mola verip yürüyüş yapıyor musunuz?",
    type: "single_choice",
    options: ["Evet, sık sık yapıyorum", "Bazen yapıyorum", "Hayır, pek yapamıyorum"],
  },
  {
    id: 28, category: "Günlük Yaşam", icon: "😰",
    text: "Günlük stres seviyenizi nasıl değerlendirirsiniz?",
    type: "single_choice",
    options: ["Çok düşük", "Düşük", "Orta", "Yüksek", "Çok yüksek"],
  },
  {
    id: 29, category: "Günlük Yaşam", icon: "👶",
    text: "Çocuk bakımı veya başka aktif sorumluluklar üstleniyor musunuz?",
    type: "single_choice",
    options: ["Evet, aktif olarak", "Bazen", "Hayır"],
  },
  {
    id: 30, category: "Günlük Yaşam", icon: "🏃",
    text: "Haftada kaç gün yoğun fiziksel aktivite yapıyorsunuz?",
    type: "single_choice",
    options: ["Hiç", "1–2 gün", "3–4 gün", "5–6 gün", "Her gün"],
  },

  // ── Uyku Düzeni (31–34) ──
  {
    id: 31, category: "Uyku Düzeni", icon: "😴",
    text: "Geceleri ortalama kaç saat uyuyorsunuz?",
    type: "single_choice",
    options: ["5 saatten az", "5–6 saat", "6–7 saat", "7–8 saat", "8 saatten fazla"],
  },
  {
    id: 32, category: "Uyku Düzeni", icon: "🌙",
    text: "Genellikle hangi saatlerde uyursunuz?",
    type: "single_choice",
    options: [
      "22:00 – 06:00 (erken yatan)",
      "23:00 – 07:00 (normal)",
      "00:00 – 08:00 (geç yatan)",
      "01:00 ve sonrası (gece kuşu)",
    ],
  },
  {
    id: 33, category: "Uyku Düzeni", icon: "⭐",
    text: "Uyku kalitenizi nasıl değerlendirirsiniz?",
    type: "single_choice",
    options: ["Çok iyi", "İyi", "Orta", "Kötü", "Çok kötü"],
  },
  {
    id: 34, category: "Uyku Düzeni", icon: "🔔",
    text: "Gece sık sık uyanma probleminiz var mı?",
    type: "single_choice",
    options: ["Hayır, düzenli uyurum", "Bazen uyanırım", "Evet, sık sık uyanırım"],
  },

  // ── Beslenme Alışkanlıkları (35–46) ──
  {
    id: 35, category: "Beslenme Alışkanlıkları", icon: "🍽️",
    text: "Günde kaç öğün yemek yiyorsunuz?",
    type: "single_choice",
    options: ["1 öğün", "2 öğün", "3 öğün", "4 öğün", "5 ve üzeri öğün"],
  },
  {
    id: 36, category: "Beslenme Alışkanlıkları", icon: "🥣",
    text: "Sabah kahvaltısı yapıyor musunuz?",
    type: "single_choice",
    options: ["Her gün düzenli yapıyorum", "Çoğu gün yapıyorum", "Nadiren yapıyorum", "Hiç yapmıyorum"],
  },
  {
    id: 37, category: "Beslenme Alışkanlıkları", icon: "🍎",
    text: "Öğünler arasında ara öğün (atıştırmalık) yiyor musunuz?",
    type: "single_choice",
    options: [
      "Evet, genellikle sağlıklı atıştırmalıklar",
      "Evet, genellikle abur cubur",
      "Bazen",
      "Hayır, ara öğün yapmıyorum",
    ],
  },
  {
    id: 38, category: "Beslenme Alışkanlıkları", icon: "🍬",
    text: "Günlük şeker, tatlı ve şekerli içecek tüketiminiz nasıl?",
    type: "single_choice",
    options: [
      "Çok az veya hiç tüketmiyorum",
      "Haftada birkaç kez",
      "Her gün az miktarda",
      "Her gün çok miktarda",
    ],
  },
  {
    id: 39, category: "Beslenme Alışkanlıkları", icon: "🍔",
    text: "Fast food veya hazır yemek tüketim sıklığınız nedir?",
    type: "single_choice",
    options: [
      "Hiç veya çok nadir (yılda birkaç kez)",
      "Ayda birkaç kez",
      "Haftada 1–2 kez",
      "Haftada 3–4 kez",
      "Neredeyse her gün",
    ],
  },
  {
    id: 40, category: "Beslenme Alışkanlıkları", icon: "💧",
    text: "Günlük su tüketiminiz ne kadar?",
    type: "single_choice",
    options: ["1 litreden az", "1–1.5 litre", "1.5–2 litre", "2–2.5 litre", "2.5 litreden fazla"],
  },
  {
    id: 41, category: "Beslenme Alışkanlıkları", icon: "🥗",
    text: "Özel bir beslenme şekliniz var mı?",
    type: "single_choice",
    options: [
      "Hayır, normal besleniyorum",
      "Vejeteryan",
      "Vegan",
      "Glutensiz besleniyorum",
      "Laktoz içermez besleniyorum",
    ],
  },
  {
    id: 42, category: "Beslenme Alışkanlıkları", icon: "🥩",
    text: "En sık tükettiğiniz yiyecek grubu hangisi?",
    type: "single_choice",
    options: ["Et, tavuk ve balık", "Sebze ve meyveler", "Ekmek, pilav ve makarna", "Süt ve süt ürünleri", "Kurubaklagiller (mercimek, nohut vb.)"],
  },
  {
    id: 43, category: "Beslenme Alışkanlıkları", icon: "👨‍🍳",
    text: "Günlük yemeklerinizi genellikle kim hazırlıyor?",
    type: "single_choice",
    options: ["Ben hazırlıyorum", "Aile üyesi hazırlıyor", "Dışarıdan sipariş / yemek servisi", "Karışık"],
  },
  {
    id: 44, category: "Beslenme Alışkanlıkları", icon: "🍴",
    text: "Haftada kaç gün dışarıda (restoran, kafe) yemek yiyorsunuz?",
    type: "single_choice",
    options: ["Hiç", "1–2 gün", "3–4 gün", "5 gün ve üzeri"],
  },
  {
    id: 45, category: "Beslenme Alışkanlıkları", icon: "🍷",
    text: "Alkol tüketim sıklığınız nedir?",
    type: "single_choice",
    options: ["Hiç içmiyorum", "Çok nadir (ayda bir veya daha az)", "Haftalık", "Neredeyse her gün"],
  },
  {
    id: 46, category: "Beslenme Alışkanlıkları", icon: "🌙",
    text: "Gece geç saatlerde acıkma veya gece yeme probleminiz var mı?",
    type: "single_choice",
    options: ["Evet, sık sık", "Bazen", "Nadiren", "Hayır, hiç"],
  },

  // ── Spor Alışkanlıkları (47–53) ──
  {
    id: 47, category: "Spor Alışkanlıkları", icon: "🏋️",
    text: "Düzenli olarak spor yapıyor musunuz?",
    type: "single_choice",
    options: ["Evet, düzenli yapıyorum", "Bazen yapıyorum", "Hayır, hiç yapmıyorum"],
  },
  {
    id: 48, category: "Spor Alışkanlıkları", icon: "🏊",
    text: "Hangi tür egzersizler yapıyorsunuz?",
    type: "text", placeholder: "Örn: yürüyüş, koşu, yüzme, pilates...", optional: true,
  },
  {
    id: 49, category: "Spor Alışkanlıkları", icon: "📅",
    text: "Haftada kaç gün spor yapıyorsunuz?",
    type: "single_choice",
    options: ["Hiç yapmıyorum", "Haftada 1 gün", "Haftada 2–3 gün", "Haftada 4–5 gün", "Her gün"],
  },
  {
    id: 50, category: "Spor Alışkanlıkları", icon: "⏱️",
    text: "Her antrenman ne kadar sürüyor?",
    type: "single_choice",
    options: ["30 dakikadan az", "30–45 dakika", "45–60 dakika", "60–90 dakika", "90 dakikadan fazla"],
  },
  {
    id: 51, category: "Spor Alışkanlıkları", icon: "🏟️",
    text: "Hangi spor ortamına erişiminiz var?",
    type: "single_choice",
    options: ["Spor salonu (gym) üyesiyim", "Evde egzersiz yapıyorum", "Açık alan (park, sahil)", "Hiçbiri"],
  },
  {
    id: 52, category: "Spor Alışkanlıkları", icon: "🔄",
    text: "Egzersiz programınız nasıl?",
    type: "single_choice",
    options: [
      "Sadece cardio (yürüyüş, koşu, bisiklet)",
      "Sadece ağırlık antrenmanı",
      "Cardio + ağırlık karma program",
      "Yoga / Pilates",
      "Düzensiz, çeşitli aktiviteler",
    ],
  },
  {
    id: 53, category: "Spor Alışkanlıkları", icon: "⏳",
    text: "Ne kadar süredir düzenli spor yapıyorsunuz?",
    type: "single_choice",
    options: [
      "Hiç yapmıyorum / Yeni başladım",
      "1–3 ay",
      "3–6 ay",
      "6 ay – 1 yıl",
      "1 yıldan fazla",
    ],
  },

  // ── Hedefler ve Motivasyon (54–60) ──
  {
    id: 54, category: "Hedefler", icon: "🎯",
    text: "Ana beslenme hedefiniz nedir?",
    type: "single_choice",
    options: [
      "Kilo vermek",
      "Yağ yakmak ve vücut şeklini iyileştirmek",
      "Kas kütlesi kazanmak",
      "Sağlıklı beslenme düzeni oluşturmak",
      "Hastalığım için özel diyet yapmak",
    ],
  },
  {
    id: 55, category: "Hedefler", icon: "🗓️",
    text: "Hedefinize ne kadar sürede ulaşmak istiyorsunuz?",
    type: "single_choice",
    options: [
      "1 ay içinde",
      "1–3 ay içinde",
      "3–6 ay içinde",
      "6 ay – 1 yıl içinde",
      "Yavaş ve kalıcı (1 yıl+)",
    ],
  },
  {
    id: 56, category: "Hedefler", icon: "🔄",
    text: "Daha önce diyet veya beslenme programı denediniz mi?",
    type: "single_choice",
    options: [
      "Hayır, ilk kez deniyorum",
      "Evet, fakat başarılı olamadım",
      "Evet, kısmen başarılı oldum",
      "Evet, hedefime ulaştım ama geri döndüm",
    ],
  },
  {
    id: 57, category: "Hedefler", icon: "⚡",
    text: "Diyette en çok hangi konuda zorlanıyorsunuz?",
    type: "single_choice",
    options: [
      "Tatlı ve şeker bırakmak",
      "Porsiyon kontrolü",
      "Düzenli öğün saatleri",
      "Motivasyonu korumak",
      "Yemek hazırlamak için zaman bulmak",
    ],
  },
  {
    id: 58, category: "Hedefler", icon: "💪",
    text: "Diyet sürecinde motivasyonunuzu neler etkiler?",
    type: "single_choice",
    options: [
      "Tartıda kilo görmek",
      "Kıyafetlerin oturması",
      "Enerji ve sağlık hissi",
      "Çevrenin olumlu geri bildirimleri",
      "Fotoğraflarla değişimi görmek",
    ],
  },
  {
    id: 59, category: "Hedefler", icon: "🌟",
    text: "Beslenme programınızdan en önemli beklentiniz nedir?",
    type: "single_choice",
    options: [
      "Hızlı sonuç almak",
      "Kalıcı alışkanlık kazanmak",
      "Hastalığımı kontrol altına almak",
      "Spor performansımı artırmak",
      "Genel sağlığımı iyileştirmek",
    ],
  },
  {
    id: 60, category: "Hedefler", icon: "🤝",
    text: "Diyet sürecinde hangi destek türü size en çok yardımcı olur?",
    type: "single_choice",
    options: [
      "Haftalık kontroller ve takip",
      "Tarif ve yemek önerileri",
      "Yalnızca başlangıç planı yeterli",
      "Online danışman desteği",
      "Motivasyon mesajları ve hatırlatmalar",
    ],
  },
];

export const TOTAL_QUESTIONS = QUESTIONS.length; // 60
  {
    id: 1, category: "Kişisel Bilgiler", icon: "👤",
    text: "Adınız ve soyadınız nedir?",
    type: "text", placeholder: "Adınız Soyadınız",
  },
  {
    id: 2, category: "Kişisel Bilgiler", icon: "🎂",
    text: "Kaç yaşındasınız?",
    type: "number", placeholder: "Yaşınızı girin", min: 10, max: 100, unit: "yaş",
  },
  {
    id: 3, category: "Kişisel Bilgiler", icon: "👫",
    text: "Cinsiyetiniz nedir?",
    type: "single_choice",
    options: ["Kadın", "Erkek", "Belirtmek istemiyorum"],
  },
  {
    id: 4, category: "Kişisel Bilgiler", icon: "💼",
    text: "Mesleğiniz nedir?",
    type: "text", placeholder: "Mesleğinizi yazın",
  },
  {
    id: 5, category: "Kişisel Bilgiler", icon: "📍",
    text: "Yaşadığınız şehir nedir?",
    type: "text", placeholder: "Şehrinizi yazın",
  },

  // ── Fiziksel Bilgiler (6–12) ──
