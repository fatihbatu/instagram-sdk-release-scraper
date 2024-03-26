import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
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
import { Version } from '@/app/types';

const formSchema = z.object({
  versionId: z.string().nonempty(),
  releaseDate: z.string().nonempty(),
  variantCount: z.number().int(),
});

const FormCard = ({
  data,
  updateVersion,
}: {
  data: Version;
  updateVersion: (version: Version) => void;
}) => {
  // 1. Define your form.
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      versionId: data.versionId,
      releaseDate: data.releaseDate,
      variantCount: data.variantCount,
    },
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    updateVersion(values);
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="versionId"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Version ID</FormLabel>
              <FormControl>
                <Input defaultValue={field.value} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="releaseDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Release Date</FormLabel>
              <FormControl>
                <Input defaultValue={field.value} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="variantCount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Variant Count</FormLabel>
              <FormControl>
                <Input defaultValue={field.value} {...field} />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
};

export default FormCard;
