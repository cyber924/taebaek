import DongForm from '@/components/forms/DongForm';
import Link from 'next/link';
import { ChevronLeft } from 'lucide-react';

export default function DongRegisterPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <Link 
        href="/dong" 
        className="inline-flex items-center text-muted-foreground hover:text-foreground mb-8"
      >
        <ChevronLeft className="h-4 w-4 mr-1" />
        행정동 목록으로 돌아가기
      </Link>
      
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">행정동 등록</h1>
        <div className="bg-card p-6 rounded-lg border">
          <DongForm />
        </div>
      </div>
    </div>
  );
}