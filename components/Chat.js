import styled from "styled-components"
import { Avatar, Button, IconButton } from '@material-ui/core';
import getRecipientEmail from "../utils/getRecipientEmail"
import {useCollection} from "react-firebase-hooks/firestore";

import {useAuthState} from "react-firebase-hooks/auth";
import {auth,database } from "./firebase"
import {useRouter} from "next/router"


function Chat({id,users}) {
    const router = useRouter();

    const [user] = useAuthState(auth)
    const [recipientSnapshot] = useCollection(database.collection('users').where('email','==',getRecipientEmail(users,user)))

    const enterChat = ()=>{
        router.push(`/chat/${id}`)
    }

    const recipient = recipientSnapshot?.docs?.[0]?.data();
    
    const recipientEmail = getRecipientEmail(users,user);
    console.log(recipientEmail)

    return (
        <Container onClick={enterChat} >
            {recipient ?(
            <UserAvatar src={recipient?.photoUrl} />
            ):(
            <UserAvatar>{recipientEmail[0]}</UserAvatar>
            )
            }
            <p>{recipientEmail}</p>
        </Container>
    )
}

export default Chat



const Container = styled.div`

display:flex;
flex-direction:row;
align-items:center;
padding:5px;
cursor:pointer;
word-break:break-word;
:hover{

background-color:#e9eaeb;
}
`;

const UserAvatar = styled(Avatar)`
margin:5px;
margin-right:20px;
`;
