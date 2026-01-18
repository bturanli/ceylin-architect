"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import { useI18n } from "@/lib/i18n";

export default function Contact() {
  const { t } = useI18n();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    projectType: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Failed to send message");
      }

      setStatus("success");
      setFormData({ name: "", email: "", projectType: "", message: "" });
    } catch (error) {
      setStatus("error");
      setErrorMessage(error instanceof Error ? error.message : "Something went wrong");
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const services = [
    t("contact.service1"),
    t("contact.service2"),
    t("contact.service3"),
    t("contact.service4"),
    t("contact.service5"),
  ];

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <main className="px-6 pb-24 pt-32 md:px-12 lg:px-16">
        <div className="mx-auto max-w-6xl">
          <div className="grid gap-16 lg:grid-cols-2 lg:gap-24">
            {/* Left Column - Info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <p className="mb-4 text-xs font-medium uppercase tracking-[0.2em] text-[#1a1a1a]/40">
                {t("contact.label")}
              </p>
              <h1 className="text-4xl font-light leading-[1.1] tracking-tight text-[#1a1a1a] md:text-5xl lg:text-6xl">
                {t("contact.title")}
                <br />
                {t("contact.titleLine2")}
              </h1>

              <div className="mt-12 space-y-8">
                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#1a1a1a]/40">
                    {t("contact.email")}
                  </p>
                  <a
                    href="mailto:karakayaceylin@gmail.com"
                    className="mt-1 text-lg font-light text-[#1a1a1a] transition-opacity hover:opacity-60"
                  >
                    karakayaceylin@gmail.com
                  </a>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#1a1a1a]/40">
                    {t("contact.basedIn")}
                  </p>
                  <p className="mt-1 text-lg font-light text-[#1a1a1a]">
                    {t("contact.location")}
                  </p>
                </div>

                <div>
                  <p className="text-xs font-medium uppercase tracking-[0.15em] text-[#1a1a1a]/40">
                    {t("contact.services")}
                  </p>
                  <ul className="mt-2 space-y-1 text-sm font-light text-[#1a1a1a]/70">
                    {services.map((service) => (
                      <li key={service}>{service}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            >
              {status === "success" ? (
                <div className="flex h-full flex-col items-center justify-center text-center">
                  <CheckCircle size={48} className="mb-4 text-green-600" />
                  <h2 className="text-2xl font-light text-[#1a1a1a]">
                    {t("contact.success.title")}
                  </h2>
                  <p className="mt-2 text-sm text-[#1a1a1a]/60">
                    {t("contact.success.message")}
                  </p>
                  <button
                    onClick={() => setStatus("idle")}
                    className="mt-6 text-sm font-medium text-[#1a1a1a] underline underline-offset-4"
                  >
                    {t("contact.success.another")}
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label
                      htmlFor="name"
                      className="block text-xs font-medium uppercase tracking-[0.15em] text-[#1a1a1a]/40"
                    >
                      {t("contact.form.name")}
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="mt-2 w-full border-b border-[#1a1a1a]/20 bg-transparent py-3 text-lg font-light text-[#1a1a1a] outline-none transition-colors focus:border-[#1a1a1a]"
                      placeholder={t("contact.form.namePlaceholder")}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-medium uppercase tracking-[0.15em] text-[#1a1a1a]/40"
                    >
                      {t("contact.form.email")}
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="mt-2 w-full border-b border-[#1a1a1a]/20 bg-transparent py-3 text-lg font-light text-[#1a1a1a] outline-none transition-colors focus:border-[#1a1a1a]"
                      placeholder={t("contact.form.emailPlaceholder")}
                    />
                  </div>

                  <div>
                    <label
                      htmlFor="projectType"
                      className="block text-xs font-medium uppercase tracking-[0.15em] text-[#1a1a1a]/40"
                    >
                      {t("contact.form.projectType")}
                    </label>
                    <select
                      id="projectType"
                      name="projectType"
                      required
                      value={formData.projectType}
                      onChange={handleChange}
                      className="mt-2 w-full border-b border-[#1a1a1a]/20 bg-transparent py-3 text-lg font-light text-[#1a1a1a] outline-none transition-colors focus:border-[#1a1a1a]"
                    >
                      <option value="">{t("contact.form.selectType")}</option>
                      <option value="residential">{t("contact.form.residential")}</option>
                      <option value="commercial">{t("contact.form.commercial")}</option>
                      <option value="interior">{t("contact.form.interior")}</option>
                      <option value="renovation">{t("contact.form.renovation")}</option>
                      <option value="consultation">{t("contact.form.consultation")}</option>
                      <option value="other">{t("contact.form.other")}</option>
                    </select>
                  </div>

                  <div>
                    <label
                      htmlFor="message"
                      className="block text-xs font-medium uppercase tracking-[0.15em] text-[#1a1a1a]/40"
                    >
                      {t("contact.form.message")}
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={4}
                      value={formData.message}
                      onChange={handleChange}
                      className="mt-2 w-full resize-none border-b border-[#1a1a1a]/20 bg-transparent py-3 text-lg font-light text-[#1a1a1a] outline-none transition-colors focus:border-[#1a1a1a]"
                      placeholder={t("contact.form.messagePlaceholder")}
                    />
                  </div>

                  {status === "error" && (
                    <div className="flex items-center gap-2 text-red-600">
                      <AlertCircle size={16} />
                      <p className="text-sm">{errorMessage}</p>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={status === "loading"}
                    className="group flex w-full items-center justify-center gap-3 bg-[#1a1a1a] py-4 text-sm font-medium uppercase tracking-[0.15em] text-white transition-colors hover:bg-[#333] disabled:opacity-50"
                  >
                    {status === "loading" ? (
                      t("contact.form.sending")
                    ) : (
                      <>
                        {t("contact.form.send")}
                        <ArrowRight
                          size={16}
                          className="transition-transform group-hover:translate-x-1"
                        />
                      </>
                    )}
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
