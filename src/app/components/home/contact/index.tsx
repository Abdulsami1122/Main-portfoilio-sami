"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/app/context/LanguageContext";

const Contact = () => {
  const { t } = useLanguage();
  const [contactData, setContactData] = useState<any>(null);
  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    number: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/page-data");
        if (!res.ok) throw new Error("Failed to fetch");
        const data = await res.json();
        setContactData(data?.contactLinks);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };

    fetchData();
  }, []);

  const reset = () => {
    setFormData({
      name: "",
      number: "",
      email: "",
      message: "",
    });
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError("");
    setSubmitted(false);

    try {
      // Direct email link as a reliable fallback while you set up your App Password
      const subject = encodeURIComponent(`Portfolio Message from ${formData.name}`);
      const body = encodeURIComponent(`Name: ${formData.name}\nPhone: ${formData.number}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`);
      window.location.href = `mailto:samij7141@gmail.com?subject=${subject}&body=${body}`;
      
      setSubmitted(true);
      reset();
      setTimeout(() => setSubmitted(false), 5000);
    } catch (err: any) {
      setError("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  return (
    <section className="no-print">
      <div className="container">
        <div className="pt-16 md:pt-32 pb-20">
          <div className="flex items-center justify-between gap-2 border-b border-foreground/30 pb-7 mb-9 md:mb-16">
            <h2>{t("contact.title")}</h2>
            <p className="text-xl text-primary">( 05 )</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-7 sm:gap-12">
                <div className="grid grid-cols-2 gap-8">
                  <div>
                    <Label htmlFor="name" className="label">
                      {t("contact.name")} *
                    </Label>
                    <Input
                      required
                      className="w-full border-0 border-b border-border rounded-none focus-visible:ring-0 focus-visible:border-primary! focus-visible:outline-none py-2!"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <Label htmlFor="number" className="label">
                      {t("contact.phone")} *
                    </Label>
                    <Input
                      required
                      className="w-full border-0 border-b border-border rounded-none focus-visible:ring-0 focus-visible:border-primary! focus-visible:outline-none py-2!"
                      id="number"
                      type="number"
                      name="number"
                      value={formData.number}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div>
                  <Label htmlFor="email" className="label">
                    {t("contact.email")} *
                  </Label>
                  <Input
                    required
                    className="w-full border-0 border-b border-border rounded-none focus-visible:ring-0 focus-visible:border-primary! focus-visible:outline-none py-2!"
                    id="email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="label">
                    {t("contact.message")} *
                  </Label>
                  <Textarea
                    required
                    className="w-full border-0 border-b border-border rounded-none focus-visible:ring-0 focus-visible:border-primary! focus-visible:outline-none py-2!"
                    name="message"
                    id="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={2}
                  />
                </div>
                {error && (
                  <div className="flex items-center gap-2">
                    <p className="text-red-500 font-medium">{error}</p>
                  </div>
                )}
                {submitted && (
                  <div className="flex items-center gap-2">
                    <Image
                      src={"/images/icon/success-icon.svg"}
                      alt="success-icon"
                      width={30}
                      height={30}
                    />
                    <p className="text-muted-foreground">
                      {t("contact.success")}
                    </p>
                  </div>
                )}
                <Button
                  variant="outline"
                  type="submit"
                  disabled={isSubmitting}
                  className="relative overflow-hidden cursor-pointer w-fit h-full py-2 sm:py-3 md:py-5 px-4 sm:px-5 md:px-7 border border-primary rounded-full group disabled:opacity-50"
                >
                  <span className="relative z-10 text-xl font-medium text-primary group-hover:text-white transition-colors duration-300">
                    {isSubmitting ? "Sending..." : t("contact.send")}
                  </span>
                </Button>
              </div>
            </form>
            <div className="flex flex-col sm:flex-row md:flex-col justify-between gap-5 md:gap-20 items-center md:items-end">
              <div className="flex flex-wrap flex-row md:flex-col items-start md:items-end gap-4 md:gap-6">
                {contactData?.socialLinks?.map((value: any, index: any) => {
                  return (
                    <div key={index}>
                      <Link
                        href={value?.href}
                        className="text-base sm:text-lg font-normal text-muted-foreground hover:text-primary"
                      >
                        {value?.title}
                      </Link>
                    </div>
                  );
                })}
              </div>
              <div className="flex flex-wrap justify-center gap-5 lg:gap-11 items-end">
                {contactData?.contactInfo?.map((value: any, index: any) => {
                  return (
                    <div key={index}>
                      <Link
                        href={value?.link}
                        className="text-base lg:text-lg text-foreground font-normal border-b border-foreground/30 pb-3 hover:text-primary hover:border-primary"
                      >
                        {value?.label}
                      </Link>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;

