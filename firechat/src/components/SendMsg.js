import React, { useState } from "react";
import { auth, db } from "../firebase";
import firebase from "firebase";
import styled from "styled-components";

const InputBox = styled.div`
  width: 50%;
  margin: auto;
  position: relative;
  p {
    color: red;
    margin-bottom: -5px;
    font-size: 12px;
  }
  @media screen and (max-width: 480px) {
    width: 100%;
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
  width: 80%;
  padding-inline: 10px;
`;
const Validation = styled.span`
  position: absolute;
  bottom: 60px;
  left: 8px;
  font-family: Arial, Helvetica, sans-serif;
  width: max-content;
  animation: slideup 0.2s;
  background: #fff;
  box-shadow: 2px 2px 5px black;
  border-radius: 8px;
  display: flex;
  @keyframes slideup {
    from {
      bottom: -100px;
    }
    to {
      bottom: 60px;
    }
  }
  p {
    margin: 8px;
    color: #911f27;
    font-size: 12px;
  }
  img {
    width: 20px;
    height: 20px;
    margin-top: 6px;
    margin-left: 4px;
  }
`;
function SendMsg({ scroll }) {
  const [msg, setMsg] = useState("");
  const [validation, setValidation] = useState(false);

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
      {validation && (
        <Validation>
          <img
            alt=""
            src="https://cdn-icons-png.flaticon.com/512/752/752755.png"
          />
          <p>Please type a message first</p>
        </Validation>
      )}
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
