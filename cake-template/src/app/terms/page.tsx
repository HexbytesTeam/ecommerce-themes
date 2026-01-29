"use client";



export default function TermsPage() {
    return (
        <main className="min-h-screen bg-white">


            {/* Hero Header */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#fff9fa]">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Legal Information</p>
                    <h1 className="text-5xl lg:text-7xl font-serif font-bold leading-tight mb-6">
                        Terms of <br />
                        <span className="text-primary italic">Service</span>
                    </h1>
                    <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
                        Last updated: January 28, 2026. Please read these terms carefully before using our services.
                    </p>
                </div>
            </section>

            {/* Content Section */}
            <section className="py-24 bg-white">
                <div className="container mx-auto px-4">
                    <div className="max-w-4xl mx-auto prose prose-pink prose-lg
            prose-headings:font-serif prose-headings:text-black prose-headings:font-bold
            prose-h2:text-4xl prose-h2:mt-16 prose-h2:mb-8
            prose-p:text-muted-foreground prose-p:leading-relaxed prose-p:mb-6
          ">
                        <h2>1. Acceptance of Terms</h2>
                        <p>
                            By accessing and using the HexBytes website and services, you agree to be bound by these Terms of Service. If you do not agree to all of these terms, please do not use our services. We reserve the right to updates these terms at any time without prior notice.
                        </p>

                        <h2>2. User Conduct</h2>
                        <p>
                            You agree to use our services only for lawful purposes. You are prohibited from using the site to transmit any material that is unlawful, harmful, threatening, abusive, or otherwise objectionable. Any attempt to interfere with the proper working of the site will result in immediate termination of access.
                        </p>

                        <h2>3. Intellectual Property</h2>
                        <p>
                            All content on HexBytes, including text, graphics, logos, images, and software, is the property of HexBytes or its content suppliers and is protected by international copyright laws. You may not reproduce, distribute, or create derivative works from this content without express written permission.
                        </p>

                        <h2>4. Limitation of Liability</h2>
                        <p>
                            HexBytes shall not be liable for any direct, indirect, incidental, special, or consequential damages resulting from the use or inability to use our services. We do not guarantee that the site will be error-free or uninterrupted.
                        </p>

                        <h2>5. Orders and Payments</h2>
                        <p>
                            All orders are subject to acceptance and availability. Prices are subject to change without notice. We reserva the right to refuse service to anyone for any reason at any time. Payments must be made in full at the time of order through our approved payment gateways.
                        </p>

                        <h2>6. Governing Law</h2>
                        <p>
                            These terms shall be governed by and construed in accordance with the laws of the United Kingdom, without regard to its conflict of law provisions. Any disputes arising under these terms shall be resolved exclusively in the courts of London.
                        </p>
                    </div>
                </div>
            </section>


        </main>
    );
}
