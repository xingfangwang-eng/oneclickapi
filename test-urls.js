const https = require('https');
const fs = require('fs');
const path = require('path');

// 测试外部链接
const externalUrls = [
  'https://oneclickapi.dev',
  'https://oneclickapi.dev/og-image.png'
];

// 测试本地资源
const localResources = [
  '/manifest.json',
  '/icon-192x192.png'
];

function testExternalUrl(url) {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      console.log(`[${res.statusCode}] ${url}`);
      resolve(res.statusCode);
    }).on('error', (err) => {
      console.log(`[ERROR] ${url} - ${err.message}`);
      resolve(500);
    });
  });
}

function testLocalResource(resource) {
  const fullPath = path.join(__dirname, 'public', resource);
  if (fs.existsSync(fullPath)) {
    console.log(`[EXISTS] Local resource: ${resource}`);
    return true;
  } else {
    console.log(`[MISSING] Local resource: ${resource}`);
    return false;
  }
}

async function runTests() {
  console.log('Testing external URLs...');
  for (const url of externalUrls) {
    await testExternalUrl(url);
  }
  
  console.log('\nTesting local resources...');
  for (const resource of localResources) {
    testLocalResource(resource);
  }
}

runTests();
