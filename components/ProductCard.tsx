import Link from 'next/link'

export default function ProductCard({product}:{product:any}){
  return (
    <article className="bg-[#0e171e] p-4 rounded-lg border border-gray-800">
      <div className="flex justify-between items-start">
        <div className="text-xs text-[#43b7ae]">{product.cat}</div>
        <div className="text-xs text-[#d08a55]">#{String(product.id).padStart(3,'0')}</div>
      </div>
      <h3 className="mt-3 font-semibold">{product.name}</h3>
      <div className="text-gray-400 text-sm mt-2">{product.materials}</div>
      <div className="text-gray-400 text-sm">{product.sizes}</div>
      <div className="mt-4 flex gap-2">
        <Link href={`/catalog/${product.slug}`} className="px-3 py-1 border rounded">مشاهده</Link>
      </div>
    </article>
  )
}
