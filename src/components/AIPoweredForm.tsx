'use client';

import { useState } from 'react';
import Image from 'next/image';
import { UploadCloud, Sparkles, Wand2, Lightbulb, Scissors } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { getAISuggestions } from '@/app/actions';
import { useToast } from '@/hooks/use-toast';
import { Skeleton } from './ui/skeleton';
import { useLanguage } from '@/context/LanguageContext';

export default function AIPoweredForm() {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { toast } = useToast();
  const { t } = useLanguage();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setSuggestions(null);
      setError(null);
      setFile(selectedFile);
      setPreviewUrl(URL.createObjectURL(selectedFile));
    }
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!file) {
      toast({
        title: t('AIPoweredForm.noFileTitle'),
        description: t('AIPoweredForm.noFileDescription'),
        variant: 'destructive',
      });
      return;
    }

    setIsLoading(true);
    setSuggestions(null);
    setError(null);

    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      const photoDataUri = reader.result as string;
      const result = await getAISuggestions({ photoDataUri });

      if (result.success) {
        setSuggestions(result.data.suggestions);
      } else {
        setError(result.error);
        toast({
          title: t('AIPoweredForm.errorTitle'),
          description: result.error,
          variant: 'destructive',
        });
      }
      setIsLoading(false);
    };
    reader.onerror = () => {
        setError(t('AIPoweredForm.fileReadErrorDescription'));
        toast({
            title: t('AIPoweredForm.fileReadErrorTitle'),
            description: t('AIPoweredForm.fileReadErrorDescription'),
            variant: 'destructive',
        });
        setIsLoading(false);
    }
  };

  const suggestionIcons = [Lightbulb, Scissors, Wand2, Sparkles];

  return (
    <Card className="w-full max-w-lg shadow-2xl bg-card/80 backdrop-blur-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-2xl">
          <Sparkles className="text-accent" />
          {t('AIPoweredForm.title')}
        </CardTitle>
        <CardDescription>{t('AIPoweredForm.description')}</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid w-full items-center gap-1.5">
            <Label htmlFor="picture" className="sr-only">Picture</Label>
            <div className="relative flex items-center justify-center w-full">
              <label htmlFor="picture-input" className="flex flex-col items-center justify-center w-full h-48 border-2 border-dashed rounded-lg cursor-pointer border-border hover:bg-accent/10 transition-colors">
                {previewUrl ? (
                  <Image src={previewUrl} alt="Preview" fill className="object-contain rounded-lg p-2" />
                ) : (
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <UploadCloud className="w-10 h-10 mb-3 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground"><span className="font-semibold">{t('AIPoweredForm.uploadCTA')}</span></p>
                    <p className="text-xs text-muted-foreground">{t('AIPoweredForm.fileTypes')}</p>
                  </div>
                )}
              </label>
               <Input id="picture-input" type="file" className="hidden" onChange={handleFileChange} accept="image/png, image/jpeg, image/webp" />
            </div>
          </div>
          <Button type="submit" className="w-full" disabled={isLoading || !file}>
            {isLoading ? t('AIPoweredForm.loading') : t('AIPoweredForm.submitButton')}
          </Button>
        </form>

        {isLoading && (
            <div className="mt-6 space-y-4">
                <Skeleton className="h-8 w-3/4" />
                <div className="space-y-2">
                    <Skeleton className="h-6 w-full" />
                    <Skeleton className="h-6 w-5/6" />
                </div>
            </div>
        )}

        {suggestions && (
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">{t('AIPoweredForm.suggestionsTitle')}</h3>
            <ul className="space-y-3">
              {suggestions.map((suggestion, index) => {
                const Icon = suggestionIcons[index % suggestionIcons.length];
                return (
                  <li key={index} className="flex items-start gap-3 p-3 rounded-md bg-secondary/50">
                     <Icon className="w-5 h-5 mt-1 text-primary shrink-0" />
                    <span>{suggestion}</span>
                  </li>
                );
              })}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
