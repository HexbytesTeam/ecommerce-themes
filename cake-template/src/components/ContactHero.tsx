"use client";

export default function ContactHero() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#fff9fa]">
            <div className="container mx-auto px-4 text-center relative z-10">
                <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Get in Touch</p>
                <h1 className="text-5xl lg:text-7xl font-serif font-bold leading-tight mb-6">
                    We'd Love to <br />
                    <span className="text-primary italic">Hear From You</span>
                </h1>
                <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
                    Whether you have a question about our menu, catering, or just want to say hi, our team is ready to help.
                </p>
            </div>

            {/* Decorative background elements */}
            <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/4 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        </section>
    );
}
