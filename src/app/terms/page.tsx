import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, FileText, Scale, Shield, AlertCircle, Users, CreditCard, Globe, Mail } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Terms of Service | wangdadi.xyz',
  description: 'Terms of Service for wangdadi.xyz',
};

export default function TermsPage() {
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
              <FileText className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Terms of Service
            </h1>
            <p className="text-slate-600 text-lg">
              Last Updated: 2026.3.30
            </p>
          </div>

          {/* Intro */}
          <p className="text-slate-600 leading-relaxed mb-10">
            Welcome to wangdadi.xyz. By accessing our website and using our services, you agree to comply with and be bound by the following terms and conditions.
          </p>

          {/* Content */}
          <div className="prose prose-slate max-w-none">
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Scale className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold text-slate-900 m-0">1. Acceptance of Terms</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                By using the services provided on wangdadi.xyz (the &quot;Service&quot;), you agree to be legally bound by these Terms of Service. If you do not agree, please do not use the Service.
              </p>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Shield className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold text-slate-900 m-0">2. Description of Service</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                wangdadi.xyz provides [Software as a Service (SaaS) / Marketing Tools / Information Services]. We reserve the right to modify or discontinue the Service at any time without notice.
              </p>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Users className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold text-slate-900 m-0">3. User Accounts</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                To access certain features, you may be required to create an account. You are responsible for maintaining the confidentiality of your account information and for all activities that occur under your account.
              </p>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <AlertCircle className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold text-slate-900 m-0">4. Intellectual Property</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                All content, tools, and code on wangdadi.xyz are the property of wangdadi.xyz and protected by international copyright laws. You may not reproduce, distribute, or create derivative works without express written permission.
              </p>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold text-slate-900 m-0">5. Payment and Subscriptions</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Payment for services is processed via third-party providers (e.g., Stripe, PayPal, or Lemon Squeezy). By subscribing, you agree to the pricing and billing terms displayed at the time of purchase.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">6. Limitation of Liability</h2>
              <p className="text-slate-600 leading-relaxed">
                wangdadi.xyz shall not be liable for any direct, indirect, incidental, or consequential damages resulting from the use or inability to use our services.
              </p>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Globe className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold text-slate-900 m-0">7. Governing Law</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                These terms are governed by and construed in accordance with the laws of the People&apos;s Republic of China, without regard to its conflict of law principles.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold text-slate-900 m-0">8. Contact Us</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                If you have any questions about these Terms, please contact us at:{' '}
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
