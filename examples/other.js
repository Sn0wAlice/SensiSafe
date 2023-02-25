// Just change the URL of the api 
const fetch = require('node-fetch');
const FormData = require('form-data');
const fs = require('fs');

async function uploadImage(filePath, url) {
  const formData = new FormData();
  formData.append('file', fs.createReadStream(filePath));
  const response = await fetch(url, {
    method: 'POST',
    body: formData
  });
  const buffer = await response.buffer();
  fs.writeFileSync('01_out.jpg', buffer);
  console.log('Image saved to 01_out.jpg');
}

// Usage example:
uploadImage('./01.jpg', 'http://127.0.0.1:3000/api/cadre');