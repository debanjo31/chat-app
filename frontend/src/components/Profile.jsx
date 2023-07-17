import React from "react";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import { BellIcon, ChevronDownIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/toast";
import ProfileModal from "./miscellaneous/ProfileModal";
import { ChatState } from "../Context/ChatProvider";

function Profile() {
  const { darkMode, user } = ChatState();

  const toast = useToast();

  const navigate = useNavigate();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    navigate("/");
    setUser("");
  };
  return (
    <div
      className={` font-bold ${darkMode ? "text-white" : "text-green-900"}  `}
    >
      
      <Menu>
        <MenuButton>
          <Avatar size="sm" cursor="pointer" name={user.name} src={user.pic} />
        </MenuButton>
        <div className="text-green-900 bg-green-900">
          <MenuList>
            <ProfileModal user={user}>
              <MenuItem>My Profile</MenuItem>
            </ProfileModal>
            <MenuDivider />
            <MenuItem onClick={logoutHandler}>Logout</MenuItem>
          </MenuList>
        </div>
      </Menu>
    </div>
  );
}

export default Profile;
