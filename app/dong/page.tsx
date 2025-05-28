import { Suspense } from 'react';
import { fetchDongList } from '@/lib/supabase';
import DongCard from '@/components/dong/DongCard';
import { Skeleton } from '@/components/ui/skeleton';

async function DongList() {
  const dongList = await fetchDongList();
  
  console.log('Fetched dong list:', dongList); // Debug log
  
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {dongList && dongList.length > 0 ? (
        dongList.map((dong) => (
          <DongCard key={dong.id} dong={dong} />
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <p className="text-muted-foreground">등록된 행정동 정보가 없습니다.</p>
        </div>
      )}
    </div>
  );
}

function DongListSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="rounded-lg overflow-hidden">
          <Skeleton className="h-48 w-full" />
          <div className="p-5">
            <Skeleton className="h-6 w-3/4 mb-4" />
            <Skeleton className="h-4 w-full mb-2" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default function DongPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">태백시 행정동 유래</h1>
        <p className="text-muted-foreground">
          태백시 행정동의 이름 유래와 역사적 배경을 소개합니다.
        </p>
      </div>
      
      <Suspense fallback={<DongListSkeleton />}>
        <DongList />
      </Suspense>
    </div>
  );
}