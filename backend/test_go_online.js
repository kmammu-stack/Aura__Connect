const http = require('http');

const data = JSON.stringify({
  name: 'test', email: 'test12345@test.com', password: 'password', interests: [], mode: 'work'
});

const req = http.request('http://localhost:8000/register', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' }
}, (res) => {
  let body = '';
  res.on('data', d => body += d);
  res.on('end', () => {
    const user = JSON.parse(body);
    console.log("Registered:", user);
    if (!user.token) return console.error("No token!");
    
    // Broadcast
    const req2 = http.request('http://localhost:8000/go-online', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`
      }
    }, (res2) => {
      let body2 = '';
      res2.on('data', d => body2 += d);
      res2.on('end', () => console.log("Broadcast status:", res2.statusCode, body2));
    });
    req2.write(JSON.stringify({ userId: user.id, lat: 10, lng: 10 }));
    req2.end();
  });
});

req.on('error', console.error);
req.write(data);
req.end();
