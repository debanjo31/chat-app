import {
  Box,
  Container,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";
import { ChatState } from "../Context/ChatProvider";

function Homepage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("login");
  const { darkMode, setDarkMode } = ChatState();

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) navigate("/chats");
  }, []);

  return (
    <div
      className={` h-screen  ${
        darkMode ? "bg-green-900 text-white" : "bg-green-50 text-green-900"
      }`}
    >
      <Container maxW="xl" centerContent>
        <Box
          d="flex"
          justifyContent="center"
          p={3}
          w="100%"
          m="40px 0 15px 0"
          borderRadius="lg"
          borderWidth="1px"
          className={`   ${darkMode ? "" : "border-green-900"}`}
        >
          <Text
            fontSize="4xl"
            fontFamily="Work sans"
            className="text-center font-bold"
          >
            Chattie
          </Text>
        </Box>
        <Box
          w="100%"
          p={4}
          borderRadius="lg"
          borderWidth="1px"
          className={`   ${darkMode ? "" : "border-green-900"}`}
        >
          <div className="title flex mt-4 mb-8 justify-around text-xl">
            <h3
              className={activeTab === "login" ? "tabStyle" : "cursor-pointer"}
              onClick={() => handleTabChange("login")}
            >
              LOG IN
            </h3>

            <h3
              className={activeTab === "signup" ? "tabStyle" : "cursor-pointer"}
              onClick={() => handleTabChange("signup")}
            >
              SIGN UP
            </h3>
          </div>
          {activeTab === "login" && <Login />}
          {activeTab === "signup" && <Signup />}
        </Box>
      </Container>
    </div>
  );
}

export default Homepage;
