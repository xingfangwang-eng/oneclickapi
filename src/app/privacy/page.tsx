import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Shield, Lock, Eye, Database, Cookie, Globe, Mail, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Privacy Policy | wangdadi.xyz',
  description: 'Privacy Policy for wangdadi.xyz',
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-600 hover:text-indigo-600 transition-colors">
            <ArrowLeft className="w-5 h-5" />
            <span className="font-medium">Back to Home</span>
          </Link>
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="font-bold text-slate-800">wangdadi.xyz</span>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-8 sm:p-12">
          {/* Title Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-indigo-50 rounded-2xl mb-6">
              <Shield className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Privacy Policy
            </h1>
            <p className="text-slate-600 text-lg">
              Last Updated: 2026.3.30
            </p>
          </div>

          {/* Intro */}
          <p className="text-slate-600 leading-relaxed mb-10">
            At wangdadi.xyz, we take your privacy seriously. This policy explains how we collect, use, and protect your personal information.
          </p>

          {/* Content */}
          <div className="prose prose-slate max-w-none">
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Database className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold text-slate-900 m-0">1. Information We Collect</h2>
              </div>
              <ul className="list-disc list-inside text-slate-600 space-y-3 ml-4">
                <li>
                  <strong>Personal Information:</strong> When you register or purchase, we may collect your name, email address, and billing information.
                </li>
                <li>
                  <strong>Usage Data:</strong> We collect information on how you interact with our website, such as IP addresses, browser types, and pages visited.
                </li>
                <li>
                  <strong>Cookies:</strong> We use cookies to enhance your experience and remember your preferences.
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Eye className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold text-slate-900 m-0">2. How We Use Your Information</h2>
              </div>
              <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
                <li>To provide and maintain our services.</li>
                <li>To process payments and prevent fraud.</li>
                <li>To communicate with you regarding updates or support.</li>
                <li>To improve our website functionality.</li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Lock className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold text-slate-900 m-0">3. Data Sharing and Third Parties</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                We do <strong>not</strong> sell your personal data. We share information only with trusted third-party service providers to facilitate our business:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
                <li>
                  <strong>Payment Processors:</strong> Stripe, PayPal, or Lemon Squeezy (for secure transactions).
                </li>
                <li>
                  <strong>Analytics:</strong> Google Analytics (to understand user behavior).
                </li>
              </ul>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">4. Data Security</h2>
              <p className="text-slate-600 leading-relaxed">
                We implement industry-standard security measures to protect your data. However, no method of transmission over the internet is 100% secure.
              </p>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold text-slate-900 m-0">5. Your Rights (GDPR/CCPA)</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Depending on your location, you may have the right to access, delete, or modify your personal data. Please contact us to exercise these rights.
              </p>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <FileText className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold text-slate-900 m-0">6. Changes to This Policy</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                We may update our Privacy Policy from time to time. Any changes will be posted on this page with an updated &quot;Last Updated&quot; date.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold text-slate-900 m-0">7. Contact Us</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                For privacy-related inquiries:{' '}
                <a href="mailto:xingfang.wang@gmail.com" className="text-indigo-600 hover:text-indigo-700">
                  xingfang.wang@gmail.com
                </a>
              </p>
            </section>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 mt-12">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-slate-500 text-sm">
              © 2026 wangdadi.xyz. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <Link href="/terms" className="text-slate-600 hover:text-indigo-600 text-sm font-medium">
                Terms of Service
              </Link>
              <Link href="/privacy" className="text-slate-600 hover:text-indigo-600 text-sm font-medium">
                Privacy Policy
              </Link>
              <Link href="/refund" className="text-slate-600 hover:text-indigo-600 text-sm font-medium">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
