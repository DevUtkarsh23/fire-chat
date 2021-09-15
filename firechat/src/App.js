import React from "react";
import ChatRoom from "./components/ChatRoom";
import SignIn from "./components/SignIn";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";

function App() {
  const [user] = useAuthState(auth);
  return <React.Fragment>{user ? <ChatRoom /> : <SignIn />}</React.Fragment>;
}

export default App;
