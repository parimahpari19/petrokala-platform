import Link from 'next/link'

export default function Header(){
  return (
    <header className="bg-transparent py-4 border-b border-gray-800">
      <div className="container flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3">
          <div className="w-10 h-10 bg-[#d08a55] rounded-md transform rotate-45 flex items-center justify-center">
            <div className="w-3 h-3 bg-[#43b7ae] rounded-full"></div>
          </div>
          <div>
            <div className="font-bold">پتروکالا</div>
            <div className="text-xs text-[#d08a55]">PETROKALA</div>
          </div>
        </Link>

        <nav className="hidden md:flex gap-6 items-center">
          <Link href="/catalog">کاتالوگ</Link>
          <Link href="/suppliers">تأمین‌کنندگان</Link>
          <Link href="/request">ثبت درخواست</Link>
        </nav>

        <div className="flex items-center gap-3">
          <Link href="/auth/login" className="px-3 py-2 border rounded text-sm">ورود</Link>
          <Link href="/auth/register" className="px-3 py-2 bg-[#d08a55] rounded text-sm">ثبت‌نام</Link>
        </div>
      </div>
    </header>
  )
}
