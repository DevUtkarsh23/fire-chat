import React from "react";
import { auth } from "../firebase";
import styled from "styled-components";
const SignOutButton = styled.div`
  button {
    border: none;
    cursor: pointer;
    position: fixed;
    background: transparent;
    img {
      width: 40px;
      height: 40px;
    }
  }
`;
function SignOut() {
  return (
    <SignOutButton>
      <button onClick={() => auth.signOut()}>
        <img
          src="https://image.flaticon.com/icons/png/512/3558/3558823.png"
          alt=""
        />
      </button>
    </SignOutButton>
  );
}

export default SignOut;
