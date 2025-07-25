
'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Textarea } from '@/components/ui/textarea';
import { useRouter } from 'next/navigation';
import type { Review } from '@/types/review';
import { useReview } from '@/contexts/review-context';
import { useEffect, useState }from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import { Slider } from '@/components/ui/slider';

const formSchema = z.object({
  id: z.string(),
  name: z.string().min(2, 'Name must be at least 2 characters.'),
  company: z.string().min(2, 'Company name is required.'),
  quote: z.string().min(20, 'Quote must be at least 20 characters.'),
  avatar: z.string().url('Please enter a valid image URL.'),
  dataAiHint: z.string().min(1, 'AI hint is required.'),
  rating: z.number().min(1).max(5),
  pinned: z.boolean(),
});

type ReviewFormProps = {
  reviewToEdit?: Review;
};

export function ReviewForm({ reviewToEdit }: ReviewFormProps) {
  const { toast } = useToast();
  const router = useRouter();
  const { addReview, updateReview } = useReview();
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: reviewToEdit || {
      id: new Date().getTime().toString(),
      name: '',
      company: '',
      quote: '',
      avatar: 'https://placehold.co/100x100.png',
      dataAiHint: 'person portrait',
      rating: 5,
      pinned: false,
    },
  });

  useEffect(() => {
    if (reviewToEdit) {
      form.reset(reviewToEdit);
    }
  }, [reviewToEdit, form]);

  function onSubmit(values: z.infer<typeof formSchema>) {
    if (reviewToEdit) {
      updateReview(reviewToEdit.id, values);
      toast({
        title: 'Review Updated!',
        description: 'The review has been successfully updated.',
      });
    } else {
      addReview(values);
      toast({
        title: 'Review Created!',
        description: 'The new review has been successfully created.',
      });
    }

    router.push('/admin/reviews');
  }

  return (
    <div className="space-y-6">
       <CardHeader className="px-0">
          <CardTitle>{reviewToEdit ? 'Edit Review' : 'Create New Review'}</CardTitle>
          <CardDescription>Fill out the details below to {reviewToEdit ? 'update the' : 'create a new'} client testimonial.</CardDescription>
        </CardHeader>
      
        <Card>
            <CardContent className="pt-6">
            {isClient && (
                <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField
                            control={form.control}
                            name="name"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Reviewer Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="John Doe" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="company"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Company Name</FormLabel>
                                <FormControl>
                                    <Input placeholder="Acme Inc." {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>

                    <FormField
                        control={form.control}
                        name="quote"
                        render={({ field }) => (
                            <FormItem>
                            <FormLabel>Quote</FormLabel>
                            <FormControl>
                                <Textarea placeholder="A glowing review from the client..." {...field} />
                            </FormControl>
                            <FormMessage />
                            </FormItem>
                        )}
                    />

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <FormField
                            control={form.control}
                            name="avatar"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Avatar URL</FormLabel>
                                <FormControl>
                                    <Input placeholder="https://placehold.co/100x100.png" {...field} />
                                </FormControl>
                                <FormDescription>Recommended size: 100x100 pixels.</FormDescription>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="dataAiHint"
                            render={({ field }) => (
                                <FormItem>
                                <FormLabel>Avatar AI Hint</FormLabel>
                                <FormControl>
                                    <Input placeholder="woman smiling" {...field} />
                                </FormControl>
                                <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    
                    <FormField
                      control={form.control}
                      name="rating"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Rating: {field.value} Stars</FormLabel>
                          <FormControl>
                            <Slider
                              min={1}
                              max={5}
                              step={1}
                              value={[field.value]}
                              onValueChange={(value) => field.onChange(value[0])}
                            />
                          </FormControl>
                        </FormItem>
                      )}
                    />
                    
                    <FormField
                        control={form.control}
                        name="pinned"
                        render={({ field }) => (
                            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                                <FormControl>
                                    <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    />
                                </FormControl>
                                <div className="space-y-1 leading-none">
                                    <FormLabel>Pin Review</FormLabel>
                                    <FormDescription>
                                        Pinned reviews are featured more prominently on the site.
                                    </FormDescription>
                                </div>
                            </FormItem>
                        )}
                    />

                    <div className="flex gap-4">
                        <Button type="submit">{reviewToEdit ? 'Update Review' : 'Create Review'}</Button>
                        <Button type="button" variant="outline" onClick={() => router.back()}>Cancel</Button>
                    </div>
                </form>
                </Form>
            )}
            </CardContent>
        </Card>
    </div>
  );
}
