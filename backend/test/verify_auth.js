// Simple verification script for auth API
const http = require('http');

// Test server is running on port 4500 (from npm run dev)
const options = {
  hostname: 'localhost',
  port: 4500,
  path: '/health',
  method: 'GET',
};

const req = http.request(options, (res) => {
  console.log(`Status Code: ${res.statusCode}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      const parsed = JSON.parse(data);
      console.log('Response:', JSON.stringify(parsed, null, 2));
      if (parsed.success && parsed.data.status === 'OK') {
        console.log('✅ Health check PASSED');
        process.exit(0);
      } else {
        console.log('❌ Health check FAILED');
        process.exit(1);
      }
    } catch (e) {
      console.log('❌ Health check FAILED - Invalid JSON');
      process.exit(1);
    }
  });
});

req.on('error', (e) => {
  console.error(`❌ Health check FAILED - Connection error: ${e.message}`);
  process.exit(1);
});

req.end();

// Test auth endpoints
setTimeout(() => {
  console.log('\nTesting auth endpoints...');
  
  // Test register endpoint with missing data
  const registerOptions = {
    hostname: 'localhost',
    port: 4500,
    path: '/api/auth/register',
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
  };
  
  const registerReq = http.request(registerOptions, (registerRes) => {
    let registerData = '';
    registerRes.on('data', (chunk) => {
      registerData += chunk;
    });
    
    registerRes.on('end', () => {
      try {
        const parsed = JSON.parse(registerData);
        console.log('Register Response:', JSON.stringify(parsed, null, 2));
        if (!parsed.success && parsed.statusCode === 400) {
          console.log('✅ Register validation PASSED');
        } else {
          console.log('❌ Register validation FAILED');
        }
      } catch (e) {
        console.log('❌ Register validation FAILED - Invalid JSON');
      }
    });
  });
  
  registerReq.on('error', (e) => {
    console.error(`❌ Register test FAILED - Connection error: ${e.message}`);
  });
  
  registerReq.write(JSON.stringify({}));
  registerReq.end();
  
  // Test login endpoint with missing data
  setTimeout(() => {
    const loginOptions = {
      hostname: 'localhost',
      port: 4500,
      path: '/api/auth/login',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    };
    
    const loginReq = http.request(loginOptions, (loginRes) => {
      let loginData = '';
      loginRes.on('data', (chunk) => {
        loginData += chunk;
      });
      
      loginRes.on('end', () => {
        try {
          const parsed = JSON.parse(loginData);
          console.log('Login Response:', JSON.stringify(parsed, null, 2));
          if (!parsed.success && parsed.statusCode === 400) {
            console.log('✅ Login validation PASSED');
          } else {
            console.log('❌ Login validation FAILED');
          }
        } catch (e) {
          console.log('❌ Login validation FAILED - Invalid JSON');
        }
      });
    });
    
    loginReq.on('error', (e) => {
      console.error(`❌ Login test FAILED - Connection error: ${e.message}`);
    });
    
    loginReq.write(JSON.stringify({}));
    loginReq.end();
  }, 1000);
  
}, 2000);
