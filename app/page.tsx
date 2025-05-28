'use client';

import Link from 'next/link';
import { ArrowRight, Map, Info, MapPin } from 'lucide-react';

export default function Home() {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center">
        <div 
          className="absolute inset-0 bg-cover bg-center z-0" 
          style={{ 
            backgroundImage: "url('https://images.pexels.com/photos/12762311/pexels-photo-12762311.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2')",
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
        </div>
        
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              태백 유래맵 입니다.
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8">
              태백시의 역사와 행정동 유래, 지역 명소를 소개하는 서비스입니다.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link 
                href="/dong"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-primary text-primary-foreground hover:bg-primary/90 h-11 px-8"
              >
                행정동 유래 보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
              <Link
                href="/places"
                className="inline-flex items-center justify-center rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-white/10 backdrop-blur-sm text-white border-white/20 hover:bg-white/20 h-11 px-8"
              >
                지역정보 보기
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="py-16 bg-muted/30">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">일과 휴식이 공존하는 고원도시 태백</h2>
          <h2 className="text-2xl font-bold text-left mb-12"> 📅 오늘의 태백 날씨: 산뜻한 봄바람, 겉옷은 필수예요</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white rounded-xl p-6 shadow-md ring-1 ring-gray-200 hover:shadow-lg hover:ring-primary/50 transition-all duration-300 group">
  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-primary">
    <Map className="h-6 w-6 text-primary group-hover:text-white transition-colors duration-300" />
  </div>
  <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary transition-colors duration-300">
    행정동 유래
  </h3>
  <p className="text-gray-600 group-hover:text-gray-800 mb-4">
    태백시 행정동의 이름 유래와 역사적 배경에 대한 정보를 제공합니다.
  </p>
  <Link href="/dong" className="text-primary font-medium hover:underline inline-flex items-center">
    자세히 보기 <ArrowRight className="ml-1 h-4 w-4" />
  </Link>
</div>
     
           <div className="bg-white rounded-xl p-6 shadow-md ring-1 ring-gray-200 hover:shadow-lg hover:ring-primary/50 transition-all duration-300 group">
  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-primary">
    <MapPin className="h-6 w-6 text-primary group-hover:text-white transition-colors duration-300" />
  </div>
  <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary transition-colors duration-300">
    지역정보
  </h3>
  <p className="text-gray-600 group-hover:text-gray-800 mb-4">
    태백시의 맛집, 카페, 관광지 등 다양한 지역정보를 소개합니다.
  </p>
  <Link href="/places" className="text-primary font-medium hover:underline inline-flex items-center">
    자세히 보기 <ArrowRight className="ml-1 h-4 w-4" />
  </Link>
</div>
       
          <div className="bg-white rounded-xl p-6 shadow-md ring-1 ring-gray-200 hover:shadow-lg hover:ring-primary/50 transition-all duration-300 group">
  <div className="bg-primary/10 rounded-full w-12 h-12 flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-primary">
    <Info className="h-6 w-6 text-primary group-hover:text-white transition-colors duration-300" />
  </div>
  <h3 className="text-xl font-semibold mb-2 text-gray-900 group-hover:text-primary transition-colors duration-300">
    태백시 소개
  </h3>
  <p className="text-gray-600 group-hover:text-gray-800 mb-4">
    태백시의 역사와 문화, 관광자원에 대한 정보를 제공합니다.
  </p>
  <Link href="/visit" className="text-primary font-medium hover:underline inline-flex items-center">
    자세히 보기 <ArrowRight className="ml-1 h-4 w-4" />
  </Link>
</div>
 
          </div>
        </div>
      </section>
    </div>
  );
}