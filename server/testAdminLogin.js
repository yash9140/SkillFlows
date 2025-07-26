const http = require('http');

const postData = JSON.stringify({
  email: 'admin@skillflow.com',
  password: 'admin123'
});

console.log('Testing admin login with:', postData);

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers: ${JSON.stringify(res.headers)}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', data);
    try {
      const jsonData = JSON.parse(data);
      console.log('Parsed response:', jsonData);
      
      if (jsonData.user && jsonData.user.role) {
        console.log('User role:', jsonData.user.role);
        if (jsonData.user.role === 'admin') {
          console.log('✅ Admin login successful!');
        } else {
          console.log('❌ User is not an admin');
        }
      } else {
        console.log('❌ No user role found in response');
      }
    } catch (e) {
      console.log('Could not parse JSON response');
    }
  });
});

req.on('error', (e) => {
  console.error(`Problem with request: ${e.message}`);
});

req.write(postData);
req.end(); 