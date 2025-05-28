import Link from 'next/link';
import { Map } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-gray-50 dark:bg-gray-900 border-t">
      <div className="container mx-auto px-4 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link href="/" className="flex items-center gap-2">
              <Map className="h-5 w-5 text-primary" />
              <span className="text-lg font-bold text-primary">태백 유래맵</span>
            </Link>
            <p className="mt-2 text-sm text-muted-foreground">
              태백시의 역사와 행정동 유래, 지역 명소를 소개하는 서비스입니다.
            </p>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">사이트맵</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/dong" className="text-sm text-muted-foreground hover:text-primary transition">
                  행정동 유래
                </Link>
              </li>
              <li>
                <Link href="/places" className="text-sm text-muted-foreground hover:text-primary transition">
                  지역정보
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-sm font-semibold mb-4">관련 정보</h3>
            <ul className="space-y-2">
              <li>
                <a 
                  href="https://www.taebaek.go.kr" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition"
                >
                  태백시청
                </a>
              </li>
              <li>
                <a 
                  href="https://www.taebaek.go.kr/tour/" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-sm text-muted-foreground hover:text-primary transition"
                >
                  태백시 관광
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-200 dark:border-gray-800">
          <p className="text-xs text-center text-muted-foreground">
            © {new Date().getFullYear()} 태백 유래맵. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}