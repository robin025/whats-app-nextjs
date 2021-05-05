import {Circle} from "better-react-spinkit"

function Loading() {
    return (
        <center style={{ display: "grid", placeItems:"center", height:"100vh" }} >

        <div>
            <img alt="Whats App Logo"  src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/800px-WhatsApp.svg.png"/>
            height={200}
        </div>
        <Circle color="#3CBC28" size = "60px"/>
        </center>
    )
}

export default Loading
