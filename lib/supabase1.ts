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
    throw new Error(
      'Supabase credentials are missing. Please check your .env file and ensure both NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set.'
    );
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

export async function fetchDongList() {
  try {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from(TABLES.DONG_HERITAGE)
      .select('*')
      .order('dong_name', { ascending: true });

    if (error) {
      console.error('Error fetching dong list:', error);
      throw error;
    }
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

    if (error) {
      console.error('Error fetching dong by ID:', error);
      throw error;
    }
    return data as DongHeritage;
  } catch (error) {
    console.error(`Error in fetchDongById (${dongId}):`, error);
    return null;
  }
}

export async function fetchPlacesList(type?: PlaceType | 'all') {
  try {
    const client = getSupabaseClient();
    let query = client
      .from(TABLES.PLACES)
      .select('*')
      .order('place_name', { ascending: true });

    if (type && type !== 'all') {
      query = query.eq('type', type);
    }

    const { data, error } = await query;
    if (error) {
      console.error('Supabase query error:', {
        error,
        type,
        table: TABLES.PLACES
      });
      throw error;
    }

    return data as Place[];
  } catch (error) {
    if (error instanceof Error) {
      if (error.message.includes('Invalid API key')) {
        console.error('Invalid Supabase API key. Please check your environment variables and ensure they match your Supabase project settings.');
      } else {
        console.error('Error fetching places list:', error);
      }
    }
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

    if (error) {
      console.error('Error fetching place by ID:', error);
      throw error;
    }
    return data as Place;
  } catch (error) {
    console.error(`Error in fetchPlaceById (${placeId}):`, error);
    return null;
  }
}

export async function createDong(dong: Omit<DongHeritage, 'id'>) {
  try {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from(TABLES.DONG_HERITAGE)
      .insert([dong])
      .select();

    if (error) {
      console.error('Error creating dong:', error);
      throw error;
    }
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

    if (error) {
      console.error('Error creating place:', error);
      throw error;
    }
    return data[0] as Place;
  } catch (error) {
    console.error('Error in createPlace:', error);
    throw error;
  }
}

export async function fetchVisitList() {
  try {
    const client = getSupabaseClient();
    const { data, error } = await client
      .from('visit')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching visit list:', error);
      throw error;
    }
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

    if (error) {
      console.error('Error fetching visit by slug:', error);
      throw error;
    }
    return data as Visit;
  } catch (error) {
    console.error(`Error in fetchVisitBySlug (${slug}):`, error);
    return null;
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

    if (error) {
      console.error('Error creating visit:', error);
      throw error;
    }
    return data as Visit;
  } catch (error) {
    console.error('Error in createVisit:', error);
    throw error;
  }
}