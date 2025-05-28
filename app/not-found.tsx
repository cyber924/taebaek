import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

export default function NotFound() {
  return (
    <div className="container flex flex-col items-center justify-center h-[80vh] px-4 text-center">
      <h1 className="text-6xl font-bold mb-6">404</h1>
      <h2 className="text-2xl font-semibold mb-4">페이지를 찾을 수 없습니다</h2>
      <p className="text-muted-foreground mb-8 max-w-md">
        요청하신 페이지가 존재하지 않거나 다른 URL로 변경되었을 수 있습니다.
      </p>
      <Button asChild>
        <Link href="/">
          <ArrowLeft className="mr-2 h-4 w-4" />
          홈으로 돌아가기
        </Link>
      </Button>
    </div>
  );
}