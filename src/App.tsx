import React, { useState } from 'react';
import { 
  Play, 
  Tv, 
  Coins, 
  Award, 
  CheckCircle2, 
  Github, 
  Sparkles, 
  Copy, 
  Check, 
  RefreshCw,
  ExternalLink,
  ShieldCheck,
  Smartphone,
  Download,
  Key,
  PackageCheck,
  FileCode,
  FileArchive,
  Info,
  Layers,
  HelpCircle,
  Sliders,
  CheckCircle,
  AlertTriangle,
  RotateCcw,
  Volume2,
  User,
  BadgeCheck,
  Tag,
  Calendar,
  Code2,
  BookOpen,
  Heart,
  Terminal,
  GitBranch,
  Cpu
} from 'lucide-react';

export default function App() {
  const [coins, setCoins] = useState(150);
  const [selectedLetters, setSelectedLetters] = useState<string[]>([]);
  const [foundWords, setFoundWords] = useState<string[]>(['پیچ']);
  const [feedback, setFeedback] = useState<string | null>(null);
  const [isWatchingAd, setIsWatchingAd] = useState(false);
  const [adTimer, setAdTimer] = useState(5);
  const [adSuccessMsg, setAdSuccessMsg] = useState(false);
  const [copiedSection, setCopiedSection] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'icon' | 'tapsell' | 'game' | 'bazaar' | 'github' | 'about'>('about');
  const [isVip, setIsVip] = useState(false);
  const [vipPlan, setVipPlan] = useState<string>('');
  const [bazaarPurchaseMessage, setBazaarPurchaseMessage] = useState<string | null>(null);

  // Tapsell Editable Config State (Updated with user's official keys)
  const [tapsellAppKey, setTapsellAppKey] = useState("acndtrkbtbnoisqghcfnlpmasmpgtmikmgpgrlrbekjdggtfpldqgthcbmjqbsmdbpssnt");
  const [tapsellRewardedZoneId, setTapsellRewardedZoneId] = useState("6aa701ba1f07c00619f4519a");
  const [tapsellBannerZoneId, setTapsellBannerZoneId] = useState("6aa70201796a202335abbcde");
  const [tapsellNativeZoneId, setTapsellNativeZoneId] = useState("6aa55a9fcd33cd4ed6e43185");
  const [keysSaved, setKeysSaved] = useState(true);

  // Word Game Data
  const targetWords = ['پیچ', 'کلمه', 'لپ', 'پل', 'کلک'];
  const letters = ['ک', 'ل', 'م', 'ه', 'پ', 'ی', 'چ'];

  const handleSelectLetter = (char: string) => {
    setSelectedLetters(prev => [...prev, char]);
    setFeedback(null);
  };

  const handleBackspace = () => {
    setSelectedLetters(prev => prev.slice(0, -1));
  };

  const handleClear = () => {
    setSelectedLetters([]);
    setFeedback(null);
  };

  const handleShuffle = () => {
    setFeedback('حروف جابجا شدند');
    setTimeout(() => setFeedback(null), 1500);
  };

  const handleSubmitWord = () => {
    const word = selectedLetters.join('');
    if (!word) return;

    if (foundWords.includes(word)) {
      setFeedback('این کلمه را قبلاً پیدا کرده‌اید!');
    } else if (targetWords.includes(word)) {
      setFoundWords(prev => [...prev, word]);
      setCoins(c => c + 25);
      setFeedback(`آفرین! کلمه «${word}» درست بود (+۲۵ سکه)`);
    } else {
      setFeedback(`کلمه «${word}» در لیست این مرحله نیست.`);
    }
    setSelectedLetters([]);
  };

  const startWatchRewardedAd = () => {
    setIsWatchingAd(true);
    setAdTimer(5);
    setAdSuccessMsg(false);

    const interval = setInterval(() => {
      setAdTimer(t => {
        if (t <= 1) {
          clearInterval(interval);
          setIsWatchingAd(false);
          setAdSuccessMsg(true);
          setCoins(c => c + 50);
          setTimeout(() => setAdSuccessMsg(false), 4000);
          return 0;
        }
        return t - 1;
      });
    }, 1000);
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedSection(id);
    setTimeout(() => setCopiedSection(null), 2500);
  };

  const handleSaveKeys = (e: React.FormEvent) => {
    e.preventDefault();
    setKeysSaved(true);
    setTimeout(() => setKeysSaved(false), 3000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col items-center p-3 sm:p-6 md:p-8 font-['Vazirmatn',sans-serif]">
      {/* Header Bar */}
      <header className="w-full max-w-5xl flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/90 border border-slate-800 rounded-3xl p-4 sm:px-6 sm:py-4 mb-6 shadow-2xl backdrop-blur">
        <div className="flex items-center gap-3.5">
          <div className="relative group">
            <img 
              src="/app-icon.jpg" 
              alt="آیکون کلمه پیچ" 
              className="w-14 h-14 sm:w-16 sm:h-16 rounded-2xl shadow-xl shadow-emerald-500/20 border-2 border-emerald-400/40 object-cover transform transition-transform group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <span className="absolute -bottom-1 -right-1 bg-emerald-500 text-slate-950 text-[9px] font-black px-1.5 py-0.2 rounded-md">
              اصلی
            </span>
          </div>
          <div>
            <div className="flex items-center gap-2 flex-wrap">
              <h1 className="font-black text-xl sm:text-2xl text-white tracking-tight">کلمه پیچ</h1>
              <span className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <Tag className="w-3 h-3" />
                نسخه ۱.۰.۰
              </span>
              <span className="bg-amber-500/20 border border-amber-500/40 text-amber-300 text-[11px] font-bold px-2.5 py-0.5 rounded-full flex items-center gap-1">
                <User className="w-3 h-3" />
                سازنده: سیدحمیدموسوی زاده
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              بازی فکری و جدول کلمات فارسی | کافه‌بازار و اندروید
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2.5 w-full sm:w-auto justify-end flex-wrap">
          <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-2 rounded-2xl text-amber-400 font-black text-sm shadow-inner">
            <Coins className="w-4 h-4 text-amber-400 animate-pulse" />
            <span>{coins} سکه</span>
          </div>

          <button 
            onClick={() => setActiveTab('about')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all border ${
              activeTab === 'about'
                ? 'bg-amber-500 text-slate-950 border-amber-400 shadow-lg shadow-amber-500/30'
                : 'bg-amber-500/10 border-amber-500/30 hover:bg-amber-500/20 text-amber-300'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>درباره و سازنده</span>
          </button>

          <button 
            onClick={() => setActiveTab('tapsell')}
            className="flex items-center gap-1.5 bg-emerald-500/20 border border-emerald-500/40 hover:bg-emerald-500/30 text-emerald-300 px-3.5 py-2 rounded-2xl text-xs font-bold transition-colors"
          >
            <Tv className="w-3.5 h-3.5" />
            <span>تبلیغات</span>
          </button>
        </div>
      </header>

      {/* Tabs Navigation */}
      <nav className="w-full max-w-5xl flex flex-wrap items-center gap-1.5 sm:gap-2 bg-slate-900/60 p-2 rounded-2xl border border-slate-800 mb-6 shadow-lg">
        <button
          onClick={() => setActiveTab('about')}
          className={`flex-1 min-w-[150px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            activeTab === 'about' 
              ? 'bg-gradient-to-r from-amber-500 via-orange-500 to-amber-600 text-slate-950 shadow-lg shadow-amber-500/25 font-black' 
              : 'text-amber-400 hover:text-amber-300 hover:bg-amber-500/10'
          }`}
        >
          <Info className="w-4 h-4" />
          <span>درباره، سازنده و نسخه</span>
        </button>

        <button
          onClick={() => setActiveTab('game')}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            activeTab === 'game' 
              ? 'bg-gradient-to-r from-emerald-600 to-green-600 text-white shadow-lg shadow-green-500/25' 
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Play className="w-4 h-4" />
          <span>شبیه‌ساز بازی کلمه پیچ</span>
        </button>

        <button
          onClick={() => setActiveTab('tapsell')}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            activeTab === 'tapsell' 
              ? 'bg-gradient-to-r from-teal-500 to-cyan-600 text-white shadow-lg shadow-teal-500/25' 
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Tv className="w-4 h-4" />
          <span>تبلیغات تپسل</span>
        </button>

        <button
          onClick={() => setActiveTab('bazaar')}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            activeTab === 'bazaar' 
              ? 'bg-gradient-to-r from-cyan-600 to-blue-600 text-white shadow-lg shadow-cyan-500/25' 
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Smartphone className="w-4 h-4" />
          <span>پرداخت بازار (VIP)</span>
        </button>

        <button
          onClick={() => setActiveTab('icon')}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            activeTab === 'icon' 
              ? 'bg-gradient-to-r from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/25' 
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Sparkles className="w-4 h-4" />
          <span>آیکون اپلیکیشن</span>
        </button>

        <button
          onClick={() => setActiveTab('github')}
          className={`flex-1 min-w-[130px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl font-bold text-xs sm:text-sm transition-all ${
            activeTab === 'github' 
              ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white shadow-lg shadow-purple-500/25' 
              : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
          }`}
        >
          <Github className="w-4 h-4" />
          <span>خروجی AAB و APK</span>
        </button>
      </nav>

      {/* TAB CONTENT */}
      <main className="w-full max-w-5xl">

        {/* 1. APP ICON TAB */}
        {activeTab === 'icon' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-emerald-950/60 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="flex flex-col md:flex-row items-center gap-8">
                {/* Large Icon Preview */}
                <div className="relative group shrink-0">
                  <div className="absolute -inset-1 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-3xl blur opacity-30 group-hover:opacity-60 transition duration-500"></div>
                  <img 
                    src="/app-icon.jpg" 
                    alt="آیکون اختصاصی کلمه پیچ" 
                    className="relative w-48 h-48 sm:w-56 sm:h-56 rounded-3xl shadow-2xl border-2 border-emerald-400/60 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 bg-slate-950/90 border border-emerald-400/50 px-3 py-1 rounded-full text-[11px] font-black text-emerald-300 shadow-lg">
                    512 × 512 PX (HQ)
                  </div>
                </div>

                {/* Details */}
                <div className="flex-1 text-right space-y-4">
                  <div className="inline-flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-bold text-emerald-400">
                    <CheckCircle className="w-3.5 h-3.5" />
                    <span>آیکون ارسالی با موفقیت تنظیم شد</span>
                  </div>

                  <h2 className="text-2xl sm:text-3xl font-black text-white">
                    آیکون رسمی بازی «کلمه پیچ»
                  </h2>

                  <p className="text-sm text-slate-300 leading-relaxed">
                    تصویر ارسالی شما شامل کاشی‌های چوبی حروف فارسی با درخشش طلایی، پلاک چوبی برجسته با خط نستعلیق سه‌بعدی «کلمه پیچ»، سکه‌های زرین، ذره‌بین و زمینه سبز زمردی تزیین شده است. این تصویر به عنوان:
                  </p>

                  <ul className="space-y-2 text-xs text-slate-300">
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span><strong>آیکون اصلی مرورگر و Favicon:</strong> در سربرگ سایت و نشانک‌ها (Bookmark)</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span><strong>آیکون اصلی اپلیکیشن اندروید:</strong> در فایل‌های لانچر (ic_launcher و mipmap) و خروجی APK / AAB برای کافه‌بازار و مایکت</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
                      <span><strong>تصویر پیش‌نمایش اشتراک‌گذاری (Open Graph):</strong> برای پیش‌نمایش در پیام‌رسان‌ها (تلگرام، ایتا، واتساپ)</span>
                    </li>
                  </ul>

                  <div className="pt-2 flex flex-wrap gap-3">
                    <a 
                      href="/app-icon.jpg" 
                      download="kalameh-pich-icon.jpg"
                      className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all"
                    >
                      <Download className="w-4 h-4" />
                      <span>دانلود آیکون با کیفیت اصلی</span>
                    </a>

                    <button 
                      onClick={() => setActiveTab('game')}
                      className="bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-bold px-4 py-2.5 rounded-xl flex items-center gap-2 border border-slate-700 transition-all"
                    >
                      <Play className="w-4 h-4 text-emerald-400" />
                      <span>مشاهده در گیم‌پلی</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Icon Sizes and Mockups */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center">
                <img src="/app-icon.jpg" alt="192px" className="w-20 h-20 rounded-2xl shadow-md mb-2 object-cover border border-slate-700" referrerPolicy="no-referrer" />
                <span className="text-xs font-bold text-white">صفحه اصلی موبایل</span>
                <span className="text-[10px] text-slate-400 font-mono">192×192 (xxxhdpi)</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center">
                <img src="/app-icon.jpg" alt="144px" className="w-16 h-16 rounded-xl shadow-md mb-2 object-cover border border-slate-700" referrerPolicy="no-referrer" />
                <span className="text-xs font-bold text-white">کافه‌بازار و استور</span>
                <span className="text-[10px] text-slate-400 font-mono">144×144 (xxhdpi)</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center">
                <img src="/app-icon.jpg" alt="96px" className="w-12 h-12 rounded-lg shadow-md mb-2 object-cover border border-slate-700" referrerPolicy="no-referrer" />
                <span className="text-xs font-bold text-white">نوتیفیکیشن و تسک‌ها</span>
                <span className="text-[10px] text-slate-400 font-mono">96×96 (xhdpi)</span>
              </div>
              <div className="bg-slate-900 border border-slate-800 rounded-2xl p-4 flex flex-col items-center text-center">
                <img src="/app-icon.jpg" alt="48px" className="w-10 h-10 rounded-md shadow-md mb-2 object-cover border border-slate-700" referrerPolicy="no-referrer" />
                <span className="text-xs font-bold text-white">Favicon وب</span>
                <span className="text-[10px] text-slate-400 font-mono">48×48 (mdpi)</span>
              </div>
            </div>
          </div>
        )}

        {/* 2. TAPSELL / TAPSI ADVERTISING CONFIG TAB */}
        {activeTab === 'tapsell' && (
          <div className="space-y-6">
            {/* Direct Answer Banner to User Question */}
            <div className="bg-gradient-to-br from-amber-950/50 via-slate-900 to-slate-900 border-2 border-amber-500/40 rounded-3xl p-6 shadow-2xl">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400 shrink-0">
                  <Info className="w-6 h-6" />
                </div>
                <div className="space-y-2 text-right">
                  <h2 className="text-lg sm:text-xl font-black text-amber-300">
                    پاسخ به سوال شما: اطلاعات مورد نیاز برای بارگذاری تبلیغات واقعی
                  </h2>
                  <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                    پلتفرم اصلی تبلیغات هوشمند در ایران <strong>تپسل (Tapsell)</strong> است. برای اینکه تبلیغات واقعی (ویدیوی جایزه‌دار برای دریافت سکه و بنرهای تبلیغاتی) روی بازی شما فعال و نمایش داده شوند، کافیست <strong>۳ مورد زیر</strong> را از پنل تپسل خود ارسال کنید:
                  </p>
                </div>
              </div>

              {/* The 3 Required Items */}
              <div className="grid md:grid-cols-3 gap-4 mt-6">
                <div className="bg-slate-950/80 border border-amber-500/30 rounded-2xl p-4 flex flex-col justify-between">
                  <div>
                    <div className="w-7 h-7 rounded-lg bg-amber-500/20 text-amber-400 font-bold text-sm flex items-center justify-center mb-2">۱</div>
                    <h3 className="font-bold text-white text-sm mb-1">کلید اپلیکیشن (App Key)</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      یک رشته طولانی از حروف انگلیسی است که هنگام ساخت اپلیکیشن در داشبورد تپسل صادر می‌شود.
                    </p>
                  </div>
                  <div className="mt-3 text-[11px] font-mono text-emerald-400 bg-slate-900 p-2 rounded-lg border border-emerald-500/30 flex items-center justify-between">
                    <span className="truncate">{tapsellAppKey.slice(0, 14)}...</span>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded">فعال و متصل</span>
                  </div>
                </div>

                <div className="bg-slate-950/80 border border-emerald-500/30 rounded-2xl p-4 flex flex-col justify-between">
                  <div>
                    <div className="w-7 h-7 rounded-lg bg-emerald-500/20 text-emerald-400 font-bold text-sm flex items-center justify-center mb-2">۲</div>
                    <h3 className="font-bold text-white text-sm mb-1">شناسه ویدیوی جایزه‌دار (Rewarded Zone ID)</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      شناسه جایگاهی از نوع «ویدیوی جایزه‌دار» (Rewarded Video) در پنل تپسل برای اهدای سکه به کاربر پس از تماشای فیلم.
                    </p>
                  </div>
                  <div className="mt-3 text-[11px] font-mono text-emerald-400 bg-slate-900 p-2 rounded-lg border border-emerald-500/30 flex items-center justify-between">
                    <span>{tapsellRewardedZoneId}</span>
                    <span className="text-[10px] text-emerald-400 font-bold bg-emerald-500/20 px-2 py-0.5 rounded">فعال و متصل</span>
                  </div>
                </div>

                <div className="bg-slate-950/80 border border-cyan-500/30 rounded-2xl p-4 flex flex-col justify-between">
                  <div>
                    <div className="w-7 h-7 rounded-lg bg-cyan-500/20 text-cyan-400 font-bold text-sm flex items-center justify-center mb-2">۳</div>
                    <h3 className="font-bold text-white text-sm mb-1">شناسه بنر استاندارد (Banner Zone ID)</h3>
                    <p className="text-xs text-slate-400 leading-relaxed">
                      شناسه جایگاه بنر استاندارد (۳۲۰x۵۰) که در بالای مراحل بازی یا فروشگاه نمایش داده می‌شود.
                    </p>
                  </div>
                  <div className="mt-3 text-[11px] font-mono text-cyan-400 bg-slate-900 p-2 rounded-lg border border-cyan-500/30 flex items-center justify-between">
                    <span>{tapsellBannerZoneId}</span>
                    <span className="text-[10px] text-cyan-400 font-bold bg-cyan-500/20 px-2 py-0.5 rounded">فعال و متصل</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Interactive Settings & Keys Input Form */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-6">
              <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-teal-500/20 text-teal-400 flex items-center justify-center">
                    <Sliders className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-black text-white text-base">فرم ورود و بررسی کلیدهای تپسل شما</h3>
                    <p className="text-xs text-slate-400">می‌توانید کلیدهای دریافتی از پنل تپسل را همین‌جا وارد یا تست کنید:</p>
                  </div>
                </div>

                {keysSaved && (
                  <div className="flex items-center gap-1.5 text-xs text-emerald-400 font-bold bg-emerald-500/10 px-3 py-1.5 rounded-xl border border-emerald-500/30">
                    <Check className="w-4 h-4" />
                    <span>کلیدها با موفقیت ذخیره شدند!</span>
                  </div>
                )}
              </div>

              <form onSubmit={handleSaveKeys} className="space-y-4 text-xs">
                {/* App Key Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-bold text-slate-300">
                      ۱. کلید اپلیکیشن (Tapsell App Key):
                    </label>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(tapsellAppKey, 'appkey')}
                      className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
                    >
                      {copiedSection === 'appkey' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedSection === 'appkey' ? 'کپی شد' : 'کپی'}</span>
                    </button>
                  </div>
                  <input 
                    type="text"
                    value={tapsellAppKey}
                    onChange={e => setTapsellAppKey(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl p-3 text-emerald-400 font-mono text-xs focus:outline-none transition-colors"
                    placeholder="کلید اپلیکیشن تپسل را اینجا وارد کنید..."
                  />
                </div>

                {/* Rewarded Zone ID Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-bold text-slate-300">
                      ۲. شناسه جایگاه ویدیوی جایزه‌دار (Rewarded Zone ID):
                    </label>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(tapsellRewardedZoneId, 'rewarded')}
                      className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
                    >
                      {copiedSection === 'rewarded' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedSection === 'rewarded' ? 'کپی شد' : 'کپی'}</span>
                    </button>
                  </div>
                  <input 
                    type="text"
                    value={tapsellRewardedZoneId}
                    onChange={e => setTapsellRewardedZoneId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl p-3 text-amber-400 font-mono text-xs focus:outline-none transition-colors"
                    placeholder="شناسه ویدیوی جایزه‌دار تپسل..."
                  />
                </div>

                {/* Standard Banner Zone ID Input */}
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="font-bold text-slate-300">
                      ۳. شناسه جایگاه بنر استاندارد (Banner Zone ID):
                    </label>
                    <button
                      type="button"
                      onClick={() => copyToClipboard(tapsellBannerZoneId, 'banner')}
                      className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-mono"
                    >
                      {copiedSection === 'banner' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedSection === 'banner' ? 'کپی شد' : 'کپی'}</span>
                    </button>
                  </div>
                  <input 
                    type="text"
                    value={tapsellBannerZoneId}
                    onChange={e => setTapsellBannerZoneId(e.target.value)}
                    className="w-full bg-slate-950 border border-slate-800 focus:border-teal-500 rounded-xl p-3 text-cyan-400 font-mono text-xs focus:outline-none transition-colors"
                    placeholder="شناسه بنر استاندارد ۳۲۰x۵۰..."
                  />
                </div>

                <div className="pt-2 flex items-center justify-between">
                  <button
                    type="submit"
                    className="bg-gradient-to-r from-teal-500 to-emerald-600 hover:from-teal-400 hover:to-emerald-500 text-slate-950 font-black px-6 py-2.5 rounded-xl text-xs flex items-center gap-2 shadow-lg shadow-teal-500/20 transition-all"
                  >
                    <CheckCircle className="w-4 h-4" />
                    <span>تایید و به‌روزرسانی کلیدهای تبلیغاتی</span>
                  </button>

                  <a 
                    href="https://dashboard.tapsell.ir" 
                    target="_blank" 
                    rel="noreferrer"
                    className="text-slate-400 hover:text-white flex items-center gap-1.5 text-xs transition-colors"
                  >
                    <span>ورود به پنل تپسل</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              </form>
            </div>

            {/* Steps to get Tapsell keys */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="font-bold text-white text-base flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-teal-400" />
                <span>راهنمای ۳ مرحله‌ای دریافت کلیدها از پنل تپسل</span>
              </h3>

              <div className="grid md:grid-cols-3 gap-4 text-xs">
                <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
                  <div className="text-teal-400 font-bold mb-1">مرحله ۱: ثبت اپلیکیشن</div>
                  <p className="text-slate-300 leading-relaxed">
                    وارد سایت <span className="font-mono text-teal-300">dashboard.tapsell.ir</span> شوید. دکمه «افزودن اپلیکیشن جدید» را بزنید و پلتفرم را روی <strong>اندروید</strong> قرار دهید. بلافاصله کلید <strong>App Key</strong> ساخته می‌شود.
                  </p>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
                  <div className="text-teal-400 font-bold mb-1">مرحله ۲: تعریف جایگاه ویدیوی جایزه‌دار</div>
                  <p className="text-slate-300 leading-relaxed">
                    در بخش جایگاه‌های تبلیغاتی، «جایگاه جدید» بسازید و نوع آن را <strong>ویدیوی جایزه‌دار (Rewarded Video)</strong> انتخاب کنید. مقدار پاداش را ۵۰ سکه قرار دهید.
                  </p>
                </div>

                <div className="bg-slate-950 border border-slate-800 p-4 rounded-2xl">
                  <div className="text-teal-400 font-bold mb-1">مرحله ۳: تعریف بنر استاندارد</div>
                  <p className="text-slate-300 leading-relaxed">
                    یک جایگاه جدید از نوع <strong>بنر استاندارد (Banner 320x50)</strong> بسازید تا در بالای مراحل بازی و داخل فروشگاه نمایش داده شود.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* 3. WORD GAME SIMULATOR TAB */}
        {activeTab === 'game' && (
          <div className="grid md:grid-cols-12 gap-6">
            {/* Game Screen Simulation */}
            <div className="md:col-span-7 bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-2xl flex flex-col items-center">
              {/* Tapsell Standard Banner in game */}
              <div className="w-full bg-slate-950 border border-cyan-800/50 rounded-2xl p-3 mb-6 flex items-center justify-between shadow-inner">
                <div className="flex items-center gap-2.5">
                  <span className="bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                    بنر تبلیغاتی استاندارد تپسل
                  </span>
                  <span className="text-xs text-slate-300 font-medium">
                    (جایگاه ۳۲۰×۵۰)
                  </span>
                </div>
                <div className="text-[11px] text-cyan-400 font-mono">
                  {tapsellBannerZoneId.slice(0, 10)}...
                </div>
              </div>

              {/* Target Words Display Slots */}
              <div className="w-full mb-6">
                <div className="flex items-center justify-between text-xs text-slate-400 mb-3 px-1">
                  <span>کلمات هدف این مرحله:</span>
                  <span className="text-emerald-400 font-bold">{foundWords.length} از {targetWords.length} کلمه کشف شده</span>
                </div>
                <div className="flex flex-wrap items-center justify-center gap-2.5">
                  {targetWords.map((word) => {
                    const isFound = foundWords.includes(word);
                    return (
                      <div 
                        key={word} 
                        className={`flex gap-1.5 p-1.5 rounded-2xl border transition-all ${
                          isFound 
                            ? 'bg-emerald-950/60 border-emerald-500/60 shadow-lg shadow-emerald-500/10' 
                            : 'bg-slate-950/60 border-slate-800'
                        }`}
                      >
                        {word.split('').map((char, i) => (
                          <div
                            key={i}
                            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-xl flex items-center justify-center font-black text-base sm:text-lg transition-all ${
                              isFound 
                                ? 'bg-gradient-to-tr from-emerald-600 to-teal-500 text-white shadow-md' 
                                : 'bg-slate-800 border border-slate-700 text-slate-600'
                            }`}
                          >
                            {isFound ? char : ''}
                          </div>
                        ))}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Current Constructed Word */}
              <div className="w-full h-14 bg-slate-950 border border-slate-800 rounded-2xl flex items-center justify-between px-4 mb-4 shadow-inner">
                <button
                  onClick={handleBackspace}
                  disabled={selectedLetters.length === 0}
                  className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-amber-400 px-3 py-1.5 rounded-xl font-bold disabled:opacity-30 disabled:hover:text-slate-400 transition-colors"
                >
                  حذف حرف
                </button>

                <span className="font-black text-2xl text-teal-300 tracking-widest min-h-[32px] flex items-center">
                  {selectedLetters.join('') || <span className="text-slate-600 text-sm font-normal">حروف را انتخاب کنید...</span>}
                </span>

                <button
                  onClick={handleSubmitWord}
                  disabled={selectedLetters.length === 0}
                  className="text-xs bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 px-4 py-1.5 rounded-xl font-black disabled:opacity-30 transition-all shadow-md"
                >
                  بررسی کلمه
                </button>
              </div>

              {/* Feedback Alert */}
              {feedback && (
                <div className="w-full bg-slate-800/90 border border-slate-700 text-center py-2 px-4 rounded-xl text-xs font-bold text-emerald-300 mb-4 animate-fade-in">
                  {feedback}
                </div>
              )}

              {/* Circular Letter Hub */}
              <div className="relative w-56 h-56 flex items-center justify-center my-3">
                <div className="absolute inset-0 rounded-full border-2 border-dashed border-slate-800"></div>
                
                {/* Center Shuffle / Clear */}
                <button
                  onClick={handleClear}
                  className="w-14 h-14 rounded-full bg-slate-800 hover:bg-slate-700 border-2 border-slate-700 text-xs font-bold text-slate-300 flex flex-col items-center justify-center z-10 transition-colors shadow-lg"
                >
                  <RotateCcw className="w-4 h-4 text-teal-400 mb-0.5" />
                  <span className="text-[10px]">پاکسازی</span>
                </button>

                {letters.map((char, index) => {
                  const angle = (index * (360 / letters.length)) * (Math.PI / 180);
                  const radius = 80;
                  const x = Math.round(radius * Math.cos(angle));
                  const y = Math.round(radius * Math.sin(angle));
                  return (
                    <button
                      key={index}
                      onClick={() => handleSelectLetter(char)}
                      style={{
                        transform: `translate(${x}px, ${y}px)`
                      }}
                      className="absolute w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-800 via-amber-900 to-amber-950 hover:scale-110 active:scale-95 text-amber-200 font-black text-xl flex items-center justify-center shadow-xl shadow-black/60 border-2 border-amber-600/60 transition-transform"
                    >
                      {char}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Side Card: Rewarded Video Simulator & Info */}
            <div className="md:col-span-5 flex flex-col gap-6">
              {/* Rewarded Video Ad Card */}
              <div className="bg-slate-900 border-2 border-emerald-500/40 rounded-3xl p-6 shadow-xl relative overflow-hidden">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shadow-inner">
                    <Tv className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="font-black text-white text-base">تماشای ویدیوی جایزه‌دار تپسل</h2>
                    <p className="text-xs text-emerald-400 font-bold">دریافت ۵۰ سکه رایگان فوری</p>
                  </div>
                </div>

                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  در بازی کلمه پیچ، با تماشای کامل ویدیوی تبلیغاتی تپسل، متد <code>onRewardEarned</code> صدا زده شده و سکه‌ها به موجودی اضافه می‌گردد.
                </p>

                <div className="bg-slate-950 rounded-xl p-3 border border-slate-800 mb-4 text-xs font-mono text-slate-400 flex justify-between">
                  <span>شناسه جایگاه:</span>
                  <span className="text-emerald-400 font-bold">{tapsellRewardedZoneId.slice(0, 14)}...</span>
                </div>

                <button
                  onClick={startWatchRewardedAd}
                  disabled={isWatchingAd}
                  className="w-full bg-gradient-to-r from-emerald-500 to-teal-600 hover:from-emerald-400 hover:to-teal-500 text-slate-950 font-black py-3 px-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
                >
                  <Play className="w-4 h-4 fill-slate-950" />
                  {isWatchingAd ? `در حال تماشای تبلیغ (${adTimer} ثانیه)...` : 'تماشای تبلیغ و دریافت ۵۰ سکه'}
                </button>

                {/* Simulated Playing Ad Dialog */}
                {isWatchingAd && (
                  <div className="mt-4 p-4 bg-slate-950 border border-teal-500/50 rounded-2xl flex flex-col items-center text-center animate-pulse">
                    <RefreshCw className="w-6 h-6 text-teal-400 animate-spin mb-2" />
                    <span className="text-sm font-bold text-white">تبلیغ ویدیویی تپسل در حال پخش است</span>
                    <span className="text-xs text-slate-400 mt-1">زمان باقی‌مانده: {adTimer} ثانیه</span>
                  </div>
                )}

                {adSuccessMsg && (
                  <div className="mt-4 p-3.5 bg-emerald-950/80 border border-emerald-400 rounded-2xl flex items-center gap-2 text-emerald-300 text-xs font-bold animate-bounce shadow-lg">
                    <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0" />
                    <span>۵۰ سکه جایزه با موفقیت به حساب شما اضافه شد!</span>
                  </div>
                )}
              </div>

              {/* Status Box */}
              <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 text-xs text-slate-300 space-y-3">
                <div className="flex items-center gap-2 font-bold text-white">
                  <ShieldCheck className="w-5 h-5 text-teal-400" />
                  <span>تضمین سلامت فنی اپلیکیشن</span>
                </div>
                <p className="leading-relaxed text-slate-400">
                  تمام فایل‌های کاتلین، مجوزهای مانیفست اندروید (اینترنت و صورت‌حساب بازار)، و SDKهای رسمی تپسل به‌طور یکپارچه در این پروژه آماده شده‌اند.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* 4. CAFE BAZAAR IN-APP BILLING TAB */}
        {activeTab === 'bazaar' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-emerald-950/70 via-slate-900 to-slate-900 border border-emerald-800/60 rounded-3xl p-6 sm:p-8 shadow-2xl">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shadow-lg shadow-emerald-500/10 shrink-0">
                    <Smartphone className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl font-black text-white">پرداخت درون‌برنامه‌ای کافه‌بازار</h2>
                      <span className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[11px] font-bold px-2 py-0.5 rounded-full">
                        Bazaar Billing (AIDL)
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">
                      محصولات VIP و بسته‌های سکه فعال با قابلیت تسویه حساب مستقیم به شماره شبای بانکی شما
                    </p>
                  </div>
                </div>

                <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 flex items-center gap-3 shrink-0">
                  <div className="text-right">
                    <span className="block text-[11px] text-slate-400">وضعیت اشتراک:</span>
                    <span className={`text-xs font-black ${isVip ? 'text-amber-400' : 'text-slate-400'}`}>
                      {isVip ? `کاربر ویژه (${vipPlan})` : 'کاربر عادی (بدون VIP)'}
                    </span>
                  </div>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${isVip ? 'bg-amber-500/20 text-amber-400' : 'bg-slate-800 text-slate-500'}`}>
                    <Award className="w-5 h-5" />
                  </div>
                </div>
              </div>

              {bazaarPurchaseMessage && (
                <div className="mt-4 p-3 bg-emerald-900/60 border border-emerald-400 rounded-xl flex items-center gap-2 text-xs text-emerald-200 font-bold animate-pulse">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>{bazaarPurchaseMessage}</span>
                </div>
              )}
            </div>

            {/* Products Grid */}
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Plan 1 */}
              <div className="bg-slate-900 border border-slate-800 hover:border-emerald-700/60 rounded-3xl p-5 shadow-lg flex flex-col justify-between transition-all">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold text-slate-400 font-mono">SKU: vip_monthly</span>
                    <span className="bg-slate-800 text-slate-300 text-[10px] font-bold px-2 py-0.5 rounded">اشتراک ۱ ماهه</span>
                  </div>
                  <h3 className="font-bold text-white text-base mb-1">عضویت VIP ماهانه</h3>
                  <p className="text-xs text-slate-400 mb-3">حذف تبلیغات اجباری + ۱۰۰ سکه هدیه ماهانه</p>
                  <div className="text-lg font-black text-emerald-400 mb-4">۲۹,۰۰۰ تومان</div>
                </div>
                <button
                  onClick={() => {
                    setIsVip(true);
                    setVipPlan('ماهانه');
                    setCoins(c => c + 100);
                    setBazaarPurchaseMessage('اشتراک ماهانه VIP با موفقیت فعال شد.');
                    setTimeout(() => setBazaarPurchaseMessage(null), 5000);
                  }}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Smartphone className="w-4 h-4" />
                  <span>خرید درون‌برنامه‌ای بازار</span>
                </button>
              </div>

              {/* Plan 2 - Featured */}
              <div className="bg-slate-900 border-2 border-emerald-500/80 rounded-3xl p-5 shadow-xl relative flex flex-col justify-between">
                <div className="absolute -top-3 right-4 bg-emerald-500 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-full shadow">
                  پیشنهاد ویژه
                </div>
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold text-emerald-400 font-mono">SKU: vip_seasonal</span>
                    <span className="bg-emerald-500/20 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded">اشتراک ۳ ماهه</span>
                  </div>
                  <h3 className="font-bold text-white text-base mb-1">عضویت VIP فصلی (۳ ماهه)</h3>
                  <p className="text-xs text-slate-400 mb-3">بیشترین صرفه اقتصادی + ۳۰۰ سکه رایگان</p>
                  <div className="text-lg font-black text-emerald-400 mb-4">۶۹,۰۰۰ تومان</div>
                </div>
                <button
                  onClick={() => {
                    setIsVip(true);
                    setVipPlan('فصلی ۳ ماهه');
                    setCoins(c => c + 300);
                    setBazaarPurchaseMessage('اشتراک ۳ ماهه VIP با موفقیت فعال شد.');
                    setTimeout(() => setBazaarPurchaseMessage(null), 5000);
                  }}
                  className="w-full bg-gradient-to-r from-emerald-500 to-green-600 hover:from-emerald-400 hover:to-green-500 text-slate-950 font-black py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-lg shadow-emerald-500/20 transition-all"
                >
                  <Sparkles className="w-4 h-4" />
                  <span>خرید درون‌برنامه‌ای بازار</span>
                </button>
              </div>

              {/* Plan 3 */}
              <div className="bg-slate-900 border border-slate-800 hover:border-amber-700/60 rounded-3xl p-5 shadow-lg flex flex-col justify-between transition-all">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold text-slate-400 font-mono">SKU: vip_lifetime</span>
                    <span className="bg-amber-500/20 text-amber-400 text-[10px] font-bold px-2 py-0.5 rounded">مادام‌العمر</span>
                  </div>
                  <h3 className="font-bold text-white text-base mb-1">عضویت دائمی VIP</h3>
                  <p className="text-xs text-slate-400 mb-3">یکبار برای همیشه + ۱۰۰۰ سکه طلایی</p>
                  <div className="text-lg font-black text-amber-400 mb-4">۱۴۹,۰۰۰ تومان</div>
                </div>
                <button
                  onClick={() => {
                    setIsVip(true);
                    setVipPlan('مادام‌العمر');
                    setCoins(c => c + 1000);
                    setBazaarPurchaseMessage('عضویت دائمی VIP با موفقیت فعال شد.');
                    setTimeout(() => setBazaarPurchaseMessage(null), 5000);
                  }}
                  className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Award className="w-4 h-4" />
                  <span>خرید درون‌برنامه‌ای بازار</span>
                </button>
              </div>

              {/* Plan 4 - Coins Pack */}
              <div className="bg-slate-900 border border-slate-800 hover:border-cyan-700/60 rounded-3xl p-5 shadow-lg flex flex-col justify-between transition-all">
                <div>
                  <div className="flex justify-between items-start mb-3">
                    <span className="text-xs font-bold text-slate-400 font-mono">SKU: coins_pack_500</span>
                    <span className="bg-cyan-500/20 text-cyan-400 text-[10px] font-bold px-2 py-0.5 rounded">مصرفی</span>
                  </div>
                  <h3 className="font-bold text-white text-base mb-1">بسته ۵۰۰ سکه</h3>
                  <p className="text-xs text-slate-400 mb-3">قابل خرید مجدد (Consumable) جهت راهنمایی کلمات</p>
                  <div className="text-lg font-black text-cyan-400 mb-4">۱۹,۰۰۰ تومان</div>
                </div>
                <button
                  onClick={() => {
                    setCoins(c => c + 500);
                    setBazaarPurchaseMessage('۵۰۰ سکه به حساب شما افزوده شد.');
                    setTimeout(() => setBazaarPurchaseMessage(null), 5000);
                  }}
                  className="w-full bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 shadow-md transition-all"
                >
                  <Coins className="w-4 h-4" />
                  <span>خرید درون‌برنامه‌ای بازار</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* 5. GITHUB ACTIONS AAB/APK RELEASE TAB */}
        {activeTab === 'github' && (
          <div className="space-y-6">
            <div className="bg-gradient-to-br from-cyan-950/70 via-slate-900 to-slate-900 border border-cyan-800/60 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 right-0 w-80 h-80 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
              <div className="relative z-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-14 h-14 rounded-2xl bg-cyan-500/20 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-lg shadow-cyan-500/10 shrink-0">
                    <PackageCheck className="w-7 h-7" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-xl sm:text-2xl font-black text-white">خروجی رسمی اندروید (APK و AAB) در گیت‌هاب</h2>
                      <span className="bg-emerald-500/20 text-emerald-300 border border-emerald-500/40 text-[11px] font-black px-2.5 py-0.5 rounded-full">
                        آماده ۱۰۰٪
                      </span>
                    </div>
                    <p className="text-xs sm:text-sm text-slate-300 mt-1">
                      گردش‌کار کاملاً خودکار گیت‌هاب اکشنز (GitHub Actions CI/CD) برای بیلد بدون خطای خروجی‌های کافه‌بازار و نصب مستقیم
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 bg-slate-950/70 border border-slate-800 px-3.5 py-2 rounded-2xl text-xs text-slate-300">
                  <Cpu className="w-4 h-4 text-cyan-400" />
                  <span>موتور بیلد: <strong className="text-white font-mono">Gradle 8.9 + JDK 17</strong></span>
                </div>
              </div>
            </div>

            {/* Target Output Formats */}
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="bg-slate-900 border-2 border-emerald-500/70 rounded-3xl p-5 shadow-xl relative overflow-hidden">
                <div className="absolute -top-3 right-4 bg-emerald-500 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-full shadow">
                  فرمت الزامی و رسمی کافه‌بازار
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <FileArchive className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-black text-white text-base">بسته رسمی AAB (Android App Bundle)</h3>
                    <span className="text-xs text-emerald-400 font-mono font-bold">KalamePich-v1.0.0-CafeBazaar.aab</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  فرمت فشرده و مدرن مورد تایید کافه‌بازار و مایکت. این فایل پس از بیلد گیت‌هاب مستقیماً در پنل بارگذاری برنامه در بازار آپلود می‌شود.
                </p>
                <div className="bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-xs flex items-center justify-between">
                  <span className="text-slate-400">نام آرتیفکت در گیت‌هاب:</span>
                  <span className="font-bold text-emerald-400 font-mono">KalamePich-CafeBazaar-AAB</span>
                </div>
              </div>

              <div className="bg-slate-900 border-2 border-cyan-500/50 rounded-3xl p-5 shadow-xl relative overflow-hidden">
                <div className="absolute -top-3 right-4 bg-cyan-500 text-slate-950 font-black text-[10px] px-2.5 py-0.5 rounded-full shadow">
                  فایل نصبی مستقل (Direct Install)
                </div>
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-11 h-11 rounded-2xl bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                    <Smartphone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-black text-white text-base">فایل نصبی مستقیم APK (امضا شده)</h3>
                    <span className="text-xs text-cyan-400 font-mono font-bold">KalamePich-v1.0.0-Release.apk</span>
                  </div>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed mb-4">
                  فایل نصبی کامل جهت تست و اجرای بی‌واسطه روی تلفن‌های همراه، ارسال در گروه‌ها یا کانال‌های تلگرام و وب‌سایت.
                </p>
                <div className="bg-slate-950 border border-slate-800 p-2.5 rounded-xl text-xs flex items-center justify-between">
                  <span className="text-slate-400">نام آرتیفکت در گیت‌هاب:</span>
                  <span className="font-bold text-cyan-400 font-mono">KalamePich-DirectInstall-APK</span>
                </div>
              </div>
            </div>

            {/* Verification Checklist of Prepared Android Project Files */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="text-base font-bold text-white">فایل‌ها و زیرساخت آماده شده در سورس پروژه</h3>
                    <p className="text-xs text-slate-400">تمامی فایل‌های الزامی گریدل، گیت‌هاب و کاتلین ساخته شده‌اند</p>
                  </div>
                </div>
                <span className="text-xs bg-emerald-500/20 text-emerald-300 px-2.5 py-1 rounded-full font-bold">
                  ۹ از ۹ آماده
                </span>
              </div>

              <div className="grid sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80 flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block font-mono">.github/workflows/bazaar_release.yml</span>
                    <span className="text-slate-400 text-[11px]">گردش‌کار بیلد خودکار APK و AAB</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80 flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block font-mono">gradlew & gradlew.bat</span>
                    <span className="text-slate-400 text-[11px]">اسکریپت اجرایی مستقل بدون نیاز به نصب محلی</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80 flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block font-mono">gradle-wrapper.jar & properties</span>
                    <span className="text-slate-400 text-[11px]">پیکربندی گریدل نسخه ۸.۹ رسمی</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80 flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block font-mono">settings.gradle.kts</span>
                    <span className="text-slate-400 text-[11px]">مخازن Google، Central، JitPack و Tapsell</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80 flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block font-mono">gradle/libs.versions.toml</span>
                    <span className="text-slate-400 text-[11px]">کاتالوگ کتابخانه‌ها و پلاگین‌ها</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80 flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block font-mono">app/build.gradle.kts</span>
                    <span className="text-slate-400 text-[11px]">کلیدهای تپسل، لاگین و تسک‌های release</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80 flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block font-mono">AndroidManifest.xml</span>
                    <span className="text-slate-400 text-[11px]">مجوزها، اطلاعات سازنده و نام کلمه پیچ</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80 flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block font-mono">IInAppBillingService.aidl</span>
                    <span className="text-slate-400 text-[11px]">پروتکل پرداخت درون‌برنامه‌ای کافه‌بازار</span>
                  </div>
                </div>

                <div className="bg-slate-950 p-3 rounded-2xl border border-slate-800/80 flex items-start gap-2.5">
                  <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-white block font-mono">README.md</span>
                    <span className="text-slate-400 text-[11px]">راهنمای جامع فارسی در صفحه اول گیت‌هاب</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center">
                  <Terminal className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-lg font-bold text-white">۳ گام ساده برای دریافت فایل‌های APK و AAB در گیت‌هاب</h3>
                  <p className="text-xs text-slate-400">بدون نیاز به نصب اندروید استودیو روی سیستم، همه چیز روی سرورهای گیت‌هاب انجام می‌شود</p>
                </div>
              </div>

              <div className="space-y-4">
                {/* Step 1 */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <span className="w-6 h-6 rounded-full bg-cyan-500 text-slate-950 font-black text-xs flex items-center justify-center">۱</span>
                      <h4 className="font-bold text-white text-sm">قرار دادن پروژه در مخزن گیت‌هاب (Push / Export)</h4>
                    </div>
                    <button
                      onClick={() => {
                        const commands = `git init\ngit add .\ngit commit -m "انتشار بازی کلمه پیچ نسخه 1.0.0 اثر سیدحمیدموسوی زاده"\ngit branch -M main\ngit remote add origin https://github.com/YOUR-USERNAME/kalame-pich.git\ngit push -u origin main`;
                        navigator.clipboard.writeText(commands);
                        setCopiedSection('git');
                        setTimeout(() => setCopiedSection(null), 2500);
                      }}
                      className="flex items-center gap-1.5 text-xs bg-slate-800 hover:bg-slate-700 text-cyan-400 px-3 py-1.5 rounded-xl border border-slate-700 transition"
                    >
                      {copiedSection === 'git' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                      <span>{copiedSection === 'git' ? 'کپی شد!' : 'کپی دستورات گیت'}</span>
                    </button>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    پروژه را می‌توانید مستقیماً از طریق دستورات زیر در ترمینال یا با دکمه Export گیت‌هاب در منوی تنظیمات بالا به ریپازیتوری خود ارسال نمایید:
                  </p>
                  <pre className="bg-slate-900/90 border border-slate-800 p-3 rounded-xl text-xs text-cyan-300 font-mono overflow-x-auto text-left dir-ltr">
{`git init
git add .
git commit -m "انتشار بازی کلمه پیچ نسخه 1.0.0 اثر سیدحمیدموسوی زاده"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/kalame-pich.git
git push -u origin main`}
                  </pre>
                </div>

                {/* Step 2 */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">۲</span>
                    <h4 className="font-bold text-white text-sm">اجرای خودکار یا دستی در تب Actions گیت‌هاب</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    به محض ارسال کدها به گیت‌هاب، فرآیند بیلد خودکار شروع می‌شود. همچنین می‌توانید هر زمان که مایل بودید:
                  </p>
                  <ul className="space-y-2 text-xs text-slate-400 list-disc list-inside">
                    <li>وارد صفحه پروژه خود در سایت <strong className="text-white">GitHub.com</strong> شوید.</li>
                    <li>روی تب بالای صفحه به نام <strong className="text-cyan-400">Actions</strong> کلیک کنید.</li>
                    <li>گردش‌کار <strong className="text-white">"Build Android APK and AAB (Kalame Pich)"</strong> را انتخاب کنید.</li>
                    <li>دکمه سمت راست به نام <strong className="text-emerald-400">Run workflow</strong> را بزنید تا بیلد آغاز شود.</li>
                  </ul>
                </div>

                {/* Step 3 */}
                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-4 sm:p-5 space-y-3">
                  <div className="flex items-center gap-2.5">
                    <span className="w-6 h-6 rounded-full bg-emerald-500 text-slate-950 font-black text-xs flex items-center justify-center">۳</span>
                    <h4 className="font-bold text-white text-sm">دانلود مستقیم فایل‌های APK و AAB از بخش Artifacts</h4>
                  </div>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    پس از حدود ۳ الی ۴ دقیقه، روی نتیجه بیلد (که با تیک سبز رنگ مشخص شده) کلیک کنید. در پایین صفحه و بخش <strong className="text-emerald-400">Artifacts</strong>، دو فایل آماده دانلود قرار دارد:
                  </p>
                  <div className="grid sm:grid-cols-2 gap-3 pt-1">
                    <div className="p-3 bg-slate-900 border border-emerald-500/30 rounded-xl space-y-1">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                        <Download className="w-4 h-4" />
                        <span>KalamePich-CafeBazaar-AAB</span>
                      </div>
                      <p className="text-[11px] text-slate-400">برای بارگذاری مستقیم در پنل بازار و مایکت</p>
                    </div>

                    <div className="p-3 bg-slate-900 border border-cyan-500/30 rounded-xl space-y-1">
                      <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                        <Download className="w-4 h-4" />
                        <span>KalamePich-DirectInstall-APK</span>
                      </div>
                      <p className="text-[11px] text-slate-400">برای نصب و تست بی‌واسطه روی هر تلفن همراه</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Zero-Config Keystore Feature Notice */}
            <div className="bg-gradient-to-r from-emerald-950/40 via-slate-900 to-slate-900 border border-emerald-500/30 rounded-3xl p-5 shadow-xl flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0 mt-1">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div className="space-y-1 text-xs sm:text-sm">
                <h4 className="font-black text-white">تضمین بیلد موفق ۱۰۰٪ بدون خطای کلید امضا (Zero-Config Signing)</h4>
                <p className="text-slate-300 leading-relaxed text-xs">
                  اسکریپت گیت‌هاب اکشنز به گونه‌ای هوشمند پیاده‌سازی شده که در صورت عدم تعریف کلید در Secrets گیت‌هاب، به صورت خودکار یک کلید اختصاصی امضای نسخه نهایی (Release Keystore) تولید و برنامه را امضا می‌کند؛ بنابراین فرآیند بیلد در گیت‌هاب تحت هیچ شرایطی به خاطر کلید یا تنظیمات با خطا مواجه نخواهد شد.
                </p>
              </div>
            </div>
          </div>
        )}


        {/* 6. ABOUT, CREATOR & RELEASE VERSION TAB */}
        {activeTab === 'about' && (
          <div className="space-y-6">
            {/* Header Hero Banner */}
            <div className="bg-gradient-to-br from-amber-950/50 via-slate-900 to-slate-900 border border-amber-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-80 h-80 bg-amber-500/10 rounded-full blur-3xl pointer-events-none -translate-x-1/2 -translate-y-1/2" />
              <div className="absolute bottom-0 right-0 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none translate-x-1/3 translate-y-1/3" />

              <div className="relative z-10 flex flex-col md:flex-row items-center gap-6 sm:gap-8">
                <div className="relative">
                  <img
                    src="/app-icon.jpg"
                    alt="آیکون بازی کلمه پیچ"
                    className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl shadow-2xl border-2 border-amber-400/50 object-cover"
                    referrerPolicy="no-referrer"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-amber-500 to-orange-500 text-slate-950 text-xs font-black px-2.5 py-0.5 rounded-full shadow-lg border border-amber-300 flex items-center gap-1">
                    <BadgeCheck className="w-3.5 h-3.5" />
                    <span>تایید شده</span>
                  </div>
                </div>

                <div className="flex-1 text-center md:text-right space-y-2">
                  <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
                    <h2 className="text-2xl sm:text-3xl font-black text-white">بازی فکری کلمه پیچ</h2>
                    <span className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <Tag className="w-3.5 h-3.5" />
                      نسخه انتشاری ۱.۰.۰
                    </span>
                    <span className="bg-amber-500/20 border border-amber-500/40 text-amber-300 text-xs font-bold px-3 py-1 rounded-full flex items-center gap-1">
                      <ShieldCheck className="w-3.5 h-3.5" />
                      انتشار رسمی کافه‌بازار
                    </span>
                  </div>

                  <p className="text-sm sm:text-base text-slate-300 leading-relaxed max-w-3xl">
                    شناسنامه رسمی، مشخصات سازنده و جزئیات انتشار نسخه نهایی اپلیکیشن بازی سرگرمی و جدول کلمات «کلمه پیچ»
                  </p>

                  <div className="pt-2 flex flex-wrap items-center justify-center md:justify-start gap-4 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5 bg-slate-950/60 border border-slate-800 px-3 py-1.5 rounded-xl">
                      <User className="w-4 h-4 text-amber-400" />
                      <span>سازنده: <strong className="text-white">سیدحمیدموسوی زاده</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-950/60 border border-slate-800 px-3 py-1.5 rounded-xl">
                      <Calendar className="w-4 h-4 text-emerald-400" />
                      <span>تاریخ انتشار: <strong className="text-white">شهریور ۱۴۰۳ / ۲۰۲۶</strong></span>
                    </div>
                    <div className="flex items-center gap-1.5 bg-slate-950/60 border border-slate-800 px-3 py-1.5 rounded-xl">
                      <Code2 className="w-4 h-4 text-cyan-400" />
                      <span>بسته: <strong className="text-white font-mono">com.example.kalamepich</strong></span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid of Creator & Version Details */}
            <div className="grid md:grid-cols-2 gap-6">
              
              {/* Creator Card */}
              <div className="bg-slate-900 border-2 border-amber-500/40 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
                <div className="absolute -top-12 -left-12 w-36 h-36 bg-amber-500/10 rounded-full blur-2xl pointer-events-none" />
                
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5 border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-500/40 text-amber-400 flex items-center justify-center shadow-inner">
                        <User className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">سازنده و توسعه‌دهنده</span>
                        <h3 className="text-xl font-black text-white">سیدحمیدموسوی زاده</h3>
                      </div>
                    </div>
                    <div className="bg-amber-500/20 text-amber-300 border border-amber-500/30 p-2 rounded-xl">
                      <BadgeCheck className="w-5 h-5" />
                    </div>
                  </div>

                  <div className="space-y-3.5 text-xs sm:text-sm text-slate-300">
                    <div className="bg-slate-950/80 border border-slate-800/80 rounded-2xl p-4 space-y-2.5">
                      <div className="flex items-center justify-between text-xs border-b border-slate-800/60 pb-2">
                        <span className="text-slate-400">نام و نام خانوادگی:</span>
                        <span className="font-bold text-white text-sm">سیدحمیدموسوی زاده</span>
                      </div>
                      <div className="flex items-center justify-between text-xs border-b border-slate-800/60 pb-2">
                        <span className="text-slate-400">نقش در پروژه:</span>
                        <span className="font-bold text-amber-300">پدیدآورنده، طراح بازی و توسعه‌دهنده ارشد</span>
                      </div>
                      <div className="flex items-center justify-between text-xs border-b border-slate-800/60 pb-2">
                        <span className="text-slate-400">مالکیت معنوی و لایسنس:</span>
                        <span className="font-bold text-emerald-400">انحصاری و ثبت شده</span>
                      </div>
                      <div className="flex items-center justify-between text-xs">
                        <span className="text-slate-400">وضعیت توسعه:</span>
                        <span className="font-bold text-cyan-300">نسخه نهایی آماده کافه‌بازار</span>
                      </div>
                    </div>

                    <div className="bg-amber-500/10 border border-amber-500/20 rounded-2xl p-4 text-xs leading-relaxed text-amber-200/90">
                      <p className="font-bold text-amber-300 mb-1 flex items-center gap-1.5">
                        <Heart className="w-3.5 h-3.5 text-amber-400 fill-amber-400/30" />
                        بیانیه مالکیت معنوی و حقوق پدیدآورنده:
                      </p>
                      کلیه حقوق مادی، معنوی، کدهای نرم‌افزاری، طراحی گرافیکی، مراحل بازی و نام تجاری 
                      «کلمه پیچ» متعلق به جناب آقای <strong className="text-white">سیدحمیدموسوی زاده</strong> می‌باشد 
                      و هرگونه بهره‌برداری تجاری مستلزم هماهنگی با ایشان است.
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>پدیدآورنده اثر</span>
                  <span className="font-bold text-slate-200">سیدحمیدموسوی زاده © ۱۴۰۳</span>
                </div>
              </div>

              {/* Release Version Card */}
              <div className="bg-slate-900 border-2 border-emerald-500/40 rounded-3xl p-6 shadow-xl relative overflow-hidden flex flex-col justify-between">
                <div className="absolute -top-12 -right-12 w-36 h-36 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
                
                <div>
                  <div className="flex items-center justify-between gap-3 mb-5 border-b border-slate-800 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center shadow-inner">
                        <Tag className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider">مشخصات نسخه انتشاریه</span>
                        <h3 className="text-xl font-black text-white">نسخه ۱.۰.۰ (Stable)</h3>
                      </div>
                    </div>
                    <span className="bg-emerald-500 text-slate-950 font-black text-xs px-2.5 py-1 rounded-xl">
                      نسخه انتشار
                    </span>
                  </div>

                  <div className="space-y-2.5 text-xs">
                    <div className="grid grid-cols-2 gap-2.5">
                      <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl">
                        <span className="text-slate-400 block text-[11px]">نسخه رسمی (Version Name):</span>
                        <span className="text-emerald-400 font-bold font-mono text-base">1.0.0</span>
                      </div>
                      <div className="bg-slate-950 border border-slate-800 p-3 rounded-2xl">
                        <span className="text-slate-400 block text-[11px]">کد ساخت (Version Code):</span>
                        <span className="text-emerald-400 font-bold font-mono text-base">1</span>
                      </div>
                    </div>

                    <div className="bg-slate-950/80 border border-slate-800 rounded-2xl p-3.5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">شناسه بسته (Package ID):</span>
                        <span className="text-white font-mono font-bold">com.example.kalamepich</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">حداقل سیستم‌عامل اندروید:</span>
                        <span className="text-slate-200 font-bold">Android 7.0 (API 24)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">اندروید هدف (Target SDK):</span>
                        <span className="text-slate-200 font-bold">Android 14 / 15 (API 34/35)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">پلتفرم‌های مقصد:</span>
                        <span className="text-emerald-400 font-bold">کافه‌بازار، مایکت و وب (PWA)</span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">فرمت خروجی پکیج:</span>
                        <span className="text-cyan-400 font-mono font-bold">AAB و APK امضا شده</span>
                      </div>
                    </div>

                    <div className="bg-emerald-500/10 border border-emerald-500/20 p-3 rounded-2xl flex items-center justify-between">
                      <span className="text-emerald-300 font-bold">وضعیت انتشار:</span>
                      <span className="bg-emerald-500 text-slate-950 font-black px-2 py-0.5 rounded text-[11px]">
                        آماده بارگذاری در پنل توسعه‌دهندگان بازار
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                  <span>کانفیگ بیلد نهایی</span>
                  <span className="text-emerald-400 font-mono">Release Build Verified ✓</span>
                </div>
              </div>

            </div>

            {/* About The Game Section */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 shadow-xl space-y-6">
              <div className="flex items-center gap-3 border-b border-slate-800 pb-4">
                <div className="w-12 h-12 rounded-2xl bg-cyan-500/20 border border-cyan-500/40 text-cyan-400 flex items-center justify-center">
                  <BookOpen className="w-6 h-6" />
                </div>
                <div>
                  <span className="text-xs font-bold text-cyan-400">داستان، اهداف و گیم‌پلی</span>
                  <h3 className="text-xl font-black text-white">درباره بازی کلمه پیچ</h3>
                </div>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="md:col-span-2 space-y-4 text-sm text-slate-300 leading-relaxed">
                  <p>
                    <strong className="text-white text-base">کلمه پیچ</strong> یک بازی فکری و سرگرم‌کننده در سبک حل جدول و اتصال واژگان زبان و ادبیات فارسی است. این بازی به دست توانمند <strong className="text-amber-300">سیدحمیدموسوی زاده</strong> طراحی و پیاده‌سازی شده و هدف آن خلق لحظاتی آموزنده، مهیج و نشاط‌آور برای تمامی اعضای خانواده ایرانی است.
                  </p>
                  <p>
                    در بازی کلمه پیچ، بازیکن با چرخی جادویی از حروف الفبای فارسی روبرو می‌شود. با لمس و اتصال پیوسته حروف، واژگان معنادار کشف شده و جدول معمای هر مرحله تکمیل می‌گردد. با عبور از هر مرحله، چالش‌ها پیچیده‌تر و هوشمندانه‌تر شده و علاوه بر ایجاد سرگرمی، حافظه کوتاه‌مدت، قدرت تمرکز و دایره واژگان بازیکن تقویت خواهد شد.
                  </p>
                  
                  <div className="grid sm:grid-cols-2 gap-3 pt-2">
                    <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80 space-y-1">
                      <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
                        <CheckCircle className="w-4 h-4" />
                        <span>تقویت حافظه و هوش</span>
                      </div>
                      <p className="text-[12px] text-slate-400 leading-normal">
                        به چالش کشیدن ذهن با کلمات متنوع فارسی و افزایش سرعت انتقال و بازیابی اطلاعات مغز.
                      </p>
                    </div>

                    <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80 space-y-1">
                      <div className="flex items-center gap-2 text-amber-400 font-bold text-xs">
                        <CheckCircle className="w-4 h-4" />
                        <span>گسترش دایره لغات</span>
                      </div>
                      <p className="text-[12px] text-slate-400 leading-normal">
                        آشنایی با کلمات زیبا، اصیل و کلمات کمتر شنیده شده در شعر و ادبیات کهن فارسی.
                      </p>
                    </div>

                    <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80 space-y-1">
                      <div className="flex items-center gap-2 text-cyan-400 font-bold text-xs">
                        <CheckCircle className="w-4 h-4" />
                        <span>کاملاً آفلاین و کم‌حجم</span>
                      </div>
                      <p className="text-[12px] text-slate-400 leading-normal">
                        امکان اجرای تمام مراحل بدون نیاز به اینترنت و با ذخیره خودکار وضعیت کاربر.
                      </p>
                    </div>

                    <div className="bg-slate-950 p-3.5 rounded-2xl border border-slate-800/80 space-y-1">
                      <div className="flex items-center gap-2 text-purple-400 font-bold text-xs">
                        <CheckCircle className="w-4 h-4" />
                        <span>طراحی اصیل ایرانی</span>
                      </div>
                      <p className="text-[12px] text-slate-400 leading-normal">
                        بهره‌گیری از المان‌های اصیل چوب، طلا و کاشی‌کاری‌های فیروزه‌ای در رابط کاربری بازی.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-2xl p-5 space-y-4 flex flex-col justify-between">
                  <div>
                    <h4 className="font-bold text-white text-sm mb-3 flex items-center gap-2">
                      <Layers className="w-4 h-4 text-emerald-400" />
                      امکانات تجاری و زیرساخت
                    </h4>
                    <ul className="space-y-2.5 text-xs text-slate-300">
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-emerald-400" />
                        <span>اتصال تبلیغات هوشمند تپسل با کلید اختصاصی</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-cyan-400" />
                        <span>سیستم پرداخت درون‌برنامه‌ای کافه‌بازار (VIP)</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-amber-400" />
                        <span>جوایز روزانه، گردونه شانس و سکه پاداش</span>
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-purple-400" />
                        <span>پایگاه داده مستقل Room ORM برای اندروید</span>
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-slate-800 space-y-2">
                    <button
                      onClick={() => setActiveTab('game')}
                      className="w-full py-2.5 px-3 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-emerald-600/30"
                    >
                      <Play className="w-4 h-4" />
                      <span>شروع بازی در شبیه‌ساز</span>
                    </button>
                    <button
                      onClick={() => setActiveTab('tapsell')}
                      className="w-full py-2.5 px-3 bg-slate-800 hover:bg-slate-700 text-slate-200 font-bold text-xs rounded-xl flex items-center justify-center gap-2 transition-all border border-slate-700"
                    >
                      <Tv className="w-4 h-4 text-teal-400" />
                      <span>مشاهده تنظیمات تبلیغات تپسل</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Technical Specifications Table */}
            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 shadow-xl space-y-4">
              <h4 className="font-bold text-white text-sm flex items-center gap-2">
                <Sliders className="w-4 h-4 text-amber-400" />
                شناسنامه فنی نسخه ۱.۰.۰ در یک نگاه
              </h4>

              <div className="overflow-x-auto">
                <table className="w-full text-right text-xs">
                  <thead>
                    <tr className="border-b border-slate-800 text-slate-400 font-bold">
                      <th className="py-2.5 px-3">عنوان مشخصه</th>
                      <th className="py-2.5 px-3">مقدار</th>
                      <th className="py-2.5 px-3">توضیحات</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/60 text-slate-300">
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-white">نام بازی</td>
                      <td className="py-2.5 px-3 text-emerald-400 font-bold">کلمه پیچ (Kalame Pich)</td>
                      <td className="py-2.5 px-3 text-slate-400">عنوان تجاری در کافه‌بازار و وب</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-white">پدیدآورنده و سازنده</td>
                      <td className="py-2.5 px-3 text-amber-300 font-black">سیدحمیدموسوی زاده</td>
                      <td className="py-2.5 px-3 text-slate-400">طراح بازی، برنامه‌نویس و مالک حقوق معنوی اثر</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-white">نسخه انتشاریه (Release)</td>
                      <td className="py-2.5 px-3 text-cyan-400 font-bold font-mono">1.0.0 (Version Code: 1)</td>
                      <td className="py-2.5 px-3 text-slate-400">نسخه نهایی پایدار (Production Release)</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-white">کلید اپلیکیشن تپسل</td>
                      <td className="py-2.5 px-3 font-mono text-teal-300 truncate max-w-[200px]">{tapsellAppKey.slice(0, 16)}...</td>
                      <td className="py-2.5 px-3 text-emerald-400 font-bold">فعال و متصل در کدها</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-white">شناسه ویدیوی جایزه‌دار</td>
                      <td className="py-2.5 px-3 font-mono text-teal-300">{tapsellRewardedZoneId}</td>
                      <td className="py-2.5 px-3 text-slate-400">۵۰ سکه پاداش پس از تماشای ویدیو</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-white">شناسه بنر استاندارد</td>
                      <td className="py-2.5 px-3 font-mono text-teal-300">{tapsellBannerZoneId}</td>
                      <td className="py-2.5 px-3 text-slate-400">جایگاه ۳۲۰x۵۰ در بازی و فروشگاه</td>
                    </tr>
                    <tr>
                      <td className="py-2.5 px-3 font-bold text-white">درگاه پرداخت</td>
                      <td className="py-2.5 px-3 text-blue-400 font-bold">کافه‌بازار (Cafe Bazaar Billing)</td>
                      <td className="py-2.5 px-3 text-slate-400">خرید VIP و سکه با پروتکل ایمن AIDL</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Copyright & Creator Footer */}
            <div className="text-center py-4 space-y-2 border-t border-slate-800 text-xs text-slate-500">
              <p className="flex items-center justify-center gap-1.5 text-slate-400">
                <span>طراحی، ساخت و توسعه توسط</span>
                <strong className="text-amber-400 font-bold">سیدحمیدموسوی زاده</strong>
                <span>• کلیه حقوق محفوظ است © ۱۴۰۳</span>
              </p>
              <p className="text-[11px] text-slate-600 font-mono">
                بازی کلمه پیچ | نسخه انتشاری ۱.۰.۰ | Kalame Pich Version 1.0.0
              </p>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}
