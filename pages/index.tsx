import Head from 'next/head'
import Header from '../components/Header'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <div>
      <Head>
        <title>پتروکالا — تأمین تجهیزات نفت، گاز و پتروشیمی</title>
        <meta name="description" content="پتروکالا یک کاتالوگ تخصصی و شبکه تأمین قطعات صنعتی برای صنعت نفت، گاز و پتروشیمی است. جست‌وجو، درخواست قیمت و ارتباط مستقیم با تأمین‌کننده." />
      </Head>

      <Header />

      <main className="container py-16">
        <section className="mb-12">
          <h1 className="text-4xl font-bold">هر قطعه، مسیر تأمین خودش را دارد</h1>
          <p className="text-gray-300 mt-4 max-w-2xl">پتروکالا یک کاتالوگ تخصصی و شبکه تأمین قطعات صنعتی برای صنعت نفت، گاز و پتروشیمی است. جست‌وجو، درخواست قیمت و ارتباط مستقیم با تأمین‌کننده.</p>
        </section>

        <section>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-[#0e171e] rounded-lg">Catalog teaser / quick links</div>
            <div className="p-6 bg-[#0e171e] rounded-lg">Supplier network</div>
            <div className="p-6 bg-[#0e171e] rounded-lg">How it works</div>
          </div>
        </section>

      </main>

      <Footer />
    </div>
  )
}
