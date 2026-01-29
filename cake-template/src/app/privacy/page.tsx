"use client";



export default function PrivacyPage() {
    return (
        <main className="min-h-screen bg-white">


            {/* Hero Header */}
            <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden bg-[#fff9fa]">
                <div className="container mx-auto px-4 text-center relative z-10">
                    <p className="text-primary font-bold uppercase tracking-widest text-sm mb-4">Legal Information</p>
                    <h1 className="text-5xl lg:text-7xl font-serif font-bold leading-tight mb-6">
                        Privacy <br />
                        <span className="text-primary italic">Policy</span>
                    </h1>
                    <p className="text-muted-foreground text-lg mb-10 max-w-2xl mx-auto">
                        Last updated: January 28, 2026. Your privacy is important to us at HexBytes.
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
                        <h2>1. Information We Collect</h2>
                        <p>
                            We collect information you provide directly to us, such as when you create an account, place an order, or contact us. This may include your name, email address, phone number, and payment information. We also collect information automatically as you navigate through the site.
                        </p>

                        <h2>2. How We Use Your Information</h2>
                        <p>
                            We use the information we collect to provide, maintain, and improve our services, to process your transactions, and to communicate with you. We may also use the information to personalize your experience and to send you promotional messages, if you have opted in to receive them.
                        </p>

                        <h2>3. Data Security</h2>
                        <p>
                            We take reasonable measures to help protect information about you from loss, theft, misuse, and unauthorized access, disclosure, alteration, and destruction. However, no internet transmission is ever fully secure or error-free.
                        </p>

                        <h2>4. Cookies</h2>
                        <p>
                            We use cookies and similar technologies to track activity on our service and hold certain information. Cookies are files with small amount of data which may include an anonymous unique identifier. You can instruct your browser to refuse all cookies or to indicate when a cookie is being sent.
                        </p>

                        <h2>5. Your Rights</h2>
                        <p>
                            You have the right to access the personal information we hold about you and to ask that your personal information be corrected, updated, or deleted. If you would like to exercise this right, please contact us through the contact information below.
                        </p>

                        <h2>6. Contact Us</h2>
                        <p>
                            If you have any questions about this Privacy Policy, please contact us at hello@hexbytes.com or through our contact page.
                        </p>
                    </div>
                </div>
            </section>


        </main>
    );
}
