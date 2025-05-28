import { fetchVisitList } from '@/lib/supabase';
import VisitList from '@/components/visit/VisitList';

export default async function VisitPage() {
  const visits = await fetchVisitList();
  
  return (
    <div className="container mx-auto px-4 py-12">
      <div className="max-w-3xl mx-auto text-center mb-12">
        <h1 className="text-3xl font-bold mb-4">태백 현황</h1>
        <p className="text-muted-foreground">
          태백시의 현황과 최신정보를 확인하실 수 있습니다.
        </p>
      </div>
      
      {visits.length > 0 ? (
        <VisitList visits={visits} />
      ) : (
        <p className="text-center text-muted-foreground py-12">
          등록된 태백 현황이 없습니다.
        </p>
      )}
    </div>
  );
}