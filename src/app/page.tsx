import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import HowItWorks from '@/components/sections/HowItWorks';
import Services from '@/components/sections/Services';
import WhatsappButton from '@/components/WhatsappButton';

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      <Header />
      <main className="flex-grow">
        <Hero />
        <HowItWorks />
        <Services />
      </main>
      <WhatsappButton />
      <Footer />
    </div>
  );
}

<form
  name="contact"
  method="POST"
  data-netlify="true"
  hidden
>
  <input type="hidden" name="form-name" value="contact" />
  <input type="text" name="name" />
  <input type="email" name="email" />
  <textarea name="message"></textarea>
</form>