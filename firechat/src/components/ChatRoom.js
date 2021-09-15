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
  height: 760px;
  max-height: 760px;
  width: 50%;
  background-image: url("https://images.unsplash.com/photo-1531685250784-7569952593d2?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=967&q=80");
  background-size: cover;
  margin: auto;
  display: flex;
  overflow: auto;
  flex-direction: column;
  font-family: Arial, Helvetica, sans-serif;
  position: relative;
  @media screen and (max-width: 480px) {
    width: 100%;
  }
`;
const Text = styled.div`
  display: flex;
  position: relative;
`;
const Dummy = styled.h1`
  background: transparent;
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

function ChatRoom() {
  const [messages, setMessages] = useState([]);
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
      </ChatRoomScreen>
      <SendMsg scroll={scroll} />
    </>
  );
}

export default ChatRoom;
