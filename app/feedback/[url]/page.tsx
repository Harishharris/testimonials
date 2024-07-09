'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useEffect, useState } from 'react';

import Image from 'next/image';

import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Star } from 'lucide-react';
import { Textarea } from '@/components/ui/textarea';
import { UploadButton } from '@uploadthing/react';
import { OurFileRouter } from '@/app/api/uploadthing/core';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Username must be at least 2 characters.',
  }),
  email: z.string().email({
    message: 'Please provide your e-mail',
  }),
  testimonial: z.string().min(20, {
    message: 'Please write atleast 20 characters',
  }),
  userPhotoUrl: z.string(),
  photos: z.string().array(),
  videoUrl: z.string().optional(),
});

export default function FeedbackPage({
  params: { url },
}: {
  params: { url: string };
}) {
  const [imageUrl, setImageUrl] = useState('');
  const [isSubmiting, setIsSubmitting] = useState(true);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      email: '',
      testimonial: '',
      userPhotoUrl: '',
      photos: [],
      videoUrl: '',
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const res = await fetch(`/api/create-testimonial`, {
        method: 'POST',
        body: JSON.stringify({
          ...values,
          spaceId: url,
        }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await res.json();
      console.log('[OK]', values);
    } catch (err: any) {
      console.log('[ERROR]', err.message);
    }
  }

  useEffect(() => {
    const getData = async () => {
      try {
        const res = await fetch(`/api/get-testimonials/${url}`);
        const data = await res.json();
        setImageUrl(data.message[0].imageUrl);
      } catch (err: any) {
        console.log('[ERROR]', err.message);
      }
    };
    getData();
  }, []);

  return (
    <div className="flex flex-col gap-2 max-w-[20%] m-auto justify-start py-2">
      <h2 className="font-bold">Write testimonial to </h2>
      <Image
        src={imageUrl}
        alt="image"
        width={200}
        height={100}
        className="rounded-lg"
      />
      <div>
        <h1 className="text-xl font-semibold my-4">Questions</h1>
        <ul>
          <li>Who are you / What are you working on?</li>
          <li>How has our product / service helped you?</li>
        </ul>
        <div className="flex gap-1 mt-4">
          <Star fill="yellow" />
          <Star fill="yellow" />
          <Star fill="yellow" />
          <Star fill="yellow" />
          <Star fill="yellow" />
        </div>
      </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your name"
                    {...field}
                    className="border focus:border-ring"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter your email"
                    {...field}
                    className="border focus:border-ring"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="testimonial"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Testimonial</FormLabel>
                <FormControl>
                  <Textarea {...field} className="border focus:border-ring" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <p>Attach Images(s)</p>
          <FormField
            control={form.control}
            name="photos"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <UploadButton<OurFileRouter, 'testimonialImages'>
                    endpoint="testimonialImages"
                    onClientUploadComplete={(res) => {
                      field.onChange(res.map((item) => item.url));
                      setIsSubmitting(false);
                      console.log(res.map((item) => item.url));
                    }}
                    onUploadError={(error: Error) => {}}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <p>Attach a short Video (optional)</p>
          <FormField
            control={form.control}
            name="videoUrl"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <UploadButton<OurFileRouter, 'testimonialImages'>
                    endpoint="testimonialImages"
                    onClientUploadComplete={(res) => {
                      field.onChange(res.map((item) => item.url));
                      setIsSubmitting(false);
                      console.log(res.map((item) => item.url));
                    }}
                    onUploadError={(error: Error) => {}}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button disabled={isSubmiting} type="submit">
            Submit
          </Button>
        </form>
      </Form>
    </div>
  );
}
