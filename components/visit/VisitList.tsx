'use client'

import { Visit } from '@/lib/supabase'
import VisitCard from './VisitCard'

interface VisitListProps {
  visits: Visit[]
}

export default function VisitList({ visits }: VisitListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {visits.map((visit) => (
        <VisitCard key={visit.id} visit={visit} />
      ))}
    </div>
  )
}
