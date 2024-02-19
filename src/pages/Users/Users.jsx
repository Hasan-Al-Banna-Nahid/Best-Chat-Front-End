import CreateNewUserSection from "../../components/PUsers/CreateNewUserSection";
import UsersTable from "../../components/PUsers/UsersTable";
import "./Users.css";

const Users = () => {
    return (
        <div className="Users">
            <CreateNewUserSection />
            <UsersTable />
        </div>
    );
};

export default Users;
