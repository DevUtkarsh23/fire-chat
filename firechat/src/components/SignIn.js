import React from "react";
import firebase from "firebase";
import { auth } from "../firebase";
import styled from "styled-components";

const SignInScreen = styled.div`
  height: 780px;
  width: 360px;
  background: #ff7600;
  margin: auto;
  display: flex;
  flex-direction: column;
  font-family: Arial, Helvetica, sans-serif;
`;
const SignInButton = styled.div`
  margin: auto;
  cursor: pointer;
  background: #fff;
  padding: 5%;
  width: 180px;
  border-radius: 4px;
  transition: 0.2s ease-in-out;
  box-shadow: 3px 3px 3px #4f0e0e;
  color: #2b2b2b;
  :hover {
    transform: scale(1.1);
  }
  img {
    width: 30px;
    height: 30px;
    position: absolute;
    right: 8%;
    top: 20%;
  }
  display: flex;
  position: relative;
`;
const Brand = styled.h1`
  font-size: 3rem;
  margin-inline: auto;
  color: #fff;
  text-shadow: 2px 2px 3px #4f0e0e;
`;
const Logo = styled.img`
  width: 200px;
  height: 200px;
  border-radius: 50%;
  margin: auto;
  background: #fff;
  box-shadow: 3px 3px 10px #4f0e0e;
`;
function SignIn() {
  const signInWithGoogle = () => {
    const provider = new firebase.auth.GoogleAuthProvider();
    auth.signInWithPopup(provider);
  };
  return (
    <SignInScreen>
      <Brand>FIRECHAT</Brand>
      <Logo
        src="https://image.flaticon.com/icons/png/512/785/785116.png"
        alt=""
      />
      <SignInButton onClick={signInWithGoogle}>
        Sign In with Google
        <img
          src="https://image.flaticon.com/icons/png/512/2702/2702602.png"
          alt=""
        />
      </SignInButton>
    </SignInScreen>
  );
}

export default SignIn;
