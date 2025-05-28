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
import { createDong } from '@/lib/supabase';

const formSchema = z.object({
  dong_id: z.string().min(1, { message: '행정동 ID는 필수입니다.' }),
  dong_name: z.string().min(1, { message: '행정동 이름은 필수입니다.' }),
  origin: z.string().optional(),
  history: z.string().optional(),
  summary: z.string().optional(),
  image_url: z.string().url({ message: '올바른 URL을 입력해주세요.' }).optional().or(z.literal('')),
});

type FormValues = z.infer<typeof formSchema>;

export default function DongForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      dong_id: '',
      dong_name: '',
      origin: '',
      history: '',
      summary: '',
      image_url: '',
    },
  });
  
  async function onSubmit(values: FormValues) {
    try {
      setIsSubmitting(true);
      
      // Transform empty strings to null for optional fields
      const formData = {
        ...values,
        origin: values.origin || null,
        history: values.history || null,
        summary: values.summary || null,
        image_url: values.image_url || null,
      };
      
      await createDong(formData);
      
      toast.success('행정동 정보가 성공적으로 등록되었습니다.', {
        action: {
          label: '확인하기',
          onClick: () => router.push('/dong'),
        },
      });
      
      form.reset();
    } catch (error) {
      console.error('Error creating dong:', error);
      toast.error('행정동 등록 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="dong_id"
          render={({ field }) => (
            <FormItem>
              <FormLabel>행정동 ID</FormLabel>
              <FormControl>
                <Input placeholder="hwangji" {...field} />
              </FormControl>
              <FormDescription>
                영문 소문자와 하이픈(-)만 사용하여 고유 ID를 입력하세요. (예: hwangji, jang-seong)
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="dong_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>행정동 이름</FormLabel>
              <FormControl>
                <Input placeholder="황지동" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="summary"
          render={({ field }) => (
            <FormItem>
              <FormLabel>요약</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="행정동에 대한 간략한 설명을 입력하세요." 
                  {...field} 
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="origin"
          render={({ field }) => (
            <FormItem>
              <FormLabel>유래</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="행정동 이름의 유래를 입력하세요." 
                  {...field} 
                  className="min-h-[150px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="history"
          render={({ field }) => (
            <FormItem>
              <FormLabel>역사</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="행정동의 역사적 배경을 입력하세요." 
                  {...field} 
                  className="min-h-[150px]"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="image_url"
          render={({ field }) => (
            <FormItem>
              <FormLabel>이미지 URL</FormLabel>
              <FormControl>
                <Input 
                  placeholder="https://example.com/image.jpg" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                행정동을 대표하는 이미지의 URL을 입력하세요.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/dong')}
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