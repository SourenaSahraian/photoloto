import React from 'react';
import './App.css';

import client from './api-client';

async function getSignedURLAndPost(file) {
  const signedURLConfig = await client('/contest/upload');

  await client(signedURLConfig.url, {
    method: 'PUT',
    body: file,
    headers: {
      'Content-Type': file.type,
    }
  })
}

function App() {
  const [file, setFile] = React.useState(null);
  function handleSubmit(event) {
    event.preventDefault();
    getSignedURLAndPost(file)
  }
  return (
    <form onSubmit={handleSubmit}>
      <input
        name="file"
        onChange={event => setFile(event.target.files[0])}
        type="file"
        accept="image/*"
      />
      <button type="submit">Upload</button>
    </form>
  );
}

export default App;
