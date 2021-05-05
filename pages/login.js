import Head from "next/head";
import styled from "styled-components"
import { Avatar, Button, IconButton } from '@material-ui/core';
import { auth, provider } from "../components/firebase";

function Login() {

    const signIn = ()=>{
        auth.signInWithPopup(provider).catch(alert);

    }

    return (
        <>
        <Container>
        <Head>
            <title>Login</title>
        </Head>
        <LoginContainer>
            <WhatsAppIcon alt="Whats App Logo"  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/800px-WhatsApp.svg.png"   />
            <WelcomeMsg>Welcome To Whatsapp Clone</WelcomeMsg>
            <LoginButton onClick={signIn} >Sign In</LoginButton>
        </LoginContainer>
        </Container>
        </>
    )
}

export default Login
const Container = styled.div`
display:grid;
place-items:center;
height: 100vh;

`;
const LoginContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  
`;

const WhatsAppIcon = styled.img`
  object-fit: contain;
  width: 300px;
  height:300px;
  margin-bottom: 40px;

`;

const WelcomeMsg = styled.h1`

`;

const LoginButton = styled(Button)`

    &&&{

        margin-top: 50px;
    background-color: rgb(88, 255, 88);
    text-transform: inherit;
}

:hover{
    &&&{
        color: black;
        background-color: white;
    }
}
    
`;