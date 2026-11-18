"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import emailjs from "@emailjs/browser";
import { 
  Mail, 
  Phone, 
  Send, 
  CheckCircle2, 
  AlertCircle, 
  Linkedin, 
  Github,
  MessageSquare
} from "lucide-react";
import { useLanguage } from "@/app/context/LanguageContext";

export const ContactSection: React.FC = () => {
  const { t } = useLanguage();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    number: "",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSubmitted(false);

    try {
      const templateParams = {
        name: formData.name,
        from_name: formData.name,
        email: formData.email,
        from_email: formData.email,
        phone: formData.number,
        number: formData.number,
        phone_number: formData.number,
        message: formData.message,
        to_name: "Abdul Sami",
      };

      const response = await emailjs.send(
        "service_lwmn71k",
        "template_pcixscm",
        templateParams,
        "ROaDdZjA8LE8YO14e"
      );

      if (response.status === 200) {
        setSubmitted(true);
        setFormData({ name: "", email: "", number: "", message: "" });
        setTimeout(() => setSubmitted(false), 7000);
      } else {
        setError("Failed to send message. Please contact directly at samij7141@gmail.com.");
      }
    } catch (err: any) {
      console.error("EmailJS Error:", err);
      setError("An error occurred. Please contact directly at samij7141@gmail.com.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="space-y-8">
      {/* Header */}
      <div className="pb-6 border-b border-border">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold mb-3">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Get In Touch</span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-foreground">
          {t("contact.title")}
        </h2>
        <p className="text-muted-foreground text-sm max-w-xl mt-2">
          Have an upcoming project, role opening, or question? Send a message and I will get back to you promptly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Form Card */}
        <div className="lg:col-span-8 bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-xs">
          <form onSubmit={handleSubmit} className="space-y-5">
            {submitted && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-300 dark:border-emerald-800 rounded-2xl text-emerald-800 dark:text-emerald-300 text-xs sm:text-sm flex items-center gap-3"
              >
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>{t("contact.success")}</span>
              </motion.div>
            )}

            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-4 bg-red-50 dark:bg-red-950/60 border border-red-300 dark:border-red-800 rounded-2xl text-red-800 dark:text-red-300 text-xs sm:text-sm flex items-center gap-3"
              >
                <AlertCircle className="w-5 h-5 text-red-600 shrink-0" />
                <span>{error}</span>
              </motion.div>
            )}

            {/* Name */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground">
                {t("contact.name")} *
              </label>
              <input
                type="text"
                name="name"
                required
                value={formData.name}
                onChange={handleChange}
                placeholder="Your Name or Company"
                className="w-full bg-muted/60 border border-border focus:border-primary focus:bg-background rounded-2xl px-4 py-3 text-xs sm:text-sm text-foreground outline-none transition-all"
              />
            </div>

            {/* Email & Phone */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground">
                  {t("contact.email")} *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="name@company.com"
                  className="w-full bg-muted/60 border border-border focus:border-primary focus:bg-background rounded-2xl px-4 py-3 text-xs sm:text-sm text-foreground outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs font-semibold text-foreground">
                  {t("contact.phone")} (Optional)
                </label>
                <input
                  type="tel"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  placeholder="+92 300 1234567"
                  className="w-full bg-muted/60 border border-border focus:border-primary focus:bg-background rounded-2xl px-4 py-3 text-xs sm:text-sm text-foreground outline-none transition-all"
                />
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <label className="text-xs font-semibold text-foreground">
                {t("contact.message")} *
              </label>
              <textarea
                name="message"
                required
                rows={4}
                value={formData.message}
                onChange={handleChange}
                placeholder="Share your requirements, ideas, or questions..."
                className="w-full bg-muted/60 border border-border focus:border-primary focus:bg-background rounded-2xl px-4 py-3 text-xs sm:text-sm text-foreground outline-none transition-all resize-none"
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="px-7 py-3.5 bg-primary hover:bg-primary/90 text-primary-foreground rounded-2xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-xs transition-transform active:scale-95 disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-4 h-4" />
                <span>{isSubmitting ? "Sending..." : t("contact.send")}</span>
              </button>
            </div>
          </form>
        </div>

        {/* Channels Information Card */}
        <div className="lg:col-span-4 bg-card border border-border rounded-3xl p-6 sm:p-8 shadow-xs space-y-5">
          <h3 className="text-lg font-bold text-foreground">
            Direct Reach & Socials
          </h3>

          <div className="space-y-3 text-xs sm:text-sm">
            <a
              href="mailto:samij7141@gmail.com"
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-muted/60 hover:bg-primary/10 hover:text-primary transition-all group"
            >
              <div className="p-2.5 rounded-xl bg-card border border-border text-primary group-hover:scale-105 transition-transform shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div className="truncate">
                <div className="text-[11px] text-muted-foreground font-medium">Email Address</div>
                <div className="font-semibold text-foreground truncate">
                  samij7141@gmail.com
                </div>
              </div>
            </a>

            <a
              href="tel:+923065779097"
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-muted/60 hover:bg-primary/10 hover:text-primary transition-all group"
            >
              <div className="p-2.5 rounded-xl bg-card border border-border text-primary group-hover:scale-105 transition-transform shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] text-muted-foreground font-medium">Direct Phone / WhatsApp</div>
                <div className="font-semibold text-foreground">
                  +92 306 5779097
                </div>
              </div>
            </a>

            <a
              href="https://github.com/Abdulsami1122"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-muted/60 hover:bg-primary/10 hover:text-primary transition-all group"
            >
              <div className="p-2.5 rounded-xl bg-card border border-border text-primary group-hover:scale-105 transition-transform shrink-0">
                <Github className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] text-muted-foreground font-medium">GitHub Repository</div>
                <div className="font-semibold text-foreground">
                  github.com/Abdulsami1122
                </div>
              </div>
            </a>

            <a
              href="https://www.linkedin.com/in/abdul-sami-304a162b1"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-muted/60 hover:bg-primary/10 hover:text-primary transition-all group"
            >
              <div className="p-2.5 rounded-xl bg-card border border-border text-primary group-hover:scale-105 transition-transform shrink-0">
                <Linkedin className="w-4 h-4" />
              </div>
              <div>
                <div className="text-[11px] text-muted-foreground font-medium">LinkedIn Profile</div>
                <div className="font-semibold text-foreground">
                  Abdul Sami on LinkedIn
                </div>
              </div>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
