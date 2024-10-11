import "./App.css";
import Header from "./Header";
import Sidebar from "./Sidebar";
import UpdateNote from "./UpdateNote";

function App() {
  return (
    <div className="grid-container">
      <Header />
      <Sidebar />
      <UpdateNote />
    </div>
  );
}

export default App;
