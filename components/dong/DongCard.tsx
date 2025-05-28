import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { ArrowRight } from 'lucide-react';
import type { DongHeritage } from '@/lib/supabase';

interface DongCardProps {
  dong: DongHeritage;
}

export default function DongCard({ dong }: DongCardProps) {
  const placeholderImage = 'https://images.pexels.com/photos/681335/pexels-photo-681335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2';
  
  return (
    <Card className="overflow-hidden group hover:shadow-md transition-all">
      <div className="aspect-video relative overflow-hidden">
        <Image
          src={dong.image_url || placeholderImage}
          alt={dong.dong_name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>
      
      <CardContent className="p-5">
        <h3 className="text-xl font-bold mb-2">{dong.dong_name}</h3>
        <p className="text-muted-foreground line-clamp-2 text-sm">
          {dong.summary || '행정동 유래 정보를 확인해보세요.'}
        </p>
      </CardContent>
      
      <CardFooter className="px-5 pb-5 pt-0">
        <Link 
          href={`/dong/${dong.dong_id}`}
          className="text-primary hover:underline inline-flex items-center text-sm font-medium"
        >
          자세히 보기 
          <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
        </Link>
      </CardFooter>
    </Card>
  );
}