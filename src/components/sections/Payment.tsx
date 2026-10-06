'use client';
import { CreditCard, Lock } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import Eyebrow from '@/components/Eyebrow';
import { STRIPE_PAYMENT_URL } from '@/lib/contact';

const METHODS = ['Visa', 'Mastercard', 'Apple Pay', 'Google Pay', 'Bizum'];

export default function Payment() {
  const { t } = useLanguage();
  if (STRIPE_PAYMENT_URL === '') return null;

  return (
    <section id="pay" className="w-full py-16 md:py-24">
      <div className="container mx-auto grid max-w-6xl items-center gap-10 px-4 md:px-6 lg:grid-cols-2 lg:gap-16">
        <div className="space-y-4">
          <Eyebrow>{t('Payment.eyebrow')}</Eyebrow>
          <h2 className="font-headline text-3xl font-semibold tracking-tight sm:text-4xl md:text-5xl">
            {t('Payment.title')}
          </h2>
          <p className="text-lg text-muted-foreground">{t('Payment.description')}</p>
        </div>

        <div className="rounded-lg border border-border bg-card p-6 sm:p-8">
          <ol className="space-y-3 text-sm leading-relaxed text-foreground/85">
            {[1, 2, 3].map((n) => (
              <li key={n} className="flex gap-3">
                <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-primary text-xs font-semibold text-primary-foreground">
                  {n}
                </span>
                {t(`Payment.step${n}`)}
              </li>
            ))}
          </ol>
          <a
            href={STRIPE_PAYMENT_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-md bg-primary font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
          >
            <CreditCard className="h-5 w-5" />
            {t('Payment.button')}
          </a>
          <ul className="mt-4 flex flex-wrap justify-center gap-2">
            {METHODS.map((m) => (
              <li key={m} className="rounded border border-border bg-background px-2 py-0.5 text-xs font-medium text-muted-foreground">
                {m}
              </li>
            ))}
          </ul>
          <p className="mt-4 flex items-center justify-center gap-1.5 text-center text-xs text-muted-foreground">
            <Lock className="h-3.5 w-3.5" />
            {t('Payment.secure')}
          </p>
        </div>
      </div>
    </section>
  );
}
