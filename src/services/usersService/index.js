import getAllUsers from "./getAllUsers";
import updatePersonalBaseInfo from "./updatePersonalBaseInfo";
import getUserProfile from "./getUserProfile";
import deleteUser from "./deleteUser";
import updateUserRole from "./updateUserRole";


export const usersService = {
    getAllUsers: getAllUsers,
    updateUserRole: updateUserRole,
    updatePersonalBaseInfo: updatePersonalBaseInfo,
    getUserProfile: getUserProfile,
    deleteUser: deleteUser
};
