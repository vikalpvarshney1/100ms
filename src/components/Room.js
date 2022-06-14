import React from "react";
import VideoTile from "./VideoTile";
import {
    useHMSStore,
    selectLocalPeer,
    selectPeers,
    selectIsConnectedToRoom,
    useHMSActions
} from "@100mslive/hms-video-react";
import ControlBar from "./ControlBar";
import { useState } from "react";
import { useEffect } from "react";

const Room = () => {
    const localPeer = useHMSStore(selectLocalPeer);
    const peers = useHMSStore(selectPeers);
    const isConnected = useHMSStore(selectIsConnectedToRoom);
    const hmsActions = useHMSActions();
    const [count, setcount] = useState(0)
    const [min,setmin]=useState(0)
    function counter() {
     var x =   setInterval(() => {
            setcount(count + 1)
            if(count==59){
                setmin(min+1)
                setcount(0)
            }
            return (
                clearInterval(x)
            )
        }, 1000);

    }
    useEffect(()=>{
        counter()
    })
  
    

    return (
        <div >

            <div className="flex flex-col">
                {isConnected && (
                    <button
                        id="leave-btn"
                        // style={{ color: "black", border: "1px solid black", fontSize: "bold", }}
                        // className="text-xs uppercase tracking-wider bg-white py-1 px-2 rounded-lg shadow-lg text-indigo-500"
                        className="flex bg-gray-900"
                        onClick={() => hmsActions.leave()}
                    >
                        <div style={{ display: "flex", flexDirection: "row-reverse", color: "black", padding: "5px", backgroundColor: "red", borderRadius: "10px", marginTop: "10px" }}

                        >Leave Room</div>
                        <div style={{ marginLeft:"85%", color: "black", padding: "5px", backgroundColor: "red", borderRadius: "10px", marginTop: "10px" }}
                        >Time:{min<10 ?"0"+min:min}:{count<10?"0"+count:count} </div>
                    </button>
                )}
                <div className="flex bg-gray-900 w-screen min-h-screen p-2 flex-wrap">
                    {localPeer && <VideoTile peer={localPeer} isLocal={true} />}
                    {peers &&
                        peers
                            .filter((peer) => !peer.isLocal)
                            .map((peer) => {
                                return (
                                    <>
                                        <VideoTile isLocal={false} peer={peer} />
                                    </>
                                );
                            })}
                </div>
                <ControlBar />
            </div>
        </div>
    );
};

export default Room;
