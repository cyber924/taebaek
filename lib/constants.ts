// Supabase Table Names
export const TABLES = {
  DONG_HERITAGE: 'taebaek_dong_heritage',
  PLACES: 'spot',
  VISIT: 'visit',
} as const;

// Loading States
export const LOADING_MESSAGES = {
  DONG_LIST: '행정동 목록을 불러오는 중입니다...',
  PLACE_LIST: '지역정보를 불러오는 중입니다...',
  VISIT_LIST: '태백 현황을 불러오는 중입니다...',
} as const;