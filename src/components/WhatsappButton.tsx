'use client';
import { Button } from '@/components/ui/button';
import { WhatsappIcon } from '@/components/icons/WhatsappIcon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useLanguage } from '@/context/LanguageContext';

export default function WhatsappButton() {
  const { t } = useLanguage();
  const whatsappNumber = "+34611605751";
  const whatsappLink = `https://wa.me/${whatsappNumber.replace(/\+/g, '')}`;

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            asChild
            variant="default"
            size="icon"
            className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg bg-green-500 hover:bg-green-600 text-white"
          >
            <a href={whatsappLink} target="_blank" rel="noopener noreferrer" aria-label={t('WhatsappButton.ariaLabel')}>
              <WhatsappIcon className="h-7 w-7" />
            </a>
          </Button>
        </TooltipTrigger>
        <TooltipContent side="left">
          <p>{t('WhatsappButton.tooltip')}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
