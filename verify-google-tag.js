const https = require('https');
const http = require('http');

function verifyGoogleTag(url, redirectCount = 0) {
  // 防止无限重定向
  if (redirectCount > 3) {
    console.error('❌ 错误：重定向次数过多，可能存在重定向循环');
    return Promise.resolve();
  }
  
  const isHttps = url.startsWith('https://');
  const protocol = isHttps ? https : http;
  
  // 解析 URL
  const urlObj = new URL(url);
  const hostname = urlObj.hostname;
  const path = urlObj.pathname || '/';
  
  console.log(`正在验证 ${url} 的 Google 验证标签...`);
  
  const options = {
    hostname: hostname,
    path: path,
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    },
    timeout: 10000 // 10秒超时
  };
  
  return new Promise((resolve, reject) => {
    const req = protocol.request(options, (res) => {
      // 处理重定向
      if (res.statusCode >= 300 && res.statusCode < 400 && res.headers.location) {
        let redirectUrl = res.headers.location;
        // 处理相对路径重定向
        if (!redirectUrl.startsWith('http')) {
          redirectUrl = (isHttps ? 'https://' : 'http://') + hostname + (redirectUrl.startsWith('/') ? '' : '/') + redirectUrl;
        }
        console.log(`重定向到: ${redirectUrl}`);
        verifyGoogleTag(redirectUrl, redirectCount + 1).then(resolve).catch(reject);
        return;
      }
      
      console.log(`状态码: ${res.statusCode}`);
      
      let html = '';
      
      res.on('data', (chunk) => {
        html += chunk;
      });
      
      res.on('end', () => {
        // 检查 Google 验证标签
        const googleTagPattern = /<meta name="google-site-verification" content="uTT2vLHXrvh44esSpln_EMc1QEFjkN0vjJZ04UgI0Qc" \/?>/;
        
        if (googleTagPattern.test(html)) {
          console.log('✅ 成功：网站包含 Google 验证标签');
          
          // 提取并显示标签
          const match = html.match(googleTagPattern);
          console.log('找到的标签：', match[0]);
        } else {
          console.log('❌ 失败：网站不包含 Google 验证标签');
          
          // 检查是否有其他 google-site-verification 标签
          const anyGoogleTagPattern = /<meta name="google-site-verification" content="[^"]+" \/?>/;
          if (anyGoogleTagPattern.test(html)) {
            const match = html.match(anyGoogleTagPattern);
            console.log('注意：找到其他 Google 验证标签：', match[0]);
          } else {
            console.log('没有找到任何 Google 验证标签');
          }
        }
        
        // 检查页面是否包含 Quick Access 区域
        const quickAccessPattern = /Quick Access/;
        if (quickAccessPattern.test(html)) {
          console.log('✅ 成功：网站包含 Quick Access 区域');
        } else {
          console.log('❌ 失败：网站不包含 Quick Access 区域');
        }
        
        // 检查是否包含我们添加的关键词
        const keywords = [
          'API Testing',
          'Postman Alternative',
          'cURL to Python',
          'CORS Fix',
          'Webhook Testing'
        ];
        
        console.log('\n检查关键词存在性：');
        keywords.forEach(keyword => {
          if (html.includes(keyword)) {
            console.log(`✅ ${keyword} 存在`);
          } else {
            console.log(`❌ ${keyword} 不存在`);
          }
        });
        
        resolve();
      });
    });
    
    req.on('error', (e) => {
      console.error('验证过程中出错：', e.message);
      reject(e);
    });
    
    req.end();
  });
}

async function main() {
  try {
    await verifyGoogleTag('https://oneclickapi.wangdadi.xyz/');
    console.log('\n' + '='.repeat(60) + '\n');
    await verifyGoogleTag('https://oneclickapi-6g9dtyg4e-xingfangwang-5056s-projects.vercel.app/');
  } catch (error) {
    console.error('验证失败：', error.message);
  }
}

main();