import React, { useState } from "react";
import { auth, db } from "../firebase";
import firebase from "firebase";
import styled from "styled-components";

const InputBox = styled.div`
  height: max-content;
  width: 360px;
  margin: auto;
  p {
    color: red;
    margin-bottom: -5px;
    font-size: 12px;
  }
`;
const SendButton = styled.button`
  border: none;
  position: relative;
  width: 40px;
  margin-bottom: -15px;
  height: 40px;
  background: transparent;
  cursor: pointer;
  img {
    width: 40px;
    margin-bottom: -15px;
    height: 40px;
  }
`;
const Input = styled.input`
  border: none;
  border-bottom: 2px solid red;
  outline: none;
  font-family: Arial, Helvetica, sans-serif;
  height: 40px;
  width: 285px;
  padding-inline: 10px;
`;

function SendMsg({ scroll, setValidation }) {
  const [msg, setMsg] = useState("");
  async function sendMessage(e) {
    e.preventDefault();
    if (msg === "") {
      setValidation(true);
      scroll.current.scrollIntoView({ behavior: "smooth" });
    } else {
      const { uid, photoURL } = auth.currentUser;
      await db.collection("message").add({
        uid,
        photoURL,
        text: msg,
        createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      });
      setMsg("");
      scroll.current.scrollIntoView({ behavior: "smooth" });
    }
  }
  return (
    <InputBox>
      <form onSubmit={sendMessage}>
        <Input
          placeholder="Type your message here..."
          onChange={(e) => {
            setValidation(false);
            setMsg(e.target.value);
          }}
          type="text"
          value={msg}
        />
        <SendButton type="submit">
          <img
            src="https://image.flaticon.com/icons/png/512/724/724843.png"
            alt=""
          />
        </SendButton>
      </form>
    </InputBox>
  );
}

export default SendMsg;
