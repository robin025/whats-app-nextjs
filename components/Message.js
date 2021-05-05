import styled from "styled-components"
import { auth } from "./firebase";
import {useAuthState} from "react-firebase-hooks/auth";
import moment from "moment";
function Message({user,message}) {

    const [userLoggedIn] = useAuthState(auth);


    const TypeOfMessage = user === userLoggedIn.email?Sender:Reciever

    return (
        <TypeOfMessage>
            {message.message}
            
            <Timestamp>
            {message.timestamp? moment(message.timestamp).format('LT'):"..."}
            </Timestamp>
        </TypeOfMessage>
    )
}

export default Message

const Container = styled.div`


`;

const MessageElement = styled.p`

    width:fit-content;
    padding:15px;
    border-radius:10px;
    margin:10px;
    min-width:60px;
    padding-bottom:24px;
    position:relative;
    text-align:right;



`;

const Sender = styled(MessageElement)`

    margin-left:auto;
    background-color:#dcf8c6;

`;

const Reciever = styled(MessageElement)`

    text-align:left;
    background-color:white;

`;

const   Timestamp = styled.span`

color:gray;
padding:10px;
font-size:9px;
position:absolute;

/* bottom:2; */
text-align:right;
right:0;
padding-top:23px;


`;