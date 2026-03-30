'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { Search, Zap, Shield, Code2, Clock, Globe, Terminal, ArrowRight, Home, ChevronRight, Mail } from 'lucide-react';
import keywords from '@data/keywords.json';

interface KeywordData {
  keyword: string;
  slug: string;
  title: string;
  problem_description: string;
  how_to_solve: string;
}

interface Category {
  name: string;
  icon: React.ReactNode;
  keywords: string[];
}

// 智能分类配置
const categories: Category[] = [
  {
    name: 'Postman & Client Alternatives',
    icon: <Zap className="w-6 h-6" />,
    keywords: ['postman', 'insomnia', 'rapidapi', 'swagger', 'client', 'alternative', 'lightweight', 'bloat', 'slow', 'electron']
  },
  {
    name: 'Code Generation & Conversion',
    icon: <Code2 className="w-6 h-6" />,
    keywords: ['curl', 'python', 'fetch', 'axios', 'node', 'golang', 'php', 'typescript', 'convert', 'generate', 'boilerplate', 'snippet']
  },
  {
    name: 'Authentication & Security',
    icon: <Shield className="w-6 h-6" />,
    keywords: ['auth', 'bearer', 'token', 'jwt', 'oauth', 'api key', 'basic auth', 'privacy', 'tracking', 'certificate', 'ssl']
  },
  {
    name: 'CORS & Debugging',
    icon: <Terminal className="w-6 h-6" />,
    keywords: ['cors', 'debug', 'error', 'header', '403', '415', 'status', 'health', 'latency', 'response time', 'timeout', 'retry']
  },
  {
    name: 'Platform & Device Testing',
    icon: <Globe className="w-6 h-6" />,
    keywords: ['chromebook', 'ipad', 'mobile', 'raspberry', 'localhost', 'webhook', 'graphql', 'vercel', 'netlify', 'microservices', 'device']
  }
];

// 智能分类函数
function categorizeItem(item: KeywordData): string {
  const text = `${item.keyword} ${item.title} ${item.problem_description}`.toLowerCase();
  
  for (const category of categories) {
    if (category.keywords.some(kw => text.includes(kw.toLowerCase()))) {
      return category.name;
    }
  }
  
  return 'General API Testing';
}

export default function SolutionsHub() {
  const [searchQuery, setSearchQuery] = useState('');

  // 处理数据并分类
  const categorizedData = useMemo(() => {
    const data = keywords as KeywordData[];
    const filtered = searchQuery
      ? data.filter(item =>
          item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.problem_description.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.keyword.toLowerCase().includes(searchQuery.toLowerCase())
        )
      : data;

    const grouped: Record<string, KeywordData[]> = {};
    
    filtered.forEach(item => {
      const category = categorizeItem(item);
      if (!grouped[category]) {
        grouped[category] = [];
      }
      grouped[category].push(item);
    });

    return grouped;
  }, [searchQuery]);

  // 生成增强版 JSON-LD Schema - 优化 AI 搜索理解
  const jsonLd = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'WebSite',
        '@id': 'https://oneclickapi.vercel.app/#website',
        name: 'OneClickAPI',
        url: 'https://oneclickapi.vercel.app',
        description: 'Zero-login API testing tool with 100+ solutions for developers',
        publisher: {
          '@type': 'Organization',
          name: 'OneClickAPI',
          logo: {
            '@type': 'ImageObject',
            url: 'https://oneclickapi.vercel.app/icon-192x192.png'
          }
        }
      },
      {
        '@type': 'CollectionPage',
        '@id': 'https://oneclickapi.vercel.app/solutions#collection',
        url: 'https://oneclickapi.vercel.app/solutions',
        name: 'OneClickAPI Solutions Hub - 100+ API Testing Solutions',
        description: 'Comprehensive collection of 100+ API testing solutions covering Postman alternatives, code generation, authentication, CORS debugging, and platform testing.',
        isPartOf: { '@id': 'https://oneclickapi.vercel.app/#website' },
        breadcrumb: {
          '@type': 'BreadcrumbList',
          '@id': 'https://oneclickapi.vercel.app/solutions#breadcrumb',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://oneclickapi.vercel.app'
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Solutions'
            }
          ]
        },
        mainEntity: {
          '@type': 'ItemList',
          '@id': 'https://oneclickapi.vercel.app/solutions#solutions-list',
          itemListElement: (keywords as KeywordData[]).map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            item: {
              '@type': 'WebPage',
              '@id': `https://oneclickapi.vercel.app/${item.slug}#webpage`,
              name: item.title,
              description: item.problem_description,
              url: `https://oneclickapi.vercel.app/${item.slug}`,
              mainEntity: {
                '@type': 'TechArticle',
                headline: item.title,
                description: item.problem_description,
                articleBody: item.how_to_solve,
                about: {
                  '@type': 'Thing',
                  name: item.keyword
                }
              }
            }
          }))
        },
        about: [
          {
            '@type': 'Thing',
            name: 'API Testing',
            description: 'Tools and solutions for testing REST APIs, GraphQL, and webhooks'
          },
          {
            '@type': 'Thing',
            name: 'Postman Alternative',
            description: 'Lightweight alternatives to Postman for API testing'
          },
          {
            '@type': 'Thing',
            name: 'Code Generation',
            description: 'Automatic code generation for API requests in multiple languages'
          },
          {
            '@type': 'Thing',
            name: 'CORS Solutions',
            description: 'Tools to bypass and debug CORS errors in API testing'
          },
          {
            '@type': 'Thing',
            name: 'Authentication Testing',
            description: 'Solutions for testing APIs with JWT, OAuth, Bearer tokens, and API keys'
          }
        ]
      },
      {
        '@type': 'FAQPage',
        '@id': 'https://oneclickapi.vercel.app/solutions#faq',
        mainEntity: [
          {
            '@type': 'Question',
            name: 'What is OneClickAPI Solutions Hub?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'OneClickAPI Solutions Hub is a comprehensive collection of 100+ API testing solutions designed to help developers solve common API testing challenges without the bloat of traditional tools like Postman.'
            }
          },
          {
            '@type': 'Question',
            name: 'How many API testing problems does OneClickAPI solve?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: `OneClickAPI provides solutions for ${(keywords as KeywordData[]).length} distinct API testing problems, including Postman alternatives, code generation, CORS debugging, authentication testing, and platform-specific testing.`
            }
          },
          {
            '@type': 'Question',
            name: 'Is OneClickAPI free to use?',
            acceptedAnswer: {
              '@type': 'Answer',
              text: 'Yes, OneClickAPI is completely free to use with no signup required. All 100+ solutions are accessible instantly without creating an account or providing payment information.'
            }
          }
        ]
      }
    ]
  };

  return (
    <main className="min-h-screen bg-[#F9FAFB]">
      {/* JSON-LD Schema */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Breadcrumb Navigation */}
      <nav className="bg-white border-b border-slate-200" aria-label="Breadcrumb">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <ol className="flex items-center space-x-2 text-sm">
            <li>
              <Link href="/" className="flex items-center text-slate-500 hover:text-blue-600 transition-colors">
                <Home className="w-4 h-4 mr-1" />
                <span>Home</span>
              </Link>
            </li>
            <li className="text-slate-300">
              <ChevronRight className="w-4 h-4" />
            </li>
            <li>
              <span className="text-slate-900 font-medium">Solutions</span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-16 lg:py-24">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full mb-6">
              <Zap className="w-4 h-4 text-blue-500" />
              <span className="text-sm font-medium text-blue-600">100+ API Testing Solutions</span>
            </div>
            <h1 className="text-5xl lg:text-6xl font-black text-slate-900 tracking-tighter mb-6">
              OneClickAPI Hub
            </h1>
            <p className="text-xl text-slate-600 leading-relaxed mb-8">
              Your comprehensive resource for API testing, debugging, and code generation. 
              Find the perfect solution for your specific API challenge.
            </p>
          </div>
        </div>
      </div>

      {/* Sticky Search Bar */}
      <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-slate-200">
        <div className="max-w-7xl mx-auto px-6 lg:px-8 py-4">
          <div className="relative max-w-2xl mx-auto">
            <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
              <Search className="w-5 h-5 text-slate-400" />
            </div>
            <input
              type="text"
              placeholder="Search 100+ solutions..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 text-lg text-slate-900 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: 'Total Solutions', value: (keywords as KeywordData[]).length },
            { label: 'Categories', value: categories.length },
            { label: 'Avg Load Time', value: '<1s' },
            { label: 'Free Forever', value: '100%' }
          ].map((stat, idx) => (
            <div key={idx} className="bg-white border border-slate-200 p-6 text-center">
              <div className="text-3xl font-black text-blue-600 mb-1">{stat.value}</div>
              <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Categories Navigation */}
        <nav className="mb-12">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-blue-500"></div>
            <h2 className="text-2xl font-bold text-slate-900">Browse by Category</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
            {categories.map((category, idx) => (
              <a
                key={idx}
                href={`#${category.name.toLowerCase().replace(/\s+/g, '-')}`}
                className="flex items-center gap-3 p-4 bg-white border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all group"
              >
                <div className="w-10 h-10 bg-slate-100 group-hover:bg-blue-100 rounded-full flex items-center justify-center transition-colors">
                  <div className="text-slate-400 group-hover:text-blue-500 transition-colors">
                    {category.icon}
                  </div>
                </div>
                <span className="font-semibold text-slate-700 group-hover:text-blue-700 text-sm">
                  {category.name}
                </span>
              </a>
            ))}
          </div>
        </nav>

        {/* Solutions Grid */}
        <div className="space-y-16">
          {Object.entries(categorizedData).map(([categoryName, items]) => {
            const category = categories.find(c => c.name === categoryName);
            
            return (
              <section
                key={categoryName}
                id={categoryName.toLowerCase().replace(/\s+/g, '-')}
                className="scroll-mt-24"
              >
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                    {category ? (
                      <div className="text-blue-500">{category.icon}</div>
                    ) : (
                      <Clock className="w-6 h-6 text-blue-500" />
                    )}
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-slate-900">{categoryName}</h2>
                    <p className="text-slate-500">{items.length} solutions</p>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {items.map((item) => (
                    <article
                      key={item.slug}
                      className="bg-white border border-slate-200 p-8 hover:border-blue-300 hover:shadow-lg transition-all group"
                    >
                      <Link href={`/${item.slug}`} className="block">
                        <div className="flex items-start justify-between mb-4">
                          <h3 className="text-xl font-bold text-slate-900 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {item.title}
                          </h3>
                          <ArrowRight className="w-5 h-5 text-slate-300 group-hover:text-blue-500 flex-shrink-0 ml-4 transition-colors" />
                        </div>
                        <p className="text-slate-600 leading-relaxed mb-4 line-clamp-3">
                          {item.problem_description}
                        </p>
                        <div className="flex items-center gap-2 text-sm text-slate-400">
                          <Terminal className="w-4 h-4" />
                          <span className="font-mono">{item.slug}</span>
                        </div>
                      </Link>
                    </article>
                  ))}
                </div>
              </section>
            );
          })}
        </div>

        {/* Empty State */}
        {Object.keys(categorizedData).length === 0 && (
          <div className="text-center py-16">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-slate-400" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">No solutions found</h3>
            <p className="text-slate-600">Try adjusting your search terms</p>
          </div>
        )}

        {/* CTA Section */}
        <div className="mt-16 bg-slate-900 border border-slate-800 p-8 lg:p-12">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-black text-white mb-4">
              Ready to Test Your API?
            </h2>
            <p className="text-lg text-slate-300 mb-8">
              Join thousands of developers who have switched to OneClickAPI for fast, 
              lightweight API testing. No signup required.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold text-lg rounded-md transition-all duration-200 active:scale-95"
            >
              <Zap className="w-5 h-5" />
              Launch OneClickAPI
            </Link>
          </div>
        </div>

        {/* Footer */}
        <footer className="mt-16 bg-white border border-slate-200 p-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="flex items-center justify-center gap-3 text-slate-600">
              <Mail className="w-5 h-5 text-blue-500" />
              <span className="text-lg">Support: xingfang.wang@gmail.com</span>
            </div>
            <p className="mt-4 text-sm text-slate-500">
              Have questions or need help with your API testing? Our support team is ready to assist you.
            </p>
          </div>
        </footer>
      </div>
    </main>
  );
}
