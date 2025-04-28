'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { useToast } from '@/hooks/use-toast';
import { useState } from 'react';
import { Loader2 } from 'lucide-react';
// import { uploadPolicy } from '@/services/policy-upload'; // Import the service

// Define the n8n webhook URL (consider moving to .env)
const N8N_WEBHOOK_URL = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL || 'YOUR_N8N_WEBHOOK_URL'; // Replace with your actual webhook URL or use env var

const policySchema = z.object({
  policyFile: z
    .custom<FileList>((val) => val instanceof FileList && val.length > 0, 'Se requiere un archivo PDF.')
    .refine((files) => files?.[0]?.type === 'application/pdf', 'El archivo debe ser un PDF.')
    .refine((files) => files?.[0]?.size <= 5 * 1024 * 1024, 'El archivo no debe exceder 5MB.'), // Example size limit
  insuranceType: z.string().min(1, { message: 'Selecciona un tipo de seguro.' }),
});

type PolicyFormValues = z.infer<typeof policySchema>;

interface PolicyUploadFormProps {
    userId: string;
}

export default function PolicyUploadForm({ userId }: PolicyUploadFormProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);

  const form = useForm<PolicyFormValues>({
    resolver: zodResolver(policySchema),
    defaultValues: {
      policyFile: undefined,
      insuranceType: '',
    },
  });

  const fileRef = form.register("policyFile");

  async function onSubmit(values: PolicyFormValues) {
    setIsLoading(true);

    const file = values.policyFile[0];

    const formData = new FormData();
    formData.append('policyFile', file);
    formData.append('insuranceType', values.insuranceType);
    formData.append('userId', userId); // Add userId to the form data

    try {
       // Send data to n8n webhook
       const response = await fetch(N8N_WEBHOOK_URL, {
         method: 'POST',
         body: formData,
         // Note: Don't set Content-Type header when using FormData,
         // the browser will set it correctly with the boundary.
       });

       if (!response.ok) {
         // Try to get error details from the response if possible
         let errorMessage = `Error ${response.status}: ${response.statusText}`;
         try {
           const errorData = await response.json();
           errorMessage = errorData.message || errorMessage;
         } catch (e) {
           // Ignore if response is not JSON
         }
         throw new Error(`Error al enviar a n8n: ${errorMessage}`);
       }

       // Optional: Process n8n response if needed
       // const result = await response.json();
       // console.log('n8n response:', result);

       toast({
         title: '¡Éxito!',
         description: 'Tu póliza fue enviada correctamente. Pronto estará lista para analizar.',
       });
       form.reset(); // Reset form after successful submission

    } catch (error: any) {
      console.error('Error uploading policy:', error);
      toast({
        variant: 'destructive',
        title: 'Error al subir la póliza',
        description: error.message || 'Ocurrió un error inesperado al enviar los datos.',
      });
    } finally {
      setIsLoading(false);
    }
  }


  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormField
          control={form.control}
          name="policyFile"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Archivo de Póliza (PDF, máx 5MB)</FormLabel>
              <FormControl>
                 <Input
                    type="file"
                    accept="application/pdf"
                    {...fileRef}
                    onChange={(event) => {
                        field.onChange(event.target?.files);
                    }}
                    className="file:text-primary-foreground file:bg-primary hover:file:bg-primary/90 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold"
                 />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="insuranceType"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Tipo de Seguro</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Selecciona el tipo de seguro" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Hogar">Hogar</SelectItem>
                  <SelectItem value="Auto">Auto</SelectItem>
                  <SelectItem value="Salud">Salud</SelectItem>
                  <SelectItem value="Vida">Vida</SelectItem>
                  <SelectItem value="Otros">Otros</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Subiendo y Analizando...
            </>
          ) : (
            'Subir y Analizar'
          )}
        </Button>
        {isLoading && (
           <p className="text-sm text-muted-foreground text-center mt-2">
             Subiendo tu póliza... esto puede tardar unos momentos.
           </p>
         )}
      </form>
    </Form>
  );
}
