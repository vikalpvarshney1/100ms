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

const Room = () => {
    const localPeer = useHMSStore(selectLocalPeer);
    const peers = useHMSStore(selectPeers);
    const isConnected = useHMSStore(selectIsConnectedToRoom);
    const hmsActions = useHMSActions();
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
                        <div style={{ display: "flex", flexDirection: "row-reverse" ,color: "black",padding: "5px", backgroundColor:"red",borderRadius: "10px", marginTop: "10px"}}
                            
                        >Leave Room</div>

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
