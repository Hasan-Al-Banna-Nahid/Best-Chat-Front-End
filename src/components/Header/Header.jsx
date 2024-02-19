import "./Header.css";
import { AppBar, Toolbar } from "@mui/material";
import Nav from "./Nav";
import Profile from "./Profile";

const Header = () => {
    return (
        <div className="Header">
            <AppBar
                sx={{
                    height: 70,
                    // background: "white",
                }}
            >
                <Nav />
                <Profile />
            </AppBar>
        </div>
    );
};

export default Header;
