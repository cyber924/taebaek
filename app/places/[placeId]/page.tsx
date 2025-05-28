import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { ChevronLeft, MapPin } from 'lucide-react';
import { fetchPlaceById } from '@/lib/supabase';
import { PlaceTypeBadge } from '@/components/ui/badge-custom';

interface PageProps {
  params: {
    placeId: string;
  };
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  if (!params.placeId || typeof params.placeId !== 'string') {
    return {
      title: '지역정보를 찾을 수 없습니다 | 태백 유래맵',
    };
  }

  try {
    const place = await fetchPlaceById(params.placeId);
    
    if (!place) {
      return {
        title: '지역정보를 찾을 수 없습니다 | 태백 유래맵',
      };
    }
    
    return {
      title: `${place.place_name} | 태백 유래맵`,
      description: place.description || `${place.place_name}에 대한 정보를 소개합니다.`,
    };
  } catch (error) {
    console.error('Error generating metadata:', error);
    return {
      title: '지역정보를 찾을 수 없습니다 | 태백 유래맵',
    };
  }
}

export default async function PlaceDetailPage({ params }: PageProps) {
  if (!params.placeId || typeof params.placeId !== 'string') {
    notFound();
  }

  try {
    const place = await fetchPlaceById(params.placeId);
    
    if (!place) {
      notFound();
    }
    
    const placeholderImage = 'https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
    
    return (
      <div className="container mx-auto px-4 py-12">
        <Link 
          href="/places" 
          className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8"
        >
          <ChevronLeft className="h-4 w-4 mr-1" />
          목록으로 돌아가기
        </Link>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-8">
            <div className="flex items-center gap-3">
              <h1 className="text-4xl font-bold">{place.place_name}</h1>
              <PlaceTypeBadge type={place.type} />
            </div>
            
            {place.description && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">소개</h2>
                <div className="prose prose-lg max-w-none dark:prose-invert">
                  {place.description.split('\n').map((paragraph, index) => (
                    <p key={index} className="mb-4">{paragraph}</p>
                  ))}
                </div>
              </div>
            )}
            
            {place.tags && place.tags.length > 0 && (
              <div>
                <h2 className="text-2xl font-semibold mb-4">태그</h2>
                <div className="flex flex-wrap gap-2">
                  {place.tags.map((tag, index) => (
                    <span 
                      key={index} 
                      className="px-4 py-2 bg-muted rounded-full text-sm font-medium"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          <div>
            <div className="sticky top-24 space-y-6">
              <div className="aspect-[4/3] relative overflow-hidden rounded-lg">
                <Image
                  src={place.image_url || placeholderImage}
                  alt={place.place_name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  priority
                />
              </div>
              
              {place.address && (
                <div className="bg-card p-6 rounded-lg border">
                  <h3 className="font-medium mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4" /> 주소
                  </h3>
                  <p className="text-muted-foreground">
                    {place.address}
                  </p>
                </div>
              )}
              
              <div className="bg-card p-6 rounded-lg border">
                <h3 className="font-medium mb-3">지역 정보</h3>
                <p className="text-sm text-muted-foreground mb-4">
                  태백시의 다양한 지역 정보를 더 확인해보세요.
                </p>
                <Link
                  href="/places"
                  className="text-primary hover:underline text-sm font-medium"
                >
                  다른 지역 정보 보기
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  } catch (error) {
    console.error('Error rendering place detail:', error);
    notFound();
  }
}