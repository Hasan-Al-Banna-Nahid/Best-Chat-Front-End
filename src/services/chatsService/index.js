import getAllChats from "./getAllChats";
import createNewChat from "./createNewChat";
import deleteChat from "./deleteChat";
import addUsersArrToChat from "./addUsersArrToChat";
import getChat from "./getChat";
import getFile from "./getFile";

export const chatsService = {
    getAllChats: getAllChats,
    createNewChat: createNewChat,
    deleteChat: deleteChat,
    addUsersArrToChat: addUsersArrToChat,
    getChat: getChat,
    getFile: getFile
};
