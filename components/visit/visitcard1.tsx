import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { formatDate } from '@/lib/utils';
import { Visit } from '@/lib/supabase';

interface VisitCardProps {
  visit: Visit;
}

// Extract thumbnail from HTML content
function extractThumbnail(content: string): string | null {
  if (!content) return null;
  const match = content.match(/<img[^>]+src=["']([^"']+)["']/);
  return match ? match[1] : null;
}

export default function VisitCard({ visit }: VisitCardProps) {
  const thumbnail = extractThumbnail(visit.content || '');

  return (
    <Link href={`/visit/${visit.slug}`}>
      <Card className="hover:shadow-lg transition-all duration-200 overflow-hidden">
        {thumbnail && (
          <img
            src={thumbnail}
            alt={visit.title}
            className="w-full h-48 object-cover"
          />
        )}
        <CardContent className="p-5 space-y-2">
          <h3 className="text-lg font-semibold line-clamp-2">{visit.title}</h3>
          <p className="text-sm text-muted-foreground">
            {formatDate(visit.created_at)}
          </p>
        </CardContent>
      </Card>
    </Link>
  );
}