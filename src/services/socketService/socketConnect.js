import { backURL } from "../../common/config";
import io from 'socket.io-client'

const socketConnect = (jwt) => {
    // const socket = await io.connect(backURL)
    if (jwt) {
        const socket = io(backURL, {
            query:{ jwtToken: jwt }
        })
        console.log('this is socketConnect----')
        return socket
    }
    
};

export default socketConnect;