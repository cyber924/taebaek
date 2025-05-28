'use client'

import { useEffect, useState } from 'react';
import { fetchPlacesList, Place, PlaceType } from '@/lib/supabase';
import PlaceCard from '@/components/places/PlaceCard';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Skeleton } from '@/components/ui/skeleton';

const PLACE_TYPES: { label: string; value: PlaceType | 'all' }[] = [
  { label: '전체', value: 'all' },
  { label: '맛집', value: 'restaurant' },
  { label: '카페', value: 'cafe' },
  { label: '관광지', value: 'attraction' },
  { label: '추천', value: 'recommendation' },
];

export default function PlacesPage() {
  const [type, setType] = useState<PlaceType | 'all'>('all');
  const [places, setPlaces] = useState<Place[] | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetchPlacesList(type)
      .then((data) => {
        console.log('[DEBUG] fetch result:', data);
        setPlaces(data);
      })
      .finally(() => setLoading(false));
  }, [type]);

  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">태백시 지역정보</h1>
        <p className="text-muted-foreground">
          태백시의 맛집, 카페, 관광지 등 다양한 지역정보를 소개합니다.
        </p>
      </div>

      <Tabs defaultValue={type} onValueChange={(v) => setType(v as PlaceType | 'all')} className="mb-10">
        <TabsList className="grid w-full grid-cols-5 max-w-lg mx-auto">
          {PLACE_TYPES.map((tab) => (
            <TabsTrigger key={tab.value} value={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>

        <TabsContent value={type} className="mt-8">
          {loading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({ length: 6 }).map((_, i) => (
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
          ) : places?.length ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {places.map((place) => (
                <PlaceCard key={place.id} place={place} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground py-12">
              등록된 지역정보가 없습니다.
            </p>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}