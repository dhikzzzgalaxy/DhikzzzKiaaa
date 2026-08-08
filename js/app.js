const { useState, useMemo, useEffect } = React;

// --- ICONS (Lucide Icons Inline SVGs) ---
const SVG_PATHS = {
    Search: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/>',
    Download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" x2="12" y1="15" y2="3"/>',
    Star: '<polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>',
    ShieldCheck: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-2 7-2 2 0 5 1 7 2a1 1 0 0 1 1 1z"/><path d="m9 12 2 2 4-4"/>',
    ChevronLeft: '<path d="m15 18-6-6 6-6"/>',
    Menu: '<line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/>',
    Monitor: '<rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/>',
    Smartphone: '<rect width="14" height="20" x="5" y="2" rx="2" ry="2"/><path d="M12 18h.01"/>',
    Clock: '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>',
    LayoutGrid: '<rect width="7" height="7" x="3" y="3" rx="1"/><rect width="7" height="7" x="14" y="3" rx="1"/><rect width="7" height="7" x="14" y="14" rx="1"/><rect width="7" height="7" x="3" y="14" rx="1"/>',
    Gamepad2: '<line x1="6" x2="10" y1="12" y2="12"/><line x1="8" x2="8" y1="10" y2="14"/><line x1="15" x2="15.01" y1="13" y2="13"/><line x1="18" x2="18.01" y1="11" y2="11"/><rect width="20" height="12" x="2" y="6" rx="2"/>',
    User: '<path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/>',
    Info: '<circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/>',
    ShieldAlert: '<path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2-1 4-2 7-2 2 0 5 1 7 2a1 1 0 0 1 1 1v7z"/><path d="M12 8v4"/><path d="M12 16h.01"/>',
    Sparkles: '<path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z"/><path d="M5 3v4"/><path d="M3 5h4"/><path d="M19 17v4"/><path d="M17 19h4"/>',
    HardDrive: '<line x1="22" x2="2" y1="12" y2="12"/><path d="M5.45 5.11 2 12v6a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2v-6l-3.45-6.89A2 2 0 0 0 16.76 4H7.24a2 2 0 0 0-1.79 1.11z"/><line x1="6" x2="6.01" y1="16" y2="16"/><line x1="10" x2="10.01" y1="16" y2="16"/>',
    Verified: '<path d="M3.85 8.62a4 4 0 0 1 4.78-4.77 4 4 0 0 1 6.74 0 4 4 0 0 1 4.78 4.78 4 4 0 0 1 0 6.74 4 4 0 0 1-4.77 4.78 4 4 0 0 1-6.75 0 4 4 0 0 1-4.78-4.77 4 4 0 0 1 0-6.76Z"/><path d="m9 12 2 2 4-4"/>',
    LinkIcon: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
    Share2: '<circle cx="18" cy="5" r="3"/><circle cx="6" cy="12" r="3"/><circle cx="18" cy="19" r="3"/><line x1="8.59" x2="15.42" y1="13.51" y2="17.49"/><line x1="15.41" x2="8.59" y1="6.51" y2="10.49"/>',
    Briefcase: '<rect width="20" height="14" x="2" y="7" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>',
    Video: '<path d="m22 8-6 4 6 4V8Z"/><rect width="14" height="12" x="2" y="6" rx="2" ry="2"/>',
    Users: '<path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M22 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>',
    Music2: '<circle cx="8" cy="18" r="4"/><path d="M12 18V4l10 2v12"/><circle cx="18" cy="16" r="4"/>',
    Wrench: '<path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/>',
    Package: '<path d="M16.5 9.4 7.55 4.24"/><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16Z"/><path d="M3.29 7 12 12l8.71-5"/><path d="M12 22V12"/>',
    Play: '<polygon points="5 3 19 12 5 21 5 3"/>',
    BookOpen: '<path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"/><path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"/>',
    Shield: '<path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/>',
    Globe: '<circle cx="12" cy="12" r="10"/><line x1="2" x2="22" y1="12" y2="12"/><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
    Rocket: '<path d="M4.5 16.5c-1.5 1.26-2 5-2 5s3.74-.5 5-2c.71-.84.7-2.13-.09-2.91a2.18 2.18 0 0 0-2.91-.09z"/><path d="m12 15-3-3a22 22 0 0 1 2-3.95A12.88 12.88 0 0 1 22 2c0 2.72-.78 7.5-6 11a22.35 22.35 0 0 1-4 2z"/><path d="M9 12H4s.5-1 1-4c2 1 3 3 3 3z"/><path d="M15 9V4s1 .5 4 1c-1 2-3 3-3 3z"/>',
    Layers: '<polygon points="12 2 2 7 12 12 22 7 12 2"/><polygon points="2 17 12 22 22 17"/><polygon points="2 12 12 17 22 12"/>',
    Scissors: '<circle cx="6" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><path d="M20 4 8.12 15.88"/><path d="M14.47 14.48 20 20"/><path d="M8.12 8.12 12 12"/>',
    Folder: '<path d="M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
    X: '<path d="M18 6 6 18"/><path d="m6 6 12 12"/>'
};

const Icon = ({ name, size = 24, className = "" }) => (
    <svg xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" 
         fill={className.includes('fill') ? 'currentColor' : 'none'} 
         stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" 
         className={className} dangerouslySetInnerHTML={{ __html: SVG_PATHS[name] || SVG_PATHS['Info'] }} />
);

const Search = (p) => <Icon name="Search" {...p} />;
const Download = (p) => <Icon name="Download" {...p} />;
const Star = (p) => <Icon name="Star" {...p} />;
const ShieldCheck = (p) => <Icon name="ShieldCheck" {...p} />;
const ChevronLeft = (p) => <Icon name="ChevronLeft" {...p} />;
const Menu = (p) => <Icon name="Menu" {...p} />;
const Monitor = (p) => <Icon name="Monitor" {...p} />;
const Smartphone = (p) => <Icon name="Smartphone" {...p} />;
const Clock = (p) => <Icon name="Clock" {...p} />;
const LayoutGrid = (p) => <Icon name="LayoutGrid" {...p} />;
const Gamepad2 = (p) => <Icon name="Gamepad2" {...p} />;
const User = (p) => <Icon name="User" {...p} />;
const Info = (p) => <Icon name="Info" {...p} />;
const ShieldAlert = (p) => <Icon name="ShieldAlert" {...p} />;
const Sparkles = (p) => <Icon name="Sparkles" {...p} />;
const HardDrive = (p) => <Icon name="HardDrive" {...p} />;
const Verified = (p) => <Icon name="Verified" {...p} />;
const LinkIcon = (p) => <Icon name="LinkIcon" {...p} />;
const Share2 = (p) => <Icon name="Share2" {...p} />;
const Briefcase = (p) => <Icon name="Briefcase" {...p} />;
const Video = (p) => <Icon name="Video" {...p} />;
const Users = (p) => <Icon name="Users" {...p} />;
const Music2 = (p) => <Icon name="Music2" {...p} />;
const Wrench = (p) => <Icon name="Wrench" {...p} />;
const Package = (p) => <Icon name="Package" {...p} />;
const Play = (p) => <Icon name="Play" {...p} />;
const BookOpen = (p) => <Icon name="BookOpen" {...p} />;
const Shield = (p) => <Icon name="Shield" {...p} />;
const Globe = (p) => <Icon name="Globe" {...p} />;
const Rocket = (p) => <Icon name="Rocket" {...p} />;
const Layers = (p) => <Icon name="Layers" {...p} />;
const Scissors = (p) => <Icon name="Scissors" {...p} />;
const Folder = (p) => <Icon name="Folder" {...p} />;
const X = (p) => <Icon name="X" {...p} />;

// --- COMPONENTS ---
const Badge = ({ children, variant = "primary" }) => {
    const styles = {
        primary: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        premium: "bg-blue-500/10 text-blue-400 border-blue-500/20",
        success: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
    };
    return <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase border ${styles[variant]}`}>{children}</span>;
};

const AppCard = ({ app, onClick }) => (
    <div onClick={() => onClick(app)} className="group relative bg-white/[0.02] border border-white/[0.05] hover:border-blue-500/40 rounded-2xl p-4 cursor-pointer transition-all duration-500 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-purple-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        {app.isPremium && <div className="absolute top-3 right-3 z-10"><Badge variant="premium">Premium</Badge></div>}
        <div className="relative z-10 flex items-start gap-4">
            <div className="relative w-16 h-16 rounded-xl overflow-hidden shrink-0 group-hover:scale-105 transition-transform duration-500 shadow-lg">
                <img src={app.icon} alt={app.title} className="w-full h-full object-cover" />
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="font-bold text-slate-100 truncate group-hover:text-blue-400 transition-colors">{app.title}</h3>
                <p className="text-xs text-blue-400/80 truncate mt-0.5 inline-block">{app.developer}</p>
                <div className="flex items-center gap-3 mt-3 text-xs text-slate-300">
                    <span className="flex items-center gap-1"><Star size={12} className="text-yellow-400 fill-yellow-400" /> {app.rating}</span>
                    <span className="flex items-center gap-1"><Download size={12} className="text-blue-400" /> {app.size}</span>
                </div>
            </div>
        </div>
    </div>
);

const RecentAppCard = ({ app, onClick }) => (
    <div onClick={() => onClick(app)} className="group flex-none w-64 relative bg-white/[0.02] border border-white/[0.05] hover:border-purple-500/40 rounded-2xl p-4 cursor-pointer transition-all duration-500 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        <div className="relative z-10">
            <div className="relative w-full aspect-square rounded-xl overflow-hidden mb-4 group-hover:scale-105 transition-transform duration-500 shadow-lg border border-white/5">
                <img src={app.icon} alt={app.title} className="w-full h-full object-cover" />
                {app.isPremium && <div className="absolute top-2 right-2"><Badge variant="premium">Premium</Badge></div>}
            </div>
            <h3 className="font-bold text-slate-100 truncate group-hover:text-blue-400 transition-colors">{app.title}</h3>
            <p className="text-xs text-slate-400 truncate mt-1">{app.category}</p>
            <div className="flex items-center justify-between mt-3">
                <div className="flex items-center gap-2 text-xs text-slate-300">
                    <Star size={12} className="text-yellow-400 fill-yellow-400" />
                    <span>{app.rating}</span>
                </div>
            </div>
        </div>
    </div>
);

// --- HOME VIEW ---
const HomeView = ({ apps, materialCategories, onAppSelect, searchQuery, setSearchQuery, onShowAll }) => {
    const trendingApps = useMemo(() => apps.filter(app => app.isTrending), [apps]);
    const recentApps = useMemo(() => apps.slice(0, 10), [apps]);
    const homepageApps = useMemo(() => {
        if (searchQuery) {
            return apps.filter(app => 
                app.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                app.developer.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }
        return apps.slice(0, 10);
    }, [apps, searchQuery]);

    return (
        <div className="fade-in pb-24">
            {/* Hero Section */}
            <section className="relative pt-32 pb-16 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-blue-500/10 blur-[120px] rounded-full pointer-events-none" />
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.03] border border-white/10 mb-6 backdrop-blur-md">
                    <Sparkles size={16} className="text-blue-400" />
                    <span className="text-xs font-semibold text-slate-300">Platform Download Aplikasi Mod Terpercaya</span>
                </div>
                <h1 className="text-4xl md:text-6xl font-extrabold text-slate-100 tracking-tight mb-6 max-w-3xl">
                    Temukan & Download <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400">Aplikasi Mod Terbaik</span>
                </h1>
                <p className="text-slate-400 text-base md:text-lg max-w-xl mb-10">
                    Koleksi aplikasi modifikasi pilihan dengan fitur premium terbuka, aman, dan selalu diperbarui setiap hari.
                </p>

                {/* Search Bar */}
                <div className="w-full max-w-2xl relative z-20">
                    <div className="relative flex items-center">
                        <Search className="absolute left-5 text-slate-400" size={20} />
                        <input 
                            type="text" 
                            placeholder="Cari aplikasi atau developer..." 
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full bg-white/[0.04] backdrop-blur-xl border border-white/10 hover:border-white/20 focus:border-blue-500 text-slate-100 placeholder-slate-500 pl-14 pr-6 py-4 rounded-2xl outline-none transition-all shadow-2xl"
                        />
                        {searchQuery && (
                            <button onClick={() => setSearchQuery('')} className="absolute right-5 text-slate-400 hover:text-white">
                                <X size={18} />
                            </button>
                        )}
                    </div>
                </div>
            </section>

            {/* Rilis Terbaru Horizontal Scroll */}
            {!searchQuery && (
                <section className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                            <Clock className="text-blue-400" size={24} /> Rilis Terbaru
                        </h2>
                    </div>
                    <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0">
                        {recentApps.map(app => (
                            <RecentAppCard key={app.id} app={app} onClick={onAppSelect} />
                        ))}
                    </div>
                </section>
            )}

            {/* Trending Section */}
            {!searchQuery && trendingApps.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 md:px-8 mb-16">
                    <div className="flex items-center justify-between mb-6">
                        <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                            <Sparkles className="text-yellow-400" size={24} /> Trending Minggu Ini
                        </h2>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {trendingApps.map(app => (
                            <AppCard key={app.id} app={app} onClick={onAppSelect} />
                        ))}
                    </div>
                </section>
            )}

            {/* Main Apps */}
            <section className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                    <h2 className="text-2xl font-bold text-slate-100 flex items-center gap-2">
                        <LayoutGrid className="text-purple-400" size={24} /> {searchQuery ? 'Hasil Pencarian' : 'Semua Aplikasi'}
                    </h2>
                    {!searchQuery && (
                        <button onClick={onShowAll} className="text-sm font-semibold text-blue-400 hover:text-blue-300 transition-colors flex items-center gap-1 self-start md:self-auto">
                            Lihat Semua ({apps.length}) &rarr;
                        </button>
                    )}
                </div>

                {homepageApps.length === 0 ? (
                    <div className="text-center py-20 bg-white/[0.02] border border-white/5 rounded-3xl">
                        <Info size={48} className="mx-auto text-slate-500 mb-4" />
                        <h3 className="text-lg font-bold text-slate-200 mb-2">Aplikasi tidak ditemukan</h3>
                        <p className="text-sm text-slate-500">Coba kata kunci lain atau pilih kategori berbeda.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                        {homepageApps.map(app => (
                            <AppCard key={app.id} app={app} onClick={onAppSelect} />
                        ))}
                    </div>
                )}
            </section>

            {/* Material Categories Grid Section */}
            {!searchQuery && materialCategories && materialCategories.length > 0 && (
                <section className="max-w-7xl mx-auto px-4 md:px-8 mt-20">
                    <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 md:p-8">
                        <h2 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2">
                            <Folder className="text-blue-400" size={22} /> Kategori Pilihan
                        </h2>
                        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8 gap-3 md:gap-4">
                            {materialCategories.map((cat) => {
                                const appCount = cat.id === 'All' ? apps.length : apps.filter(a => a.category === cat.id).length;
                                return (
                                    <div 
                                        key={cat.id}
                                        onClick={onShowAll}
                                        className="group bg-white/[0.02] hover:bg-white/[0.05] border border-white/[0.05] hover:border-blue-500/40 rounded-2xl p-3 md:p-4 flex flex-col items-center gap-2 md:gap-3 cursor-pointer transition-all duration-300"
                                    >
                                        <div className="w-[36px] h-[36px] md:w-[48px] md:h-[48px] rounded-lg md:rounded-xl bg-gradient-to-br from-[#4F7CFF] to-[#8B5CF6] flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                                            <Icon name={cat.icon} size={18} className="text-white" />
                                        </div>
                                        <div className="flex flex-col items-center">
                                            <span className="font-bold text-white text-center text-[10px] md:text-xs truncate w-full px-1">{cat.name}</span>
                                            <span className="text-[9px] md:text-[10px] text-slate-500 font-medium">{appCount} Apps</span>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>
                </section>
            )}
        </div>
    );
};

// --- ALL APPS VIEW ---
const AllAppsView = ({ apps, categories, onAppSelect, onBack }) => {
    const [selectedCategory, setSelectedCategory] = useState("All");
    useEffect(() => { window.scrollTo(0, 0); }, []);

    const filteredAllApps = useMemo(() => {
        if (selectedCategory === "All") return apps;
        return apps.filter(app => app.category === selectedCategory);
    }, [apps, selectedCategory]);

    return (
        <div className="fade-in slide-in-from-bottom-4 duration-700 pb-24">
            <section className="relative pt-32 pb-12 px-4 md:px-8 max-w-7xl mx-auto flex flex-col items-center text-center">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-purple-500/15 blur-[120px] rounded-full pointer-events-none" />
                <button onClick={onBack} className="absolute top-24 left-4 md:left-8 z-20 flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/10 rounded-xl text-slate-200 transition-colors">
                    <ChevronLeft size={20} /> Kembali
                </button>
                <h1 className="text-4xl font-bold text-slate-100 mb-4 mt-8">Semua Aplikasi</h1>
                <p className="text-slate-400 mb-8">Jelajahi seluruh koleksi aplikasi mod terbaik kami.</p>

                {categories && categories.length > 0 && (
                    <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-hide -mx-4 px-4 md:mx-0 md:px-0 w-full justify-start md:justify-center relative z-20">
                        {categories.map((cat, i) => (
                            <button 
                                key={i} 
                                onClick={() => setSelectedCategory(cat)} 
                                className={`whitespace-nowrap px-5 py-2.5 rounded-xl border transition-all font-medium ${
                                    selectedCategory === cat 
                                    ? "bg-blue-500/20 border-blue-500 text-blue-400" 
                                    : "bg-white/[0.03] border-white/[0.05] text-slate-300 hover:bg-white/[0.08] hover:border-blue-500/30 hover:text-blue-400"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>
                )}
            </section>

            <div className="max-w-7xl mx-auto px-4 md:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredAllApps.map(app => (
                        <AppCard key={app.id} app={app} onClick={onAppSelect} />
                    ))}
                </div>
            </div>
        </div>
    );
};

// --- APP DETAIL VIEW WITH SEPARATED SHIELD SECTION ---
const AppDetailView = ({ app, onBack }) => {
    const [showInfo, setShowInfo] = useState(false);
    useEffect(() => { window.scrollTo(0, 0); }, []);

    if (!app) return null;

    return (
        <div className="fade-in slide-in-from-right-8 duration-500 pb-24 min-h-screen">
            <div className="relative h-[300px] md:h-[400px] w-full">
                <div className="absolute inset-0 bg-gradient-to-t from-[#05050a] via-[#05050a]/80 to-transparent z-10" />
                <img src={app.banner} alt={app.title} className="w-full h-full object-cover" />
                <button onClick={onBack} className="absolute top-24 left-4 md:left-8 z-20 flex items-center gap-2 px-4 py-2 bg-black/40 hover:bg-black/60 backdrop-blur-md border border-white/10 rounded-xl text-slate-200 transition-colors">
                    <ChevronLeft size={20} /> Kembali
                </button>
            </div>

            <div className="max-w-5xl mx-auto px-4 md:px-8 relative z-20 -mt-32 md:-mt-40">
                <div className="bg-white/[0.03] backdrop-blur-2xl border border-white/10 rounded-3xl p-6 md:p-8 shadow-2xl relative overflow-hidden">
                    <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 blur-[80px]" />
                    <div className="flex flex-col md:flex-row gap-6 md:gap-8 relative z-10">
                        <div className="shrink-0"><img src={app.icon} alt={app.title} className="w-32 h-32 md:w-40 md:h-40 rounded-3xl shadow-[0_0_30px_rgba(0,0,0,0.5)] border border-white/10" /></div>
                        <div className="flex-1 flex flex-col justify-center">
                            <div className="flex flex-wrap items-center gap-2 mb-3">
                                <Badge variant="primary">{app.category}</Badge>
                                {app.isPremium && <Badge variant="premium">Premium Unlocked</Badge>}
                                <Badge variant="success">Updated</Badge>
                            </div>
                            <h1 className="text-3xl md:text-4xl font-bold text-slate-100 mb-2">{app.title}</h1>
                            <p className="text-blue-400 font-medium mb-6 text-lg inline-block">{app.developer}</p>
                            <div className="grid grid-cols-2 md:flex md:flex-wrap gap-4 md:gap-8 text-sm">
                                <div><p className="text-slate-500 mb-1 flex items-center gap-1"><Monitor size={14}/> Versi</p><p className="font-semibold text-slate-200">{app.version}</p></div>
                                <div><p className="text-slate-500 mb-1 flex items-center gap-1"><HardDrive size={14}/> Ukuran</p><p className="font-semibold text-slate-200">{app.size}</p></div>
                                <div><p className="text-slate-500 mb-1 flex items-center gap-1"><Star size={14}/> Rating</p><p className="font-semibold text-slate-200">{app.rating} / 5.0</p></div>
                                <div><p className="text-slate-500 mb-1 flex items-center gap-1"><Clock size={14}/> Diperbarui</p><p className="font-semibold text-slate-200">{app.updatedAt}</p></div>
                                <div className="col-span-2 md:col-span-1"><p className="text-slate-500 mb-1 flex items-center gap-1"><Smartphone size={14}/> Sistem</p><p className="font-semibold text-slate-200">{app.androidMin}</p></div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
                    <div className="lg:col-span-2 space-y-8">
                        <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 md:p-8">
                            <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2"><Info className="text-blue-400" /> Description</h3>
                            <p className="text-slate-300 text-sm leading-relaxed">{app.description}</p>
                        </div>
                        <div className="bg-white/[0.02] border border-white/[0.05] rounded-3xl p-6 md:p-8">
                            <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2"><Sparkles className="text-purple-400" /> Modification Features</h3>
                            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                                {app.features && app.features.map((feat, i) => (
                                    <li key={i} className="flex items-start gap-3 text-slate-300 bg-white/[0.02] p-3 rounded-xl border border-white/[0.05]">
                                        <Verified className="text-blue-400 fill-blue-400/20 shrink-0" size={24} /><span>{feat}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>

                    <div className="space-y-6">
                        {/* 1. Download Card */}
                        <div className="bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 rounded-3xl p-6 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 blur-[50px]" />
                            <h3 className="text-xl font-bold text-slate-100 mb-6 flex items-center gap-2"><Download className="text-blue-400" /> Download</h3>
                            
                            {app.information && (
                                <div className="mb-6 relative z-10">
                                    <div className="flex items-center justify-between mb-3">
                                        <h4 className="text-sm font-bold text-slate-200 flex items-center gap-2">
                                            <Info size={16} className="text-blue-400" /> Important Information!
                                        </h4>
                                        <button 
                                            onClick={() => setShowInfo(!showInfo)}
                                            className="text-[10px] font-bold uppercase tracking-wider text-blue-400 hover:text-blue-300 transition-colors bg-blue-400/10 px-3 py-1 rounded-full border border-blue-400/20"
                                        >
                                            {showInfo ? 'Hide' : 'Show'}
                                        </button>
                                    </div>
                                    {showInfo && (
                                        <div className="text-slate-400 text-xs leading-relaxed p-3 bg-white/[0.03] rounded-xl border border-white/[0.05] fade-in">
                                            {app.information}
                                        </div>
                                    )}
                                </div>
                            )}

                            <div className="space-y-3 relative z-10">
                                {app.mirrors && app.mirrors.map((mirror, i) => (
                                    <a key={i} href={mirror.url} target="_blank" rel="noopener noreferrer" className="flex items-center justify-between bg-[#0a0a0f] border border-white/10 p-4 rounded-2xl hover:border-blue-500/50 hover:bg-white/[0.05] transition-all group cursor-pointer">
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 bg-white/5 rounded-lg text-slate-300 group-hover:text-blue-400 transition-colors"><LinkIcon size={18} /></div>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <span className="font-semibold text-slate-200">{mirror.name}</span>
                                                    {i === 0 && (
                                                        <span className="px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider rounded-full bg-gradient-to-r from-blue-500 to-blue-600 text-white shadow-[0_0_10px_rgba(6,182,212,0.5)] animate-pulse">
                                                            New
                                                        </span>
                                                    )}
                                                </div>
                                                <span className="text-xs text-slate-500">{mirror.size}</span>
                                            </div>
                                        </div>
                                        <Download size={20} className="text-slate-600 group-hover:text-blue-400 transition-colors" />
                                    </a>
                                ))}
                            </div>
                        </div>

                        {/* 2. Shield Section */}
                        <div className="bg-gradient-to-b from-white/[0.05] to-transparent border border-white/10 rounded-3xl p-6 relative overflow-hidden">
                            <h3 className="text-xl font-bold text-slate-100 mb-4 flex items-center gap-2"><ShieldAlert className="text-orange-400" /> Keamanan & Privasi</h3>
                            <div className="p-4 bg-orange-500/10 border border-orange-500/20 rounded-xl flex gap-3 text-orange-200/80 text-xs">
                                <ShieldAlert size={24} className="shrink-0 text-orange-400" />
                                <div className="flex flex-col space-y-2">
                                    <p>Aplikasi ini dirilis oleh Dhikzzz Galaxy dan telah saya pastikan aman untuk digunakan. Aplikasi tidak mengandung virus, malware, maupun kode berbahaya.</p>
                                    <p>Jika muncul peringatan seperti "Aplikasi Berbahaya" atau "Aplikasi Berisiko", hal tersebut biasanya karena aplikasi diunduh dari luar Google Play Store, bukan karena mengandung virus. Apabila instalasi diblokir, Anda dapat menonaktifkan Google Play Protect sementara, lalu mengaktifkannya kembali setelah proses instalasi selesai.</p>
                                </div>
                            </div>
                        </div>


                    </div>
                </div>
            </div>
        </div>
    );
};

// --- MAIN APP COMPONENT ---
function App() {
    const [data, setData] = useState({ apps: [], categories: [], materialCategories: [] });
    const [currentView, setCurrentView] = useState('home'); // 'home' | 'allapps' | 'detail'
    const [selectedApp, setSelectedApp] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [isLoaded, setIsLoaded] = useState(false);

    // Default to home view on load
    const processRoute = (jsonData) => {
        setCurrentView('home');
        setIsLoaded(true);
    };

    // Load data from apps.json on mount
    useEffect(() => {
        fetch('./data/apps.json')
            .then(res => res.json())
            .then(jsonData => {
                setData(jsonData);
                processRoute(jsonData);
            })
            .catch(err => {
                console.error("Failed to load apps.json", err);
                setIsLoaded(true);
            });
    }, []);



    const navigateToDetail = (app) => {
        setSelectedApp(app);
        setCurrentView('detail');
        window.scrollTo(0, 0);
    };

    const navigateToAllApps = () => {
        setCurrentView('allapps');
        window.scrollTo(0, 0);
    };

    const navigateToHome = () => {
        setSelectedApp(null);
        setCurrentView('home');
        window.scrollTo(0, 0);
    };

    return (
        <div className="min-h-screen bg-[#05050a] text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden">
            <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-purple-900/20 blur-[150px] rounded-full mix-blend-screen" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-cyan-900/20 blur-[150px] rounded-full mix-blend-screen" />
            </div>

            <nav className="fixed top-0 w-full z-50 bg-[#05050a]/60 backdrop-blur-xl border-b border-white/[0.05] shadow-[0_4px_30px_rgba(0,0,0,0.1)]">
                <div className="max-w-7xl mx-auto px-4 md:px-8">
                    <div className="flex items-center justify-between h-20">
                        <div className="flex items-center gap-3 cursor-pointer group" onClick={navigateToHome}>
                            <div className="w-11 h-11 rounded-xl overflow-hidden shadow-[0_0_15px_rgba(0,243,255,0.2)] group-hover:shadow-[0_0_25px_rgba(188,19,254,0.4)] transition-all duration-300 bg-white flex items-center justify-center border border-white/20">
                                <img src="https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Galaxy/main/DhikzzzGalaxy.png" alt="Dhikzzz Galaxy" className="w-full h-full object-cover" />
                            </div>
                            <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-slate-100 to-slate-400 group-hover:text-white transition-colors">Dhikzzz Galaxy</span>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="relative z-10">
                {currentView === 'home' && (
                    <HomeView 
                        apps={data.apps}
                        materialCategories={data.materialCategories}
                        onAppSelect={navigateToDetail} 
                        searchQuery={searchQuery} 
                        setSearchQuery={setSearchQuery} 
                        onShowAll={navigateToAllApps}
                    />
                )}
                {currentView === 'allapps' && (
                    <AllAppsView 
                        apps={data.apps}
                        categories={data.categories}
                        onAppSelect={navigateToDetail} 
                        onBack={navigateToHome}
                    />
                )}
                {currentView === 'detail' && (
                    <AppDetailView 
                        app={selectedApp} 
                        onBack={navigateToHome}
                    />
                )}
            </main>

            <footer className="relative z-10 border-t border-white/[0.05] bg-black/40 backdrop-blur-md pt-16 pb-8">
                <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-lg overflow-hidden bg-white flex items-center justify-center opacity-90 border border-white/20">
                            <img src="https://raw.githubusercontent.com/dhikzzzgalaxy/Dhikzzz-Galaxy/main/DhikzzzGalaxy.png" alt="Dhikzzz Galaxy" className="w-full h-full object-cover" />
                        </div>
                        <span className="font-bold text-slate-300">Dhikzzz Galaxy</span>
                    </div>
                    <p className="text-slate-500 text-sm text-center md:text-left">© 2026 Dhikzzz Galaxy</p>
                </div>
            </footer>
        </div>
    );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
