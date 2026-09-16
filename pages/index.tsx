import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'
import { useRouter } from 'next/router'
import { useState } from 'react'

export default function Home() {
  const router = useRouter()
  const [q, setQ] = useState('')

  function onSearch(e:any){
    e?.preventDefault()
    const query = (q || '').trim()
    router.push(query ? `/catalog?q=${encodeURIComponent(query)}` : '/catalog')
  }

  return (
    <div>
      <Head>
        <title>پتروکالا — تأمین تجهیزات نفت، گاز و پتروشیمی</title>
        <meta name="description" content="پتروکالا یک کاتالوگ تخصصی و شبکه تأمین قطعات صنعتی برای صنعت نفت، گاز و پتروشیمی است. جست‌وجوی قطعه، مشاهده تأمین‌کنندگان و ثبت درخواست تامین." />
      </Head>

      <Header />

      <main className="container py-16">
        <section className="mb-8">
          <h1 className="text-4xl font-bold">هر قطعه، مسیر تأمین خودش را دارد</h1>
          <p className="text-gray-300 mt-4 max-w-2xl">پتروکالا کاتالوگ تخصصی و شبکه تأمین قطعا�� صنعتی است. با جست‌وجوی قطعات فنی، مشاهده تأمین‌کنندگان و ارسال درخواست قیمت، سریع‌تر نیازتان را تامین کنید.</p>
        </section>

        <section className="mb-12">
          <form onSubmit={onSearch} className="max-w-2xl mx-auto flex gap-3">
            <input
              value={q}
              onChange={e=>setQ(e.target.value)}
              placeholder="جست‌وجوی قطعه، کد فنی یا نام تجهیز..."
              className="flex-1 p-3 rounded bg-[#081017] border border-gray-800"
              aria-label="جست‌وجوی قطعه"
            />
            <button type="submit" className="px-4 py-2 bg-[#d08a55] rounded">جست‌وجو</button>
          </form>
        </section>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#0e171e] rounded-lg">
              <h3 className="font-semibold text-lg">جستجوی قطعه و کاتالوگ تخصصی</h3>
              <p className="text-gray-400 mt-2">جست‌وجوی سریع قطعات صنعتی بر اساس نام، کد فنی، استاندارد یا مشخصات.</p>
              <div className="mt-4">
                <a href="/catalog" className="px-3 py-2 bg-[#d08a55] rounded inline-block">برو به کاتالوگ</a>
              </div>
            </div>

            <div className="p-6 bg-[#0e171e] rounded-lg">
              <h3 className="font-semibold text-lg">شبکه تأمین‌کنندگان</h3>
              <p className="text-gray-400 mt-2">مشاهده و ارتباط با تأمین‌کنندگان معتبر در صنایع نفت، گاز و پتروشیمی.</p>
              <div className="mt-4">
                <a href="/suppliers" className="px-3 py-2 border rounded inline-block">مشاهده تأمین‌کنندگان</a>
              </div>
            </div>

            <div className="p-6 bg-[#0e171e] rounded-lg">
              <h3 className="font-semibold text-lg">درخواست قیمت / ارتباط</h3>
              <p className="text-gray-400 mt-2">ثبت درخواست قیمت و ارسال پیام به تأمین‌کننده برای دریافت پیشنهاد.</p>
              <div className="mt-4">
                <a href="/request" className="px-3 py-2 border rounded inline-block">ثبت درخواست</a>
              </div>
            </div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
