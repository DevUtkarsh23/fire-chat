import React, { useEffect, useRef, useState } from "react";
import { auth, db } from "../firebase";
import SignOut from "./SignOut";
import SendMsg from "./SendMsg";
import styled, { css } from "styled-components";

const MsgBox = styled.div`
  border-radius: 30px;
  padding: 5px;
  margin: 16px;
  text-align: left;
  box-shadow: 3px 3px 8px black;
  &:last-child {
  }
  ${({ sent }) =>
    sent
      ? css`
          color: #fff;
          padding-right: 10px;
          margin-left: 45px;
          background: #0f52ba;
          border-bottom-right-radius: 0;
        `
      : css`
          color: #0e0e0e;
          padding-left: 10px;
          background: #fff;
          color: black;
          border-bottom-left-radius: 0;
        `}
`;
const Avatar = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin: 10px;
`;
const Msg = styled.div`
  margin: 20px 10px;
  overflow-wrap: break-word;
`;
const ChatRoomScreen = styled.div`
  height: 780px;
  max-height: 780px;
  width: 360px;
  background-image: url("https://images.unsplash.com/photo-1531685250784-7569952593d2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80");
  background-size: cover;
  margin: auto;
  display: flex;
  overflow: auto;
  flex-direction: column;
  font-family: Arial, Helvetica, sans-serif;
  position: relative;
`;
const Text = styled.div`
  display: flex;
  position: relative;
`;
const Dummy = styled.h1`
  background: transparent;
  height: 180px;
  width: 100%;
`;
const DateTime = styled.span`
  position: absolute;
  right: 10px;
  bottom: 0px;
  font-size: 10px;
  ${({ sent }) =>
    sent
      ? css`
          color: white;
        `
      : css`
          color: black;
        `}
`;
const Validation = styled.span`
  position: absolute;
  bottom: -100px;
  left: 5px;
  animation: slideup 2s infinite;
  background: #fff;
  box-shadow: 2px 2px 5px black;
  border-radius: 8px;
  display: flex;
  @keyframes slideup {
    0% {
      bottom: -140px;
    }
    50% {
      bottom: -120px;
    }
    100% {
      bottom: -140px;
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
function ChatRoom() {
  const [messages, setMessages] = useState([]);
  const [validation, setValidation] = useState(false);
  const scroll = useRef(null);
  useEffect(() => {
    db.collection("message")
      .orderBy("createdAt")
      .limit(50)
      .onSnapshot((snapshot) => {
        setMessages(snapshot.docs.map((doc) => doc.data()));
      });
  }, []);

  return (
    <>
      <ChatRoomScreen>
        <SignOut />
        {messages.map((msg, id) => (
          <MsgBox
            key={id}
            sent={auth.currentUser.uid === msg.uid ? true : false}
          >
            <Text>
              <Avatar alt="" src={msg.photoURL} />
              <Msg>{msg.text}</Msg>
              <DateTime sent={auth.currentUser.uid === msg.uid ? true : false}>
                {msg.createdAt?.toDate().toLocaleTimeString()}
              </DateTime>
            </Text>
          </MsgBox>
        ))}
        <Dummy ref={scroll}></Dummy>
        {validation && (
          <Validation>
            <img
              alt=""
              src="https://cdn-icons-png.flaticon.com/512/752/752755.png"
            />
            <p>Please type a message first</p>
          </Validation>
        )}
      </ChatRoomScreen>
      <SendMsg setValidation={setValidation} scroll={scroll} />
    </>
  );
}

export default ChatRoom;
