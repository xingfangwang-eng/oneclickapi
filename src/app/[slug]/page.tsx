import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import keywords from '@data/keywords.json';
import { Zap, Shield, Code2, Clock, CheckCircle2, ArrowRight, Terminal, Copy, Play, MessageSquare, HelpCircle, Mail, ChevronRight, Home, LayoutGrid, ExternalLink } from 'lucide-react';

// 22个站点列表
const otherSites = [
  { name: 'BootHell', slug: 'boothell' },
  { name: 'Capsule Factory', slug: 'capsule-factory-saas' },
  { name: 'Clean CSV AI', slug: 'cleancsvai' },
  { name: 'CrossPost Fast', slug: 'crosspostfast' },
  { name: 'Focus Inbox', slug: 'focusinbox' },
  { name: 'Kill Bill Card', slug: 'killbillcard' },
  { name: 'Kill SaaS', slug: 'killsaas' },
  { name: 'Kill Switch API', slug: 'killswitchapi' },
  { name: 'Lightning Brand', slug: 'lightningbrand' },
  { name: 'Linguistic DNA', slug: 'linguisticdnaextractor' },
  { name: 'Nav Slayer', slug: 'navslayer' },
  { name: 'Never Upload IO', slug: 'neveruploadio' },
  { name: 'No AI MD', slug: 'noaimd' },
  { name: 'No SEO Top', slug: 'noseotop' },
  { name: 'No Adobe', slug: 'noadobe' },
  { name: 'Nuke Privacy', slug: 'nukeprivacy' },
  { name: 'Ping Them IO', slug: 'pingthemio' },
];

// 随机选择5个站点（排除当前站点）
function getRandomSites(currentSlug: string, count: number = 5) {
  // 过滤掉当前站点
  const availableSites = otherSites.filter(site => site.slug !== currentSlug);
  
  // Fisher-Yates 洗牌算法
  const shuffled = [...availableSites];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  
  return shuffled.slice(0, count);
}

interface KeywordData {
  keyword: string;
  slug: string;
  title: string;
  problem_description: string;
  how_to_solve: string;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return keywords.map((k: KeywordData) => ({
    slug: k.slug,
  }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const keyword = keywords.find((k: KeywordData) => k.slug === slug);
  
  if (!keyword) {
    return {
      title: 'Not Found',
    };
  }

  const description = keyword.how_to_solve.slice(0, 160);

  return {
    title: keyword.title,
    description: description,
    keywords: [keyword.keyword, 'API tester', 'Postman alternative', 'online API testing', 'REST API client', 'API debugging', 'code generator'],
    alternates: {
      canonical: `https://oneclickapi.vercel.app/${slug}`,
    },
    openGraph: {
      title: keyword.title,
      description: description,
      url: `https://oneclickapi.vercel.app/${slug}`,
      siteName: 'OneClickAPI',
      type: 'article',
      images: [{
        url: 'https://oneclickapi.vercel.app/icon-192x192.png',
        width: 192,
        height: 192,
        alt: 'OneClickAPI Logo'
      }]
    },
    twitter: {
      card: 'summary_large_image',
      title: keyword.title,
      description: description,
      images: ['https://oneclickapi.vercel.app/icon-192x192.png']
    },
    robots: {
      index: true,
      follow: true,
      'max-snippet': 160,
      'max-image-preview': 'large',
      'max-video-preview': -1
    },
    applicationName: 'OneClickAPI',
    referrer: 'strict-origin-when-cross-origin',
  };
}

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default async function KeywordPage({ params }: PageProps) {
  const { slug } = await params;
  const keyword = keywords.find((k: KeywordData) => k.slug === slug);

  if (!keyword) {
    notFound();
  }

  // 获取5个随机站点
  const randomSites = getRandomSites(slug, 5);

  const codeExample = `// Example API request
fetch('https://api.example.com/data', {
  method: 'GET',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': 'Bearer your-token-here'
  }
})
.then(response => response.json())
.then(data => console.log(data))
.catch(error => console.error('Error:', error));`;

  return (
    <main className="min-h-screen bg-[#F9FAFB]">
      {/* Schema Markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'WebPage',
            'name': keyword.title,
            'description': keyword.how_to_solve,
            'url': `https://oneclickapi.vercel.app/${slug}`,
            'breadcrumb': {
              '@type': 'BreadcrumbList',
              'itemListElement': [
                {
                  '@type': 'ListItem',
                  'position': 1,
                  'name': 'Home',
                  'item': 'https://oneclickapi.vercel.app'
                },
                {
                  '@type': 'ListItem',
                  'position': 2,
                  'name': 'Solutions',
                  'item': 'https://oneclickapi.vercel.app/solutions'
                },
                {
                  '@type': 'ListItem',
                  'position': 3,
                  'name': keyword.title
                }
              ]
            },
            'mainEntity': {
              '@type': 'Question',
              'name': keyword.title,
              'text': keyword.problem_description,
              'answer': {
                '@type': 'Answer',
                'text': keyword.how_to_solve
              }
            }
          })
        }}
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
              <Link href="/solutions" className="flex items-center text-slate-500 hover:text-blue-600 transition-colors">
                <LayoutGrid className="w-4 h-4 mr-1" />
                <span>Solutions</span>
              </Link>
            </li>
            <li className="text-slate-300">
              <ChevronRight className="w-4 h-4" />
            </li>
            <li>
              <span className="text-slate-900 font-medium truncate max-w-[200px] sm:max-w-[300px] lg:max-w-[400px]" title={keyword.title}>
                {keyword.title}
              </span>
            </li>
          </ol>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-[65%_35%] gap-8">
          {/* Left Column - Main Content */}
          <div className="space-y-8">
            {/* Title Section */}
            <div className="bg-white border border-slate-200 p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-slate-100 rounded-full flex items-center justify-center">
                  <Zap className="w-6 h-6 text-red-500" />
                </div>
                <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">
                  OneClickAPI Solution
                </span>
              </div>
              <h1 className="text-4xl lg:text-5xl font-black text-slate-900 tracking-tighter mb-4">
                {keyword.title}
              </h1>
              <p className="text-lg text-slate-600 leading-relaxed">
                {keyword.how_to_solve}
              </p>
            </div>

            {/* Problem Section */}
            <div className="bg-white border border-slate-200 p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-red-500"></div>
                <h2 className="text-2xl font-bold text-slate-900">The Problem</h2>
              </div>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                {keyword.problem_description}
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                In today's fast-paced development environment, developers often face significant challenges when testing APIs. Traditional API clients like Postman and Insomnia require lengthy installations, consume valuable system resources, and often force users to create accounts just to perform basic testing. These tools can take 5-10 seconds to load, which may seem trivial but adds up significantly over the course of a development day.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                Moreover, many developers work in environments with restricted access, such as corporate networks or public computers, where installing desktop applications is not an option. This creates a significant barrier to efficient API testing and debugging, slowing down development cycles and increasing frustration.
              </p>
              <div className="bg-slate-50 border-l-4 border-red-500 p-6">
                <p className="text-slate-700 italic">
                  &ldquo;{keyword.problem_description}&rdquo;
                </p>
              </div>
            </div>

            {/* The Guide Section */}
            <div className="bg-white border border-slate-200 p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-red-500"></div>
                <h2 className="text-2xl font-bold text-slate-900">How OneClickAPI Solves This</h2>
              </div>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                {keyword.how_to_solve}
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                OneClickAPI addresses these challenges by providing a lightweight, browser-based solution that requires no installation or account creation. Our platform loads in under 1 second, even on slow connections, and consumes minimal system resources. This makes it ideal for use on any device, including Chromebooks, Raspberry Pi, and restricted corporate laptops.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                With OneClickAPI, you can test any API endpoint with just a few clicks. Our intuitive interface allows you to quickly paste your URL, add headers and authentication, and execute requests instantly. The platform automatically formats JSON responses for easy reading and generates code snippets in multiple languages, including JavaScript, Python, and cURL.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-6">
                We've also built-in CORS handling to overcome common frontend development challenges, and our privacy-first approach ensures that none of your API keys or request data is stored on our servers. Everything stays in your browser, giving you complete control over your sensitive information.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed mb-8">
                Whether you're a seasoned developer working on complex microservices or a beginner learning API testing, OneClickAPI provides the perfect balance of simplicity and power to help you work more efficiently.
              </p>
              
              {/* Steps */}
              <div className="space-y-6">
                {
                  [
                    { title: 'Paste Your URL', desc: 'Simply paste the API endpoint URL into the input field' },
                    { title: 'Add Headers (Optional)', desc: 'Click to expand and add any required headers or authentication' },
                    { title: 'Execute', desc: 'Press Enter or click the EXECUTE button to send the request' },
                    { title: 'Get Results', desc: 'View formatted JSON response and generated code snippets instantly' },
                  ].map((step, idx) => (
                    <div key={idx} className="flex gap-6">
                      <div className="w-8 h-8 bg-red-500 rounded-full flex items-center justify-center flex-shrink-0">
                        <CheckCircle2 className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-slate-900 mb-2">{step.title}</h3>
                        <p className="text-slate-600">{step.desc}</p>
                      </div>
                    </div>
                  ))
                }
              </div>
            </div>

            {/* Code Example Section */}
            <div className="bg-slate-900 border border-slate-800 p-8 lg:p-10">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <Terminal className="w-6 h-6 text-red-500" />
                  <h2 className="text-xl font-bold text-white">Code Example</h2>
                </div>
                <button className="flex items-center gap-2 px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 text-sm font-medium transition-colors">
                  <Copy className="w-4 h-4" />
                  Copy
                </button>
              </div>
              <pre className="text-sm text-slate-300 overflow-x-auto">
                <code>{codeExample}</code>
              </pre>
            </div>

            {/* Comparison Table */}
            <div className="bg-white border border-slate-200 p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-red-500"></div>
                <h2 className="text-2xl font-bold text-slate-900">Why Choose OneClickAPI?</h2>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b-2 border-slate-200">
                      <th className="text-left py-4 px-4 font-bold text-slate-900">Feature</th>
                      <th className="text-center py-4 px-4 font-bold text-red-600">OneClickAPI</th>
                      <th className="text-center py-4 px-4 font-bold text-slate-500">Postman</th>
                      <th className="text-center py-4 px-4 font-bold text-slate-500">Insomnia</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      [
                        { feature: 'No Login Required', oneclick: true, postman: false, insomnia: false },
                        { feature: 'Load Time', oneclick: '< 1s', postman: '5-10s', insomnia: '3-5s' },
                        { feature: 'Memory Usage', oneclick: 'Minimal', postman: 'High', insomnia: 'Medium' },
                        { feature: 'Code Generation', oneclick: true, postman: true, insomnia: true },
                        { feature: 'CORS Handling', oneclick: 'Built-in', postman: 'Manual', insomnia: 'Manual' },
                        { feature: 'Privacy First', oneclick: true, postman: false, insomnia: false },
                      ].map((row, idx) => (
                        <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                          <td className="py-4 px-4 text-slate-700">{row.feature}</td>
                          <td className="py-4 px-4 text-center">
                            {typeof row.oneclick === 'boolean' ? (
                              row.oneclick ? <CheckCircle2 className="w-5 h-5 text-red-500 mx-auto" /> : <span className="text-slate-400">—</span>
                            ) : (
                              <span className="font-semibold text-red-600">{row.oneclick}</span>
                            )}
                          </td>
                          <td className="py-4 px-4 text-center">
                            {typeof row.postman === 'boolean' ? (
                              row.postman ? <CheckCircle2 className="w-5 h-5 text-slate-500 mx-auto" /> : <span className="text-slate-400">—</span>
                            ) : (
                              <span className="text-slate-500">{row.postman}</span>
                            )}
                          </td>
                          <td className="py-4 px-4 text-center">
                            {typeof row.insomnia === 'boolean' ? (
                              row.insomnia ? <CheckCircle2 className="w-5 h-5 text-slate-500 mx-auto" /> : <span className="text-slate-400">—</span>
                            ) : (
                              <span className="text-slate-500">{row.insomnia}</span>
                            )}
                          </td>
                        </tr>
                      ))
                    }
                  </tbody>
                </table>
              </div>
            </div>

            {/* User Reviews Section */}
            <div className="bg-white border border-slate-200 p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-red-500"></div>
                <h2 className="text-2xl font-bold text-slate-900">User Reviews</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[
                  {
                    name: 'Alex Johnson',
                    role: 'Senior Frontend Developer',
                    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Alex',
                    quote: `OneClickAPI has completely transformed how I test APIs. The speed and simplicity are unmatched, especially when I need to quickly verify endpoints without dealing with Postman's bloat.`
                  },
                  {
                    name: 'Sarah Chen',
                    role: 'Full Stack Engineer',
                    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Sarah',
                    quote: `As someone who works with multiple APIs daily, the code generation feature alone saves me hours each week. The CORS handling is a game-changer for frontend development.`
                  },
                  {
                    name: 'Michael Rodriguez',
                    role: 'DevOps Engineer',
                    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Michael',
                    quote: `I love how lightweight this tool is. It works perfectly on my Chromebook and even on slow hotel Wi-Fi. No more waiting for Electron apps to load just to test a simple endpoint.`
                  },
                  {
                    name: 'Emily Watson',
                    role: 'API Product Manager',
                    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=Emily',
                    quote: `This tool is perfect for demonstrating API functionality to stakeholders. The clean interface makes it easy for non-technical team members to understand how our APIs work.`
                  },
                  {
                    name: 'David Kim',
                    role: 'Backend Developer',
                    avatar: 'https://api.dicebear.com/9.x/avataaars/svg?seed=David',
                    quote: `The ability to test webhooks and see raw headers has been invaluable for debugging our microservices architecture. OneClickAPI has become an essential part of our development workflow.`
                  }
                ].map((review, idx) => (
                  <div key={idx} className="border border-slate-100 p-6 rounded-lg hover:shadow-sm transition-shadow">
                    <div className="flex items-center gap-4 mb-4">
                      <img src={review.avatar} alt={review.name} className="w-12 h-12 rounded-full object-cover" />
                      <div>
                        <h4 className="font-bold text-slate-900">{review.name}</h4>
                        <p className="text-sm text-slate-500">{review.role}</p>
                      </div>
                    </div>
                    <p className="text-slate-600 italic">"{review.quote}"</p>
                    <div className="mt-4 flex items-center">
                      {[1, 2, 3, 4, 5].map((star) => (
                        <svg key={star} className="w-4 h-4 text-yellow-400 fill-current" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* FAQ Section */}
            <div className="bg-white border border-slate-200 p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-red-500"></div>
                <h2 className="text-2xl font-bold text-slate-900">Frequently Asked Questions</h2>
              </div>
              <div className="space-y-6">
                {[
                  {
                    question: `What is ${keyword.title}?`,
                    answer: `OneClickAPI is a lightweight, zero-login API testing tool that allows you to instantly test any API endpoint without the bloat of traditional API clients like Postman or Insomnia.`
                  },
                  {
                    question: `How does ${keyword.keyword} work?`,
                    answer: `Simply paste your API endpoint URL into the input field, add any necessary headers or authentication, and click execute. OneClickAPI will send the request and display the response instantly.`
                  },
                  {
                    question: `Is ${keyword.title} free to use?`,
                    answer: `Yes! OneClickAPI is completely free to use with no hidden costs or premium features. We believe in providing a simple, powerful API testing tool for everyone.`
                  },
                  {
                    question: `Does ${keyword.title} store my API keys?`,
                    answer: `No. OneClickAPI is stateless and does not store any of your data, including API keys or request/response data. Your information stays in your browser and is never sent to our servers.`
                  },
                  {
                    question: `Can I use ${keyword.title} to test localhost APIs?`,
                    answer: `Yes! OneClickAPI can test both public and localhost APIs. For localhost testing, simply use your local server URL (e.g., http://localhost:3000/api) and we'll handle the rest.`
                  }
                ].map((faq, idx) => (
                  <div key={idx} className="border-b border-slate-100 pb-6 last:border-0 last:pb-0">
                    <h3 className="text-xl font-bold text-slate-900 mb-2">{faq.question}</h3>
                    <p className="text-slate-600">{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Contact Section */}
            <div className="bg-white border border-slate-200 p-8 lg:p-10">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-1 h-8 bg-red-500"></div>
                <h2 className="text-2xl font-bold text-slate-900">Get Support</h2>
              </div>
              <div className="flex items-center gap-3 text-lg text-slate-600">
                <Mail className="w-6 h-6 text-red-500" />
                <span>Support: 457239850@qq.com</span>
              </div>
              <p className="mt-4 text-slate-500">
                Have questions or need help with your API testing? Our support team is ready to assist you.
              </p>
            </div>
          </div>

          {/* Right Column - Sticky Sidebar */}
          <div className="lg:sticky lg:top-8 h-fit space-y-6">
            {/* CTA Card */}
            <div className="bg-white border border-slate-200 p-8">
              <div className="text-center mb-6">
                <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Play className="w-8 h-8 text-red-600" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-2">Try It Now</h3>
                <p className="text-slate-600">Test your API in seconds. No signup required.</p>
              </div>
              
              <a
                href="/"
                className="block w-full py-4 px-6 bg-red-600 hover:bg-red-700 text-white text-center font-bold text-lg rounded-md transition-all duration-200 active:scale-95"
              >
                Launch OneClickAPI
              </a>
              
              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-red-500" />
                  <span>Zero login required</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-red-500" />
                  <span>Sub-second response</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <CheckCircle2 className="w-4 h-4 text-red-500" />
                  <span>Auto code generation</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-slate-600">
                  <Shield className="w-4 h-4 text-red-500" />
                  <span>Privacy first - no data logging</span>
                </div>
              </div>
            </div>

            {/* Features Card */}
            <div className="bg-slate-50 border border-slate-200 p-8">
              <h3 className="text-lg font-bold text-slate-900 mb-4">Key Features</h3>
              <div className="space-y-4">
                {[
                  { icon: Zap, title: 'Lightning Fast', desc: '0.8s average response time' },
                  { icon: Code2, title: 'Code Generation', desc: 'JS, Python, cURL snippets' },
                  { icon: Shield, title: 'CORS Proxy', desc: 'Built-in CORS handling' },
                  { icon: Clock, title: 'No Install', desc: 'Works in any browser' },
                ].map((feature, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center flex-shrink-0">
                      <feature.icon className="w-5 h-5 text-slate-400" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-slate-900">{feature.title}</h4>
                      <p className="text-sm text-slate-500">{feature.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Card */}
            <div className="bg-white border border-slate-200 p-8">
              <div className="flex items-center gap-2 mb-4">
                <Shield className="w-5 h-5 text-red-500" />
                <h3 className="text-lg font-bold text-slate-900">Trusted by Developers</h3>
              </div>
              <p className="text-slate-600 text-sm mb-4">
                Join thousands of developers who have switched from bloated API clients to OneClickAPI.
              </p>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <svg key={star} className="w-5 h-5 text-yellow-400 fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
                <span className="ml-2 text-sm font-semibold text-slate-700">4.9/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* You May Also Like Section */}
      <div className="max-w-7xl mx-auto px-6 lg:px-8 py-12">
        <div className="bg-white border border-slate-200 p-8 lg:p-10">
          <div className="flex items-center gap-3 mb-6">
            <div className="w-1 h-8 bg-blue-500"></div>
            <h2 className="text-2xl font-bold text-slate-900">You May Also Like</h2>
          </div>
          <p className="text-slate-600 mb-6">
            Explore more tools from our collection of developer utilities and SaaS products.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {randomSites.map((site, idx) => (
              <a
                key={idx}
                href={`https://${site.slug}.wangdadi.xyz`}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-center gap-3 p-4 bg-slate-50 border border-slate-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-200"
              >
                <div className="w-10 h-10 bg-white border border-slate-200 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:border-blue-300 transition-colors">
                  <ExternalLink className="w-4 h-4 text-slate-400 group-hover:text-blue-500 transition-colors" />
                </div>
                <div className="min-w-0">
                  <h3 className="font-semibold text-slate-900 group-hover:text-blue-700 text-sm truncate">
                    {site.name}
                  </h3>
                  <p className="text-xs text-slate-500 truncate">
                    {site.slug}.wangdadi.xyz
                  </p>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-slate-600">
            <Mail className="w-5 h-5 text-blue-500" />
            <span>Support: 457239850@qq.com</span>
          </div>
          <p className="mt-4 text-center text-sm text-slate-500">
            Have questions or need help with your API testing? Our support team is ready to assist you.
          </p>
        </div>
      </footer>
    </main>
  );
}
