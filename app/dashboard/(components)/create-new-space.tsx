'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';

import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/navigation';

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
import { useToast } from '@/components/ui/use-toast';
import { UploadButton } from '@uploadthing/react';
import { OurFileRouter } from '@/app/api/uploadthing/core';

const formSchema = z.object({
  name: z.string().min(2, {
    message: 'Website name must be atlease 8 characters',
  }),
  url: z.string().url({
    message: 'Website must start with http://',
  }),
  imageUrl: z.string().url({
    message: 'Image is required',
  }),
});

export default function CreateButton() {
  const { toast } = useToast();
  const [isOpened, setIsOpened] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      url: '',
      imageUrl: '',
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      const res = await fetch('/api/create', {
        method: 'POST',
        body: JSON.stringify({
          ...values,
          imageUrl,
        }),
      });
    } catch (err) {
      setErrorMessage('Something went wrong. Try again!');
      return;
    }
    setIsOpened(false);
    toast({
      title: 'Space created successfully',
    });
    router.refresh();
  };

  return (
    <div className="mt-6">
      <Dialog
        open={isOpened}
        onOpenChange={() => setIsOpened((prevState) => !prevState)}
      >
        <DialogTrigger asChild>
          <Button>
            <div className="flex items-center justify-center gap-2">
              <div className="text-2xl">+</div>
              Create new space
            </div>
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create a new space</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter your website name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Website name"
                          className="border"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="url"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Enter url</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Website url"
                          className="border"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="imageUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Attach Image</FormLabel>
                      <FormControl>
                        <UploadButton<OurFileRouter, 'spaceImage'>
                          endpoint="spaceImage"
                          onClientUploadComplete={(res) => {
                            field.onChange(res[0].url);
                          }}
                          onUploadError={(error: Error) => {}}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button className="my-4 text" type="submit">
                  Submit
                </Button>
                {errorMessage && <p>{errorMessage}</p>}
              </form>
            </Form>
          </DialogDescription>
        </DialogContent>
      </Dialog>
    </div>
  );
}
