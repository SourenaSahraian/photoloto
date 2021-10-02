import './App.css';

function App() {
  return (
    <form method="post" action="/contest/addSubmision">
      <input type="file" accept="image/*" />
      <button type="submit">Upload</button>
    </form>
  );
}

export default App;
