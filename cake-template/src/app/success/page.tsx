"use client";

import Link from "next/link";
import { CheckCircle2, ArrowRight } from "lucide-react";


export default function SuccessPage() {
    return (
        <main className="min-h-screen bg-white">

            <section className="pt-32 pb-20 flex items-center justify-center min-h-[80vh] bg-[#fff9fa]">
                <div className="container mx-auto px-4 text-center">
                    <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-8 animate-bounce">
                        <CheckCircle2 size={48} />
                    </div>
                    <h1 className="text-4xl lg:text-5xl font-serif font-bold mb-6 text-slate-900">Payment Successful!</h1>
                    <p className="text-lg text-muted-foreground max-w-lg mx-auto mb-10">
                        Thank you for your order. Your delicious cakes are being prepared with love and will be on their way shortly.
                    </p>
                    <div className="flex gap-4 justify-center">
                        <Link
                            href="/"
                            className="bg-primary text-white font-bold py-3 px-8 rounded-full shadow-lg shadow-primary/20 hover:scale-105 transition-all inline-flex items-center gap-2"
                        >
                            Return Home <ArrowRight size={18} />
                        </Link>
                    </div>
                </div>
            </section>

        </main>
    );
}
