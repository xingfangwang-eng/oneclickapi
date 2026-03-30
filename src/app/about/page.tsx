import React from 'react';
import type { Metadata } from 'next';
import Link from 'next/link';
import { ArrowLeft, Users, Globe, Mail, Twitter, Building2, Heart, CheckCircle2 } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us | wangdadi.xyz',
  description: 'About wangdadi.xyz - Empowering digital entrepreneurs with SaaS tools',
};

export default function AboutPage() {
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
              <Users className="w-8 h-8 text-indigo-600" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-4">
              About Us
            </h1>
          </div>

          {/* Content */}
          <div className="prose prose-slate max-w-none">
            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Heart className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-semibold text-slate-900 m-0">Our Mission</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                Welcome to <strong>wangdadi.xyz</strong>. Our mission is simple: to empower digital entrepreneurs and small businesses with innovative SaaS tools and high-quality resources that simplify their online growth.
              </p>
              <p className="text-slate-600 leading-relaxed">
                We believe that technology should be a bridge, not a barrier. That’s why we focus on building lean, efficient, and user-centric solutions that solve real-world problems.
              </p>
            </section>

            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Users className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-semibold text-slate-900 m-0">Who We Are</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-4">
                <strong>wangdadi.xyz</strong> is founded and led by <strong>Wang Dadi</strong>, an independent developer and digital marketer with a passion for building software that makes a difference.
              </p>
              <p className="text-slate-600 leading-relaxed">
                Starting as a solo project, this platform has grown into a hub for SaaS products and curated affiliate resources. Being an independent operation allows us to stay close to our users—we don't answer to boardrooms; we answer to you. Every line of code and every article we publish is driven by our commitment to quality and transparency.
              </p>
            </section>

            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Building2 className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-semibold text-slate-900 m-0">What We Do</h2>
              </div>
              <ul className="list-disc list-inside text-slate-600 space-y-3 ml-4">
                <li>
                  <strong>SaaS Solutions:</strong> We develop specialized software tools designed to automate repetitive tasks, improve marketing efficiency, and provide actionable data insights.
                </li>
                <li>
                  <strong>Curated Resources:</strong> Through our affiliate network, we handpick and review the best tools in the industry to help you make informed decisions for your business.
                </li>
                <li>
                  <strong>Innovation-First:</strong> We are constantly iterating and improving our products based on direct feedback from our global community of users.
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <CheckCircle2 className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-semibold text-slate-900 m-0">Why Choose Us?</h2>
              </div>
              <ul className="list-disc list-inside text-slate-600 space-y-3 ml-4">
                <li>
                  <strong>Transparency:</strong> We are open about our processes and how we evaluate products.
                </li>
                <li>
                  <strong>Security & Privacy:</strong> Your data security is our top priority. We use industry-standard encryption and follow strict privacy protocols.
                </li>
                <li>
                  <strong>Global Support:</strong> We serve users from all corners of the world and strive to provide timely, helpful support to every customer.
                </li>
              </ul>
            </section>

            <section className="mb-12">
              <div className="flex items-center gap-3 mb-6">
                <Mail className="w-6 h-6 text-indigo-600" />
                <h2 className="text-2xl font-semibold text-slate-900 m-0">Let’s Connect</h2>
              </div>
              <p className="text-slate-600 leading-relaxed mb-6">
                We love hearing from our users! Whether you have a question about our tools, need support, or just want to say hello, feel free to reach out.
              </p>
              <div className="space-y-3">
                <p className="text-slate-600">
                  <strong>Email:</strong>{' '}
                  <a href="mailto:xingfang.wang@gmai.com" className="text-indigo-600 hover:text-indigo-700">
                    xingfang.wang@gmai.com
                  </a>
                </p>
                <p className="text-slate-600">
                  <strong>Twitter/X:</strong>{' '}
                  <a href="https://x.com/wxingfang" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700 flex items-center gap-2">
                    <Twitter className="w-4 h-4" />
                    https://x.com/wxingfang
                  </a>
                </p>
                <p className="text-slate-600">
                  <strong>Location:</strong> Remote / Global Office
                </p>
              </div>
            </section>

            <hr className="border-slate-200 my-8" />

            <p className="text-center text-slate-600 italic">
              Thank you for being part of our journey. Let's build something great together!
            </p>
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
              <Link href="/about" className="text-slate-600 hover:text-indigo-600 text-sm font-medium">
                About Us
              </Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
