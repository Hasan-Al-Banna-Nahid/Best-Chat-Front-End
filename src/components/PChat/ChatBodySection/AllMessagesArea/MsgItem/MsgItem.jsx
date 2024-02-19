/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable no-undef */
import "./MsgItem.css";
//components

//redux
import { useDispatch, useSelector } from "react-redux";
import { getFileThunk } from "../../../../../store/ChatReducer";

// store
import { createNewChatThunk } from "../../../../../store/ChatsReducer";

const MsgItem = ({msg}) => {
    const dispatch = useDispatch();

    const tm = msg.time.split(' ')[1]
    const td = msg.time.split(' ')[2]
    const ty = msg.time.split(' ')[3]
    const tt = msg.time.split(' ')[4]

    let ifShowSize = false
    const fileObj = msg.file

    if (fileObj) {
        if (fileObj.hasOwnProperty('size')) {
        ifShowSize = true;
        // console.log(fileObj.size)
        }
    }

    let ifShowDownloadLink = false

    if (fileObj) {
        if (fileObj.hasOwnProperty('data')) {
            ifShowDownloadLink = true;
        }
    }
    
    return (
        <div className="MsgItem">
            <div className="MsgItem__TittleRow">
                <div>{msg.userName}</div>
                <div>{td} {tm} {ty} {tt}</div>
            </div>
            
            <div className="MsgItem__TextRow">
                {msg.text}&nbsp;
                <i>
                {msg.file?msg.file.name:null}&nbsp;
                {ifShowSize?`${Math.round(fileObj.size*0.0009765625)} kb `:null } 
                </i>
                { msg.file? <a href="#" onClick={()=>{
                    const messageId = msg._id
                    const fileId = msg.file._id
                    dispatch(getFileThunk({messageId, fileId}))
                }}>get link</a>: null}&nbsp;
                { ifShowDownloadLink? <a href={fileObj.data} download>download</a> : null}
            </div>
        </div>
    );
};

export default MsgItem;
