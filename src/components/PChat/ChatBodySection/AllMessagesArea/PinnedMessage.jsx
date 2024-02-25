import { useState } from "react";
import { RiUnpinLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

const PinnedMessage = ({ msg, pinMessage, onUnpinMessage }) => {
  const [isHovered, setIsHovered] = useState(false);
  const baseURL = process.env.REACT_APP_BACKURL;
  const chatId = useSelector((state) => state.ChatReducer.chat._id);
  const jwt = localStorage.getItem("jwt");

  const userRole = useSelector((state) => state.AuthReducer.user.role);
  const isAdmin = userRole === "ADMIN";

  const handleUnpin = () => {
    onUnpinMessage();
  };
  return (
    <div className="fixed ">
      {isAdmin && msg && (
        <div
          className={`rounded-md  h-[55px]  bg-white text-slate-950 font-bold w-[720px]  flex items-center  gap-4 border-2 border-gray-600  ${
            isHovered ? "opacity-100" : "opacity-75"
          }`}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <div>
            {msg && (
              <h2 className=" font-bold text-left ml-4 mt-2">{msg.text}</h2>
            )}
          </div>
          <div>
            <RiUnpinLine
              onClick={handleUnpin}
              className="text-2xl  hover:cursor-pointer text-[#6F1E51]"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PinnedMessage;
