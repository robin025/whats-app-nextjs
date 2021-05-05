import styled from "styled-components"
import {useAuthState} from "react-firebase-hooks/auth";
import {auth, database} from "./firebase"
import {useRouter} from "next/router"
import { Avatar, Button, IconButton } from '@material-ui/core';
import VideocamIcon from '@material-ui/icons/Videocam';
import AttachmentIcon from '@material-ui/icons/Attachment';
import DonutLargeIcon from '@material-ui/icons/DonutLarge';
import {useCollection} from "react-firebase-hooks/firestore";
import MicIcon from '@material-ui/icons/Mic';
import SendIcon from '@material-ui/icons/Send';
import { useState } from "react";
import firebase from "firebase"
import Message from "./Message"
import TimeAgo from "timeago-react"
import getRecipientEmail from "../utils/getRecipientEmail";
import { useRef } from "react";

function ChatScreen({chat,messages}) {
    const [user] = useAuthState(auth);
    const [input,setInput] = useState("");
    const router = useRouter();
    const endOfMessagesRef = useRef(null);
    const [messagesSnapshot] = useCollection(database.collection('chats').doc(router.query.id).collection('messages').orderBy("timestamp",'asc'))

    const [recipientSnapshot] = useCollection(database.collection('users').where('email','==',getRecipientEmail(chat.users,user)))

    const showMessages = ()=>{
        if(messagesSnapshot){
            return messagesSnapshot.docs.map((message)=>(
                <Message

                    key={message.id}
                    user = {message.data().user}
                    message = {{
                        ...message.data(),
                        timestamp:message.data().timestamp?.toDate().getTime()
                    }
                    }
                    
                />
            ));
        } else{
            return JSON.parse(messages).map(message=>{
                <Message

                    key={message.id}
                    user = {message.user}
                    message = {message}
                    
                />

            })
        }

        

    }

    const scrollToBottom = () =>{
        endOfMessagesRef.current.scrollIntoView({
            behaviour:"smooth",
            block:"start",


        })
    } 

    const sendMessage = (e)=>{
        e.preventDefault();

        database.collection('users').doc(user.uid).set({
            lastSeen:firebase.firestore.FieldValue.serverTimestamp(),
        },{merge:true});

        database.collection('chats').doc(router.query.id).collection('messages').add({
            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
            message:input,
            user:user.email,
            photoUrl: user.photoURL,

        })

        setInput("");
        scrollToBottom();
    }
        const recipient = recipientSnapshot?.docs?.[0]?.data();
        
        const recipientEmail = getRecipientEmail(chat.users,user);

    return (
        <Container>
            <Header>
                
                {recipient ?(

                <Avatar src={recipient?.photoUrl}  />
                ):(
                    <Avatar>{recipientEmail[0]}</Avatar>
                )}
                <HeaderInfo>

                    <h4>{recipientEmail}</h4>
                    {recipientSnapshot?(
                        <p>Last Active : {' '}
                        {recipient?.lastSeen?.toDate()?(
                            <TimeAgo datetime = {recipient?.lastSeen?.toDate()}/>

                        ):"unavailable"}
                        </p> 
                    ):(
                        <p>Loading last Active....</p>
                    )}
                    

                </HeaderInfo>

                <IconsContainer>

                    <IconButton>
                        <AttachmentIcon/>
                    </IconButton>
                    <IconButton>
                        <DonutLargeIcon/>
                    </IconButton>
                    <IconButton>
                        <VideocamIcon/>
                    </IconButton>
                    
                </IconsContainer>

            </Header>

            <MessageContainer>
                {showMessages()}
                <EndOfMessage ref={endOfMessagesRef} />
            </MessageContainer>

            <InputContainer>
                <MicIcon/>
                <Input value={input} onChange={e=>setInput(e.target.value)}  />
                <Button type="submit" disabled={!input} onClick={sendMessage} >
                <SendIcon/>
                </Button>
            </InputContainer>
        </Container>
    )
}

export default ChatScreen

const Container = styled.div`

`;

const Header = styled.div`
position :sticky;
background-color:white;
z-index:100;
top:0;
padding:20px;
    height:80px;
border-bottom:1px solid whitesmoke;
display:flex;
align-items:center;

`;

const HeaderInfo = styled.div`

margin-left:17px;
flex:1;

align-items:center;


> h4{
    margin-bottom:5px;

}

> p{
    font-size:10px;
    color:gray;

}

`;

const IconsContainer = styled.div``;

const EndOfMessage = styled.div``;

const MessageContainer = styled.div`

padding:35px;
/* background-color:whitesmoke; */
background-image: url("https://preview.redd.it/qwd83nc4xxf41.jpg?width=640&crop=smart&auto=webp&s=e82767fdf47158e80604f407ce4938e44afc6c25") !important;
  background-repeat: repeat;
  padding: 25px;
  overflow-y: scroll;
  background-position: center;
 min-height:90vh;


`;

const InputContainer = styled.form`
display:flex;
align-items:center;
padding:10px;
position:sticky;
bottom:0;
background-color:white;
z-index:100;

`;

const Input = styled.input`
flex:1;

border-style:none;
    outline-width:0;
    margin-left:10px;
    margin-right:10px;
    align-items:center;
    background-color:whitesmoke;
    padding:20px;
    border-radius:5px;
    


`;