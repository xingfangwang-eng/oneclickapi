import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, RefreshCcw, CheckCircle, Clock, AlertTriangle, CreditCard, Mail, FileText } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Refund Policy | wangdadi.xyz',
  description: 'Refund Policy for wangdadi.xyz',
};

export default function RefundPage() {
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
              <RefreshCcw className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              Refund Policy
            </h1>
            <p className="text-slate-600 text-lg">
              Last Updated: 2026.3.30
            </p>
          </div>

          {/* Intro */}
          <p className="text-slate-600 leading-relaxed mb-10">
            Thank you for choosing wangdadi.xyz. We want to ensure you have a great experience with our products.
          </p>

          {/* Content */}
          <div className="prose prose-slate max-w-none">
            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <CreditCard className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold text-slate-900 m-0">1. Subscription Refunds</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                We offer a <strong>[7 / 14]-day money-back guarantee</strong> for all new subscriptions. If you are not satisfied with our service, you can request a full refund within [7 / 14] days of your initial purchase.
              </p>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <CheckCircle className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold text-slate-900 m-0">2. Eligibility for Refunds</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                To be eligible for a refund, you must:
              </p>
              <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
                <li>Submit your request via email within the specified timeframe.</li>
                <li>Provide your order number and the email address used for purchase.</li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <AlertTriangle className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold text-slate-900 m-0">3. Non-Refundable Items</h2>
              </div>
              <ul className="list-disc list-inside text-slate-600 space-y-2 ml-4">
                <li>Renewals of existing subscriptions are generally non-refundable unless requested within 48 hours of the charge.</li>
                <li>Accounts that have violated our Terms of Service are not eligible for refunds.</li>
              </ul>
            </section>

            <section className="mb-10">
              <div className="flex items-center gap-3 mb-4">
                <Mail className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold text-slate-900 m-0">4. How to Request a Refund</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                To request a refund, please email us at{' '}
                <a href="mailto:xingfang.wang@gmail.com" className="text-indigo-600 hover:text-indigo-700">
                  xingfang.wang@gmail.com
                </a>{' '}
                with the subject line &quot;Refund Request&quot;. We will process your request within 3-5 business days.
              </p>
            </section>

            <section className="mb-10">
              <h2 className="text-xl font-semibold text-slate-900 mb-4">5. Chargebacks</h2>
              <p className="text-slate-600 leading-relaxed">
                We encourage you to contact our support team first if you have issues. Excessive or fraudulent chargebacks may result in the permanent termination of your account.
              </p>
            </section>

            <section>
              <div className="flex items-center gap-3 mb-4">
                <Clock className="w-6 h-6 text-indigo-600" />
                <h2 className="text-xl font-semibold text-slate-900 m-0">6. Processing Time</h2>
              </div>
              <p className="text-slate-600 leading-relaxed">
                Refunds will be credited back to the original payment method (Credit Card, PayPal, etc.). The time it takes for the funds to appear in your account depends on your financial institution.
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
