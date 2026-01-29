"use client";


import ContactHero from "@/components/ContactHero";
import ContactForm from "@/components/ContactForm";

export default function ContactPage() {
    return (
        <main className="min-h-screen bg-white">

            <ContactHero />
            <div id="contact-form" className="pb-32 bg-white">
                <ContactForm />
            </div>

            {/* Info Section */}
            <section className="py-20 bg-[#fff9fa] border-t border-pink-50">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
                        <div>
                            <h4 className="text-xl font-serif font-bold mb-4">Visit Us</h4>
                            <p className="text-muted-foreground">123 Bakery Street, Cupcake Hills<br />London, SW1 2BC</p>
                        </div>
                        <div>
                            <h4 className="text-xl font-serif font-bold mb-4">Call Us</h4>
                            <p className="text-muted-foreground">+44 20 7946 0958<br />Mon-Sat: 08am - 08pm</p>
                        </div>
                        <div>
                            <h4 className="text-xl font-serif font-bold mb-4">Email Us</h4>
                            <p className="text-muted-foreground">hello@hexbytes.com<br />support@hexbytes.com</p>
                        </div>
                    </div>
                </div>
            </section>


        </main>
    );
}
