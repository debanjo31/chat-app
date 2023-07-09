import Homepage from "./Pages/Homepage";
import ChatPage from "./Pages/ChatPage";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ChatProvider from "./Context/ChatProvider";
import "./App.css";

function App() {
  return (
    <div className="h-screen ">
      <Router>
        <ChatProvider>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="chats" element={<ChatPage />} />
          </Routes>
        </ChatProvider>
      </Router>
    </div>
  );
}

export default App;
