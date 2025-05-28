import { createClient } from '@supabase/supabase-js';
import { TABLES } from './constants';

let supabase: ReturnType<typeof createClient> | null = null;

export function getSupabaseClient() {
  if (supabase) return supabase;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseAnonKey) {
    console.error('Supabase credentials missing:', {
      url: supabaseUrl ? '[PRESENT]' : '[MISSING]',
      key: supabaseAnonKey ? '[PRESENT]' : '[MISSING]',
      envKeys: Object.keys(process.env).filter(key => key.includes('SUPABASE'))
    });
    throw new Error('Supabase credentials are missing.');
  }

  try {
    console.log('Initializing Supabase client with URL:', supabaseUrl);
    supabase = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: true,
        detectSessionInUrl: false
      }
    });
    return supabase;
  } catch (error) {
    console.error('Error initializing Supabase client:', error);
    throw error;
  }
}

// 🔸 타입 정의
export type DongHeritage = {
  id: number;
  dong_id: string;
  dong_name: string;
  origin: string | null;
  history: string | null;
  summary: string | null;
  image_url: string | null;
};

export type PlaceType = 'cafe' | 'restaurant' | 'attraction' | 'recommendation';

export type Place = {
  id: number;
  place_name: string;
  type: PlaceType;
  address: string | null;
  description: string | null;
  image_url: string | null;
  tags: string[] | null;
};

export type Visit = {
  id: string;
  title: string;
  slug: string;
  content: string | null;
  created_at: string;
  updated_at: string;
  published: boolean;
};

// 🔸 동 유래 조회
export async function fetchDongList() {
  try {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from(TABLES.DONG_HERITAGE)
      .select('*')
      .order('dong_name', { ascending: true });

    if (error) throw error;
    return data as DongHeritage[];
  } catch (error) {
    console.error('Error in fetchDongList:', error);
    return [];
  }
}

export async function fetchDongById(dongId: string) {
  try {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from(TABLES.DONG_HERITAGE)
      .select('*')
      .eq('dong_id', dongId)
      .single();

    if (error) throw error;
    return data as DongHeritage;
  } catch (error) {
    console.error(`Error in fetchDongById (${dongId}):`, error);
    return null;
  }
}

// 🔸 지역 정보
export async function fetchPlacesList(type?: PlaceType | 'all') {
  try {
    const client = getSupabaseClient();
    let query = client.from(TABLES.PLACES).select('*').order('place_name', { ascending: true });

    if (type && type !== 'all') {
      query = query.eq('type', type);
    }

    const { data, error } = await query;
    if (error) throw error;
    return data as Place[];
  } catch (error) {
    console.error('Error in fetchPlacesList:', error);
    return [];
  }
}

export async function fetchPlaceById(placeId: string) {
  try {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from(TABLES.PLACES)
      .select('*')
      .eq('id', placeId)
      .single();

    if (error) throw error;
    return data as Place;
  } catch (error) {
    console.error(`Error in fetchPlaceById (${placeId}):`, error);
    return null;
  }
}

// 🔸 등록 기능 (동/장소/방문기록)
export async function createDong(dong: Omit<DongHeritage, 'id'>) {
  try {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from(TABLES.DONG_HERITAGE)
      .insert([dong])
      .select();

    if (error) throw error;
    return data[0] as DongHeritage;
  } catch (error) {
    console.error('Error in createDong:', error);
    throw error;
  }
}

export async function createPlace(place: Omit<Place, 'id'>) {
  try {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from(TABLES.PLACES)
      .insert([place])
      .select();

    if (error) throw error;
    return data[0] as Place;
  } catch (error) {
    console.error('Error in createPlace:', error);
    throw error;
  }
}

export async function createVisit(visit: Omit<Visit, 'id' | 'created_at' | 'updated_at' | 'published'>) {
  try {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from('visit')
      .insert([visit])
      .select()
      .single();

    if (error) throw error;
    return data as Visit;
  } catch (error) {
    console.error('Error in createVisit:', error);
    throw error;
  }
}

// 🔸 조회 기능
export async function fetchVisitList() {
  try {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from('visit')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    return data as Visit[];
  } catch (error) {
    console.error('Error in fetchVisitList:', error);
    return [];
  }
}

export async function fetchVisitBySlug(slug: string) {
  try {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from('visit')
      .select('*')
      .eq('slug', slug)
      .single();

    if (error) throw error;
    return data as Visit;
  } catch (error) {
    console.error(`Error in fetchVisitBySlug (${slug}):`, error);
    return null;
  }
}

// ✅ 수정 기능
export async function updateVisit(id: string, data: Partial<Visit>): Promise<Visit> {
  const client = getSupabaseClient();
  const { data: updated, error } = await client
    .from('visit')
    .update(data)
    .eq('id', id)
    .select()
    .single();

  if (error) {
    console.error('Error updating visit:', error);
    throw error;
  }

  return updated as Visit;
}

// ✅ 삭제 기능
export async function deleteVisit(id: string): Promise<void> {
  const client = getSupabaseClient();
  const { error } = await client
    .from('visit')
    .delete()
    .eq('id', id);

  if (error) {
    console.error('Error deleting visit:', error);
    throw error;
  }
}