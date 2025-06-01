export const dynamic = 'force-dynamic'; // ✅ 이 줄 추가

import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft } from 'lucide-react';
import { fetchDongById, fetchDongList } from '@/lib/supabase';

interface PageProps {
  params: {
    dongId: string;
  };
}

// This function is required for static site generation with dynamic routes
export async function generateStaticParams() {
  try {
    const dongs = await fetchDongList();
    return dongs.map((dong) => ({
      dongId: dong.dong_id,
    }));
  } catch (error) {
    console.error('Error generating static params:', error);
    return [];
  }
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  if (!params.dongId || typeof params.dongId !== 'string') {
    return {
      title: '행정동 정보를 찾을 수 없습니다 | 태백 유래맵',
    };
  }

  try {
    const dong = await fetchDongById(params.dongId);
    
    if (!dong) {
      return {
        title: '행정동 정보를 찾을 수 없습니다 | 태백 유래맵',
      };
    }
    
    return {
      title: `${dong.dong_name} | 태백 유래맵`,
      description: dong.summary || `${dong.dong_name}의 유래와 역사적 배경을 소개합니다.`,
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: '행정동 정보를 찾을 수 없습니다 | 태백 유래맵',
    };
  }
}

export default async function DongDetailPage({ params }: PageProps) {
  if (!params.dongId || typeof params.dongId !== 'string') {
    notFound();
  }

  try {
    const dong = await fetchDongById(params.dongId);
    
    if (!dong) {
      notFound();
    }
    
    const placeholderImage = 'https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
    
    return (
      <div className="container mx-auto px-4 py-12">
        <Link 
          href="/dong" 
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          목록으로 돌아가기
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <h1 className="text-4xl font-bold">{dong.dong_name}</h1>
            
            {dong.summary && (
              <div className="bg-muted/30 p-6 rounded-lg border">
                <p className="italic text-muted-foreground text-lg leading-relaxed">{dong.summary}</p>
              </div>
            )}
            
            {dong.origin && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">유래</h2>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  {dong.origin.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>
            )}
            
            {dong.history && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">역사</h2>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  {dong.history.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div>
            <div className="sticky top-24 space-y-6">
              <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                <Image
                  src={dong.image_url || placeholderImage}
                  alt={dong.dong_name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
              
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="font-medium mb-3">지역 정보</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  {dong.dong_name}의 다양한 지역 정보를 확인해보세요.
                </p>
                <Link
                  href="/places"
                  className="text-primary hover:underline text-sm font-medium"
                >
                  지역 정보 보기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering dong detail:', error);
    notFound();
  }
}
