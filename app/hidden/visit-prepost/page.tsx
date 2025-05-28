// app/hidden/visit-prepost/page.tsx
'use client';

import { useState } from 'react';

export default function VisitPrePostPage() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrls, setImageUrls] = useState('');
  const [template, setTemplate] = useState('1');
  const [htmlCode, setHtmlCode] = useState('');

  const generateHTML = () => {
    if (!title || !content) return;

    const paragraphs = content.split('\n').filter(Boolean);
    const imageList = imageUrls.split('\n').filter((url) => url.startsWith('http'));

    const buildImageBlock = (src: string) =>
      `<div style=\"margin-bottom: 24px;\">
        <img src=\"${src}\" alt=\"이미지\" style=\"width: 100%; max-height: 320px; object-fit: cover; border-radius: 6px; box-shadow: 0 2px 6px rgba(0,0,0,0.1);\" />
      </div>`;

    const imageBlocks = imageList.map(buildImageBlock).join('\n');

    const paragraphHTML = paragraphs
      .map((text) => `<p>${text}</p>`) 
      .join('\n\n');

    const memoBlock = `
    <div style=\"background-color: #f8fafc; border: 1px solid #cbd5e1; border-radius: 6px; padding: 16px 20px; margin-top: 24px;\">
      <h3 style=\"margin: 0; color: #0f172a; font-weight: bold; font-size: 1rem; margin-bottom: 8px;\">📝 짧은 메모</h3>
      <ul style=\"padding-left: 1.2em; margin: 0; color: #334155;\">
        <li>장소명: ${title}</li>
        <li>작성일: ${new Date().toLocaleDateString()}</li>
        <li>추천 포인트: 자연, 풍경, 휴식</li>
      </ul>
    </div>`;

    let finalHTML = '';

    if (template === '1') {
      // 기본 웹진 스타일
      finalHTML = `
      <section style=\"max-width: 800px; margin: 0 auto; padding: 32px; font-family: sans-serif; font-size: 15px; line-height: 1.8; color: #1f2937;\">
        <div style=\"background-color: #f1f5f9; padding: 16px 20px; border-left: 6px solid #3b82f6; border-radius: 6px; margin-bottom: 24px;\">
          <h1 style=\"margin: 0; font-size: 1.5rem; color: #1d4ed8; font-weight: bold;\">${title}</h1>
          <p style=\"margin-top: 4px; color: #475569; font-size: 0.875rem;\">태백에서의 소중한 기록</p>
        </div>
        ${imageBlocks}
        <article style=\"display: flex; flex-direction: column; gap: 24px;\">
          ${paragraphHTML}
        </article>
        ${memoBlock}
      </section>`;
    } else if (template === '2') {
      // 자연 + 여백 강조형
      finalHTML = `
      <section style=\"max-width: 880px; margin: 0 auto; padding: 40px; font-family: sans-serif; font-size: 15px; line-height: 1.8; color: #1f2937;\">
        <div style=\"background-color: #ecfdf5; padding: 16px 20px; border-left: 6px solid #10b981; border-radius: 6px; margin-bottom: 28px;\">
          <h1 style=\"margin: 0; font-size: 1.5rem; color: #047857; font-weight: bold;\">${title}</h1>
          <p style=\"margin-top: 4px; color: #065f46; font-size: 0.875rem;\">자연이 주는 휴식과 회복의 공간</p>
        </div>
        ${imageBlocks}
        <article style=\"display: flex; flex-direction: column; gap: 20px;\">
          ${paragraphHTML}
        </article>
        ${memoBlock}
      </section>`;
    } else {
      // 워케이션/기사형 스타일
      finalHTML = `
      <section style=\"max-width: 880px; margin: 0 auto; padding: 40px; font-family: sans-serif; font-size: 15px; line-height: 1.8; color: #1f2937;\">
        <div style=\"background-color: #eff6ff; padding: 16px 20px; border-left: 6px solid #3b82f6; border-radius: 6px; margin-bottom: 28px;\">
          <h1 style=\"margin: 0; font-size: 1.6rem; color: #1d4ed8; font-weight: bold;\">${title}</h1>
          <p style=\"margin-top: 4px; color: #334155; font-size: 0.9rem;\">도시를 떠나 찾은 태백의 특별한 순간</p>
        </div>
        ${imageBlocks}
        <article style=\"display: flex; flex-direction: column; gap: 26px;\">
          ${paragraphHTML}
        </article>
        ${memoBlock}
      </section>`;
    }

    setHtmlCode(finalHTML);
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">📝 태백 콘텐츠 자동 HTML 생성기</h1>

      <div>
        <label className="block font-medium mb-1">제목</label>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border rounded p-2"
          placeholder="예: 태백 워케이션의 하루"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">내용 (문단은 줄바꿈으로 구분)</label>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          className="w-full border rounded p-2 h-40"
          placeholder="한 문단씩 줄바꿈해주세요."
        />
      </div>

      <div>
        <label className="block font-medium mb-1">이미지 URL (1~3개, 줄바꿈)</label>
        <textarea
          value={imageUrls}
          onChange={(e) => setImageUrls(e.target.value)}
          className="w-full border rounded p-2 h-24"
          placeholder="https://...jpg\nhttps://...png"
        />
      </div>

      <div>
        <label className="block font-medium mb-1">출력 양식 선택</label>
        <select
          value={template}
          onChange={(e) => setTemplate(e.target.value)}
          className="w-full border rounded p-2"
        >
          <option value="1">1. 웹진형 템플릿 (감성 후기)</option>
          <option value="2">2. 자연 중심 템플릿 (풍경/계곡)</option>
          <option value="3">3. 전문 기사형 템플릿 (워크/축제)</option>
        </select>
      </div>

      <button
        onClick={generateHTML}
        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-4 py-2 rounded"
      >
        HTML 생성하기
      </button>

      {htmlCode && (
        <div>
          <h2 className="font-semibold mb-2 mt-6">🔧 생성된 HTML</h2>
          <pre className="bg-gray-100 text-sm p-4 rounded whitespace-pre-wrap">{htmlCode}</pre>
        </div>
      )}
    </div>
  );
}
