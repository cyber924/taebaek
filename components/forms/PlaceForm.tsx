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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { createPlace, PlaceType } from '@/lib/supabase';

const formSchema = z.object({
  place_name: z.string().min(1, { message: '장소 이름은 필수입니다.' }),
  type: z.enum(['cafe', 'restaurant', 'attraction', 'recommendation'], {
    required_error: '장소 유형은 필수입니다.',
  }),
  address: z.string().optional(),
  description: z.string().optional(),
  image_url: z.string().url({ message: '올바른 URL을 입력해주세요.' }).optional().or(z.literal('')),
  tags: z.string().optional(),
});

type FormValues = z.infer<typeof formSchema>;

export default function PlaceForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      place_name: '',
      type: 'attraction',
      address: '',
      description: '',
      image_url: '',
      tags: '',
    },
  });
  
  async function onSubmit(values: FormValues) {
    try {
      setIsSubmitting(true);
      
      // Transform tags string to array
      const tagsArray = values.tags
        ? values.tags.split(',').map(tag => tag.trim()).filter(Boolean)
        : null;
      
      // Transform empty strings to null for optional fields
      const formData = {
        place_name: values.place_name,
        type: values.type as PlaceType,
        address: values.address || null,
        description: values.description || null,
        image_url: values.image_url || null,
        tags: tagsArray,
      };
      
      await createPlace(formData);
      
      toast.success('지역정보가 성공적으로 등록되었습니다.', {
        action: {
          label: '확인하기',
          onClick: () => router.push('/places'),
        },
      });
      
      form.reset();
    } catch (error) {
      console.error('Error creating place:', error);
      toast.error('지역정보 등록 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  }
  
  const placeTypeLabels = {
    cafe: '카페',
    restaurant: '맛집',
    attraction: '관광지',
    recommendation: '추천',
  };
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="place_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>장소 이름</FormLabel>
              <FormControl>
                <Input placeholder="장소 이름을 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>장소 유형</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="장소 유형을 선택하세요" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {Object.entries(placeTypeLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>주소</FormLabel>
              <FormControl>
                <Input placeholder="주소를 입력하세요" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>소개</FormLabel>
              <FormControl>
                <Textarea 
                  placeholder="장소에 대한 소개를 입력하세요" 
                  className="min-h-[150px]"
                  {...field} 
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
                장소를 대표하는 이미지의 URL을 입력하세요.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control}
          name="tags"
          render={({ field }) => (
            <FormItem>
              <FormLabel>태그</FormLabel>
              <FormControl>
                <Input 
                  placeholder="태그1, 태그2, 태그3" 
                  {...field} 
                />
              </FormControl>
              <FormDescription>
                쉼표(,)로 구분하여 여러 태그를 입력하세요.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
        <div className="flex justify-end gap-4">
          <Button
            type="button"
            variant="outline"
            onClick={() => router.push('/places')}
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