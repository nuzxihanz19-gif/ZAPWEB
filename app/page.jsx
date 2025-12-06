import { getProducts } from '@/lib/products';
import Navbar from '@/components/Navbar';
import CatalogSection from '@/components/CatalogSection';
import FAQSection from '@/components/FAQSection';
import { MessageCircle, CheckCircle } from 'lucide-react';

export default async function Home() {
  const products = await getProducts();

  return (
    <main className="min-h-screen bg-gray-950 text-white selection:bg-emerald-500/30">
      <Navbar />

      {/* Hero Section */}
      <section id="home" className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
        {/* Background Gradients */}
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[120px] -z-10 animate-pulse"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-blue-500/10 rounded-full blur-[120px] -z-10"></div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="flex-1 text-center lg:text-left z-10">
              <h1 className="text-5xl lg:text-7xl font-extrabold leading-tight mb-6 tracking-tight">
                Katalog Template <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                  Website Siap Pakai
                </span>
              </h1>
              <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto lg:mx-0 leading-relaxed">
                Cocok untuk UMKM, portofolio, dan kreator. Dapatkan website profesional tanpa perlu mulai dari nol.
              </p>

              <div className="flex flex-col sm:flex-row items-center gap-4 justify-center lg:justify-start mb-12">
                <a href="#katalog" className="px-8 py-4 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold transition-all hover:scale-105 shadow-lg shadow-emerald-500/20 w-full sm:w-auto">
                  Lihat Katalog &rarr;
                </a>
                <a href="https://t.me/USERNAME_KAMU" target="_blank" className="px-8 py-4 bg-transparent border border-gray-700 hover:border-emerald-500 text-gray-300 hover:text-emerald-400 rounded-xl font-bold transition-all hover:bg-emerald-500/5 w-full sm:w-auto flex items-center justify-center gap-2">
                  <MessageCircle size={20} />
                  Chat di Telegram
                </a>
              </div>

              <div className="flex items-center justify-center lg:justify-start gap-8 lg:gap-12 pt-8 border-t border-gray-800">
                <div className="text-center lg:text-left">
                  <p className="text-3xl font-bold text-white mb-1">50+</p>
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Template</p>
                </div>
                <div className="w-px h-12 bg-gray-800"></div>
                <div className="text-center lg:text-left">
                  <p className="text-3xl font-bold text-white mb-1">100+</p>
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Klien Puas</p>
                </div>
                <div className="w-px h-12 bg-gray-800"></div>
                <div className="text-center lg:text-left">
                  <p className="text-3xl font-bold text-white mb-1">24/7</p>
                  <p className="text-sm text-gray-500 uppercase tracking-wider font-semibold">Support</p>
                </div>
              </div>
            </div>

            <div className="flex-1 relative w-full max-w-lg lg:max-w-xl">
              <div className="relative z-10 bg-gray-900 border border-gray-800 rounded-2xl shadow-2xl overflow-hidden aspect-[4/3] group">
                  <div className="absolute inset-0 bg-gradient-to-tr from-emerald-500/20 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                  <img src="https://via.placeholder.com/600x450/111827/FFFFFF?text=Preview+Template" alt="Hero Preview" className="w-full h-full object-cover" />
              </div>

              {/* Floating Elements */}
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-emerald-500/20 rounded-full blur-2xl"></div>
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-blue-500/20 rounded-full blur-2xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Dynamic Catalog Section */}
      <CatalogSection products={products} />

      {/* Custom Section */}
      <section id="custom" className="py-24 bg-gray-950 relative">
        <div className="max-w-5xl mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold text-white mb-6">Gak nemu yang cocok?</h2>
            <p className="text-xl text-gray-400 mb-16 max-w-2xl mx-auto">Kami bisa buatkan template khusus sesuai kebutuhan brand Anda.</p>

            <div className="grid md:grid-cols-3 gap-8 mb-16 text-left">
                {[
                    { step: "1", title: "Konsultasi", desc: "Diskusikan desain & fitur yang Anda butuhkan." },
                    { step: "2", title: "Pengerjaan", desc: "Proses coding & preview hasil kerja kami." },
                    { step: "3", title: "Terima File", desc: "File siap diupload ke hosting Anda." }
                ].map((item, idx) => (
                    <div key={idx} className="bg-gray-900 p-8 rounded-2xl border border-gray-800 hover:border-emerald-500/50 transition-colors relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-3 opacity-5 group-hover:opacity-10 transition-opacity">
                            <h3 className="text-8xl font-black text-white">{item.step}</h3>
                        </div>
                        <div className="w-12 h-12 bg-emerald-500/10 text-emerald-500 rounded-lg flex items-center justify-center font-bold text-xl mb-6 group-hover:bg-emerald-500 group-hover:text-white transition-colors">
                            {item.step}
                        </div>
                        <h4 className="text-xl font-bold text-white mb-3">{item.title}</h4>
                        <p className="text-gray-400">{item.desc}</p>
                    </div>
                ))}
            </div>

            <a href="https://t.me/USERNAME_KAMU" target="_blank" className="inline-flex items-center gap-3 px-8 py-4 bg-gray-800 hover:bg-gray-700 text-white rounded-xl font-bold transition-all border border-gray-700 hover:border-emerald-500/50">
                <MessageCircle size={20} className="text-emerald-500" />
                Request via Telegram
            </a>
        </div>
      </section>

      {/* FAQ Section */}
      <FAQSection />

      {/* Footer */}
      <footer className="py-12 bg-gray-950 border-t border-gray-900 text-center text-gray-500 text-sm">
        <div className="max-w-7xl mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-2">
                 <a href="#" className="font-bold text-white text-lg">Ziyad<span className="text-emerald-500">Studio</span></a>
                 <span className="hidden md:inline text-gray-700">|</span>
                 <p>&copy; 2025 All rights reserved.</p>
            </div>
            <a href="https://t.me/USERNAME_KAMU" className="hover:text-emerald-500 transition-colors">Kontak Telegram</a>
        </div>
      </footer>

      {/* Made with Emergent Badge */}
      <div className="fixed bottom-6 right-6 z-50 bg-white text-black text-xs font-bold px-3 py-2 rounded-lg shadow-lg hidden md:block">
        Made with Emergent
      </div>

    </main>
  );
}
