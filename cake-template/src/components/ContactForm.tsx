"use client";

import { useState } from "react";
import Link from "next/link";
import { User, Mail, Phone, MessageSquare, ChevronDown, CheckCircle2 } from "lucide-react";

export default function ContactForm() {
    const [formData, setFormData] = useState({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        service: "",
        message: "",
        agreed: false
    });

    const [errors, setErrors] = useState<Record<string, string>>({});
    const [isSubmitted, setIsSubmitted] = useState(false);

    const validate = () => {
        const newErrors: Record<string, string> = {};
        if (!formData.firstName.trim()) newErrors.firstName = "First name is required";
        if (!formData.lastName.trim()) newErrors.lastName = "Last name is required";
        if (!formData.email.trim()) {
            newErrors.email = "Email is required";
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = "Email is invalid";
        }
        if (!formData.phone.trim()) {
            newErrors.phone = "Phone number is required";
        } else if (!/^\+?[\d\s-]{10,}$/.test(formData.phone)) {
            newErrors.phone = "Phone number is invalid";
        }
        if (!formData.service) newErrors.service = "Please select a service";
        if (!formData.message.trim()) newErrors.message = "Message is required";
        if (!formData.agreed) newErrors.agreed = "You must agree to the terms";

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validate()) {
            console.log("Form submitted:", formData);
            setIsSubmitted(true);
            // Reset form after 3 seconds
            setTimeout(() => {
                setIsSubmitted(false);
                setFormData({
                    firstName: "",
                    lastName: "",
                    email: "",
                    phone: "",
                    service: "",
                    message: "",
                    agreed: false
                });
            }, 3000);
        }
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value, type } = e.target;
        const val = type === 'checkbox' ? (e.target as HTMLInputElement).checked : value;
        setFormData(prev => ({ ...prev, [name]: val }));
        // Clear error when user starts typing
        if (errors[name]) {
            setErrors(prev => {
                const newErrs = { ...prev };
                delete newErrs[name];
                return newErrs;
            });
        }
    };

    if (isSubmitted) {
        return (
            <div className="max-w-2xl mx-auto p-12 bg-white rounded-[3rem] shadow-2xl border border-pink-50 text-center animate-in zoom-in duration-500">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center text-green-600 mx-auto mb-6">
                    <CheckCircle2 size={40} />
                </div>
                <h2 className="text-3xl font-serif font-bold mb-4">Message Sent!</h2>
                <p className="text-muted-foreground text-lg">
                    Thank you for reaching out, {formData.firstName}. We'll get back to you within 24 hours.
                </p>
            </div>
        );
    }

    return (
        <div className="max-w-2xl mx-auto p-8 lg:p-12 bg-white rounded-[3rem] shadow-xl border border-pink-50 relative -mt-20 z-30">
            {/* Icon Header */}
            <div className="flex flex-col items-center mb-10">
                <div className="w-16 h-16 bg-gradient-to-br from-primary to-purple-500 rounded-2xl flex items-center justify-center text-white shadow-lg mb-6">
                    <User size={32} />
                </div>
                <h2 className="text-4xl font-serif font-bold text-center mb-2">Contact Us</h2>
                <p className="text-muted-foreground font-medium">Tell us about your needs</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* First Name */}
                    <div className="relative">
                        <input
                            type="text"
                            name="firstName"
                            placeholder="First Name"
                            value={formData.firstName}
                            onChange={handleChange}
                            className={`w-full px-6 py-4 rounded-2xl border ${errors.firstName ? 'border-red-500 bg-red-50' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all pr-12`}
                        />
                        <User className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        {errors.firstName && <p className="text-red-500 text-xs mt-1 ml-2">{errors.firstName}</p>}
                    </div>

                    {/* Last Name */}
                    <div className="relative">
                        <input
                            type="text"
                            name="lastName"
                            placeholder="Last Name"
                            value={formData.lastName}
                            onChange={handleChange}
                            className={`w-full px-6 py-4 rounded-2xl border ${errors.lastName ? 'border-red-500 bg-red-50' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all pr-12`}
                        />
                        <User className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                        {errors.lastName && <p className="text-red-500 text-xs mt-1 ml-2">{errors.lastName}</p>}
                    </div>
                </div>

                {/* Email */}
                <div className="relative">
                    <input
                        type="email"
                        name="email"
                        placeholder="Email Address"
                        value={formData.email}
                        onChange={handleChange}
                        className={`w-full px-6 py-4 rounded-2xl border ${errors.email ? 'border-red-500 bg-red-50' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all pr-12`}
                    />
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    {errors.email && <p className="text-red-500 text-xs mt-1 ml-2">{errors.email}</p>}
                </div>

                {/* Phone */}
                <div className="relative">
                    <input
                        type="text"
                        name="phone"
                        placeholder="Phone Number"
                        value={formData.phone}
                        onChange={handleChange}
                        className={`w-full px-6 py-4 rounded-2xl border ${errors.phone ? 'border-red-500 bg-red-50' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all pr-12`}
                    />
                    <Phone className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
                    {errors.phone && <p className="text-red-500 text-xs mt-1 ml-2">{errors.phone}</p>}
                </div>

                {/* Service Dropdown */}
                <div className="relative">
                    <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        className={`w-full px-6 py-4 rounded-2xl border ${errors.service ? 'border-red-500 bg-red-50' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all appearance-none bg-white pr-12`}
                    >
                        <option value="" disabled>Select a service</option>
                        <option value="Cake Ordering">Custom Cake Ordering</option>
                        <option value="Catering">Event Catering</option>
                        <option value="Bulk Order">Bulk Cupcake Orders</option>
                        <option value="Feedback">General Feedback</option>
                    </select>
                    <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" size={20} />
                    {errors.service && <p className="text-red-500 text-xs mt-1 ml-2">{errors.service}</p>}
                </div>

                {/* Message */}
                <div className="relative">
                    <textarea
                        name="message"
                        placeholder="Tell us about your project..."
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className={`w-full px-6 py-4 rounded-2xl border ${errors.message ? 'border-red-500 bg-red-50' : 'border-slate-200'} focus:outline-none focus:ring-2 focus:ring-primary/20 transition-all resize-none pr-12`}
                    ></textarea>
                    <MessageSquare className="absolute right-4 top-6 text-slate-400" size={20} />
                    {errors.message && <p className="text-red-500 text-xs mt-1 ml-2">{errors.message}</p>}
                </div>

                {/* Terms Checkbox */}
                <div className="flex flex-col gap-2">
                    <label className="flex items-center gap-3 cursor-pointer group">
                        <input
                            type="checkbox"
                            name="agreed"
                            checked={formData.agreed}
                            onChange={handleChange}
                            className="w-5 h-5 rounded border-slate-300 text-primary focus:ring-primary/20"
                        />
                        <span className="text-sm text-slate-600 font-medium">
                            I agree to the <Link href="/terms" className="text-primary hover:underline">Terms of Service</Link> and <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                        </span>
                    </label>
                    {errors.agreed && <p className="text-red-500 text-xs ml-8">{errors.agreed}</p>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    className="w-full py-5 bg-gradient-to-r from-primary to-purple-600 text-white rounded-2xl font-bold text-lg shadow-xl hover:scale-[1.02] active:scale-[0.98] transition-all"
                >
                    Submit
                </button>
            </form>
        </div>
    );
}
