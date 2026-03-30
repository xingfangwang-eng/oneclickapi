const https = require('https');
const http = require('http');

function verifyGoogleTag(url) {
  const isHttps = url.startsWith('https://');
  const protocol = isHttps ? https : http;
  
  // 解析 URL
  const urlObj = new URL(url);
  const hostname = urlObj.hostname;
  const port = urlObj.port;
  const path = urlObj.pathname || '/';
  
  console.log(`正在验证 ${url} 的 Google 验证标签...`);
  
  const options = {
    hostname: hostname,
    port: port,
    path: path,
    method: 'GET',
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36'
    }
  };
  
  const req = protocol.request(options, (res) => {
    let data = '';
    
    res.on('data', (chunk) => {
      data += chunk;
    });
    
    res.on('end', () => {
      // 检查 Google 验证标签
      const googleTagRegex = /<meta name="google-site-verification" content="uTT2vLHXrvh44esSpln_EMc1QEFjkN0vjJZ04UgI0Qc"\s*\/>/i;
      const hasGoogleTag = googleTagRegex.test(data);
      
      // 检查 Quick Access 区域
      const quickAccessRegex = /Quick Access/i;
      const hasQuickAccess = quickAccessRegex.test(data);
      
      console.log('='.repeat(60));
      console.log(`Google 验证标签: ${hasGoogleTag ? '✅ 存在' : '❌ 不存在'}`);
      console.log(`Quick Access 区域: ${hasQuickAccess ? '✅ 存在' : '❌ 不存在'}`);
      console.log('='.repeat(60));
    });
  });
  
  req.on('error', (error) => {
    console.error('验证失败:', error.message);
  });
  
  req.end();
}

async function main() {
  try {
    console.log('验证本地服务器：');
    console.log('='.repeat(60));
    verifyGoogleTag('http://localhost:3002/');
  } catch (error) {
    console.error('验证失败：', error.message);
  }
}

main();
