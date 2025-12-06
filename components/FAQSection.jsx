'use client';

import { useState } from 'react';
import { ChevronDown, FileCode, Code, RefreshCw, CreditCard } from 'lucide-react';

export default function FAQSection() {
  const [activeIndex, setActiveIndex] = useState(0);

  const faqs = [
    {
      question: "File apa saja yang saya dapat?",
      answer: "Anda akan mendapatkan source code lengkap (HTML, CSS, JS), aset gambar, dan panduan instalasi.",
      icon: <FileCode className="w-5 h-5" />
    },
    {
      question: "Apakah harus bisa coding untuk menggunakan template?",
      answer: "Disarankan memiliki dasar HTML/CSS. Namun, kami menyertakan komentar dalam kode untuk memudahkan Anda mengganti teks dan gambar.",
      icon: <Code className="w-5 h-5" />
    },
    {
      question: "Apakah ada revisi untuk custom project?",
      answer: "Untuk template katalog tidak ada revisi (beli putus). Untuk layanan Custom, kami berikan kesempatan revisi minor sebanyak 2x.",
      icon: <RefreshCw className="w-5 h-5" />
    },
    {
      question: "Bagaimana cara pembayaran?",
      answer: "Kami menerima transfer Bank (BCA/Mandiri) dan E-Wallet (GoPay/OVO/Dana). Pembayaran dilakukan di awal atau DP 50% untuk Custom.",
      icon: <CreditCard className="w-5 h-5" />
    }
  ];

  return (
    <section id="faq" className="py-24 bg-gray-900 border-t border-gray-800">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-white mb-4">FAQ - Pertanyaan Umum</h2>
          <p className="text-gray-400">Temukan jawaban untuk pertanyaan yang sering ditanyakan</p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className={`border border-gray-700 rounded-xl overflow-hidden transition-all duration-300 ${
                activeIndex === index ? 'bg-emerald-500/5 border-emerald-500/30' : 'bg-transparent hover:border-gray-600'
              }`}
            >
              <button
                className="w-full flex items-center justify-between p-6 text-left"
                onClick={() => setActiveIndex(activeIndex === index ? -1 : index)}
              >
                <div className="flex items-center gap-4">
                  <div className={`p-2 rounded-lg ${activeIndex === index ? 'bg-emerald-500 text-white' : 'bg-gray-800 text-gray-400'}`}>
                    {faq.icon}
                  </div>
                  <span className={`font-semibold text-lg ${activeIndex === index ? 'text-white' : 'text-gray-300'}`}>
                    {faq.question}
                  </span>
                </div>
                <ChevronDown
                  className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
                    activeIndex === index ? 'rotate-180 text-emerald-500' : ''
                  }`}
                />
              </button>

              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  activeIndex === index ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
              >
                <p className="px-6 pb-6 pt-0 text-gray-400 leading-relaxed ml-[3.25rem]">
                  {faq.answer}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
