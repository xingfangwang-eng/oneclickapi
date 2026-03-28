'use client';

import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Zap, ChevronDown, ChevronUp, Play, Globe, Shield, Loader2, CheckCircle, XCircle, Copy, Check, Code2, FileJson, Terminal, Heart, LayoutGrid } from 'lucide-react';

export default function Home() {
  const [apiUrl, setApiUrl] = useState('');
  const [isUrlValid, setIsUrlValid] = useState(false);
  const [showHeaders, setShowHeaders] = useState(false);
  const [headers, setHeaders] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [activeTab, setActiveTab] = useState('js');
  const [copiedTab, setCopiedTab] = useState(null);

  // Memoize URL pattern regex
  const urlPattern = useMemo(() => /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/i, []);

  useEffect(() => {
    setIsUrlValid(urlPattern.test(apiUrl));
  }, [apiUrl, urlPattern]);

  // Memoize event handlers
  const handleExecute = useCallback(async () => {
    if (!isUrlValid) return;

    setIsLoading(true);
    setError(null);
    setResponse(null);

    try {
      let parsedHeaders = {};
      if (headers) {
        try {
          parsedHeaders = JSON.parse(headers);
        } catch (e) {
          setError('Invalid JSON format in headers');
          setIsLoading(false);
          return;
        }
      }

      const proxyResponse = await fetch('/api/proxy', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          url: apiUrl,
          method: 'GET',
          headers: parsedHeaders,
        }),
      });

      const result = await proxyResponse.json();
      
      if (proxyResponse.ok) {
        setResponse(result);
      } else {
        setError(result.error || 'Request failed');
      }
    } catch (e) {
      setError('Failed to connect to proxy server');
    } finally {
      setIsLoading(false);
    }
  }, [apiUrl, headers, isUrlValid]);

  const handleKeyPress = useCallback((e) => {
    if (e.key === 'Enter') {
      handleExecute();
    }
  }, [handleExecute]);

  const handleCopy = useCallback((code, tab) => {
    navigator.clipboard.writeText(code);
    setCopiedTab(tab);
    setTimeout(() => setCopiedTab(null), 2000);
  }, []);

  // Memoize syntaxHighlight function to avoid re-computation
  const syntaxHighlight = useCallback((json) => {
    if (typeof json !== 'string') {
      json = JSON.stringify(json, undefined, 2);
    }
    json = json.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    json = json.replace(/("(?:password|token|secret|key|auth|apiKey|apikey|accessToken|refreshToken|authorization)"\s*:\s*")([^"]*)"/gi, function (match, key, value) {
      return `${key}********"`;
    });
    
    json = json.replace(/("(?:[^"\\]|\\.)*")(\s*:)/g, function (match, key, colon) {
      return `<span class="text-indigo-600">${key}</span>${colon}`;
    });
    
    json = json.replace(/:\s*("(?:[^"\\]|\\.)*")/g, function (match, value) {
      return `: <span class="text-green-600">${value}</span>`;
    });
    
    json = json.replace(/\b(true|false)\b/g, '<span class="text-blue-600">$1</span>');
    json = json.replace(/\b(null)\b/g, '<span class="text-red-600">$1</span>');
    json = json.replace(/\b(\d+)\b/g, '<span class="text-orange-500">$1</span>');
    
    return json;
  }, []);

  // Memoize code snippets generation
  const codeSnippets = useMemo(() => {
    if (!response) return { js: '', python: '', curl: '' };
    
    const headersObj = headers ? JSON.parse(headers) : {};
    const headersStr = Object.entries(headersObj)
      .map(([key, value]) => `    '${key}': '${value}'`)
      .join(',\n');

    const curlHeaders = Object.entries(headersObj)
      .map(([key, value]) => `  -H '${key}: ${value}'`)
      .join(' \\n');

    return {
      js: `fetch('${apiUrl}', {\n  method: 'GET',\n  headers: {\n${headersStr}\n  }\n})\n  .then(response => response.json())\n  .then(data => console.log(data));`,
      
      python: `import requests\n\nurl = '${apiUrl}'\nheaders = {\n${headersStr}\n}\n\nresponse = requests.get(url, headers=headers)\nprint(response.json())`,
      
      curl: `curl -X GET '${apiUrl}' \\\n${curlHeaders}`
    };
  }, [response, apiUrl, headers]);

  return React.createElement('div', {
    className: 'min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100 relative overflow-hidden'
  }, [
    React.createElement('div', {
      key: 'grid-background',
      className: 'absolute inset-0 opacity-[0.03] pointer-events-none',
      style: {
        backgroundImage: `linear-gradient(#6366f1 1px, transparent 1px), linear-gradient(90deg, #6366f1 1px, transparent 1px)`,
        backgroundSize: '40px 40px'
      }
    }),
    React.createElement('div', {
      key: 'main-content',
      className: 'relative z-10 flex flex-col items-center justify-center min-h-screen p-4 sm:p-6 lg:p-8'
    }, [
      React.createElement('div', {
        key: 'container',
        className: 'w-full max-w-[1200px] mx-auto'
      }, [
        React.createElement('div', {
          key: 'header',
          className: 'text-center mb-12'
        }, [
          React.createElement('div', {
            key: 'logo',
            className: 'flex items-center justify-center gap-3 mb-6'
          }, [
            React.createElement('div', {
              key: 'logo-icon',
              className: 'w-12 h-12 bg-gradient-to-br from-indigo-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20'
            }, [
              React.createElement(Zap, {
                key: 'zap-icon',
                size: 24,
                className: 'text-white'
              })
            ]),
            React.createElement('h1', {
              key: 'brand-name',
              className: 'text-2xl font-bold text-slate-900'
            }, 'OneClick')
          ]),
          React.createElement('h2', {
            key: 'title',
            className: 'text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 mb-4 leading-tight'
          }, 'Paste your API → Get shit done'),
          React.createElement('p', {
            key: 'subtitle',
            className: 'text-lg text-slate-500 max-w-2xl mx-auto'
          }, 'The fastest way to test APIs and generate code snippets. No login, no bloat.')
        ]),
        React.createElement('div', {
          key: 'main-card',
          className: 'bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 p-6 sm:p-8 lg:p-10'
        }, [
          React.createElement('div', {
            key: 'input-section',
            className: 'space-y-6'
          }, [
            React.createElement('div', {
              key: 'url-input-wrapper',
              className: 'relative'
            }, [
              React.createElement('div', {
                key: 'input-icon',
                className: 'absolute left-4 top-1/2 -translate-y-1/2 text-slate-400'
              }, [
                React.createElement(Globe, {
                  key: 'globe-icon',
                  size: 20
                })
              ]),
              React.createElement('input', {
                key: 'url-input',
                type: 'text',
                value: apiUrl,
                onChange: (e: React.ChangeEvent<HTMLInputElement>) => setApiUrl(e.target.value),
                onKeyPress: handleKeyPress,
                placeholder: 'Enter your API URL here...',
                className: 'w-full pl-12 pr-4 py-4 text-lg border-2 border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 text-slate-900 placeholder:text-slate-400'
              })
            ]),
            React.createElement('div', {
              key: 'security-notice',
              className: 'flex items-center gap-2 text-xs text-slate-400'
            }, [
              React.createElement(Shield, {
                key: 'shield-icon',
                size: 12
              }),
              React.createElement('span', {
                key: 'security-text'
              }, "We don't log your keys. Your data stays in request cycle.")
            ]),
            isUrlValid ? React.createElement('div', {
              key: 'headers-section',
              className: 'space-y-3'
            }, [
              React.createElement('button', {
                key: 'headers-toggle',
                onClick: () => setShowHeaders(!showHeaders),
                className: 'flex items-center gap-2 text-sm font-medium text-slate-600 hover:text-indigo-600 transition-colors duration-200'
              }, [
                React.createElement('span', {
                  key: 'headers-label'
                }, showHeaders ? 'Hide Headers' : 'Headers'),
                showHeaders ? React.createElement(ChevronUp, {
                  key: 'chevron-up',
                  size: 16
                }) : React.createElement(ChevronDown, {
                  key: 'chevron-down',
                  size: 16
                })
              ]),
              showHeaders ? React.createElement('div', {
                key: 'headers-input-wrapper',
                className: 'relative'
              }, [
                React.createElement('textarea', {
                  key: 'headers-input',
                  value: headers,
                  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => setHeaders(e.target.value),
                  placeholder: 'Enter headers as JSON (e.g., {"Authorization": "Bearer token"})',
                  className: 'w-full px-4 py-4 text-sm border-2 border-slate-200 rounded-xl focus:outline-none focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all duration-200 text-slate-900 placeholder:text-slate-400 font-mono',
                  rows: 4
                })
              ]) : null
            ]) : null,
            React.createElement('button', {
              key: 'execute-button',
              onClick: handleExecute,
              disabled: !isUrlValid || isLoading,
              className: `w-full py-4 px-6 text-lg font-semibold rounded-xl transition-all duration-200 flex items-center justify-center gap-3 ${isUrlValid && !isLoading ? 'bg-gradient-to-r from-indigo-500 to-indigo-600 text-white hover:from-indigo-600 hover:to-indigo-700 shadow-lg shadow-indigo-500/25 hover:shadow-xl hover:shadow-indigo-500/30 transform hover:-translate-y-0.5' : 'bg-slate-100 text-slate-400 cursor-not-allowed'}`
            }, [
              isLoading ? React.createElement(Loader2, {
                key: 'loader-icon',
                size: 20,
                className: 'animate-spin text-white'
              }) : React.createElement(Play, {
                key: 'play-icon',
                size: 20,
                className: isUrlValid ? 'text-white' : 'text-slate-400'
              }),
              React.createElement('span', {
                key: 'execute-text'
              }, isLoading ? 'EXECUTING...' : 'EXECUTE')
            ])
          ])
        ])
      ]),
      response ? React.createElement('div', {
        key: 'results-section',
        className: 'mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6 w-full max-w-[1200px] mx-auto'
      }, [
        React.createElement('div', {
          key: 'response-viewer',
          className: 'bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 p-6'
        }, [
          React.createElement('div', {
            key: 'response-header',
            className: 'flex items-center justify-between mb-4'
          }, [
            React.createElement('div', {
              key: 'response-title-group',
              className: 'flex items-center gap-2'
            }, [
              React.createElement(FileJson, {
                key: 'json-icon',
                size: 20,
                className: 'text-indigo-600'
              }),
              React.createElement('h3', {
                key: 'response-title',
                className: 'text-lg font-semibold text-slate-900'
              }, 'Response')
            ]),
            React.createElement('div', {
              key: 'status-badge',
              className: `px-3 py-1 rounded-full text-sm font-bold ${response.status >= 200 && response.status < 300 ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`
            }, `${response.status}`)
          ]),
          React.createElement('div', {
            key: 'response-body',
            className: 'bg-slate-50 border border-slate-200 rounded-xl p-4 max-h-[400px] overflow-auto'
          }, [
            React.createElement('pre', {
              key: 'response-content',
              className: 'text-sm font-mono',
              dangerouslySetInnerHTML: {
                __html: syntaxHighlight(response.body)
              }
            })
          ])
        ]),
        React.createElement('div', {
          key: 'code-snippets',
          className: 'bg-white border border-slate-200 rounded-2xl shadow-xl shadow-slate-200/50 p-6'
        }, [
          React.createElement('div', {
            key: 'snippets-header',
            className: 'flex items-center gap-2 mb-4'
          }, [
            React.createElement(Code2, {
              key: 'code-icon',
              size: 20,
              className: 'text-indigo-600'
            }),
            React.createElement('h3', {
              key: 'snippets-title',
              className: 'text-lg font-semibold text-slate-900'
            }, 'Code Snippets')
          ]),
          React.createElement('div', {
            key: 'tabs',
            className: 'flex gap-2 mb-4 border-b border-slate-200'
          }, [
            ['js', 'python', 'curl'].map((tab) => 
              React.createElement('button', {
                key: tab,
                onClick: () => setActiveTab(tab),
                className: `px-4 py-2 text-sm font-medium transition-colors duration-200 flex items-center gap-2 ${activeTab === tab ? 'text-indigo-600 border-b-2 border-indigo-600' : 'text-slate-600 hover:text-slate-900'}`
              }, [
                tab === 'js' ? React.createElement(Code2, { key: 'js-icon', size: 16 }) : null,
                tab === 'python' ? React.createElement(Terminal, { key: 'python-icon', size: 16 }) : null,
                tab === 'curl' ? React.createElement(Terminal, { key: 'curl-icon', size: 16 }) : null,
                React.createElement('span', {
                  key: `${tab}-label`
                }, tab.toUpperCase())
              ])
            )
          ]),
          React.createElement('div', {
            key: 'code-content',
            className: 'relative'
          }, [
            React.createElement('pre', {
              key: 'code-display',
              className: 'bg-slate-50 border border-slate-200 rounded-xl p-4 text-sm font-mono max-h-[350px] overflow-auto'
            }, codeSnippets[activeTab]),
            React.createElement('button', {
              key: 'copy-button',
              onClick: () => handleCopy(codeSnippets[activeTab], activeTab),
              className: 'absolute top-2 right-2 p-2 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors duration-200 shadow-sm'
            }, [
              copiedTab === activeTab ? React.createElement(Check, {
                key: 'check-icon',
                size: 16,
                className: 'text-green-600'
              }) : React.createElement(Copy, {
                key: 'copy-icon',
                size: 16,
                className: 'text-slate-600'
              })
            ])
          ])
        ])
      ]) : null,
      error ? React.createElement('div', {
        key: 'error-section',
        className: 'mt-8 bg-red-50 border border-red-200 rounded-2xl shadow-xl shadow-red-200/50 p-6 sm:p-8 lg:p-10 w-full max-w-[1200px] mx-auto'
      }, [
        React.createElement('div', {
          key: 'error-header',
          className: 'flex items-center gap-2 mb-4'
        }, [
          React.createElement(XCircle, {
            key: 'error-icon',
            size: 20,
            className: 'text-red-500'
          }),
          React.createElement('h3', {
            key: 'error-title',
            className: 'text-lg font-semibold text-red-900'
          }, 'Error')
        ]),
        React.createElement('p', {
          key: 'error-message',
          className: 'text-sm text-red-700'
        }, error)
      ]) : null,
      React.createElement('div', {
        key: 'action-buttons',
        className: 'mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-[1200px] mx-auto'
      }, [
        React.createElement('a', {
          key: 'solutions-link',
          href: '/solutions',
          className: 'inline-flex items-center gap-2 px-6 py-3 bg-white border-2 border-slate-200 text-slate-700 font-semibold rounded-xl hover:border-indigo-500 hover:text-indigo-600 transition-all duration-200 shadow-sm hover:shadow-md'
        }, [
          React.createElement(LayoutGrid, {
            key: 'solutions-icon',
            size: 20
          }),
          React.createElement('span', {
            key: 'solutions-text'
          }, 'Browse All Alternatives')
        ]),
        React.createElement('a', {
          key: 'donate-link',
          href: 'https://www.paypal.com/paypalme/xingfangwang',
          target: '_blank',
          rel: 'noopener noreferrer',
          className: 'inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-pink-500 to-rose-500 text-white font-semibold rounded-xl hover:from-pink-600 hover:to-rose-600 transition-all duration-200 shadow-lg shadow-pink-500/25 hover:shadow-xl hover:shadow-pink-500/30 transform hover:-translate-y-0.5'
        }, [
          React.createElement(Heart, {
            key: 'donate-icon',
            size: 20
          }),
          React.createElement('span', {
            key: 'donate-text'
          }, 'Support Us via PayPal')
        ])
      ]),
      React.createElement('div', {
        key: 'quick-access',
        className: 'mt-12 w-full max-w-[1200px] mx-auto'
      }, [
        React.createElement('h3', {
          key: 'quick-access-title',
          className: 'text-sm font-medium text-slate-500 mb-6 text-center uppercase tracking-wider'
        }, 'Quick Access'),
        React.createElement('div', {
          key: 'quick-access-grid',
          className: 'grid grid-cols-2 sm:grid-cols-4 gap-4'
        }, [
          React.createElement('a', {
            key: 'api-testing',
            href: '/api-tester-for-chromebook',
            className: 'text-xs text-slate-500 hover:text-indigo-600 transition-colors duration-200'
          }, 'API Testing'),
          React.createElement('a', {
            key: 'postman-alternative',
            href: '/postman-slow-alternative',
            className: 'text-xs text-slate-500 hover:text-indigo-600 transition-colors duration-200'
          }, 'Postman Alternative'),
          React.createElement('a', {
            key: 'curl-to-python',
            href: '/curl-to-python-requests-instant',
            className: 'text-xs text-slate-500 hover:text-indigo-600 transition-colors duration-200'
          }, 'cURL to Python'),
          React.createElement('a', {
            key: 'cors-fix',
            href: '/bypass-cors-api-testing-online',
            className: 'text-xs text-slate-500 hover:text-indigo-600 transition-colors duration-200'
          }, 'CORS Fix'),
          React.createElement('a', {
            key: 'webhook-testing',
            href: '/test-webhook-no-registration',
            className: 'text-xs text-slate-500 hover:text-indigo-600 transition-colors duration-200'
          }, 'Webhook Testing'),
          React.createElement('a', {
            key: 'rest-client',
            href: '/online-rest-client-quick-debug',
            className: 'text-xs text-slate-500 hover:text-indigo-600 transition-colors duration-200'
          }, 'REST Client'),
          React.createElement('a', {
            key: 'api-debugger',
            href: '/simple-api-debugger-for-non-devs',
            className: 'text-xs text-slate-500 hover:text-indigo-600 transition-colors duration-200'
          }, 'API Debugger'),
          React.createElement('a', {
            key: 'json-formatter',
            href: '/format-api-json-online',
            className: 'text-xs text-slate-500 hover:text-indigo-600 transition-colors duration-200'
          }, 'JSON Formatter'),
          React.createElement('a', {
            key: 'bearer-token',
            href: '/test-bearer-token-online',
            className: 'text-xs text-slate-500 hover:text-indigo-600 transition-colors duration-200'
          }, 'Bearer Token Testing'),
          React.createElement('a', {
            key: 'api-response',
            href: '/copy-api-response-json',
            className: 'text-xs text-slate-500 hover:text-indigo-600 transition-colors duration-200'
          }, 'API Response'),
          React.createElement('a', {
            key: 'code-snippets',
            href: '/generate-fetch-code-online',
            className: 'text-xs text-slate-500 hover:text-indigo-600 transition-colors duration-200'
          }, 'Code Snippets'),
          React.createElement('a', {
            key: 'oauth2-testing',
            href: '/test-oauth2-online',
            className: 'text-xs text-slate-500 hover:text-indigo-600 transition-colors duration-200'
          }, 'OAuth2 Testing'),
          React.createElement('a', {
            key: 'basic-auth',
            href: '/test-basic-auth-online',
            className: 'text-xs text-slate-500 hover:text-indigo-600 transition-colors duration-200'
          }, 'Basic Auth Testing'),
          React.createElement('a', {
            key: 'graphql-testing',
            href: '/test-graphql-as-rest',
            className: 'text-xs text-slate-500 hover:text-indigo-600 transition-colors duration-200'
          }, 'GraphQL Testing'),
          React.createElement('a', {
            key: 'http-status',
            href: '/get-url-status-code',
            className: 'text-xs text-slate-500 hover:text-indigo-600 transition-colors duration-200'
          }, 'HTTP Status Codes')
        ])
      ]),
      React.createElement('div', {
        key: 'seo-block',
        className: 'mt-16 text-center text-xs text-slate-400 max-w-2xl mx-auto'
      }, [
        React.createElement('p', {
          key: 'seo-text'
        }, 'OneClick is a fast Postman alternative and online API tester. Get instant curl to python code conversion, use it as a REST API client online, and debug APIs simply. The best simple API debugger for quick testing.'),
        React.createElement('div', {
          key: 'support-info',
          className: 'mt-2 flex items-center justify-center gap-2'
        }, [
          React.createElement('span', {
            key: 'support-label'
          }, 'Support:'),
          React.createElement('a', {
            key: 'support-email',
            href: 'mailto:457239850@qq.com',
            className: 'text-indigo-600 hover:text-indigo-700 transition-colors duration-200'
          }, '457239850@qq.com')
        ])
      ])
    ])
  ]);
}

// Add error monitoring for critical resources
if (typeof window !== 'undefined') {
  // Monitor image loading errors
  window.addEventListener('error', function(e) {
    if (e.target instanceof HTMLImageElement) {
      console.error('Image loading error:', {
        src: e.target.src,
        error: e.error?.message || 'Unknown error',
        target: e.target
      });
    }
  }, true);
  
  // Monitor script loading errors
  window.addEventListener('error', function(e) {
    if (e.target instanceof HTMLScriptElement) {
      console.error('Script loading error:', {
        src: e.target.src,
        error: e.error?.message || 'Unknown error',
        target: e.target
      });
    }
  }, true);
  
  // Monitor stylesheet loading errors
  window.addEventListener('error', function(e) {
    if (e.target instanceof HTMLLinkElement && e.target.rel === 'stylesheet') {
      console.error('Stylesheet loading error:', {
        href: e.target.href,
        error: e.error?.message || 'Unknown error',
        target: e.target
      });
    }
  }, true);
}