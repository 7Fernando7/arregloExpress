'use client';
import { Button } from '@/components/ui/button';
import { WhatsappIcon } from '@/components/icons/WhatsappIcon';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { useLanguage } from '@/context/LanguageContext';
import { whatsappLink } from '@/lib/contact';

export default function WhatsappButton() {
  const { t } = useLanguage();

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            asChild
            variant="default"
            size="icon"
            className="fixed bottom-5 right-5 z-40 h-14 w-14 rounded-full bg-[#25D366] text-white shadow-lg hover:bg-[#1ebe5b] md:bottom-6 md:right-6"
          >
            <a data-umami-event="whatsapp" data-umami-event-origen="boton-flotante" href={whatsappLink(t('Hero.whatsappMessage'))} target="_blank" rel="noopener noreferrer" aria-label={t('WhatsappButton.ariaLabel')}>
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
