import { Avatar, Button, IconButton } from '@material-ui/core';
import styled from 'styled-components';
import ChatIcon from '@material-ui/icons/Chat';
import {useAuthState} from "react-firebase-hooks/auth";
import {useCollection} from "react-firebase-hooks/firestore";
import VideocamIcon from '@material-ui/icons/Videocam';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import SearchIcon from '@material-ui/icons/Search';
import * as EmailValidator from "email-validator";
import { auth, database } from './firebase';
import Chat from './Chat';


function Sidebar() {

    const [user] = useAuthState(auth);
    const userChatRef = database.collection('chats').where('users','array-contains',user.email);
    const [chatsSnapshot] = useCollection(userChatRef);
    


    const createChat = ()=>{
        const input = prompt('Enter email address');

        if (!input) return null;

        if(EmailValidator.validate(input) && !chatAlreadyExists(input) && input !== user.email  ){
            database.collection('chats').add({
                users: [user.email,input],
            })
        }

    }

    const chatAlreadyExists = (recipientEmail)=>{
        return !!chatsSnapshot?.docs.find((chat) => chat.data().users.find((user)=>user===recipientEmail)?.length>0)
    }

    return (
        <Container>
            <Header>
                <UserAvatar onClick={ ()=> auth.signOut() } src={user?.photoURL}  />
                <IconsContainer>
                    <IconButton>
                        <ChatIcon/>
                    </IconButton>
                    <IconButton>
                        <MoreVertIcon/>
                    </IconButton>
                    
                </IconsContainer>
            </Header>

            <Search>
                <SearchIcon/>
                <SearchInput placeholder="Whatsapp" />
            </Search>

            <SidebarButton onClick={createChat} >Start A New Chat</SidebarButton>

            {chatsSnapshot?.docs.map(chat=>(
                <Chat key={chat.id} id={chat.id} users={chat.data().users} />
            ))}

        </Container>
    )
}

export default Sidebar

const Container = styled.div`

flex:0.40;
border-right:1px solid whitesmoke;
height:100vh;
min-width:300px;
max-width:350px;
overflow-y:scroll;




::-webkit-scrollbar{
    display:none;

}

-ms-overflow-style:none;
scrollbar-width:none;



`;

const Header = styled.div`
    display: flex;
    padding:20px;
    height:80px;
    top:0;
    background-color: white;
    position:sticky;
    justify-content:space-between;
    border-bottom:1px solid whitesmoke;
    align-items:center;
    z-index:100;

`;

const UserAvatar = styled(Avatar)`

    cursor: pointer;

    :hover{
        opacity:.8;
    }
   
`;

const IconsContainer = styled.div`

`;

const Search = styled.div`

    align-items:center;
    display: flex;
    padding:15px;
    border-radius:99px;
    background-color:white;



`;

const SearchInput = styled.input`

    border-style:none;
    outline-width:0;
    flex:1;



`;

const SidebarButton = styled(Button)`
    width:100%;
    &&&{    
        border-top:1px solid whitesmoke;
        border-bottom:1px solid whitesmoke;
    }
`;