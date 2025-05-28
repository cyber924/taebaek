import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { fetchVisitBySlug } from '@/lib/supabase';
import { formatDate } from '@/lib/utils';

interface PageProps {
  params: {
    slug: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const visit = await fetchVisitBySlug(params.slug);
  
  if (!visit) {
    return {
      title: '태백 현황을 찾을 수 없습니다 | 태백 유래맵',
    };
  }
  
  return {
    title: `${visit.title} | 태백 유래맵`,
    description: `태백 현황: ${visit.title}`,
  };
}

export default async function VisitDetailPage({ params }: PageProps) {
  const visit = await fetchVisitBySlug(params.slug);
  
  if (!visit) {
    notFound();
  }
  
  return (
    <div className="container mx-auto px-4 py-12">
      <nav className="flex items-center justify-center mb-8 text-sm font-medium space-x-4">
        <Link href="/dong" className="text-muted-foreground hover:text-foreground">
          행정동 유래
        </Link>
        <span className="text-muted-foreground">|</span>
        <Link href="/places" className="text-muted-foreground hover:text-foreground">
          지역 정보
        </Link>
        <span className="text-muted-foreground">|</span>
        <Link href="/visit" className="text-primary">
          현황
        </Link>
      </nav>
      
      <Link 
        href="/visit" 
        className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        목록으로 돌아가기
      </Link>
      
      <article className="max-w-4xl mx-auto">
        <header className="mb-8">
          <h1 className="text-4xl font-bold mb-4">{visit.title}</h1>
          <p className="text-muted-foreground">
            {formatDate(visit.created_at)}
          </p>
        </header>
        
        <div 
          className="prose prose-lg max-w-none dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: visit.content || '' }}
        />
      </article>
    </div>
  );
}