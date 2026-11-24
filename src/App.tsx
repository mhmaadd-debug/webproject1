import { useCallback, useEffect, useRef, useState } from 'react';
import {
  Briefcase,
  Check,
  Copy,
  FileSpreadsheet,
  GraduationCap,
  Linkedin,
  Mail,
  Phone,
  Printer,
  RotateCcw,
  Search,
  X,
} from 'lucide-react';
import nadiaPortrait from './assets/images/nadia_portrait_1795548509656.jpg';

type SkillCategory = 'all' | 'software' | 'excel' | 'tax' | 'standard';

interface CaseStudy {
  id: number;
  filename: string;
  tag: string;
  objectLabel: string;
  title: string;
  period: string;
  summaryPoints: string[];
  results: string[];
  buttonLabel: string;
  accentBg: string;
  accentText: string;
  shadowClass: string;
  headerColor: string;
  modalTitle: string;
  modalSubtitle: string;
  highlights: { label: string; val: string }[];
  note: string;
}

const CASE_STUDIES: CaseStudy[] = [
  {
    id: 0,
    filename: 'CASE_01_UMKM.XLSX',
    tag: 'SAK EMKM',
    objectLabel: 'OBJEK: KOPI NUSANTARA (UMKM F&B)',
    title: 'Penyusunan Laporan Keuangan UMKM (SAK EMKM)',
    period: 'Periode: Kuartal I 2026 (Jan – Mar 2026)',
    summaryPoints: [
      'Merancang Chart of Accounts (COA) dan menginput 320+ transaksi kas, bank, dan persediaan ke dalam Accurate Online.',
      'Menyusun jurnal penyesuaian penyusutan aset tetap (mesin kopi & peralatan) serta pemakaian bahan baku.',
      'Menghasilkan Laporan Laba Rugi, Neraca, dan Laporan Arus Kas bulanan.',
    ],
    results: [
      'Mengoreksi selisih kas sebesar Rp4.250.000.',
      'Akurasi HPP menekan biaya bahan baku 8%.',
    ],
    buttonLabel: 'LIHAT RINGKASAN KERTAS KERJA',
    accentBg: 'bg-[#E6F4F1]',
    accentText: 'text-teal-900',
    shadowClass: 'retro-window-colored-shadow-teal',
    headerColor: 'bg-[#217A70] text-white',
    modalTitle: 'CASE_01: KERTAS KERJA SAK EMKM — KOPI NUSANTARA',
    modalSubtitle: 'Penyusunan Laporan Keuangan UMKM F&B (Kuartal I 2026)',
    highlights: [
      { label: 'Total Transaksi Diinput', val: '320+ Transaksi (Kas, Bank, Persediaan)' },
      { label: 'Selisih Kas Ditemukan & Dikoreksi', val: 'Rp4.250.000' },
      { label: 'Efisiensi Biaya Bahan Baku (HPP)', val: 'Turun 8% dari periode sebelumnya' },
      { label: 'Output Laporan', val: 'Laporan Laba Rugi, Neraca, & Arus Kas' },
    ],
    note: 'Struktur COA disesuaikan dengan standar SAK EMKM menggunakan Accurate Online, mencakup jurnal penyesuaian penyusutan mesin espresso, grinder, dan perhitungan ulang HPP per menu.',
  },
  {
    id: 1,
    filename: 'CASE_02_ICBP.PDF',
    tag: 'IDX: ICBP',
    objectLabel: 'OBJEK: PT INDOFOOD CBP SUKSES MAKMUR TBK',
    title: 'Analisis Rasio Keuangan Perusahaan Publik',
    period: 'Periode: Laporan Tahunan 2023 – 2025',
    summaryPoints: [
      'Mengekstrak data laporan keuangan auditan dari situs Bursa Efek Indonesia (BEI).',
      'Menghitung & membandingkan tren Current Ratio, Debt to Equity Ratio (DER), ROE, dan Net Profit Margin.',
      'Menyusun Executive Summary 1 halaman beserta grafik tren di Microsoft Excel.',
    ],
    results: [
      'Likuiditas terjaga stabil di atas 2,0x (3 tahun berturut-turut).',
      'Pertumbuhan Net Profit Margin rata-rata 1,4% / tahun.',
    ],
    buttonLabel: 'LIHAT RINGKASAN RASIO ICBP',
    accentBg: 'bg-[#FCEEEF]',
    accentText: 'text-rose-900',
    shadowClass: 'retro-window-colored-shadow-pink',
    headerColor: 'bg-[#2B6285] text-white',
    modalTitle: 'CASE_02: ANALISIS RASIO — PT INDOFOOD CBP (ICBP)',
    modalSubtitle: 'Evaluasi Kinerja Keuangan Auditan BEI (2023 – 2025)',
    highlights: [
      { label: 'Likuiditas (Current Ratio)', val: 'Stabil > 2,0x selama 3 tahun berturut-turut' },
      { label: 'Profitabilitas (Net Profit Margin)', val: 'Tumbuh rata-rata +1,4% per tahun' },
      { label: 'Solvabilitas & Return', val: 'Analisis tren Debt to Equity Ratio (DER) & ROE' },
      { label: 'Output Dokumen', val: 'Executive Summary 1 Halaman + Grafik Tren Excel' },
    ],
    note: 'Data diekstrak langsung dari laporan keuangan auditan Bursa Efek Indonesia (IDX) dan diolah menggunakan Excel untuk memberikan insight kesehatan finansial bagi investor.',
  },
  {
    id: 2,
    filename: 'CASE_03_REKON.XLSM',
    tag: 'EXCEL AUTO',
    objectLabel: 'OBJEK: PROYEK PRIBADI (MICROSOFT EXCEL)',
    title: 'Otomatisasi Template Rekonsiliasi Bank',
    period: 'Tools: XLOOKUP, SUMIFS, Conditional Formatting',
    summaryPoints: [
      'Membangun template rekonsiliasi bank otomatis untuk mencocokkan mutasi rekening koran dengan buku besar kas bank.',
      'Menggunakan kombinasi rumus XLOOKUP, SUMIFS, dan Conditional Formatting untuk mendeteksi deposit in transit dan outstanding check secara otomatis.',
    ],
    results: [
      'Efisiensi waktu kerja: 3 jam menjadi 45 menit (-75%).',
      'Tingkat akurasi pencocokan mutasi 100%.',
    ],
    buttonLabel: 'LIHAT SIMULASI REKONSILIASI',
    accentBg: 'bg-[#EEF4F2]',
    accentText: 'text-emerald-950',
    shadowClass: 'retro-window-colored-shadow-sage',
    headerColor: 'bg-[#217A70] text-white',
    modalTitle: 'CASE_03: TEMPLATE OTOMATISASI REKONSILIASI BANK',
    modalSubtitle: 'Optimasi Proses Tutup Buku Bulanan di Microsoft Excel',
    highlights: [
      { label: 'Waktu Pengerjaan Sebelumnya', val: '3 Jam (180 Menit)' },
      { label: 'Waktu Setelah Otomatisasi', val: '45 Menit (Hemat 75% Waktu)' },
      { label: 'Tingkat Akurasi', val: '100% Pencocokan Mutasi' },
      { label: 'Formula Utama', val: 'XLOOKUP, SUMIFS, & Conditional Formatting' },
    ],
    note: 'Template secara otomatis menandai selisih antara Rekening Koran Bank dan Buku Besar Kas, memisahkan Deposit in Transit dan Outstanding Check tanpa pengecekan manual baris per baris.',
  },
];

const NAV_ITEMS = [
  { key: 'P', label: 'PROFIL', href: '#profil' },
  { key: 'K', label: 'SKILL', href: '#keahlian' },
  { key: 'A', label: 'AUDIT & PROYEK', href: '#proyek' },
  { key: 'E', label: 'PENGALAMAN', href: '#pengalaman' },
  { key: 'S', label: 'TIKET & LISENSI', href: '#sertifikasi' },
];

export default function App() {
  const [activeSkillFilter, setActiveSkillFilter] = useState<SkillCategory>('all');
  const [selectedCase, setSelectedCase] = useState<CaseStudy | null>(null);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [imageError, setImageError] = useState(false);
  const [pressedNavKey, setPressedNavKey] = useState<string | null>(null);
  const toastTimerRef = useRef<number | null>(null);
  const lastFocusedElementRef = useRef<HTMLElement | null>(null);
  const modalCloseBtnRef = useRef<HTMLButtonElement | null>(null);

  const showToast = useCallback((message: string) => {
    setToastMessage(message);
    if (toastTimerRef.current) {
      window.clearTimeout(toastTimerRef.current);
    }
    toastTimerRef.current = window.setTimeout(() => {
      setToastMessage(null);
    }, 2800);
  }, []);

  const copyText = useCallback(
    async (text: string, label: string) => {
      try {
        if (navigator.clipboard && window.isSecureContext) {
          await navigator.clipboard.writeText(text);
        } else {
          const tempInput = document.createElement('textarea');
          tempInput.value = text;
          tempInput.setAttribute('readonly', '');
          tempInput.style.position = 'absolute';
          tempInput.style.left = '-9999px';
          document.body.appendChild(tempInput);
          tempInput.select();
          document.execCommand('copy');
          document.body.removeChild(tempInput);
        }
        showToast(`${label} (${text})`);
      } catch {
        showToast(`Salin manual: ${text}`);
      }
    },
    [showToast]
  );

  const openCaseModal = useCallback((study: CaseStudy) => {
    lastFocusedElementRef.current = document.activeElement as HTMLElement | null;
    setSelectedCase(study);
  }, []);

  const closeCaseModal = useCallback(() => {
    setSelectedCase(null);
    if (lastFocusedElementRef.current) {
      lastFocusedElementRef.current.focus();
    }
  }, []);

  // Lock body scroll & manage focus when modal opens
  useEffect(() => {
    if (selectedCase) {
      const prevOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      modalCloseBtnRef.current?.focus();
      return () => {
        document.body.style.overflow = prevOverflow;
      };
    }
  }, [selectedCase]);

  // Global keyboard shortcuts: ESC to close modal, P/K/A/E/S to jump to sections
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && selectedCase) {
        closeCaseModal();
        return;
      }

      if (selectedCase || e.ctrlKey || e.metaKey || e.altKey) return;
      const target = e.target as HTMLElement | null;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) return;

      const upper = e.key.toUpperCase();
      const matched = NAV_ITEMS.find((item) => item.key === upper);
      if (matched) {
        const el = document.querySelector(matched.href);
        if (el) {
          setPressedNavKey(upper);
          el.scrollIntoView({ behavior: 'smooth' });
          window.setTimeout(() => setPressedNavKey(null), 220);
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [selectedCase, closeCaseModal]);

  useEffect(() => {
    return () => {
      if (toastTimerRef.current) {
        window.clearTimeout(toastTimerRef.current);
      }
    };
  }, []);

  const isSkillVisible = (category: Exclude<SkillCategory, 'all'>) =>
    activeSkillFilter === 'all' || activeSkillFilter === category;

  return (
    <div className="min-h-screen flex flex-col bg-retroBg text-retroBorder">
      {/* Skip to content for screen readers & keyboard users */}
      <a
        href="#profil"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[60] bg-white border-2 border-retroBorder px-3 py-1.5 font-pixel text-xs"
      >
        Langsung ke konten utama
      </a>

      {/* =====================================================================
           TOP RETRO BROWSER HEADER (Compact on mobile, sticky on tablet/desktop)
           ===================================================================== */}
      <header className="md:sticky md:top-0 z-40 bg-[#EAD5D5] border-b-[2.5px] border-retroBorder">
        {/* Browser Tab Bar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 pt-2 flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-3">
            {/* Decorative Window Dots */}
            <div className="flex items-center gap-1.5 mr-1" aria-hidden="true">
              <span className="w-3 h-3 rounded-full bg-[#D64527] border-2 border-retroBorder inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#E9C46A] border-2 border-retroBorder inline-block" />
              <span className="w-3 h-3 rounded-full bg-[#2A9D8F] border-2 border-retroBorder inline-block" />
            </div>

            {/* Active Tab */}
            <div className="bg-[#F9ECEC] border-t-[2.5px] border-x-[2.5px] border-retroBorder px-3.5 py-1.5 rounded-t-lg font-pixel text-xs sm:text-sm tracking-wider font-bold relative -mb-[2.5px] z-10 flex items-center gap-2">
              <FileSpreadsheet className="w-4 h-4 text-retroBlue shrink-0" aria-hidden="true" />
              <span>NADIA_S_AK.PORTFOLIO</span>
            </div>
          </div>

          {/* Availability Status + Print CV Action */}
          <div className="flex items-center gap-2 pb-1.5 md:pb-0">
            <div className="hidden md:flex items-center bg-[#B8332A] text-white border-2 border-retroBorder px-3 py-0.5 text-xs font-pixel tracking-wider shadow-[2px_2px_0px_#231F20]">
              <Search className="w-3.5 h-3.5 mr-1.5 shrink-0" aria-hidden="true" />
              <span>OPEN TO WORK: JUNIOR ACCOUNTANT &amp; TAX</span>
            </div>
            <button
              type="button"
              onClick={() => window.print()}
              title="Cetak atau Simpan PDF Portofolio"
              className="bg-white hover:bg-[#E9C46A] text-retroBorder border-2 border-retroBorder px-2.5 py-1 rounded text-[11px] font-pixel font-bold flex items-center gap-1.5 shadow-[2px_2px_0px_#231F20] cursor-pointer transition-colors"
            >
              <Printer className="w-3.5 h-3.5" aria-hidden="true" />
              <span>SIMPAN PDF</span>
            </button>
          </div>
        </div>

        {/* Browser Address Bar + Pixel Keycap Navigation */}
        <div className="bg-[#F9ECEC] border-t-[2.5px] border-retroBorder py-2 px-3 sm:px-6">
          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-2.5">
            {/* URL Bar */}
            <div className="flex items-center gap-2 flex-1 min-w-0">
              <button
                type="button"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                title="Kembali ke Atas"
                aria-label="Kembali ke atas halaman"
                className="p-1.5 bg-white border-2 border-retroBorder rounded hover:bg-retroPink/40 transition cursor-pointer shrink-0"
              >
                <RotateCcw className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
              <div className="flex-1 min-w-0 bg-white border-2 border-retroBorder rounded-full px-3.5 py-1 font-mono text-xs sm:text-sm flex items-center justify-between gap-2">
                <span className="truncate text-gray-800">
                  nadialarasati.portfolio / akuntansi-dan-perpajakan
                </span>
                <span className="text-[10px] font-pixel bg-emerald-100 text-emerald-900 border border-emerald-800 px-2 py-0.5 rounded-full shrink-0">
                  S.Ak. UNAIR
                </span>
              </div>
              <a
                href="#kontak"
                title="Hubungi Nadia"
                aria-label="Lompat ke informasi kontak"
                className="p-1.5 bg-[#217A70] text-white border-2 border-retroBorder rounded hover:brightness-110 transition flex items-center justify-center shrink-0"
              >
                <Mail className="w-4 h-4" aria-hidden="true" />
              </a>
            </div>

            {/* Pixel Keycap Navigation Menu */}
            <nav className="flex flex-wrap items-center justify-center gap-1.5" aria-label="Navigasi Utama">
              {NAV_ITEMS.map((item) => (
                <a
                  key={item.key}
                  href={item.href}
                  className={`pixel-keycap px-2.5 py-1.5 rounded text-[11px] font-pixel flex items-center gap-1 whitespace-nowrap ${
                    pressedNavKey === item.key ? 'active-key' : ''
                  }`}
                >
                  <span className="text-amber-300">[{item.key}]</span> {item.label}
                </a>
              ))}
            </nav>
          </div>
        </div>
      </header>

      {/* =====================================================================
           MAIN CONTENT CONTAINER
           ===================================================================== */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-8 space-y-12">
        {/* =================================================================
             SECTION 1: IDENTITAS & PROFIL SINGKAT + PENDIDIKAN
             ================================================================= */}
        <section id="profil" className="scroll-mt-8 md:scroll-mt-32">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            {/* LEFT: Retro Character / Profile Card (7 Kolom) */}
            <div className="lg:col-span-7 retro-window-colored-shadow-blue bg-retroBlue rounded-md overflow-hidden">
              {/* Mini Browser Titlebar */}
              <div className="bg-[#D9D9D9] border-b-2 border-retroBorder px-3 py-1.5 flex items-center justify-between gap-2">
                <div className="flex items-center gap-1.5 min-w-0">
                  <span className="w-2.5 h-2.5 rounded-full bg-[#D64527] border border-retroBorder shrink-0" aria-hidden="true" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#E9C46A] border border-retroBorder shrink-0" aria-hidden="true" />
                  <span className="w-2.5 h-2.5 rounded-full bg-[#2A9D8F] border border-retroBorder shrink-0" aria-hidden="true" />
                  <span className="font-pixel text-xs font-bold ml-1.5 tracking-wide truncate">
                    NADIA_PROFILE.DAT
                  </span>
                </div>
                <span className="bg-[#B8332A] text-white font-pixel text-[10px] px-2 py-0.5 border border-retroBorder shrink-0">
                  CUM LAUDE 3,82
                </span>
              </div>

              {/* Mini URL Strip */}
              <div className="bg-[#ECECEC] border-b-2 border-retroBorder px-3 py-1 flex items-center gap-2">
                <RotateCcw className="w-3 h-3 text-retroBorder shrink-0" aria-hidden="true" />
                <div className="bg-white border border-retroBorder rounded-full px-3 py-0.5 text-[11px] font-mono flex-1 truncate text-gray-800">
                  alumni / fe-unair / nadia-larasati-s-ak
                </div>
              </div>

              {/* Decorative Pixel Hearts Strip */}
              <div
                aria-hidden="true"
                className="px-4 pt-2.5 pb-1 flex items-center justify-between text-white font-pixel text-xs select-none overflow-hidden"
              >
                {Array.from({ length: 14 }).map((_, idx) => (
                  <span key={idx}>♡</span>
                ))}
              </div>

              {/* Card Body */}
              <div className="p-4 pt-2 grid grid-cols-1 md:grid-cols-12 gap-4 items-stretch">
                {/* Left Photo Frame */}
                <div className="md:col-span-4 flex flex-col">
                  <div className="bg-[#F4A261] text-retroBorder border-2 border-retroBorder text-center font-pixel text-xs font-bold py-1">
                    NADIA LARASATI
                  </div>
                  <div className="bg-white border-x-2 border-b-2 border-retroBorder p-2 flex-1 flex flex-col items-center justify-center relative">
                    <div className="w-full aspect-[3/4] bg-[#F9ECEC] border-2 border-retroBorder rounded overflow-hidden relative flex items-center justify-center">
                      {!imageError ? (
                        <img
                          src={nadiaPortrait}
                          alt="Foto profil Nadia Larasati, S.Ak."
                          referrerPolicy="no-referrer"
                          onError={() => setImageError(true)}
                          className="w-full h-full object-cover object-top"
                        />
                      ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center bg-[#FDF8F2] p-3 text-center">
                          <span className="font-pixel text-lg font-bold text-retroBlue">NL</span>
                          <span className="font-mono text-xs text-retroBorder mt-1">Nadia Larasati, S.Ak.</span>
                        </div>
                      )}
                      <span className="absolute top-2 left-2 bg-white/95 text-retroBorder border border-retroBorder px-1.5 py-0.5 font-pixel text-[10px] shadow-[2px_2px_0px_#231F20]">
                        ✦ S.Ak.
                      </span>
                      <span className="absolute bottom-2 right-2 bg-[#E9C46A] text-retroBorder border border-retroBorder px-1.5 py-0.5 font-pixel text-[10px]">
                        SUB · ID
                      </span>
                    </div>
                  </div>
                </div>

                {/* Middle Metadata Labels (High-contrast white boxes) */}
                <div className="md:col-span-3 flex flex-col justify-between text-white space-y-2.5">
                  <div>
                    <span className="inline-block bg-white text-retroBorder border-2 border-retroBorder font-pixel text-[10px] px-1.5 py-0.5 font-bold">
                      NAMA &amp; GELAR
                    </span>
                    <h1 className="font-pixel text-sm mt-1 leading-snug text-white">
                      Nadia Larasati, S.Ak.
                    </h1>
                  </div>
                  <div>
                    <span className="inline-block bg-white text-retroBorder border-2 border-retroBorder font-pixel text-[10px] px-1.5 py-0.5 font-bold">
                      SPESIALISASI
                    </span>
                    <p className="font-mono text-xs font-bold mt-1 text-white">
                      Financial &amp; Tax Accounting
                    </p>
                  </div>
                  <div>
                    <span className="inline-block bg-white text-retroBorder border-2 border-retroBorder font-pixel text-[10px] px-1.5 py-0.5 font-bold">
                      DOMISILI
                    </span>
                    <p className="font-mono text-xs mt-1 text-white">Surabaya, Jawa Timur</p>
                  </div>
                  <div>
                    <span className="inline-block bg-white text-retroBorder border-2 border-retroBorder font-pixel text-[10px] px-1.5 py-0.5 font-bold">
                      STATUS
                    </span>
                    <p className="font-mono text-xs mt-1 text-white font-bold">
                      Siap Bekerja (Full-Time)
                    </p>
                  </div>
                </div>

                {/* Right Checkerboard Spec Box */}
                <div className="md:col-span-5 checkerboard border-2 border-retroBorder p-3 flex flex-col justify-between gap-3">
                  <div className="text-center">
                    <span className="bg-white border border-retroBorder px-2 py-0.5 font-pixel text-[10px] font-bold">
                      TARGET POSISI
                    </span>
                    <div className="mt-1.5 bg-[#B8332A] text-white border-2 border-retroBorder py-1.5 px-2 font-pixel text-[11px] leading-tight shadow-[2px_2px_0px_#231F20]">
                      JUNIOR ACCOUNTANT | TAX &amp; REPORTING
                    </div>
                  </div>

                  <div className="space-y-2">
                    <div className="flex items-center justify-between bg-white border border-retroBorder px-2 py-1">
                      <span className="font-pixel text-[10px] font-bold">IPK UNAIR</span>
                      <span className="bg-[#E9C46A] text-retroBorder border border-retroBorder px-1.5 py-0.5 font-mono text-xs font-bold tabular-nums">
                        3,82 / 4,00
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-white border border-retroBorder px-2 py-1">
                      <span className="font-pixel text-[10px] font-bold">PREDIKAT</span>
                      <span className="bg-[#217A70] text-white border border-retroBorder px-1.5 py-0.5 font-pixel text-[10px]">
                        CUM LAUDE
                      </span>
                    </div>
                    <div className="flex items-center justify-between bg-white border border-retroBorder px-2 py-1">
                      <span className="font-pixel text-[10px] font-bold">SERTIFIKASI</span>
                      <span className="bg-[#2B6285] text-white border border-retroBorder px-1.5 py-0.5 font-pixel text-[10px]">
                        BREVET A&amp;B
                      </span>
                    </div>
                  </div>

                  {/* Quick Copy Contact Buttons */}
                  <div className="grid grid-cols-2 gap-1.5 pt-1">
                    <button
                      type="button"
                      onClick={() => copyText('nadia.larasati@email.com', 'Email disalin!')}
                      className="bg-white hover:bg-amber-100 text-retroBorder border-2 border-retroBorder py-1.5 px-2 font-pixel text-[10px] flex items-center justify-center gap-1 cursor-pointer active:translate-y-0.5 transition-colors"
                    >
                      <Copy className="w-3 h-3 shrink-0" aria-hidden="true" />
                      <span>SALIN EMAIL</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => copyText('+62 812-3456-7890', 'Nomor HP disalin!')}
                      className="bg-white hover:bg-amber-100 text-retroBorder border-2 border-retroBorder py-1.5 px-2 font-pixel text-[10px] flex items-center justify-center gap-1 cursor-pointer active:translate-y-0.5 transition-colors"
                    >
                      <Phone className="w-3 h-3 shrink-0" aria-hidden="true" />
                      <span>SALIN WA</span>
                    </button>
                  </div>
                </div>
              </div>

              {/* Bottom Segmented Status Bar */}
              <div className="bg-[#D9D9D9] border-t-2 border-retroBorder px-3 py-1.5 flex items-center gap-3">
                <span className="font-pixel text-[10px] font-bold shrink-0">Trial Balance</span>
                <div className="h-3 flex-1 border border-retroBorder loading-segments" aria-hidden="true" />
                <span className="font-pixel text-[10px] font-bold text-emerald-900 shrink-0">
                  100% BALANCED
                </span>
              </div>
            </div>

            {/* RIGHT: Tentang Saya & Pendidikan Window (5 Kolom) */}
            <div className="lg:col-span-5 space-y-6">
              {/* Tentang Saya Window */}
              <div className="retro-window bg-white rounded-md overflow-hidden">
                <div className="bg-retroPink border-b-2 border-retroBorder px-3 py-1.5 flex items-center justify-between">
                  <span className="font-pixel text-xs font-bold text-retroBorder">TENTANG_SAYA.TXT</span>
                  <span className="font-mono text-xs font-bold text-retroBorder">RINGKASAN PROFIL</span>
                </div>
                <div className="p-4 sm:p-5 bg-retroCream">
                  <p className="text-sm leading-relaxed text-gray-800">
                    Lulusan{' '}
                    <strong className="font-semibold text-retroBorder bg-amber-200/80 px-1">
                      S1 Akuntansi Universitas Airlangga (IPK 3,82/4,00)
                    </strong>{' '}
                    dengan spesialisasi <strong>Akuntansi Keuangan dan Perpajakan</strong>.
                    Berpengalaman menyusun laporan keuangan UMKM sesuai <strong>SAK EMKM</strong>,
                    melakukan rekonsiliasi fiskal, dan mengelola administrasi perpajakan selama masa
                    magang di Kantor Akuntan Publik. Terbiasa mengolah data keuangan menggunakan{' '}
                    <strong>Microsoft Excel</strong> dan <strong>Accurate Online</strong> untuk
                    mempercepat proses tutup buku bulanan.
                  </p>

                  {/* Contact Bar */}
                  <div
                    id="kontak"
                    className="mt-4 pt-3 border-t-2 border-dashed border-retroBorder/40 flex flex-wrap gap-2 text-xs font-mono"
                  >
                    <a
                      href="mailto:nadia.larasati@email.com"
                      className="bg-white border border-retroBorder px-2.5 py-1.5 rounded hover:bg-retroPink/30 transition inline-flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5 text-retroBlue shrink-0" aria-hidden="true" />
                      <span>nadia.larasati@email.com</span>
                    </a>
                    <a
                      href="tel:+6281234567890"
                      className="bg-white border border-retroBorder px-2.5 py-1.5 rounded hover:bg-retroPink/30 transition inline-flex items-center gap-1.5 tabular-nums"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#217A70] shrink-0" aria-hidden="true" />
                      <span>+62 812-3456-7890</span>
                    </a>
                    <a
                      href="https://linkedin.com/in/nadialarasati"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-[#2B6285] text-white border border-retroBorder px-2.5 py-1.5 rounded hover:brightness-110 transition inline-flex items-center gap-1.5"
                    >
                      <Linkedin className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                      <span>linkedin.com/in/nadialarasati</span>
                    </a>
                  </div>
                </div>
              </div>

              {/* Pendidikan Window */}
              <div className="retro-window bg-white rounded-md overflow-hidden">
                <div className="bg-[#217A70] text-white border-b-2 border-retroBorder px-3 py-1.5 flex items-center justify-between">
                  <span className="font-pixel text-xs font-bold inline-flex items-center gap-1.5">
                    <GraduationCap className="w-4 h-4" aria-hidden="true" />
                    PENDIDIKAN.LOG
                  </span>
                  <span className="bg-white text-retroBorder border border-retroBorder px-1.5 py-0.5 font-pixel text-[10px] tabular-nums">
                    2022 – 2026
                  </span>
                </div>
                <div className="p-4 sm:p-5 bg-white space-y-3">
                  <div className="flex flex-wrap items-start justify-between gap-2">
                    <div>
                      <h2 className="font-bold text-base text-retroBorder">
                        Universitas Airlangga (UNAIR)
                      </h2>
                      <p className="text-sm font-medium text-retroBlue">
                        S1 Akuntansi · Fakultas Ekonomi dan Bisnis
                      </p>
                    </div>
                    <span className="bg-[#E9C46A] text-retroBorder border-2 border-retroBorder px-2.5 py-1 font-pixel text-xs font-bold shadow-[2px_2px_0px_#231F20] tabular-nums">
                      IPK 3,82 / 4,00 (Cum Laude)
                    </span>
                  </div>

                  <div className="bg-[#F9ECEC] border border-retroBorder p-3 rounded">
                    <p className="font-pixel text-[11px] font-bold mb-1.5 text-gray-800">
                      MATA KULIAH RELEVAN:
                    </p>
                    <div className="flex flex-wrap gap-1.5">
                      {[
                        'Akuntansi Keuangan Menengah & Lanjutan',
                        'Perpajakan',
                        'Pengauditan',
                        'Sistem Informasi Akuntansi',
                        'Analisis Laporan Keuangan',
                      ].map((course) => (
                        <span
                          key={course}
                          className="bg-white border border-retroBorder px-2 py-0.5 text-xs font-mono"
                        >
                          {course}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
             SECTION 2: KEAHLIAN TEKNIS (INTERACTIVE PIXEL KEYCAP BOARD)
             ================================================================= */}
        <section id="keahlian" className="scroll-mt-8 md:scroll-mt-32">
          <div className="retro-window bg-[#252B33] text-white rounded-md overflow-hidden">
            {/* Window Header */}
            <div className="bg-[#363F4A] border-b-2 border-retroBorder px-4 py-2 flex flex-wrap items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#D64527] border border-black" aria-hidden="true" />
                <span className="w-3 h-3 rounded-full bg-[#E9C46A] border border-black" aria-hidden="true" />
                <span className="w-3 h-3 rounded-full bg-[#2A9D8F] border border-black" aria-hidden="true" />
                <h2 className="font-pixel text-xs sm:text-sm tracking-wider ml-1">
                  TECHNICAL_SKILLS_KEYPAD.SYS
                </h2>
              </div>
              <span className="font-mono text-xs text-amber-300">
                Pilih tombol keycap untuk filter kategori skill
              </span>
            </div>

            <div className="p-5 sm:p-6 space-y-6">
              {/* Interactive Keycap Category Selector */}
              <div
                className="flex flex-wrap items-center justify-center gap-2.5 pb-4 border-b border-gray-700"
                role="group"
                aria-label="Filter kategori keahlian teknis"
              >
                {(
                  [
                    { id: 'all', keyChar: 'A', color: 'text-amber-300', label: 'SEMUA SKILL' },
                    { id: 'software', keyChar: 'S', color: 'text-sky-300', label: 'SOFTWARE AKUNTANSI' },
                    { id: 'excel', keyChar: 'X', color: 'text-emerald-300', label: 'PENGOLAHAN DATA (EXCEL)' },
                    { id: 'tax', keyChar: 'T', color: 'text-rose-300', label: 'PERPAJAKAN' },
                    { id: 'standard', keyChar: 'R', color: 'text-purple-300', label: 'STANDAR & REGULASI' },
                  ] as const
                ).map((btn) => (
                  <button
                    key={btn.id}
                    type="button"
                    aria-pressed={activeSkillFilter === btn.id}
                    onClick={() => setActiveSkillFilter(btn.id)}
                    className={`pixel-keycap px-3.5 py-2 rounded font-pixel text-xs flex items-center gap-2 ${
                      activeSkillFilter === btn.id ? 'active-key' : ''
                    }`}
                  >
                    <span
                      className={`w-6 h-6 bg-[#1E232A] rounded flex items-center justify-center font-bold ${btn.color}`}
                    >
                      {btn.keyChar}
                    </span>
                    <span>{btn.label}</span>
                  </button>
                ))}
              </div>

              {/* Grid Cards of Technical Skills */}
              <div
                className={`grid grid-cols-1 gap-4 ${
                  activeSkillFilter === 'all'
                    ? 'md:grid-cols-2 lg:grid-cols-4'
                    : 'max-w-md mx-auto'
                }`}
              >
                {/* Card 1: Software Akuntansi */}
                {isSkillVisible('software') && (
                  <div className="bg-[#363F4A] border-2 border-[#1E232A] rounded-lg p-4 shadow-[0_4px_0_#1E232A] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="pixel-badge w-8 h-8 rounded flex items-center justify-center font-pixel text-sm font-bold text-sky-300">
                          S
                        </span>
                        <span className="font-pixel text-[10px] bg-sky-950 text-sky-200 border border-sky-400 px-2 py-0.5 rounded">
                          ERP &amp; ACCOUNTING
                        </span>
                      </div>
                      <h3 className="font-pixel text-sm text-white mb-3">Software Akuntansi</h3>
                      <ul className="space-y-2.5 text-xs font-mono">
                        <li className="bg-[#252B33] p-2 rounded border border-gray-700 flex items-center justify-between">
                          <span>Accurate Online</span>
                          <span className="bg-emerald-400 text-black font-bold px-1.5 py-0.5 rounded text-[10px]">
                            Mahir
                          </span>
                        </li>
                        <li className="bg-[#252B33] p-2 rounded border border-gray-700 flex items-center justify-between">
                          <span>Zahir Accounting</span>
                          <span className="bg-amber-300 text-black font-bold px-1.5 py-0.5 rounded text-[10px]">
                            Menengah
                          </span>
                        </li>
                        <li className="bg-[#252B33] p-2 rounded border border-gray-700 flex items-center justify-between">
                          <span>SAP</span>
                          <span className="bg-sky-300 text-black font-bold px-1.5 py-0.5 rounded text-[10px]">
                            Dasar
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Card 2: Pengolahan Data */}
                {isSkillVisible('excel') && (
                  <div className="bg-[#363F4A] border-2 border-[#1E232A] rounded-lg p-4 shadow-[0_4px_0_#1E232A] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="pixel-badge w-8 h-8 rounded flex items-center justify-center font-pixel text-sm font-bold text-emerald-300">
                          X
                        </span>
                        <span className="font-pixel text-[10px] bg-emerald-950 text-emerald-200 border border-emerald-400 px-2 py-0.5 rounded">
                          DATA &amp; MODELING
                        </span>
                      </div>
                      <h3 className="font-pixel text-sm text-white mb-3">Pengolahan Data (Excel)</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {['Pivot Table', 'XLOOKUP', 'SUMIFS', 'Power Query', 'Macro Dasar'].map(
                          (fn) => (
                            <span
                              key={fn}
                              className="pixel-badge px-2 py-1 rounded font-mono text-xs text-emerald-200"
                            >
                              {fn}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                    <p className="mt-3 pt-2 border-t border-gray-600 text-[11px] font-mono text-gray-200">
                      Automasi rekonsiliasi &amp; dashboard rasio keuangan.
                    </p>
                  </div>
                )}

                {/* Card 3: Perpajakan */}
                {isSkillVisible('tax') && (
                  <div className="bg-[#363F4A] border-2 border-[#1E232A] rounded-lg p-4 shadow-[0_4px_0_#1E232A] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="pixel-badge w-8 h-8 rounded flex items-center justify-center font-pixel text-sm font-bold text-rose-300">
                          T
                        </span>
                        <span className="font-pixel text-[10px] bg-rose-950 text-rose-200 border border-rose-400 px-2 py-0.5 rounded">
                          DJP &amp; COMPLIANCE
                        </span>
                      </div>
                      <h3 className="font-pixel text-sm text-white mb-3">Administrasi Perpajakan</h3>
                      <ul className="space-y-2 text-xs font-mono">
                        <li className="bg-[#252B33] p-2 rounded border border-gray-700 flex items-center gap-2">
                          <span className="text-rose-300" aria-hidden="true">▸</span>
                          <span>e-Faktur (PPN Masukan/Keluaran)</span>
                        </li>
                        <li className="bg-[#252B33] p-2 rounded border border-gray-700 flex items-center gap-2">
                          <span className="text-rose-300" aria-hidden="true">▸</span>
                          <span>e-Bupot Unifikasi</span>
                        </li>
                        <li className="bg-[#252B33] p-2 rounded border border-gray-700 flex items-center gap-2">
                          <span className="text-rose-300" aria-hidden="true">▸</span>
                          <span>e-Filing SPT Tahunan Badan &amp; OP</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Card 4: Standar & Regulasi */}
                {isSkillVisible('standard') && (
                  <div className="bg-[#363F4A] border-2 border-[#1E232A] rounded-lg p-4 shadow-[0_4px_0_#1E232A] flex flex-col justify-between">
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="pixel-badge w-8 h-8 rounded flex items-center justify-center font-pixel text-sm font-bold text-purple-300">
                          R
                        </span>
                        <span className="font-pixel text-[10px] bg-purple-950 text-purple-200 border border-purple-400 px-2 py-0.5 rounded">
                          COMPLIANCE
                        </span>
                      </div>
                      <h3 className="font-pixel text-sm text-white mb-3">Standar &amp; Regulasi</h3>
                      <div className="space-y-2 text-xs font-mono">
                        <div className="bg-[#252B33] p-2 rounded border border-gray-700">
                          <strong className="text-purple-200">PSAK Umum</strong>
                          <p className="text-[11px] text-gray-200 mt-0.5">
                            Pelaporan keuangan entitas korporasi.
                          </p>
                        </div>
                        <div className="bg-[#252B33] p-2 rounded border border-gray-700">
                          <strong className="text-purple-200">SAK EMKM</strong>
                          <p className="text-[11px] text-gray-200 mt-0.5">
                            Standar akuntansi khusus UMKM.
                          </p>
                        </div>
                        <div className="bg-[#252B33] p-2 rounded border border-gray-700">
                          <strong className="text-purple-200">UU HPP</strong>
                          <p className="text-[11px] text-gray-200 mt-0.5">
                            Harmonisasi Peraturan Perpajakan.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
             SECTION 3: PROYEK & STUDI KASUS AKUNTANSI
             ================================================================= */}
        <section id="proyek" className="scroll-mt-8 md:scroll-mt-32 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white border-2 border-retroBorder px-4 py-3 rounded-md shadow-[4px_4px_0px_#231F20]">
            <div>
              <span className="font-pixel text-xs text-retroBlue font-bold">
                FOLDER: C:\PORTFOLIO\STUDI_KASUS
              </span>
              <h2 className="font-pixel text-lg sm:text-xl font-bold text-retroBorder">
                PROYEK &amp; STUDI KASUS AKUNTANSI
              </h2>
            </div>
            <span className="bg-retroPink text-retroBorder border-2 border-retroBorder px-3 py-1 font-pixel text-xs font-bold">
              3 WORKING PAPERS
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
            {CASE_STUDIES.map((study) => (
              <article
                key={study.id}
                className={`${study.shadowClass} bg-white rounded-md overflow-hidden flex flex-col`}
              >
                {/* Titlebar */}
                <div className="bg-[#D9D9D9] border-b-2 border-retroBorder px-3 py-1.5 flex items-center justify-between">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#D64527] border border-retroBorder" aria-hidden="true" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#E9C46A] border border-retroBorder" aria-hidden="true" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#2A9D8F] border border-retroBorder" aria-hidden="true" />
                    <span className="font-pixel text-[11px] font-bold ml-1">{study.filename}</span>
                  </div>
                  <span className={`${study.headerColor} font-pixel text-[9px] px-1.5 py-0.5 border border-retroBorder`}>
                    {study.tag}
                  </span>
                </div>

                {/* Content */}
                <div className="p-4 bg-white flex-1 flex flex-col justify-between space-y-4">
                  <div className="space-y-3">
                    <div className={`${study.accentBg} border-2 border-retroBorder p-3 rounded`}>
                      <span className={`font-pixel text-[10px] ${study.accentText} block`}>
                        {study.objectLabel}
                      </span>
                      <h3 className="font-bold text-base text-retroBorder mt-1">{study.title}</h3>
                      <p className="font-mono text-xs text-gray-700 mt-1">{study.period}</p>
                    </div>

                    <div>
                      <h4 className="font-pixel text-[11px] font-bold text-retroBorder mb-1.5">
                        RINGKASAN PEKERJAAN:
                      </h4>
                      <ul className="space-y-1.5 text-xs text-gray-800 list-disc pl-4">
                        {study.summaryPoints.map((pt, idx) => (
                          <li key={idx}>{pt}</li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Hasil Utama Box */}
                  <div className="checkerboard border-2 border-retroBorder p-3 rounded space-y-2">
                    <span className="inline-block bg-[#E9C46A] text-retroBorder border border-retroBorder px-2 py-0.5 font-pixel text-[10px] font-bold">
                      ★ HASIL UTAMA
                    </span>
                    <div className="bg-white border border-retroBorder p-2 text-xs space-y-1 tabular-nums">
                      {study.results.map((res, idx) => (
                        <p key={idx} className="font-semibold text-retroBorder">
                          ✓ {res}
                        </p>
                      ))}
                    </div>
                    <button
                      type="button"
                      onClick={() => openCaseModal(study)}
                      className="w-full pixel-keycap py-2 rounded font-pixel text-[11px] text-center"
                    >
                      {study.buttonLabel}
                    </button>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </section>

        {/* =================================================================
             SECTION 4: PENGALAMAN MAGANG & ORGANISASI
             ================================================================= */}
        <section id="pengalaman" className="scroll-mt-8 md:scroll-mt-32 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white border-2 border-retroBorder px-4 py-3 rounded-md shadow-[4px_4px_0px_#231F20]">
            <div>
              <span className="font-pixel text-xs text-retroPinkDark font-bold">
                HISTORY: AUDIT_TRAIL_2024_2026
              </span>
              <h2 className="font-pixel text-lg sm:text-xl font-bold text-retroBorder">
                PENGALAMAN MAGANG &amp; ORGANISASI
              </h2>
            </div>
            <span className="bg-[#E9C46A] text-retroBorder border-2 border-retroBorder px-3 py-1 font-pixel text-xs font-bold">
              2 ROLES VERIFIED
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Pengalaman 1: KAP Budi Santoso & Rekan */}
            <div className="retro-window bg-white rounded-md overflow-hidden">
              <div className="bg-retroBlue text-white border-b-2 border-retroBorder px-4 py-2 flex items-center justify-between gap-2">
                <span className="font-pixel text-xs font-bold inline-flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  MAGANG KANTOR AKUNTAN PUBLIK
                </span>
                <span className="bg-white text-retroBorder border border-retroBorder px-2 py-0.5 font-pixel text-[10px] shrink-0 tabular-nums">
                  JAN 2026 – APR 2026
                </span>
              </div>
              <div className="p-5 bg-retroCream space-y-3">
                <div>
                  <h3 className="font-bold text-lg text-retroBorder">Tax &amp; Accounting Intern</h3>
                  <p className="font-mono text-sm font-semibold text-retroBlue">
                    KAP Budi Santoso &amp; Rekan
                  </p>
                </div>
                <ul className="space-y-2 text-sm text-gray-800">
                  <li className="flex items-start gap-2 bg-white border border-retroBorder p-2.5 rounded">
                    <span className="font-pixel text-xs text-retroBlue mt-0.5 shrink-0">[01]</span>
                    <span>
                      Membantu menyusun kertas kerja pemeriksaan (<em>audit working papers</em>)
                      untuk <strong>4 klien</strong> di sektor perdagangan dan jasa.
                    </span>
                  </li>
                  <li className="flex items-start gap-2 bg-white border border-retroBorder p-2.5 rounded">
                    <span className="font-pixel text-xs text-retroBlue mt-0.5 shrink-0">[02]</span>
                    <span>
                      Melakukan input dan validasi <strong>150+ faktur pajak</strong> masukan dan
                      keluaran per bulan melalui aplikasi <strong>e-Faktur</strong>.
                    </span>
                  </li>
                  <li className="flex items-start gap-2 bg-white border border-retroBorder p-2.5 rounded">
                    <span className="font-pixel text-xs text-retroBlue mt-0.5 shrink-0">[03]</span>
                    <span>
                      Membantu proses <strong>rekonsiliasi fiskal</strong> dan persiapan pelaporan
                      SPT Tahunan Badan klien.
                    </span>
                  </li>
                </ul>
              </div>
            </div>

            {/* Pengalaman 2: Bendahara Umum HMA */}
            <div className="retro-window bg-white rounded-md overflow-hidden">
              <div className="bg-[#B8332A] text-white border-b-2 border-retroBorder px-4 py-2 flex items-center justify-between gap-2">
                <span className="font-pixel text-xs font-bold inline-flex items-center gap-1.5">
                  <Briefcase className="w-3.5 h-3.5 shrink-0" aria-hidden="true" />
                  ORGANISASI KEMAHASISWAAN
                </span>
                <span className="bg-white text-retroBorder border border-retroBorder px-2 py-0.5 font-pixel text-[10px] shrink-0 tabular-nums">
                  2024 – 2025
                </span>
              </div>
              <div className="p-5 bg-retroCream space-y-3">
                <div>
                  <h3 className="font-bold text-lg text-retroBorder">Bendahara Umum</h3>
                  <p className="font-mono text-sm font-semibold text-[#9E2A22]">
                    Himpunan Mahasiswa Akuntansi (HMA)
                  </p>
                </div>
                <ul className="space-y-2 text-sm text-gray-800">
                  <li className="flex items-start gap-2 bg-white border border-retroBorder p-2.5 rounded">
                    <span className="font-pixel text-xs text-[#9E2A22] mt-0.5 shrink-0">[01]</span>
                    <span>
                      Mengelola anggaran operasional organisasi sebesar{' '}
                      <strong className="tabular-nums">Rp75.000.000 per tahun</strong>.
                    </span>
                  </li>
                  <li className="flex items-start gap-2 bg-white border border-retroBorder p-2.5 rounded">
                    <span className="font-pixel text-xs text-[#9E2A22] mt-0.5 shrink-0">[02]</span>
                    <span>
                      Menyusun <strong>laporan pertanggungjawaban (LPJ)</strong> keuangan bulanan
                      dan akhir periode secara tepat waktu.
                    </span>
                  </li>
                  <li className="flex items-start gap-2 bg-white border border-retroBorder p-2.5 rounded">
                    <span className="font-pixel text-xs text-[#9E2A22] mt-0.5 shrink-0">[03]</span>
                    <span>
                      Membuat sistem pengarsipan bukti transaksi digital untuk mempermudah audit
                      internal organisasi.
                    </span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* =================================================================
             SECTION 5: SERTIFIKASI & PELATIHAN (VINTAGE TICKET / BOARDING PASS)
             ================================================================= */}
        <section id="sertifikasi" className="scroll-mt-8 md:scroll-mt-32 space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white border-2 border-retroBorder px-4 py-3 rounded-md shadow-[4px_4px_0px_#231F20]">
            <div>
              <span className="font-pixel text-xs text-[#B8332A] font-bold">
                CREDENTIALS: VINTAGE_PASSES
              </span>
              <h2 className="font-pixel text-lg sm:text-xl font-bold text-retroBorder">
                SERTIFIKASI &amp; PELATIHAN RESMI
              </h2>
            </div>
            <span className="bg-[#217A70] text-white border-2 border-retroBorder px-3 py-1 font-pixel text-xs font-bold">
              3 CREDENTIAL TICKETS
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* TICKET 1: Brevet Pajak A & B Terpadu */}
            <div className="vintage-ticket bg-[#F7E5D7] shadow-[5px_5px_0px_#231F20] flex flex-col justify-between overflow-hidden">
              <div className="bg-[#B8332A] text-white px-4 py-2 border-b-2 border-retroBorder flex items-center justify-between">
                <span className="font-pixel text-xs tracking-widest font-bold">
                  TAX PASS · BREVET A&amp;B
                </span>
                <span className="border border-white px-1.5 py-0.5 font-mono text-[10px]">
                  FIRST CLASS
                </span>
              </div>

              <div className="p-4 space-y-3">
                <div className="border-b-2 border-retroBorder pb-2">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-gray-700">
                    ISSUER: IKATAN AKUNTAN INDONESIA
                  </p>
                  <h3 className="font-bold text-base text-retroBorder leading-snug mt-0.5">
                    Brevet Pajak A &amp; B Terpadu
                  </h3>
                  <p className="font-mono text-xs font-semibold text-[#9E2A22]">
                    IAI Wilayah Jawa Timur
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                  <div className="bg-white/80 border border-retroBorder p-2">
                    <span className="text-[10px] text-gray-700 block">HOLDER</span>
                    <strong>Nadia Larasati</strong>
                  </div>
                  <div className="bg-white/80 border border-retroBorder p-2">
                    <span className="text-[10px] text-gray-700 block">ISSUED YEAR</span>
                    <strong className="tabular-nums">2025</strong>
                  </div>
                </div>
              </div>

              <div className="ticket-stub bg-[#EFE0D1] px-4 py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-pixel text-[10px] text-gray-700 block">NO. SERI</span>
                  <span className="font-mono text-xs font-bold tabular-nums">IAI-JTM-2025-884</span>
                </div>
                <div className="h-7 w-24 barcode-strip" aria-hidden="true" />
              </div>
            </div>

            {/* TICKET 2: Certified Accurate Professional */}
            <div className="vintage-ticket bg-[#EDF2F7] shadow-[5px_5px_0px_#231F20] flex flex-col justify-between overflow-hidden">
              <div className="bg-[#2B4C7E] text-white px-4 py-2 border-b-2 border-retroBorder flex items-center justify-between">
                <span className="font-pixel text-xs tracking-widest font-bold">
                  BOARDING PASS · ERP
                </span>
                <span className="font-mono text-[11px]">CAP-2025</span>
              </div>

              <div className="p-4 space-y-3">
                <div className="border-b-2 border-retroBorder pb-2">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-gray-700">
                    ISSUER: CPSSOFT INDONESIA
                  </p>
                  <h3 className="font-bold text-base text-retroBorder leading-snug mt-0.5">
                    Certified Accurate Professional (CAP)
                  </h3>
                  <p className="font-mono text-xs font-semibold text-[#2B4C7E]">
                    Accurate Online &amp; Accounting System
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-1.5 font-mono text-xs">
                  <div className="bg-white border border-retroBorder p-1.5">
                    <span className="text-[9px] text-gray-700 block">FROM</span>
                    <strong>LEDGER</strong>
                  </div>
                  <div className="bg-white border border-retroBorder p-1.5">
                    <span className="text-[9px] text-gray-700 block">TO</span>
                    <strong>REPORT</strong>
                  </div>
                  <div className="bg-white border border-retroBorder p-1.5">
                    <span className="text-[9px] text-gray-700 block">YEAR</span>
                    <strong className="tabular-nums">2025</strong>
                  </div>
                </div>
              </div>

              <div className="ticket-stub bg-[#DCE6F2] px-4 py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-pixel text-[10px] text-gray-700 block">SEAT / CLASS</span>
                  <span className="font-mono text-xs font-bold">11A · CERTIFIED</span>
                </div>
                <div className="h-7 w-24 barcode-strip" aria-hidden="true" />
              </div>
            </div>

            {/* TICKET 3: Microsoft Office Specialist Excel Associate */}
            <div className="vintage-ticket bg-[#E6EFE9] shadow-[5px_5px_0px_#231F20] flex flex-col justify-between overflow-hidden">
              <div className="bg-[#2D6A4F] text-white px-4 py-2 border-b-2 border-retroBorder flex items-center justify-between">
                <span className="font-pixel text-xs tracking-widest font-bold">
                  EXCEL ASSOCIATE TICKET
                </span>
                <span className="border border-white px-1.5 py-0.5 font-mono text-[10px]">
                  MOS-2024
                </span>
              </div>

              <div className="p-4 space-y-3">
                <div className="border-b-2 border-retroBorder pb-2">
                  <p className="font-mono text-[10px] uppercase tracking-wider text-gray-700">
                    ISSUER: MICROSOFT CORPORATION
                  </p>
                  <h3 className="font-bold text-base text-retroBorder leading-snug mt-0.5">
                    Microsoft Office Specialist: Excel Associate
                  </h3>
                  <p className="font-mono text-xs font-semibold text-[#23533D]">
                    Microsoft Certified
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 font-mono text-xs">
                  <div className="bg-white/85 border border-retroBorder p-2">
                    <span className="text-[10px] text-gray-700 block">CREDENTIAL</span>
                    <strong>MOS Excel</strong>
                  </div>
                  <div className="bg-white/85 border border-retroBorder p-2">
                    <span className="text-[10px] text-gray-700 block">ISSUED YEAR</span>
                    <strong className="tabular-nums">2024</strong>
                  </div>
                </div>
              </div>

              <div className="ticket-stub bg-[#D3E4D8] px-4 py-2.5 flex items-center justify-between">
                <div>
                  <span className="font-pixel text-[10px] text-gray-700 block">CODE</span>
                  <span className="font-mono text-xs font-bold">B06L11 · VALID</span>
                </div>
                <div className="h-7 w-24 barcode-strip" aria-hidden="true" />
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* =====================================================================
           RETRO STATUS BAR FOOTER
           ===================================================================== */}
      <footer className="mt-12 bg-[#EAD5D5] border-t-[2.5px] border-retroBorder py-4 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <span className="font-pixel text-xs font-bold shrink-0">LEDGER READY</span>
            <div className="h-4 w-40 sm:w-56 border-2 border-retroBorder loading-segments" aria-hidden="true" />
            <span className="font-pixel text-[10px] font-bold text-[#1E5E56]">100%</span>
          </div>

          <p className="font-mono text-xs text-center sm:text-right text-retroBorder">
            © 2026 <strong>Nadia Larasati, S.Ak.</strong> · Junior Accountant | Tax &amp; Financial
            Reporting · Surabaya, Jawa Timur
          </p>
        </div>
      </footer>

      {/* =====================================================================
           ACCESSIBLE MODAL DIALOG UNTUK DETAIL STUDI KASUS
           ===================================================================== */}
      {selectedCase && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
          onClick={(e) => {
            if (e.target === e.currentTarget) closeCaseModal();
          }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 no-print"
        >
          <div className="retro-window bg-white max-w-xl w-full rounded-md overflow-hidden">
            <div className="bg-retroBlue text-white border-b-2 border-retroBorder px-4 py-2 flex items-center justify-between gap-2">
              <span id="modal-title" className="font-pixel text-xs font-bold truncate">
                {selectedCase.modalTitle}
              </span>
              <button
                ref={modalCloseBtnRef}
                type="button"
                onClick={closeCaseModal}
                aria-label="Tutup jendela detail studi kasus"
                className="bg-[#B8332A] text-white border border-retroBorder p-1 font-pixel text-xs cursor-pointer hover:brightness-110 shrink-0"
              >
                <X className="w-3.5 h-3.5" aria-hidden="true" />
              </button>
            </div>

            <div className="p-5 bg-retroCream space-y-4 text-sm max-h-[75vh] overflow-y-auto">
              <div className="bg-amber-100 border-2 border-retroBorder p-3 rounded">
                <h3 className="font-bold text-base text-retroBorder">
                  {selectedCase.modalSubtitle}
                </h3>
              </div>

              <div className="space-y-2 tabular-nums">
                {selectedCase.highlights.map((item) => (
                  <div
                    key={item.label}
                    className="bg-white border border-retroBorder p-2.5 rounded flex flex-col sm:flex-row sm:items-center justify-between gap-1"
                  >
                    <span className="font-mono text-xs text-gray-700">{item.label}</span>
                    <span className="font-mono text-xs font-bold text-retroBlue">{item.val}</span>
                  </div>
                ))}
              </div>

              <div className="bg-white border-2 border-dashed border-retroBorder p-3 rounded text-xs text-gray-800 leading-relaxed">
                <strong className="font-pixel text-[10px] block mb-1">
                  CATATAN AUDITOR / ANALIS:
                </strong>
                {selectedCase.note}
              </div>
            </div>

            <div className="bg-[#D9D9D9] border-t-2 border-retroBorder px-4 py-2 flex justify-end">
              <button
                type="button"
                onClick={closeCaseModal}
                className="pixel-keycap px-4 py-1.5 rounded font-pixel text-xs"
              >
                TUTUP [ESC]
              </button>
            </div>
          </div>
        </div>
      )}

      {/* =====================================================================
           TOAST NOTIFICATION (ACCESSIBLE LIVE REGION)
           ===================================================================== */}
      {toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-5 right-5 z-50 bg-[#217A70] text-white border-2 border-retroBorder px-4 py-2.5 rounded shadow-[4px_4px_0px_#231F20] font-pixel text-xs flex items-center gap-2 no-print"
        >
          <Check className="w-4 h-4 shrink-0" aria-hidden="true" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
}
