'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { createVisit } from '@/lib/supabase';

const formSchema = z.object({
  title: z.string().min(1, { message: '제목은 필수입니다.' }),
  slug: z.string()
    .min(1, { message: 'URL 슬러그는 필수입니다.' })
    .regex(/^[a-z0-9-]+$/, { message: '영문 소문자, 숫자, 하이픈(-)만 사용할 수 있습니다.' }),
  content: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function VisitForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      slug: '',
      content: '',
    },
  });
  
  async function onSubmit(values: FormValues) {
    try {
      setIsSubmitting(true);
      
      const visit = await createVisit({
        title: values.title,
        slug: values.slug,
        content: values.content || null,
      });
      
      toast.success('태백 현황이 성공적으로 등록되었습니다.');
      router.push(`/visit/${visit.slug}`);
    } catch (error) {
      console.error('Error creating visit:', error);
      toast.error('태백 현황 등록 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>제목</FormLabel>
              <FormControl>
                <Input placeholder="제목을 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="slug"
          render={({ field }) => (
            <FormItem>
              <FormLabel>URL 슬러그</FormLabel>
              <FormControl>
                <Input placeholder="url-friendly-slug" {...field} />
              </FormControl>
              <FormDescription>
                영문 소문자, 숫자, 하이픈(-)을 사용하여 URL 친화적인 슬러그를 입력하세요.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>내용</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="HTML 형식으로 내용을 입력하세요" 
                  className="min-h-[300px] font-mono"
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                HTML 태그를 사용하여 내용을 작성할 수 있습니다.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/visit')}
            disabled={isSubmitting}
          >
            취소
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? '등록 중...' : '등록하기'}
          </Button>
        </div>
      </form>
    </Form>
  );
}