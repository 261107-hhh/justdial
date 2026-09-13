"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";
import { Breadcrumb } from "@/components/common/Breadcrumb";
import { Input, Textarea, Label } from "@/components/ui/Input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/Select";
import { Button } from "@/components/ui/Button";
import { getCategories, getCities } from "@/lib/data";
import styles from "./page.module.css";

const initialForm = {
  businessName: "",
  ownerName: "",
  phone: "",
  email: "",
  category: "",
  subcategory: "",
  address: "",
  city: "",
  area: "",
  pincode: "",
  description: "",
  openingTime: "",
  closingTime: "",
  website: "",
  whatsapp: "",
};

export default function ListYourBusinessPage() {
  const categories = getCategories();
  const cities = getCities();
  const [form, setForm] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  function update(field, value) {
    setForm((f) => ({ ...f, [field]: value }));
    setErrors((e) => ({ ...e, [field]: undefined }));
  }

  function validate() {
    const next = {};
    if (!form.businessName.trim()) next.businessName = "Business name is required";
    if (!form.ownerName.trim()) next.ownerName = "Owner name is required";
    if (!/^\d{10}$/.test(form.phone.trim())) next.phone = "Enter a valid 10-digit phone number";
    if (form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      next.email = "Enter a valid email address";
    if (!form.category) next.category = "Please select a category";
    if (!form.address.trim()) next.address = "Address is required";
    if (!form.city) next.city = "Please select a city";
    if (!form.area.trim()) next.area = "Area is required";
    if (!/^\d{6}$/.test(form.pincode.trim())) next.pincode = "Enter a valid 6-digit pincode";
    if (!form.description.trim()) next.description = "Please add a short description";
    return next;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const validationErrors = validate();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      setSubmitted(true);
    }
  }

  if (submitted) {
    return (
      <main className="container">
        <motion.div
          className={styles.successWrap}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
        >
          <CheckCircle2 size={56} className={styles.successIcon} />
          <h1>Your business has been submitted successfully.</h1>
          <p>Our team will review your listing and get in touch with you shortly.</p>
          <Button variant="primary" onClick={() => { setForm(initialForm); setSubmitted(false); }}>
            List Another Business
          </Button>
        </motion.div>
      </main>
    );
  }

  return (
    <main className="container">
      <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "List Your Business" }]} />
      <h1 className={styles.title}>List Your Business For Free</h1>
      <p className={styles.subtitle}>
        Reach thousands of customers searching for businesses like yours every day.
      </p>

      <motion.form
        className={styles.form}
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        noValidate
      >
        <div className={styles.grid}>
          <Field label="Business Name" error={errors.businessName}>
            <Input
              value={form.businessName}
              onChange={(e) => update("businessName", e.target.value)}
              placeholder="e.g. The Food House"
            />
          </Field>

          <Field label="Owner Name" error={errors.ownerName}>
            <Input
              value={form.ownerName}
              onChange={(e) => update("ownerName", e.target.value)}
              placeholder="Your full name"
            />
          </Field>

          <Field label="Phone" error={errors.phone}>
            <Input
              value={form.phone}
              onChange={(e) => update("phone", e.target.value)}
              placeholder="10-digit mobile number"
              inputMode="numeric"
            />
          </Field>

          <Field label="Email" error={errors.email}>
            <Input
              type="email"
              value={form.email}
              onChange={(e) => update("email", e.target.value)}
              placeholder="you@example.com"
            />
          </Field>

          <Field label="Category" error={errors.category}>
            <Select value={form.category} onValueChange={(v) => update("category", v)}>
              <SelectTrigger className={styles.fullSelect}>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((c) => (
                  <SelectItem key={c.id} value={c.slug}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="Subcategory (optional)">
            <Input
              value={form.subcategory}
              onChange={(e) => update("subcategory", e.target.value)}
              placeholder="e.g. Indian Flavours"
            />
          </Field>

          <Field label="City" error={errors.city}>
            <Select value={form.city} onValueChange={(v) => update("city", v)}>
              <SelectTrigger className={styles.fullSelect}>
                <SelectValue placeholder="Select a city" />
              </SelectTrigger>
              <SelectContent>
                {cities.map((c) => (
                  <SelectItem key={c.slug} value={c.slug}>
                    {c.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </Field>

          <Field label="Area" error={errors.area}>
            <Input
              value={form.area}
              onChange={(e) => update("area", e.target.value)}
              placeholder="e.g. Andheri West"
            />
          </Field>

          <Field label="Pincode" error={errors.pincode}>
            <Input
              value={form.pincode}
              onChange={(e) => update("pincode", e.target.value)}
              placeholder="6-digit pincode"
              inputMode="numeric"
            />
          </Field>

          <Field label="Opening Time">
            <Input
              type="time"
              value={form.openingTime}
              onChange={(e) => update("openingTime", e.target.value)}
            />
          </Field>

          <Field label="Closing Time">
            <Input
              type="time"
              value={form.closingTime}
              onChange={(e) => update("closingTime", e.target.value)}
            />
          </Field>

          <Field label="Website (optional)">
            <Input
              value={form.website}
              onChange={(e) => update("website", e.target.value)}
              placeholder="https://"
            />
          </Field>

          <Field label="WhatsApp Number (optional)">
            <Input
              value={form.whatsapp}
              onChange={(e) => update("whatsapp", e.target.value)}
              placeholder="10-digit WhatsApp number"
              inputMode="numeric"
            />
          </Field>
        </div>

        <Field label="Address" error={errors.address}>
          <Input
            value={form.address}
            onChange={(e) => update("address", e.target.value)}
            placeholder="Full business address"
          />
        </Field>

        <Field label="Description" error={errors.description}>
          <Textarea
            value={form.description}
            onChange={(e) => update("description", e.target.value)}
            placeholder="Tell customers what makes your business special"
          />
        </Field>

        <Button type="submit" size="lg" variant="accent" className={styles.submitBtn}>
          Submit Listing
        </Button>
      </motion.form>
    </main>
  );
}

function Field({ label, error, children }) {
  return (
    <div className={styles.field}>
      <Label>{label}</Label>
      {children}
      {error && <span className={styles.error}>{error}</span>}
    </div>
  );
}
