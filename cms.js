import React, { useState, useEffect } from 'react';
import { 
  Home, Utensils, Image as ImageIcon, FileText, 
  Settings, MessageSquare, Plus, Edit2, Trash2, 
  X, Save, Menu, Bell, TrendingUp, Users, Clock, AlertTriangle, Upload, Printer,
  ArrowUp, ArrowDown
} from 'lucide-react';

// --- BAZOWE DANE STARTOWE (MOCK) ---
const INITIAL_CONTENT = {
  hours: {
    monday: "Zamknięte",
    tuesday: "12:00 - 21:00",
    wednesday: "12:00 - 21:00",
    thursday: "12:00 - 21:00",
    friday: "12:00 - 21:00",
    saturday: "12:00 - 21:00",
    sunday: "12:00 - 20:00",
    note: "Zapraszamy od wtorku do niedzieli!",
  },
  contact: {
    phone: "+48 537 961 666",
    email: "kontakt@recznarobota2.pl",
    address: "Port Wodnik, ul. Zegrzyńska 10, 05-126 Nieporęt",
    facebook: "https://www.facebook.com/profile.php?id=61577435373395"
  },
  alert: {
    active: false,
    message: "Dziś lokal nieczynny z powodu złej pogody. Przepraszamy!"
  }
};

const INITIAL_EDITOR_CONTENT = {
  index: {
    hero: {
      eyebrow: "Bar nad jeziorem zegrzyńskim",
      title: "Smak lata nad Zegrzem",
      lead: "Pyszne jedzenie, orzeźwiające napoje i najlepszy widok na Zalew Zegrzyński. Witaj w Ręczna Robota 2.0 Wodnik!",
      primaryCtaLabel: "Zobacz menu",
      primaryCtaHref: "#menu",
      secondaryCtaLabel: "Zarezerwuj stolik",
      secondaryCtaHref: "#kontakt",
    },
    about: {
      title: "O nas",
      lead1: "Ręczna Robota 2.0 Wodnik to nowe miejsce na kulinarnej mapie Nieporętu. Powstał z miłości do dobrego jedzenia, wspaniałej atmosfery i niezwykłych widoków.",
      lead2: "Znajdziesz nas w porcie Wodnik - tu, gdzie Jezioro Zegrzyńskie prezentuje się najpiękniej.",
      buttonLabel: "Dowiedz się więcej",
      buttonHref: "./o-nas.html",
    },
    aboutSlider: {
      slide1: {
        src: "./assets/gallery/kotlety.webp",
        alt: "Kotlet schabowy z ziemniakami i kapustą zasmażaną",
      },
      slide2: {
        src: "./assets/gallery/mniam.webp",
        alt: "Grillowana pierś z kurczaka z frytkami i surówką",
      },
      slide3: {
        src: "./assets/gallery/pizza1.webp",
        alt: "Pizza z szynką, pieczarkami i rukolą",
      },
    },
    menu: {
      note: "Menu obowiązuje przez cały sezon letni, jesteśmy czynni od wtorku do soboty w godz. 12:00 - 21:00, a w niedzielę 12:00 - 20:00.",
      phoneLabel: "+48 123 456 789",
      phoneHref: "tel:+48123456789",
    },
    hours: {
      monday: "Zamknięte",
      tuesday: "12:00 - 21:00",
      wednesday: "12:00 - 21:00",
      thursday: "12:00 - 21:00",
      friday: "12:00 - 21:00",
      saturday: "12:00 - 21:00",
      sunday: "12:00 - 20:00",
      note: "Zapraszamy od wtorku do niedzieli!",
    },
    footer: {
      company: "Ręczna Robota 2.0 Wodnik",
      phone: "+48 123 456 789",
      phoneHref: "tel:+48123456789",
      email: "kontakt@recznarobota2.pl",
      emailHref: "mailto:kontakt@recznarobota2.pl",
    },
  },
  about: {
    media: {
      heroImageSrc: "./assets/gallery/mniam.webp",
      heroImageAlt: "Grillowana pierś z kurczaka serwowana w Ręczna Robota 2.0 Wodnik",
    },
    intro: {
      eyebrow: "Ręczna Robota 2.0 Wodnik",
      title: "Miejsce, które smakuje latem",
      lead1: "Jesteśmy restauracją w porcie Wodnik, stworzoną dla tych, którzy lubią dobrą kuchnię i swobodny klimat nad wodą. Łączymy lokalne smaki, sezonowe produkty i luźną atmosferę.",
      lead2: "U nas możesz wpaść na szybki lunch po rejsie, rodzinny obiad albo wieczór z przyjaciółmi. Każdego dnia pracujemy nad tym, żeby było smacznie, sprawnie i po prostu przyjemnie.",
      primaryCtaLabel: "Zobacz aktualne menu",
      primaryCtaHref: "./index.html#menu",
      secondaryCtaLabel: "Otwórz dojazd w Google Maps",
      secondaryCtaHref: "https://maps.app.goo.gl/abhgKGvzsiDdfsXc9",
    },
    story: {
      title: "Jak wygląda wizyta u nas",
      card1: {
        title: "Wpadasz bez spiny",
        text: "Nie musisz planować tygodniami. Wystarczy telefon albo spontaniczna decyzja i już jesteś na miejscu.",
      },
      card2: {
        title: "Zamawiasz po swojemu",
        text: "Od klasyków po lżejsze opcje - menu jest ułożone tak, żeby każdy znalazł coś dla siebie.",
      },
      card3: {
        title: "Zostajesz dla klimatu",
        text: "Widok na wodę i spokojny rytm portu sprawiają, że często zostaje się u nas dłużej niż planowano.",
      },
    },
    facts: {
      title: "Co warto wiedzieć przed wizytą",
      item1: "Gotujemy od wtorku do soboty 12:00 - 21:00, w niedzielę do 20:00.",
      item2: "Największy ruch mamy w sobotę między 15:00 a 18:00.",
      item3: "Najlepiej rezerwować stolik na większe grupy i wieczorne spotkania.",
      item4: "W menu regularnie pojawiają się sezonowe nowości i pozycje limitowane.",
    },
    faq: {
      title: "Najczęstsze pytania",
      q1: "Czy można przyjść bez rezerwacji?",
      a1: "Tak, zapraszamy również bez rezerwacji. W godzinach szczytu warto jednak zadzwonić wcześniej.",
      q2: "Czy macie opcje dla dzieci?",
      a2: "Tak, menu zawiera pozycje chętnie wybierane przez najmłodszych. Obsługa podpowie najlepszy wybór.",
      q3: "Jak najłatwiej do Was trafić?",
      a3: "Najwygodniej skorzystać z nawigacji Google Maps - pinezka prowadzi bezpośrednio do portu Wodnik.",
    },
    cta: {
      title: "Wpadnij do nas i poczuj klimat portu",
      description: "Jeśli chcesz, podpowiemy od czego najlepiej zacząć i co dziś poleca kuchnia.",
      buttonLabel: "Nawiguj do restauracji",
      buttonHref: "https://maps.app.goo.gl/abhgKGvzsiDdfsXc9",
    },
  },
};

const INITIAL_MENU = [
  {
    id: 'cat-1',
    name: 'Zupy',
    icon: '🍲',
    items: [
      { id: 'item-1', name: 'Żurek z białą kiełbasą / podgrzybki / jajo', price: '18 zł' },
      { id: 'item-2', name: 'Pomidorowa z makaronem', price: '15 zł' }
    ]
  },
  {
    id: 'cat-2',
    name: 'Dania główne',
    icon: '🍽️',
    items: [
      { id: 'item-3', name: 'Schabowy / ziemniaki / koperek / kapusta zasmażana', price: '38 zł' },
      { id: 'item-4', name: 'Grillowana pierś z kurczaka / frytki / sos tzatziki / surówka z białej kapusty', price: '37 zł' },
      { id: 'item-5', name: 'Sandacz 180 g / opiekane ziemniaki / blanszowany szpinak', price: '57 zł' },
      { id: 'item-6', name: 'Pieczona karkówka / sos pieczarkowy / kopytka / surówka z białej kapusty', price: '39 zł' },
      { id: 'item-7', name: 'Frytki', price: '12 zł' },
      { id: 'item-8', name: 'Frytki z parmezanem', price: '15 zł' }
    ]
  },
  {
    id: 'cat-3',
    name: 'Pizza 32 cm',
    icon: '🍕',
    items: [
      { id: 'item-9', name: 'Salame picante / sos pomidorowy / mozzarella / spianata / ricotta / papryka', price: '42 zł' },
      { id: 'item-10', name: 'Cotto funghi / sos pomidorowy / mozzarella / szynka cotto / pieczarki / rukola', price: '37 zł' },
      { id: 'item-11', name: 'Amatriciana / sos pomidorowy / mozzarella / boczek / czosnek / cebula czerwona / piri-piri', price: '39 zł' },
      { id: 'item-12', name: 'Diavola / sos pomidorowy / mozzarella / spianata / jalapeno', price: '41 zł' },
      { id: 'item-13', name: 'Margherita / sos pomidorowy / mozzarella / bazylia', price: '31 zł' },
      { id: 'item-14', name: 'Hawajska / sos pomidorowy / mozzarella / szynka / ananas', price: '36 zł' }
    ]
  },
  {
    id: 'cat-4',
    name: 'Napoje',
    icon: '🥤',
    items: [
      { id: 'item-15', name: 'Cola / Cola Zero / Fanta / Sprite / sok jabłkowy 0,25 l', price: '9 zł' },
      { id: 'item-16', name: 'Cola 0,5 l', price: '18 zł' },
      { id: 'item-17', name: 'Woda niegazowana / gazowana 0,3 l', price: '9 zł' },
      { id: 'item-18', name: 'Woda z cytryną 0,5 l', price: '12 zł' },
      { id: 'item-19', name: 'Lemoniada cytrynowa 0,3 l', price: '13 zł' }
    ]
  },
  {
    id: 'cat-5',
    name: 'Napoje ciepłe',
    icon: '☕',
    items: [
      { id: 'item-20', name: 'Espresso', price: '5 zł' },
      { id: 'item-21', name: 'Espresso doppio', price: '8 zł' },
      { id: 'item-22', name: 'Americano', price: '9 zł' },
      { id: 'item-23', name: 'Mleko', price: '2 zł' },
      { id: 'item-24', name: 'Cappuccino', price: '12 zł' },
      { id: 'item-25', name: 'Caffe latte', price: '13 zł' },
      { id: 'item-26', name: 'Herbata', price: '7 zł' }
    ]
  },
  {
    id: 'cat-6',
    name: 'Piwo butelkowe',
    icon: '🍾',
    items: [
      { id: 'item-27', name: 'Świeże', price: '15 zł' },
      { id: 'item-28', name: 'Jungle IPA', price: '18 zł' },
      { id: 'item-29', name: 'Śmietanka pszeniczne', price: '17 zł' },
      { id: 'item-30', name: 'Budweiser', price: '14 zł' }
    ]
  },
  {
    id: 'cat-7',
    name: 'Piwo z nalewaka',
    icon: '🍺',
    items: [
      { id: 'item-31', name: 'Żywiec', price: '14 zł' }
    ]
  },
  {
    id: 'cat-8',
    name: 'Piwo bezalkoholowe',
    icon: '🧃',
    items: [
      { id: 'item-32', name: 'Korona 0% 0,33 l', price: '12 zł' },
      { id: 'item-33', name: 'Bavaria 0% 0,33 l', price: '12 zł' },
      { id: 'item-34', name: 'Żywiec Białe 0% 0,5 l', price: '15 zł' }
    ]
  },
  {
    id: 'cat-9',
    name: 'Wino',
    icon: '🍷',
    items: [
      { id: 'item-35', name: 'Wino białe domowe 150 ml', price: '11 zł' }
    ]
  }
];

const INITIAL_BLOG = [
  {
    id: "blog-lemoniady",
    title: "Sezonowe lemoniady 2026 - nasze 4 smaki lata",
    summary: "Sprawdź, które lemoniady królują w tym sezonie i z czym najlepiej je łączyć z naszego menu.",
    date: "16 maja 2026",
    status: "Aktualności",
    image: "https://images.unsplash.com/photo-1523362628745-0c100150b504?auto=format&fit=crop&w=600&q=80"
  }
];

const INITIAL_MESSAGES = [
  { id: 1, name: 'Jan Kowalski', email: 'jan@example.com', phone: '500 123 456', message: 'Dzień dobry, czy macie wolny stolik na 6 osób w najbliższą sobotę o 18:00?', date: '16.05.2026 14:30', isRead: false },
  { id: 2, name: 'Anna Nowak', email: 'anna@example.com', phone: '', message: 'Czy organizujecie małe imprezy firmowe? Interesuje mnie rezerwacja dla 15 osób.', date: '15.05.2026 09:15', isRead: true }
];

const INITIAL_GALLERY = [
  "./assets/gallery/krajobraz.webp",
  "./assets/gallery/kotlety.webp",
  "./assets/gallery/pizza1.webp",
  "./assets/gallery/mniam.webp",
  "./assets/gallery/pizza2.webp",
  "./assets/gallery/jaja.webp"
];

const splitLegacyItemName = (rawName = '') => {
  const normalized = String(rawName)
    .replace(/\(/g, ' / ')
    .replace(/\)/g, '')
    .replace(/\s*\/\s*/g, ' / ')
    .trim();
  const parts = normalized.split(' / ').map((part) => part.trim()).filter(Boolean);
  return {
    title: parts[0] || '',
    subtitle: parts.slice(1).join(' / '),
  };
};

const isObject = (value) => value && typeof value === 'object' && !Array.isArray(value);

const deepMerge = (base, custom) => {
  if (!isObject(base) || !isObject(custom)) return custom ?? base;
  const result = { ...base };
  Object.keys(custom).forEach((key) => {
    result[key] = deepMerge(base[key], custom[key]);
  });
  return result;
};

const getByPath = (object, path) => path.split('.').reduce((acc, segment) => (acc ? acc[segment] : undefined), object);

const setByPath = (target, path, value) => {
  const parts = path.split('.');
  let cursor = target;
  parts.forEach((segment, index) => {
    const isLast = index === parts.length - 1;
    if (isLast) {
      cursor[segment] = value;
      return;
    }
    if (!isObject(cursor[segment])) cursor[segment] = {};
    cursor = cursor[segment];
  });
};

const getItemDisplayParts = (item) => {
  const title = String(item?.name || '').trim();
  const subtitle = typeof item?.subtitle === 'string' ? item.subtitle.trim() : '';
  if (subtitle) {
    return {
      title,
      subtitle,
    };
  }
  return splitLegacyItemName(title);
};

// --- GŁÓWNA APLIKACJA ---
export default function CMSAdminApp() {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Stany Danych
  const [content, setContent] = useState(INITIAL_CONTENT);
  const [editorContent, setEditorContent] = useState(INITIAL_EDITOR_CONTENT);
  const [menu, setMenu] = useState(INITIAL_MENU);
  const [blog, setBlog] = useState(INITIAL_BLOG);
  const [messages, setMessages] = useState(INITIAL_MESSAGES);
  const [gallery, setGallery] = useState(INITIAL_GALLERY);

  // Ładowanie z localStorage po montowaniu
  useEffect(() => {
    const loadData = (key, setter, fallback) => {
      const stored = localStorage.getItem(key);
      if (stored) {
        try { setter(JSON.parse(stored)); } catch (e) { setter(fallback); }
      }
    };
    loadData('rr2_cms_settings', setContent, INITIAL_CONTENT);
    loadData('rr2_cms_content_v1', (value) => setEditorContent(deepMerge(INITIAL_EDITOR_CONTENT, value || {})), INITIAL_EDITOR_CONTENT);
    loadData('rr2_cms_menu_v2', setMenu, INITIAL_MENU);
    loadData('rr2_cms_blog_v1', setBlog, INITIAL_BLOG);
    loadData('rr2_cms_messages', setMessages, INITIAL_MESSAGES);
    loadData('rr2_cms_gallery', setGallery, INITIAL_GALLERY);
  }, []);

  // Zapisywanie do localStorage
  useEffect(() => { localStorage.setItem('rr2_cms_settings', JSON.stringify(content)); }, [content]);
  useEffect(() => { localStorage.setItem('rr2_cms_content_v1', JSON.stringify(editorContent)); }, [editorContent]);
  useEffect(() => { localStorage.setItem('rr2_cms_menu_v2', JSON.stringify(menu)); }, [menu]);
  useEffect(() => { localStorage.setItem('rr2_cms_blog_v1', JSON.stringify(blog)); }, [blog]);
  useEffect(() => { localStorage.setItem('rr2_cms_messages', JSON.stringify(messages)); }, [messages]);
  useEffect(() => { localStorage.setItem('rr2_cms_gallery', JSON.stringify(gallery)); }, [gallery]);

  useEffect(() => {
    document.getElementById('admin-main')?.focus({ preventScroll: true });
  }, [activeTab]);

  const unreadCount = messages.filter(m => !m.isRead).length;

  const NAVIGATION = [
    { id: 'dashboard', label: 'Pulpit', icon: Home },
    { id: 'messages', label: 'Wiadomości', icon: MessageSquare, badge: unreadCount },
    { id: 'editor', label: 'Edytor', icon: FileText },
    { id: 'menu', label: 'Menu', icon: Utensils },
    { id: 'blog', label: 'Wpisy', icon: FileText },
    { id: 'gallery', label: 'Galeria', icon: ImageIcon },
    { id: 'settings', label: 'Ustawienia', icon: Settings },
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'dashboard': return <DashboardTab messages={messages} blog={blog} unreadCount={unreadCount} setActiveTab={setActiveTab} alert={content.alert} />;
      case 'messages': return <MessagesTab messages={messages} setMessages={setMessages} />;
      case 'editor': return <EditorTab content={editorContent} setContent={setEditorContent} gallery={gallery} setGallery={setGallery} />;
      case 'menu': return <MenuTab menu={menu} setMenu={setMenu} phone={content.contact.phone} />;
      case 'blog': return <BlogTab blog={blog} setBlog={setBlog} />;
      case 'gallery': return <GalleryTab gallery={gallery} setGallery={setGallery} />;
      case 'settings': return <SettingsTab content={content} setContent={setContent} />;
      default: return <DashboardTab />;
    }
  };

  return (
    <div className="flex h-screen bg-[#f4f7fc] text-[#12203a] font-['Lato',sans-serif] overflow-hidden">
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex flex-col w-64 bg-white border-r border-slate-200 shadow-sm z-10 no-print" aria-label="Panel administracyjny">
        <div className="p-6 flex items-center justify-center border-b border-slate-100">
          <div className="text-center">
            <h1 className="font-['Caveat'] text-3xl font-bold text-[#0a1c3a] leading-none">Ręczna Robota</h1>
            <p className="text-[#c31b1b] font-bold text-sm tracking-widest mt-1">CMS ADMIN</p>
          </div>
        </div>
        <nav className="flex-1 px-4 py-6 space-y-2 overflow-y-auto" aria-label="Główna nawigacja panelu">
          {NAVIGATION.map((item) => (
            <button
              type="button"
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              aria-current={activeTab === item.id ? 'page' : undefined}
              className={`flex items-center justify-between w-full px-4 py-3 rounded-xl transition-all duration-200 ${
                activeTab === item.id 
                  ? 'bg-[#0a1c3a] text-white shadow-md' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-[#0a1c3a]'
              }`}
            >
              <div className="flex items-center gap-3 font-semibold">
                <item.icon size={20} strokeWidth={2.5} />
                {item.label}
              </div>
              {item.badge > 0 && (
                <span className={`px-2 py-0.5 rounded-full text-xs font-bold ${activeTab === item.id ? 'bg-[#c31b1b] text-white' : 'bg-[#c31b1b] text-white'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main id="admin-main" className="flex-1 flex flex-col h-full relative overflow-hidden" tabIndex="-1">
        <p className="sr-only" aria-live="polite">
          Otwarta sekcja: {NAVIGATION.find(item => item.id === activeTab)?.label}
        </p>
        {/* Mobile Header */}
        <header className="md:hidden flex items-center justify-between bg-white px-5 py-4 border-b border-slate-200 z-10 no-print">
          <h1 className="font-['Caveat'] text-2xl font-bold text-[#0a1c3a]">RR 2.0 Admin</h1>
          <div className="flex items-center gap-4">
            {unreadCount > 0 && (
              <button type="button" aria-label={`Wiadomości: ${unreadCount} nieprzeczytanych`} onClick={() => setActiveTab('messages')} className="relative p-2 text-slate-600">
                <Bell size={24} />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-[#c31b1b] rounded-full border-2 border-white"></span>
              </button>
            )}
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 pb-24 md:pb-8">
          <div className="max-w-5xl mx-auto">
            {renderContent()}
          </div>
        </div>
      </main>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 w-full bg-white border-t border-slate-200 flex justify-around items-center pb-safe pt-1 px-2 z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] no-print" aria-label="Mobilna nawigacja panelu">
        {NAVIGATION.filter(item => ['dashboard', 'editor', 'menu', 'settings'].includes(item.id)).map((item) => (
          <button
            type="button"
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            aria-current={activeTab === item.id ? 'page' : undefined}
            className={`flex flex-col items-center p-2 min-w-[64px] transition-colors ${
              activeTab === item.id ? 'text-[#c31b1b]' : 'text-slate-500'
            }`}
          >
            <div className="relative mb-1">
              <item.icon size={24} strokeWidth={activeTab === item.id ? 2.5 : 2} />
              {item.badge > 0 && (
                <span className="absolute -top-1 -right-2 w-4 h-4 bg-[#c31b1b] text-white text-[10px] font-bold rounded-full flex items-center justify-center border border-white">
                  {item.badge}
                </span>
              )}
            </div>
            <span className="text-[10px] font-bold">{item.label}</span>
          </button>
        ))}
        {/* More Menu Toggle (Mobile) */}
        <button
          type="button"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-expanded={isMobileMenuOpen}
          aria-controls="admin-mobile-more-menu"
          className={`flex flex-col items-center p-2 min-w-[64px] transition-colors ${
            ['messages', 'gallery'].includes(activeTab) || isMobileMenuOpen ? 'text-[#c31b1b]' : 'text-slate-500'
          }`}
        >
          <Menu size={24} strokeWidth={isMobileMenuOpen ? 2.5 : 2} className="mb-1" />
          <span className="text-[10px] font-bold">Więcej</span>
        </button>
      </nav>

      {/* Mobile More Menu Overlay */}
      {isMobileMenuOpen && (
        <div className="md:hidden fixed inset-0 z-10 bg-slate-900/50 backdrop-blur-sm no-print" onClick={() => setIsMobileMenuOpen(false)}>
          <div id="admin-mobile-more-menu" role="dialog" aria-modal="true" aria-label="Więcej sekcji panelu" className="absolute bottom-16 right-4 bg-white rounded-2xl shadow-xl overflow-hidden min-w-[200px] border border-slate-100" onClick={e => e.stopPropagation()}>
            <div className="p-2">
              {[
                { id: 'messages', label: 'Wiadomości', icon: MessageSquare, badge: unreadCount },
                { id: 'gallery', label: 'Galeria', icon: ImageIcon },
                { id: 'blog', label: 'Wpisy', icon: FileText }
              ].map(item => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => { setActiveTab(item.id); setIsMobileMenuOpen(false); }}
                  className="w-full flex items-center justify-between p-3 rounded-xl hover:bg-slate-50 text-slate-700 font-semibold"
                >
                  <div className="flex items-center gap-3">
                    <item.icon size={20} className="text-slate-400" />
                    {item.label}
                  </div>
                  {item.badge > 0 && (
                     <span className="px-2 py-0.5 rounded-full text-xs font-bold bg-[#c31b1b] text-white">{item.badge}</span>
                  )}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

// --- KOMPONENTY WIDOKÓW ---

function DashboardTab({ messages, blog, unreadCount, setActiveTab, alert }) {
  const stats = [
    { label: 'Wyświetlenia (dziś)', value: '342', icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-50' },
    { label: 'Aktywni użytkownicy', value: '18', icon: Users, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Oczekujące wiadomości', value: unreadCount.toString(), icon: MessageSquare, color: 'text-[#c31b1b]', bg: 'bg-red-50' }
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      <div className="no-print">
        <h2 className="text-3xl font-['Playfair_Display'] font-bold text-[#0a1c3a]">Cześć, Załogo! 👋</h2>
        <p className="text-slate-500 mt-1">Oto podsumowanie dzisiejszego dnia w porcie Wodnik.</p>
      </div>

      {alert?.active && (
        <div className="bg-red-50 border border-red-200 rounded-2xl p-4 flex gap-4 items-start no-print">
          <div className="bg-red-100 p-2 rounded-full text-red-600 shrink-0"><AlertTriangle size={20} /></div>
          <div>
            <h4 className="font-bold text-red-800">Aktywny komunikat specjalny!</h4>
            <p className="text-red-600 text-sm mt-1">{alert.message}</p>
            <button onClick={() => setActiveTab('settings')} className="text-sm font-bold text-[#c31b1b] mt-2 underline">Zmień w Ustawieniach</button>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 no-print">
        {stats.map((s, i) => (
          <div key={i} className="bg-white rounded-2xl p-5 shadow-sm border border-slate-100 flex items-center gap-4">
            <div className={`p-4 rounded-2xl ${s.bg} ${s.color}`}>
              <s.icon size={24} />
            </div>
            <div>
              <p className="text-sm text-slate-500 font-semibold">{s.label}</p>
              <p className="text-2xl font-bold text-[#0a1c3a]">{s.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 no-print">
        {/* Ostatnie Wiadomości */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-[#0a1c3a]">Ostatnie wiadomości</h3>
            <button onClick={() => setActiveTab('messages')} className="text-[#c31b1b] text-sm font-bold hover:underline">Zobacz wszystkie</button>
          </div>
          <div className="divide-y divide-slate-50">
            {messages.slice(0, 3).map(m => (
              <div key={m.id} className={`p-4 hover:bg-slate-50 transition-colors ${!m.isRead ? 'bg-blue-50/30' : ''}`}>
                <div className="flex justify-between items-start mb-1">
                  <span className="font-bold text-[#0a1c3a] flex items-center gap-2">
                    {!m.isRead && <span className="w-2 h-2 rounded-full bg-[#c31b1b]"></span>}
                    {m.name}
                  </span>
                  <span className="text-xs text-slate-400">{m.date.split(' ')[0]}</span>
                </div>
                <p className="text-sm text-slate-600 line-clamp-2">{m.message}</p>
              </div>
            ))}
            {messages.length === 0 && <p className="p-6 text-center text-slate-400">Brak nowych wiadomości</p>}
          </div>
        </div>

        {/* Szybkie akcje */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
            <h3 className="font-bold text-[#0a1c3a]">Szybkie akcje</h3>
          </div>
          <div className="p-6 grid grid-cols-2 gap-4">
            <button onClick={() => setActiveTab('menu')} className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 border-dashed border-slate-200 hover:border-[#c31b1b] hover:bg-red-50 text-slate-600 hover:text-[#c31b1b] transition-all">
              <Utensils size={32} />
              <span className="font-bold text-sm">Edytuj Menu</span>
            </button>
            <button onClick={() => setActiveTab('blog')} className="flex flex-col items-center justify-center gap-3 p-6 rounded-2xl border-2 border-dashed border-slate-200 hover:border-[#0a1c3a] hover:bg-blue-50 text-slate-600 hover:text-[#0a1c3a] transition-all">
              <FileText size={32} />
              <span className="font-bold text-sm">Nowy Wpis</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

function MessagesTab({ messages, setMessages }) {
  const markAsRead = (id) => {
    setMessages(msgs => msgs.map(m => m.id === id ? { ...m, isRead: true } : m));
  };
  const deleteMessage = (id) => {
    if (confirm("Na pewno usunąć tę wiadomość?")) {
      setMessages(msgs => msgs.filter(m => m.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in no-print">
      <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-['Playfair_Display'] font-bold text-[#0a1c3a]">Wiadomości</h2>
          <p className="text-slate-500 mt-1">Zgłoszenia z formularza kontaktowego.</p>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-100 overflow-hidden">
        {messages.length === 0 ? (
           <div className="p-12 text-center text-slate-400 flex flex-col items-center">
             <MessageSquare size={48} className="mb-4 opacity-20" />
             <p>Skrzynka jest pusta.</p>
           </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {messages.map(m => (
              <div key={m.id} className={`p-4 md:p-6 transition-colors ${!m.isRead ? 'bg-blue-50/40' : 'hover:bg-slate-50'}`}>
                <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="text-lg font-bold text-[#0a1c3a] flex items-center gap-2">
                        {!m.isRead && <span className="w-2.5 h-2.5 rounded-full bg-[#c31b1b]"></span>}
                        {m.name}
                      </h3>
                      <span className="text-xs font-semibold text-slate-400 bg-slate-100 px-2 py-1 rounded-md">{m.date}</span>
                    </div>
                    <div className="flex flex-wrap gap-x-4 gap-y-1 mb-3 text-sm text-slate-500 font-medium">
                      {m.email && <p>📧 {m.email}</p>}
                      {m.phone && <p>📞 {m.phone}</p>}
                    </div>
                    <p className="text-slate-700 bg-white border border-slate-100 p-4 rounded-xl leading-relaxed whitespace-pre-wrap">{m.message}</p>
                  </div>
                  <div className="flex gap-2 justify-end">
                    {!m.isRead && (
                      <button onClick={() => markAsRead(m.id)} className="btn-secondary text-sm px-3 py-1.5 h-auto">Oznacz jako przeczytane</button>
                    )}
                    <button onClick={() => deleteMessage(m.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
                      <Trash2 size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function EditorTab({ content, setContent, gallery, setGallery }) {
  const [newGalleryUrl, setNewGalleryUrl] = useState('');

  const homepageAboutFields = [
    { path: 'index.about.title', label: 'Tytuł sekcji "O nas" (strona główna)' },
    { path: 'index.about.lead1', label: 'Opis 1 sekcji "O nas"' },
    { path: 'index.about.lead2', label: 'Opis 2 sekcji "O nas"' },
    { path: 'index.about.buttonLabel', label: 'Etykieta przycisku "O nas"' },
    { path: 'index.about.buttonHref', label: 'Link przycisku "O nas"' },
  ];

  const aboutPageFields = [
    { path: 'about.intro.eyebrow', label: 'O nas -> Intro -> Eyebrow' },
    { path: 'about.intro.title', label: 'O nas -> Intro -> Tytuł' },
    { path: 'about.intro.lead1', label: 'O nas -> Intro -> Opis 1' },
    { path: 'about.intro.lead2', label: 'O nas -> Intro -> Opis 2' },
    { path: 'about.intro.primaryCtaLabel', label: 'O nas -> Intro -> CTA główne (tekst)' },
    { path: 'about.intro.primaryCtaHref', label: 'O nas -> Intro -> CTA główne (link)' },
    { path: 'about.intro.secondaryCtaLabel', label: 'O nas -> Intro -> CTA pomocnicze (tekst)' },
    { path: 'about.intro.secondaryCtaHref', label: 'O nas -> Intro -> CTA pomocnicze (link)' },
    { path: 'about.story.title', label: 'O nas -> Sekcja "Jak wygląda wizyta" -> Tytuł' },
    { path: 'about.story.card1.title', label: 'Karta 1 -> Tytuł' },
    { path: 'about.story.card1.text', label: 'Karta 1 -> Treść' },
    { path: 'about.story.card2.title', label: 'Karta 2 -> Tytuł' },
    { path: 'about.story.card2.text', label: 'Karta 2 -> Treść' },
    { path: 'about.story.card3.title', label: 'Karta 3 -> Tytuł' },
    { path: 'about.story.card3.text', label: 'Karta 3 -> Treść' },
    { path: 'about.facts.title', label: 'Sekcja "Co warto wiedzieć" -> Tytuł' },
    { path: 'about.facts.item1', label: 'Sekcja "Co warto wiedzieć" -> Punkt 1' },
    { path: 'about.facts.item2', label: 'Sekcja "Co warto wiedzieć" -> Punkt 2' },
    { path: 'about.facts.item3', label: 'Sekcja "Co warto wiedzieć" -> Punkt 3' },
    { path: 'about.facts.item4', label: 'Sekcja "Co warto wiedzieć" -> Punkt 4' },
    { path: 'about.faq.title', label: 'FAQ -> Tytuł' },
    { path: 'about.faq.q1', label: 'FAQ -> Pytanie 1' },
    { path: 'about.faq.a1', label: 'FAQ -> Odpowiedź 1' },
    { path: 'about.faq.q2', label: 'FAQ -> Pytanie 2' },
    { path: 'about.faq.a2', label: 'FAQ -> Odpowiedź 2' },
    { path: 'about.faq.q3', label: 'FAQ -> Pytanie 3' },
    { path: 'about.faq.a3', label: 'FAQ -> Odpowiedź 3' },
    { path: 'about.cta.title', label: 'Końcowe CTA -> Tytuł' },
    { path: 'about.cta.description', label: 'Końcowe CTA -> Opis' },
    { path: 'about.cta.buttonLabel', label: 'Końcowe CTA -> Przycisk (tekst)' },
    { path: 'about.cta.buttonHref', label: 'Końcowe CTA -> Przycisk (link)' },
  ];

  const sliderFields = [
    { srcPath: 'index.aboutSlider.slide1.src', altPath: 'index.aboutSlider.slide1.alt', label: 'Slider "O nas" - zdjęcie 1' },
    { srcPath: 'index.aboutSlider.slide2.src', altPath: 'index.aboutSlider.slide2.alt', label: 'Slider "O nas" - zdjęcie 2' },
    { srcPath: 'index.aboutSlider.slide3.src', altPath: 'index.aboutSlider.slide3.alt', label: 'Slider "O nas" - zdjęcie 3' },
  ];

  const updateField = (path, value) => {
    setContent((prev) => {
      const next = JSON.parse(JSON.stringify(prev || {}));
      setByPath(next, path, value);
      return next;
    });
  };

  const moveGalleryItem = (index, direction) => {
    setGallery((prev) => {
      const target = index + direction;
      if (target < 0 || target >= prev.length) return prev;
      const next = [...prev];
      [next[index], next[target]] = [next[target], next[index]];
      return next;
    });
  };

  const addGalleryImage = (event) => {
    event.preventDefault();
    const safeUrl = newGalleryUrl.trim();
    if (!safeUrl) return;
    setGallery((prev) => [safeUrl, ...prev]);
    setNewGalleryUrl('');
  };

  const removeGalleryItem = (index) => {
    setGallery((prev) => prev.filter((_, itemIndex) => itemIndex !== index));
  };

  return (
    <div className="space-y-8 animate-in fade-in no-print">
      <div>
        <h2 className="text-3xl font-['Playfair_Display'] font-bold text-[#0a1c3a]">Edytor sekcji</h2>
        <p className="text-slate-500 mt-1">Tutaj właściciel może edytować treści i zdjęcia dla strony głównej oraz podstrony O nas.</p>
      </div>

      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-5">
        <h3 className="text-2xl font-['Playfair_Display'] font-bold text-[#0a1c3a]">Strona główna → O nas</h3>
        <div className="grid grid-cols-1 gap-4">
          {homepageAboutFields.map((field) => (
            <label key={field.path} className="form-label">
              {field.label}
              <textarea
                rows={field.path.includes('Href') ? 2 : 3}
                className="form-input mt-2"
                value={String(getByPath(content, field.path) || '')}
                onChange={(event) => updateField(field.path, event.target.value)}
              />
            </label>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-5">
        <h3 className="text-2xl font-['Playfair_Display'] font-bold text-[#0a1c3a]">Strona główna → Slider w sekcji O nas</h3>
        <div className="grid grid-cols-1 gap-5">
          {sliderFields.map((field) => (
            <div key={field.srcPath} className="border border-slate-200 rounded-xl p-4 space-y-3">
              <p className="font-bold text-[#0a1c3a]">{field.label}</p>
              <label className="form-label">
                URL zdjęcia
                <input
                  type="url"
                  className="form-input mt-2"
                  value={String(getByPath(content, field.srcPath) || '')}
                  onChange={(event) => updateField(field.srcPath, event.target.value)}
                />
              </label>
              <label className="form-label">
                Opis ALT
                <input
                  type="text"
                  className="form-input mt-2"
                  value={String(getByPath(content, field.altPath) || '')}
                  onChange={(event) => updateField(field.altPath, event.target.value)}
                />
              </label>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-5">
        <h3 className="text-2xl font-['Playfair_Display'] font-bold text-[#0a1c3a]">Strona główna → Galeria</h3>
        <form onSubmit={addGalleryImage} className="flex flex-col md:flex-row gap-3">
          <input
            type="url"
            value={newGalleryUrl}
            onChange={(event) => setNewGalleryUrl(event.target.value)}
            placeholder="Wklej URL nowego zdjęcia..."
            className="form-input flex-1"
          />
          <button type="submit" className="btn-primary whitespace-nowrap">Dodaj zdjęcie</button>
        </form>
        <div className="grid grid-cols-1 gap-3">
          {gallery.map((url, index) => (
            <div key={`${url}-${index}`} className="border border-slate-200 rounded-xl p-3 flex flex-col md:flex-row md:items-center gap-3">
              <input
                type="url"
                value={url}
                onChange={(event) => {
                  const value = event.target.value;
                  setGallery((prev) => prev.map((item, itemIndex) => (itemIndex === index ? value : item)));
                }}
                className="form-input flex-1"
              />
              <div className="flex gap-2">
                <button type="button" className="btn-secondary" onClick={() => moveGalleryItem(index, -1)}>Wyżej</button>
                <button type="button" className="btn-secondary" onClick={() => moveGalleryItem(index, 1)}>Niżej</button>
                <button type="button" className="btn-secondary" onClick={() => removeGalleryItem(index)}>Usuń</button>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-5">
        <h3 className="text-2xl font-['Playfair_Display'] font-bold text-[#0a1c3a]">Podstrona O nas → Zdjęcie główne</h3>
        <label className="form-label">
          URL zdjęcia głównego
          <input
            type="url"
            className="form-input mt-2"
            value={String(getByPath(content, 'about.media.heroImageSrc') || '')}
            onChange={(event) => updateField('about.media.heroImageSrc', event.target.value)}
          />
        </label>
        <label className="form-label">
          Opis ALT zdjęcia głównego
          <input
            type="text"
            className="form-input mt-2"
            value={String(getByPath(content, 'about.media.heroImageAlt') || '')}
            onChange={(event) => updateField('about.media.heroImageAlt', event.target.value)}
          />
        </label>
      </section>

      <section className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-5">
        <h3 className="text-2xl font-['Playfair_Display'] font-bold text-[#0a1c3a]">Podstrona O nas → Treści</h3>
        <div className="grid grid-cols-1 gap-4">
          {aboutPageFields.map((field) => (
            <label key={field.path} className="form-label">
              {field.label}
              <textarea
                rows={field.path.includes('Href') ? 2 : 3}
                className="form-input mt-2"
                value={String(getByPath(content, field.path) || '')}
                onChange={(event) => updateField(field.path, event.target.value)}
              />
            </label>
          ))}
        </div>
      </section>
    </div>
  );
}

function MenuTab({ menu, setMenu, phone }) {
  const [editingCategory, setEditingCategory] = useState(null);
  const [editingItem, setEditingItem] = useState(null);
  const [showPrintPreview, setShowPrintPreview] = useState(false);

  const moveCategory = (categoryId, direction) => {
    setMenu((prevMenu) => {
      const index = prevMenu.findIndex((cat) => cat.id === categoryId);
      if (index < 0) return prevMenu;
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= prevMenu.length) return prevMenu;
      const nextMenu = [...prevMenu];
      [nextMenu[index], nextMenu[targetIndex]] = [nextMenu[targetIndex], nextMenu[index]];
      return nextMenu;
    });
  };

  const moveItem = (categoryId, itemId, direction) => {
    setMenu((prevMenu) => prevMenu.map((cat) => {
      if (cat.id !== categoryId) return cat;
      const index = cat.items.findIndex((item) => item.id === itemId);
      if (index < 0) return cat;
      const targetIndex = index + direction;
      if (targetIndex < 0 || targetIndex >= cat.items.length) return cat;
      const nextItems = [...cat.items];
      [nextItems[index], nextItems[targetIndex]] = [nextItems[targetIndex], nextItems[index]];
      return { ...cat, items: nextItems };
    }));
  };

  const saveCategory = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const id = editingCategory.id || `cat-${Date.now()}`;
    const newCat = {
      id,
      name: fd.get('name'),
      icon: fd.get('icon'),
      items: editingCategory.items || []
    };
    
    if (editingCategory.id) {
      setMenu(m => m.map(cat => cat.id === id ? newCat : cat));
    } else {
      setMenu(m => [...m, newCat]);
    }
    setEditingCategory(null);
  };

  const deleteCategory = (id) => {
    if (confirm('Usunąć tę kategorię wraz ze wszystkimi pozycjami?')) {
      setMenu(m => m.filter(c => c.id !== id));
    }
  };

  const saveItem = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const title = String(fd.get('name') || '').trim();
    const subtitle = String(fd.get('subtitle') || '').trim();
    const newItem = {
      id: editingItem.item?.id || `item-${Date.now()}`,
      name: title,
      subtitle,
      price: fd.get('price')
    };

    setMenu(m => m.map(cat => {
      if (cat.id === editingItem.categoryId) {
        let newItems = [...cat.items];
        if (editingItem.item?.id) {
          newItems = newItems.map(i => i.id === newItem.id ? newItem : i);
        } else {
          newItems.push(newItem);
        }
        return { ...cat, items: newItems };
      }
      return cat;
    }));
    setEditingItem(null);
  };

  const deleteItem = (categoryId, itemId) => {
    if (confirm('Usunąć tę pozycję?')) {
      setMenu(m => m.map(cat => cat.id === categoryId ? { ...cat, items: cat.items.filter(i => i.id !== itemId) } : cat));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in">
      <div className="flex flex-col md:flex-row md:justify-between md:items-end gap-4 no-print">
        <div>
          <h2 className="text-3xl font-['Playfair_Display'] font-bold text-[#0a1c3a]">Menu Restauracji</h2>
          <p className="text-slate-500 mt-1">Zarządzaj ofertą, dodawaj nowe sezony lub wydrukuj gotową kartę.</p>
        </div>
        <div className="flex gap-2">
          <button onClick={() => setShowPrintPreview(true)} className="btn-secondary whitespace-nowrap">
            <Printer size={18} /> Podgląd wydruku
          </button>
          <button onClick={() => setEditingCategory({ name: '', icon: '🍽️', items: [] })} className="btn-primary whitespace-nowrap">
            <Plus size={18} /> Dodaj kategorię
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 no-print">
        {menu.map((cat) => (
          <div key={cat.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col">
            {(() => {
              const categoryIndex = menu.findIndex((m) => m.id === cat.id);
              const isFirstCategory = categoryIndex <= 0;
              const isLastCategory = categoryIndex === menu.length - 1;
              return (
            <div className="px-5 py-4 bg-slate-50 border-b border-slate-200 flex justify-between items-center">
              <h3 className="font-bold text-[#0a1c3a] text-lg flex items-center gap-2">
                <span>{cat.icon}</span> {cat.name}
              </h3>
              <div className="flex gap-1 items-center">
                <button
                  onClick={() => moveCategory(cat.id, -1)}
                  disabled={isFirstCategory}
                  className="p-1.5 text-slate-400 hover:text-[#0a1c3a] hover:bg-slate-200 rounded-md transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                  title="Przesuń kategorię wyżej"
                >
                  <ArrowUp size={16} />
                </button>
                <button
                  onClick={() => moveCategory(cat.id, 1)}
                  disabled={isLastCategory}
                  className="p-1.5 text-slate-400 hover:text-[#0a1c3a] hover:bg-slate-200 rounded-md transition-colors disabled:opacity-30 disabled:hover:bg-transparent"
                  title="Przesuń kategorię niżej"
                >
                  <ArrowDown size={16} />
                </button>
                <button onClick={() => setEditingCategory(cat)} className="p-1.5 text-slate-400 hover:text-[#0a1c3a] hover:bg-slate-200 rounded-md transition-colors"><Edit2 size={16} /></button>
                <button onClick={() => deleteCategory(cat.id)} className="p-1.5 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-md transition-colors"><Trash2 size={16} /></button>
              </div>
            </div>
              );
            })()}
            <div className="p-2 flex-1">
              <ul className="divide-y divide-slate-100">
                {cat.items.map((item, itemIndex) => {
                  const itemParts = getItemDisplayParts(item);
                  return (
                    <li key={item.id} className="flex justify-between items-center py-3 px-3 hover:bg-slate-50 rounded-lg group">
                      <div className="pr-4">
                        <span className="text-slate-800 text-sm font-medium block">{itemParts.title}</span>
                        {itemParts.subtitle && (
                          <span className="text-[12px] text-slate-500 leading-tight block mt-0.5">{itemParts.subtitle}</span>
                        )}
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                        <span className="font-bold text-[#0a1c3a] whitespace-nowrap">{item.price}</span>
                        <div className="flex gap-1 opacity-100 md:opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => moveItem(cat.id, item.id, -1)}
                            disabled={itemIndex === 0}
                            className="p-1.5 text-slate-400 hover:text-[#0a1c3a] bg-white shadow-sm border border-slate-100 rounded-md disabled:opacity-30 disabled:hover:text-slate-400"
                            title="Przesuń pozycję wyżej"
                          >
                            <ArrowUp size={14} />
                          </button>
                          <button
                            onClick={() => moveItem(cat.id, item.id, 1)}
                            disabled={itemIndex === cat.items.length - 1}
                            className="p-1.5 text-slate-400 hover:text-[#0a1c3a] bg-white shadow-sm border border-slate-100 rounded-md disabled:opacity-30 disabled:hover:text-slate-400"
                            title="Przesuń pozycję niżej"
                          >
                            <ArrowDown size={14} />
                          </button>
                          <button onClick={() => setEditingItem({ categoryId: cat.id, item })} className="p-1.5 text-slate-400 hover:text-[#0a1c3a] bg-white shadow-sm border border-slate-100 rounded-md"><Edit2 size={14} /></button>
                          <button onClick={() => deleteItem(cat.id, item.id)} className="p-1.5 text-slate-400 hover:text-red-600 bg-white shadow-sm border border-slate-100 rounded-md"><Trash2 size={14} /></button>
                        </div>
                      </div>
                    </li>
                  );
                })}
              </ul>
              {cat.items.length === 0 && <p className="text-center text-sm text-slate-400 py-4">Brak pozycji w tej kategorii.</p>}
            </div>
            <div className="p-3 border-t border-slate-50 bg-white mt-auto">
              <button onClick={() => setEditingItem({ categoryId: cat.id, item: null })} className="w-full py-2.5 border-2 border-dashed border-slate-200 rounded-xl text-sm font-bold text-slate-500 hover:border-[#c31b1b] hover:text-[#c31b1b] hover:bg-red-50 transition-all flex items-center justify-center gap-2">
                <Plus size={16} /> Dodaj pozycję
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal - Kategoria */}
      {editingCategory && (
        <Modal title={editingCategory.id ? "Edytuj kategorię" : "Nowa kategoria"} onClose={() => setEditingCategory(null)}>
          <form onSubmit={saveCategory} className="space-y-4">
            <div>
              <label className="form-label">Nazwa kategorii</label>
              <input name="name" defaultValue={editingCategory.name} required className="form-input" placeholder="np. Zupy, Pizza, Napoje" />
            </div>
            <div>
              <label className="form-label">Ikona (Emoji)</label>
              <input name="icon" defaultValue={editingCategory.icon} required className="form-input" placeholder="np. 🍕" />
            </div>
            <div className="pt-4 flex gap-3">
              <button type="submit" className="btn-primary flex-1">Zapisz</button>
              <button type="button" onClick={() => setEditingCategory(null)} className="btn-secondary flex-1">Anuluj</button>
            </div>
          </form>
        </Modal>
      )}

      {/* Modal - Pozycja */}
      {editingItem && (
        <Modal title={editingItem.item ? "Edytuj pozycję" : "Nowa pozycja"} onClose={() => setEditingItem(null)}>
          <form onSubmit={saveItem} className="space-y-4">
            <div>
              <label className="form-label">Nazwa dania/napoju</label>
              <input
                name="name"
                defaultValue={editingItem.item ? getItemDisplayParts(editingItem.item).title : ''}
                required
                className="form-input"
                placeholder="np. Margherita"
              />
            </div>
            <div>
              <label className="form-label">Podnazwa / dodatki (mniejsza czcionka)</label>
              <textarea
                name="subtitle"
                defaultValue={editingItem.item ? getItemDisplayParts(editingItem.item).subtitle : ''}
                rows="2"
                className="form-input resize-none"
                placeholder="np. sos pomidorowy / mozzarella / bazylia"
              />
            </div>
            <div>
              <label className="form-label">Cena</label>
              <input name="price" defaultValue={editingItem.item?.price} required className="form-input" placeholder="np. 32 zł" />
            </div>
            <div className="pt-4 flex gap-3">
              <button type="submit" className="btn-primary flex-1">Zapisz</button>
              <button type="button" onClick={() => setEditingItem(null)} className="btn-secondary flex-1">Anuluj</button>
            </div>
          </form>
        </Modal>
      )}

      {/* Modal - Podgląd Wydruku Menu (Print View) */}
      {showPrintPreview && (
        <PrintPreview menu={menu} phone={phone} onClose={() => setShowPrintPreview(false)} />
      )}
    </div>
  );
}

// Podkomponent: Podgląd wydruku dla menu
function PrintPreview({ menu, phone, onClose }) {
  const [fontScale, setFontScale] = useState(100);
  const [orientation, setOrientation] = useState('landscape');
  const [viewport, setViewport] = useState({
    width: typeof window !== 'undefined' ? window.innerWidth : 1280,
    height: typeof window !== 'undefined' ? window.innerHeight : 800,
  });

  useEffect(() => {
    if (typeof window === 'undefined') return undefined;
    const onResize = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };
    window.addEventListener('resize', onResize);
    return () => window.removeEventListener('resize', onResize);
  }, []);

  const handlePrint = () => {
    const pageStyle = document.createElement('style');
    pageStyle.id = 'cms-print-page-style';
    pageStyle.textContent = `
      @media print {
        @page {
          size: A4 ${orientation};
          margin: 0;
        }
      }
    `;
    document.head.appendChild(pageStyle);

    const cleanup = () => {
      pageStyle.remove();
      window.removeEventListener('afterprint', cleanup);
    };

    window.addEventListener('afterprint', cleanup);
    window.print();
    window.setTimeout(cleanup, 1000);
  };

  const headingSize = `${Math.round(42 * (fontScale / 100))}px`;
  const categorySize = `${Math.round(19 * (fontScale / 100))}px`;
  const itemNameSize = `${Math.round(13 * (fontScale / 100))}px`;
  const itemPriceSize = `${Math.round(14 * (fontScale / 100))}px`;
  const ingredientsSize = `${Math.round(11 * (fontScale / 100))}px`;
  const footerSize = `${Math.round(12 * (fontScale / 100))}px`;

  const isLandscape = orientation === 'landscape';
  const pageWidthMm = isLandscape ? 297 : 210;
  const pageHeightMm = isLandscape ? 210 : 297;
  const pageWidth = `${pageWidthMm}mm`;
  const pageMinHeight = `${pageHeightMm}mm`;
  const pagePadding = isLandscape ? '8mm 9mm' : '11mm 13mm';
  const columnsClass = isLandscape ? 'columns-3' : 'columns-1 md:columns-2';

  const MM_TO_PX = 3.7795275591;
  const actionBarReservePx = viewport.width < 640 ? 230 : 180;
  const availableWidthPx = Math.max(280, viewport.width - 24);
  const availableHeightPx = Math.max(280, viewport.height - actionBarReservePx);
  const pageWidthPx = pageWidthMm * MM_TO_PX;
  const pageHeightPx = pageHeightMm * MM_TO_PX;
  const previewScale = Math.min(1, availableWidthPx / pageWidthPx, availableHeightPx / pageHeightPx);
  const previewStageHeight = Math.max(260, pageHeightPx * previewScale + 16);

  return (
    <div className="fixed inset-0 z-[100] bg-slate-500 overflow-y-auto print:bg-white print:overflow-visible">
      {/* Action Bar (ukryty podczas drukowania) */}
      <div className="no-print sticky top-0 left-0 w-full bg-white border-b border-slate-200 p-4 flex flex-col sm:flex-row justify-between items-center shadow-md z-10 gap-4">
        <div>
          <h2 className="font-bold text-lg text-[#0a1c3a]">Podgląd karty do druku</h2>
          <p className="text-sm text-slate-500 hidden sm:block">Ustaw orientację i czcionkę, a następnie drukuj jako PDF. Domyślnie: układ poziomy.</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto sm:items-end">
          <label className="flex flex-col gap-1 text-sm text-slate-600 font-semibold">
            Układ strony
            <select value={orientation} onChange={(e) => setOrientation(e.target.value)} className="form-input min-w-[170px] py-2">
              <option value="landscape">Poziomy (domyślny)</option>
              <option value="portrait">Pionowy</option>
            </select>
          </label>
          <label className="flex flex-col gap-1 text-sm text-slate-600 font-semibold min-w-[180px]">
            Rozmiar czcionki: {fontScale}%
            <input type="range" min="85" max="125" step="5" value={fontScale} onChange={(e) => setFontScale(Number(e.target.value))} />
          </label>
          <button onClick={handlePrint} className="btn-primary flex-1 sm:flex-none"><Printer size={18}/> Drukuj / Zapisz jako PDF</button>
          <button onClick={onClose} className="btn-secondary flex-1 sm:flex-none">Zamknij</button>
        </div>
      </div>

      {/* Obszar drukowany - Elegancki układ A4 */}
      <div className="preview-stage mx-auto my-3 px-3 flex justify-center print:m-0 print:px-0" style={{ minHeight: `${previewStageHeight}px` }}>
      <div 
        className="print-area bg-white shadow-2xl print:shadow-none print:m-0 text-[#0a1c3a] font-['Lato'] relative flex flex-col" 
        style={{
          width: pageWidth,
          minHeight: pageMinHeight,
          padding: pagePadding,
          transform: `scale(${previewScale})`,
          transformOrigin: 'top center',
        }}
      >
        {/* Dekoracyjne obramowanie karty */}
        <div className="absolute inset-0 m-[4mm] border border-[#0a1c3a]/20 pointer-events-none rounded-sm"></div>
        <div className="absolute inset-0 m-[5.5mm] border border-[#0a1c3a]/10 pointer-events-none rounded-sm"></div>

        {isLandscape ? (
          <div className="relative z-10 flex flex-1 gap-4">
            <section className="flex-1 min-w-0 pr-4 border-r border-[#0a1c3a]/35">
              <div className={`${columnsClass} gap-5`}>
                {menu.map((cat) => (
                  <div key={cat.id} className="break-inside-avoid mb-4">
                    <h2 className="font-['Playfair_Display'] font-bold text-[#0a1c3a] border-b border-[#0a1c3a]/35 mb-2 pb-1 uppercase tracking-[0.08em]" style={{ fontSize: categorySize }}>
                      {cat.name}
                    </h2>
                    <div className="space-y-2">
                      {cat.items.map((item) => {
                        const displayItem = getItemDisplayParts(item);
                        const formattedName = displayItem.title;
                        const priceNum = item.price.replace(/zł/i, '').trim();
                        const mainName = formattedName;
                        const ingredients = displayItem.subtitle;

                        return (
                          <div key={item.id} className="flex flex-col leading-tight">
                            <div className="flex items-baseline w-full">
                              <span className="font-extrabold uppercase" style={{ fontSize: itemNameSize, fontWeight: 800 }}>{mainName}</span>
                              <div className="flex-grow border-b border-dotted border-slate-300 mx-2 relative -top-[1px] opacity-70"></div>
                              <span className="font-extrabold whitespace-nowrap" style={{ fontSize: itemPriceSize, fontWeight: 800 }}>{priceNum}<span className="font-medium ml-0.5">zł</span></span>
                            </div>
                            {ingredients && (
                              <span className="text-slate-600 mt-0.5 pr-3" style={{ fontSize: ingredientsSize }}>
                                {ingredients}
                              </span>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <aside className="w-[48mm] flex flex-col justify-between items-center py-2">
              <img src="./logo.png" alt="Ręczna Robota Wodnik" className="h-20 object-contain" />
              <div className="text-center">
                <h1 className="font-['Playfair_Display'] font-black tracking-[0.24em] text-[#0a1c3a] uppercase leading-[1.22]" style={{ fontSize: headingSize }}>
                  M<br/>E<br/>N<br/>U
                </h1>
              </div>
              <p className="font-bold tracking-[0.06em] uppercase text-[#0a1c3a]" style={{ fontSize: footerSize }}>
                Tel: {phone.replace('+48 ', '').replace(/\s/g, ' ')}
              </p>
            </aside>
          </div>
        ) : (
          <>
            <div className="flex items-center justify-center gap-4 mb-4 pt-1 border-b border-[#0a1c3a]/20 pb-3 relative z-10">
              <img src="./logo.png" alt="Ręczna Robota Wodnik" className="h-16 object-contain" />
              <h1 className="font-['Playfair_Display'] font-bold tracking-[0.18em] text-[#0a1c3a] uppercase leading-none" style={{ fontSize: headingSize }}>MENU</h1>
            </div>

            <div className={`${columnsClass} gap-5 flex-1 relative z-10`}>
              {menu.map((cat) => (
                <div key={cat.id} className="break-inside-avoid mb-4">
                  <h2 className="font-['Playfair_Display'] font-bold text-[#0a1c3a] border-b border-[#0a1c3a]/35 mb-2 pb-1 uppercase tracking-[0.08em]" style={{ fontSize: categorySize }}>
                    {cat.name}
                  </h2>
                  <div className="space-y-2">
                    {cat.items.map((item) => {
                      const displayItem = getItemDisplayParts(item);
                      const formattedName = displayItem.title;
                      const priceNum = item.price.replace(/zł/i, '').trim();
                      const mainName = formattedName;
                      const ingredients = displayItem.subtitle;

                      return (
                        <div key={item.id} className="flex flex-col leading-tight">
                          <div className="flex items-baseline w-full">
                            <span className="font-extrabold uppercase" style={{ fontSize: itemNameSize, fontWeight: 800 }}>{mainName}</span>
                            <div className="flex-grow border-b border-dotted border-slate-300 mx-2 relative -top-[1px] opacity-70"></div>
                            <span className="font-extrabold whitespace-nowrap" style={{ fontSize: itemPriceSize, fontWeight: 800 }}>{priceNum}<span className="font-medium ml-0.5">zł</span></span>
                          </div>
                          {ingredients && (
                            <span className="text-slate-600 mt-0.5 pr-3" style={{ fontSize: ingredientsSize }}>
                              {ingredients}
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-3 pt-2 border-t border-[#0a1c3a]/20 text-center relative z-10">
              <p className="font-bold tracking-widest uppercase text-[#0a1c3a]" style={{ fontSize: footerSize }}>
                 Port Wodnik <span className="mx-2 text-[#c31b1b]">•</span> Rezerwacje: {phone.replace('+48 ', '').replace(/\s/g, ' ')}
              </p>
            </div>
          </>
        )}
      </div>
      </div>
    </div>
  );
}


function BlogTab({ blog, setBlog }) {
  const [editingPost, setEditingPost] = useState(null);

  const savePost = (e) => {
    e.preventDefault();
    const fd = new FormData(e.target);
    const newPost = {
      id: editingPost.id || `blog-${Date.now()}`,
      title: fd.get('title'),
      summary: fd.get('summary'),
      status: fd.get('status'),
      date: fd.get('date'),
      image: fd.get('image') || "https://images.unsplash.com/photo-1520072959219-c595dc870360?auto=format&fit=crop&w=600&q=80"
    };

    if (editingPost.id) {
      setBlog(b => b.map(p => p.id === newPost.id ? newPost : p));
    } else {
      setBlog(b => [newPost, ...b]);
    }
    setEditingPost(null);
  };

  const deletePost = (id) => {
    if (confirm('Usunąć ten wpis?')) {
      setBlog(b => b.filter(p => p.id !== id));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in no-print">
       <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-['Playfair_Display'] font-bold text-[#0a1c3a]">Wpisy i Aktualności</h2>
          <p className="text-slate-500 mt-1">Zarządzaj blogiem i aktualnościami na stronie głównej.</p>
        </div>
        <button onClick={() => setEditingPost({})} className="btn-primary">
          <Plus size={18} /> Nowy wpis
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {blog.map(post => (
          <div key={post.id} className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden flex flex-col group">
            <div className="h-40 relative overflow-hidden bg-slate-100">
               <img src={post.image} alt="" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
               <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md text-[10px] font-bold text-[#c31b1b] uppercase tracking-wider">
                 {post.status}
               </div>
            </div>
            <div className="p-5 flex-1 flex flex-col">
              <span className="text-xs text-slate-400 font-semibold mb-1">{post.date}</span>
              <h3 className="font-bold text-[#0a1c3a] text-lg leading-tight mb-2 line-clamp-2">{post.title}</h3>
              <p className="text-sm text-slate-600 line-clamp-3 mb-4">{post.summary}</p>
              <div className="mt-auto pt-4 border-t border-slate-100 flex gap-2">
                 <button onClick={() => setEditingPost(post)} className="btn-secondary flex-1 text-xs py-2">Edytuj</button>
                 <button onClick={() => deletePost(post.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-xl transition-colors"><Trash2 size={18} /></button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {editingPost && (
        <Modal title={editingPost.id ? "Edytuj wpis" : "Nowy wpis"} onClose={() => setEditingPost(null)}>
          <form onSubmit={savePost} className="space-y-4">
            <div>
              <label className="form-label">Tytuł wpisu</label>
              <input name="title" defaultValue={editingPost.title} required className="form-input" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="form-label">Data</label>
                <input name="date" defaultValue={editingPost.date || new Date().toLocaleDateString('pl-PL', {day: 'numeric', month: 'long', year: 'numeric'})} required className="form-input" />
              </div>
              <div>
                <label className="form-label">Kategoria / Status</label>
                <select name="status" defaultValue={editingPost.status || 'Aktualności'} className="form-input">
                  <option>Aktualności</option>
                  <option>Wydarzenia</option>
                  <option>Kuchnia</option>
                  <option>Przewodnik</option>
                </select>
              </div>
            </div>
            <div>
              <label className="form-label">Zajawka (krótki opis na stronę główną)</label>
              <textarea name="summary" defaultValue={editingPost.summary} required rows="3" className="form-input resize-none" />
            </div>
            <div>
              <label className="form-label">URL zdjęcia okładkowego</label>
              <input name="image" defaultValue={editingPost.image} type="url" placeholder="https://..." className="form-input text-sm" />
              <p className="text-xs text-slate-400 mt-1">Dla bezpieczeństwa w wersji demo obsługujemy zdjęcia przez link URL (np. z Unsplash).</p>
            </div>
            <div className="pt-4 flex gap-3">
              <button type="submit" className="btn-primary flex-1"><Save size={18} /> Zapisz wpis</button>
            </div>
          </form>
        </Modal>
      )}
    </div>
  );
}

function GalleryTab({ gallery, setGallery }) {
  const [uploadUrl, setUploadUrl] = useState('');

  const addImage = (e) => {
    e.preventDefault();
    if(uploadUrl) {
      setGallery(g => [uploadUrl, ...g]);
      setUploadUrl('');
    }
  };

  const removeImage = (index) => {
    if(confirm('Na pewno usunąć to zdjęcie z galerii?')) {
      setGallery(g => g.filter((_, i) => i !== index));
    }
  };

  return (
    <div className="space-y-6 animate-in fade-in no-print">
       <div className="flex justify-between items-end">
        <div>
          <h2 className="text-3xl font-['Playfair_Display'] font-bold text-[#0a1c3a]">Galeria</h2>
          <p className="text-slate-500 mt-1">Zarządzaj zdjęciami widocznymi w sekcji galeria na stronie.</p>
        </div>
      </div>

      <div className="bg-white p-5 rounded-2xl shadow-sm border border-slate-200">
         <form onSubmit={addImage} className="flex gap-3 items-end">
           <div className="flex-1">
             <label className="form-label">Dodaj nowe zdjęcie (Adres URL)</label>
             <input type="url" value={uploadUrl} onChange={e => setUploadUrl(e.target.value)} placeholder="Wklej link do zdjęcia..." required className="form-input" />
           </div>
           <button type="submit" className="btn-primary whitespace-nowrap"><Upload size={18} /> Dodaj zdjęcie</button>
         </form>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {gallery.map((url, i) => (
          <div key={i} className="relative aspect-square rounded-xl overflow-hidden group border border-slate-200">
            <img src={url} alt="" className="w-full h-full object-cover" />
            <div className="absolute inset-0 bg-slate-900/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
               <button onClick={() => removeImage(i)} className="bg-white text-red-600 p-3 rounded-full hover:scale-110 transition-transform shadow-lg">
                 <Trash2 size={20} />
               </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsTab({ content, setContent }) {
  const handleChange = (section, field, value) => {
    setContent(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleAlertChange = (field, value) => {
     setContent(prev => ({
      ...prev,
      alert: {
        ...prev.alert,
        [field]: value
      }
    }));
  }

  return (
    <div className="space-y-8 animate-in fade-in pb-10 no-print">
      <div>
        <h2 className="text-3xl font-['Playfair_Display'] font-bold text-[#0a1c3a]">Ustawienia Strony</h2>
        <p className="text-slate-500 mt-1">Zarządzaj kluczowymi danymi na stronie, w stopce i godzinami otwarcia.</p>
      </div>

      {/* ALERT SPECJALNY */}
      <div className="bg-white rounded-2xl shadow-sm border border-red-100 overflow-hidden">
         <div className="px-6 py-4 border-b border-red-50 bg-red-50/50 flex justify-between items-center">
            <h3 className="font-bold text-red-800 flex items-center gap-2"><AlertTriangle size={20} /> Komunikat specjalny (Pasek górny)</h3>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" checked={content.alert.active} onChange={(e) => handleAlertChange('active', e.target.checked)} />
              <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#c31b1b]"></div>
              <span className="ml-3 text-sm font-bold text-slate-600">{content.alert.active ? 'Włączony' : 'Wyłączony'}</span>
            </label>
         </div>
         <div className="p-6">
           <label className="form-label text-red-800">Treść komunikatu (wyświetli się na samej górze strony)</label>
           <input type="text" value={content.alert.message} onChange={(e) => handleAlertChange('message', e.target.value)} className="form-input focus:border-red-300 focus:ring-red-100" placeholder="np. Dziś lokal nieczynny z powodu..." disabled={!content.alert.active} />
         </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* GODZINY OTWARCIA */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
            <h3 className="font-bold text-[#0a1c3a] flex items-center gap-2"><Clock size={20} /> Godziny otwarcia</h3>
          </div>
          <div className="p-6 space-y-4">
            {[
              { key: 'monday', label: 'Poniedziałek' },
              { key: 'tuesday', label: 'Wtorek' },
              { key: 'wednesday', label: 'Środa' },
              { key: 'thursday', label: 'Czwartek' },
              { key: 'friday', label: 'Piątek' },
              { key: 'saturday', label: 'Sobota' },
              { key: 'sunday', label: 'Niedziela' },
            ].map(day => (
              <div key={day.key} className="flex items-center gap-4">
                <label className="w-32 text-sm font-bold text-slate-700">{day.label}</label>
                <input 
                  type="text" 
                  value={content.hours[day.key]} 
                  onChange={(e) => handleChange('hours', day.key, e.target.value)} 
                  className="form-input flex-1 py-1.5" 
                />
              </div>
            ))}
            <div className="pt-4 border-t border-slate-100">
               <label className="form-label">Notatka pod godzinami</label>
               <input type="text" value={content.hours.note} onChange={(e) => handleChange('hours', 'note', e.target.value)} className="form-input" />
            </div>
          </div>
        </div>

        {/* KONTAKT I STOPKA */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
          <div className="px-6 py-4 border-b border-slate-100 bg-slate-50">
            <h3 className="font-bold text-[#0a1c3a] flex items-center gap-2"><Settings size={20} /> Dane kontaktowe</h3>
          </div>
          <div className="p-6 space-y-4">
             <div>
               <label className="form-label">Numer telefonu</label>
               <input type="text" value={content.contact.phone} onChange={(e) => handleChange('contact', 'phone', e.target.value)} className="form-input" />
             </div>
             <div>
               <label className="form-label">Adres E-mail</label>
               <input type="email" value={content.contact.email} onChange={(e) => handleChange('contact', 'email', e.target.value)} className="form-input" />
             </div>
             <div>
               <label className="form-label">Adres fizyczny (Stopka)</label>
               <textarea rows="2" value={content.contact.address} onChange={(e) => handleChange('contact', 'address', e.target.value)} className="form-input resize-none" />
             </div>
             <div>
               <label className="form-label">Link do Facebooka</label>
               <input type="text" value={content.contact.facebook} onChange={(e) => handleChange('contact', 'facebook', e.target.value)} className="form-input" placeholder="https://www.facebook.com/profile.php?id=61577435373395" />
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- KOMPONENTY POMOCNICZE ---

function Modal({ title, children, onClose }) {
  const dialogRef = React.useRef(null);

  useEffect(() => {
    const previouslyFocused = document.activeElement;
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
    };

    dialogRef.current?.focus();
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      previouslyFocused?.focus?.();
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 no-print" onClick={onClose}>
      <div ref={dialogRef} role="dialog" aria-modal="true" aria-labelledby="admin-modal-title" tabIndex="-1" className="bg-white rounded-2xl shadow-xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200" onClick={e => e.stopPropagation()}>
        <div className="px-6 py-4 border-b border-slate-100 flex justify-between items-center bg-slate-50">
          <h3 id="admin-modal-title" className="font-bold text-xl text-[#0a1c3a]">{title}</h3>
          <button type="button" aria-label="Zamknij okno" onClick={onClose} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors">
            <X size={20} />
          </button>
        </div>
        <div className="p-6">
          {children}
        </div>
      </div>
    </div>
  );
}

// Globalne style używane w komponencie, w tym specjalne style do druku
const styles = `
  .form-label {
    display: block;
    margin-bottom: 6px;
    font-size: 14px;
    line-height: 1.35;
    font-weight: 700;
    color: #334155;
  }
  .form-input {
    display: block;
    width: 100%;
    min-height: 44px;
    padding: 10px 14px;
    border-radius: 12px;
    border: 1px solid #cbd5e1;
    background: #f8fafc;
    color: #0f172a;
    font-size: 15px;
    font-weight: 500;
    line-height: 1.4;
    outline: none;
    transition: border-color 0.2s ease, box-shadow 0.2s ease, background-color 0.2s ease;
    box-sizing: border-box;
  }
  textarea.form-input {
    min-height: 96px;
    padding-top: 10px;
    padding-bottom: 10px;
    resize: vertical;
  }
  .form-input:hover {
    border-color: #94a3b8;
    background: #fff;
  }
  .form-input:focus {
    border-color: #0a1c3a;
    box-shadow: 0 0 0 3px rgba(10, 28, 58, 0.12);
    background: #fff;
  }
  .form-input::placeholder {
    color: #94a3b8;
    font-weight: 400;
  }
  .btn-primary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: #c31b1b;
    color: #fff;
    border: 1px solid #c31b1b;
    border-radius: 12px;
    padding: 10px 16px;
    min-height: 42px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.16s ease, box-shadow 0.16s ease, background-color 0.16s ease, border-color 0.16s ease;
  }
  .btn-primary:hover {
    background: #a31515;
    border-color: #a31515;
    box-shadow: 0 10px 20px rgba(120, 10, 10, 0.2);
    transform: translateY(-1px);
  }
  .btn-primary:active {
    transform: translateY(0);
  }
  .btn-primary:disabled {
    opacity: 0.55;
    cursor: not-allowed;
    box-shadow: none;
    transform: none;
  }
  .btn-secondary {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 8px;
    background: #fff;
    color: #334155;
    border: 1px solid #cbd5e1;
    border-radius: 12px;
    padding: 10px 16px;
    min-height: 42px;
    font-size: 14px;
    font-weight: 700;
    cursor: pointer;
    transition: transform 0.16s ease, border-color 0.16s ease, background-color 0.16s ease, color 0.16s ease;
  }
  .btn-secondary:hover {
    background: #f8fafc;
    border-color: #94a3b8;
    color: #0a1c3a;
    transform: translateY(-1px);
  }
  .btn-secondary:active {
    transform: translateY(0);
  }
  .pb-safe { padding-bottom: env(safe-area-inset-bottom, 16px); }

  /* Specjalne style do druku karty menu */
  @media print {
    @page { 
      size: A4 landscape; 
      margin: 0; 
    }
    body {
      -webkit-print-color-adjust: exact;
      print-color-adjust: exact;
      background: white !important;
    }
    .no-print { 
      display: none !important; 
    }
    .print-area { 
      width: 100% !important; 
      height: 100vh !important;
      margin: 0 !important; 
      box-shadow: none !important; 
      overflow: hidden;
      transform: none !important;
    }
    .preview-stage {
      min-height: 0 !important;
      margin: 0 !important;
      padding: 0 !important;
    }
  }
`;

// Wstrzykiwanie stylów
if (typeof document !== 'undefined') {
  const styleEl = document.createElement('style');
  styleEl.innerHTML = styles;
  document.head.appendChild(styleEl);
}