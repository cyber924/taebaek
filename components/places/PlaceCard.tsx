import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import { PlaceTypeBadge } from '@/components/ui/badge-custom';
import type { Place } from '@/lib/supabase';

interface PlaceCardProps {
  place: Place;
}

export default function PlaceCard({ place }: PlaceCardProps) {
  const placeholderImage = 'https://images.pexels.com/photos/3278215/pexels-photo-3278215.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
  
  return (
    <Card className="overflow-hidden group hover:shadow-md transition-all">
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={place.image_url || placeholderImage}
          alt={place.place_name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
        <div className="absolute top-2 left-2">
          <PlaceTypeBadge type={place.type} />
        </div>
      </div>
      
      <CardContent className="p-5">
        <h3 className="text-xl font-bold mb-2">{place.place_name}</h3>
        <p className="text-muted-foreground line-clamp-2 text-sm">
          {place.description?.substring(0, 100) || '지역 정보를 확인해보세요.'}
        </p>
        {place.tags && place.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-3">
            {place.tags.map((tag, index) => (
              <span 
                key={index} 
                className="text-xs px-2 py-1 bg-muted rounded-full"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
      </CardContent>
      
      <CardFooter className="px-5 pb-5 pt-0">
        <Link 
          href={`/places/${place.id}`}
          className="text-primary hover:underline inline-flex items-center text-sm font-medium"
        >
          자세히 보기 
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </CardFooter>
    </Card>
  );
}