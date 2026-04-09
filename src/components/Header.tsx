import Link from 'next/link'

export default function Header() {
  return (
    <header className="flex justify-between items-center mb-7">
      <div className="flex items-center gap-2.5">
        <div className="w-9 h-9 bg-gradient-to-br from-[#FCC30A] to-[#E6A800] rounded-xl" />
        <span className="font-bold text-lg">
          <span className="text-[#22497C]">Grammai</span>
          <span className="text-[#FCC30A]">Pen</span>
        </span>
      </div>
      <div className="flex items-center gap-3">
        <Link href="/grammar" className="text-sm text-[#64748B] hover:text-[#22497C]">Grammar</Link>
        <Link href="/practice" className="text-sm text-[#64748B] hover:text-[#22497C]">Practice</Link>
        <div className="w-8 h-8 bg-[#22497C] rounded-full" />
      </div>
    </header>
  )
}
