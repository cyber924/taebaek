'use client'

import { useState } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { deleteVisit, Visit } from '@/lib/supabase'
import { formatDate } from '@/lib/utils'
import VisitForm from './VisitForm'

interface VisitCardProps {
  visit: Visit
}

export default function VisitCard({ visit }: VisitCardProps) {
  const pathname = usePathname()
  const isAdmin = pathname.startsWith('/hidden')

  const [isEditing, setIsEditing] = useState(false)
  const [currentVisit, setCurrentVisit] = useState(visit)

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (!confirm('정말 삭제하시겠습니까?')) return
    await deleteVisit(currentVisit.id)
    window.location.reload()
  }

  const handleUpdateDone = (updated: Visit) => {
    setCurrentVisit(updated)
    setIsEditing(false)
  }

  const thumbnail = extractThumbnail(currentVisit.content || '')

  if (isEditing) {
    return (
      <VisitForm
        defaultValues={currentVisit}
        onSubmitDone={handleUpdateDone}
        onCancel={() => setIsEditing(false)}
      />
    )
  }

  return (
    <Link href={`/visit/${currentVisit.slug}`} className="block">
      <div className="relative hover:shadow-lg transition-all duration-200 overflow-hidden border rounded-lg p-4">
        {/* ✅ 관리자만 버튼 보이게 */}
        {isAdmin && (
          <div className="absolute top-2 right-2 flex gap-2 z-10\" onClick={(e) => e.preventDefault()}>
            <button
              className="text-sm text-blue-600 bg-white px-2 py-1 rounded hover:underline"
              onClick={(e) => {
                e.preventDefault()
                e.stopPropagation()
                setIsEditing(true)
              }}
            >
              수정
            </button>
            <button
              className="text-sm text-red-600 bg-white px-2 py-1 rounded hover:underline"
              onClick={handleDelete}
            >
              삭제
            </button>
          </div>
        )}

        {thumbnail && (
          <img
            src={thumbnail}
            alt={currentVisit.title}
            className="w-full h-48 object-cover rounded mb-4"
          />
        )}
        <h3 className="text-lg font-semibold line-clamp-2">{currentVisit.title}</h3>
        <p className="text-sm text-muted-foreground">{formatDate(currentVisit.created_at)}</p>
      </div>
    </Link>
  )
}

// ✅ 이미지 URL 추출 함수
function extractThumbnail(content?: string): string | null {
  if (!content) return null
  const match = content.match(/<img[^>]+src=["']([^"']+)["']/)
  return match ? match[1] : null
}