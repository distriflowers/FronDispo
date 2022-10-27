import React, {useContext, useEffect, useState} from 'react';
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import axios from "axios";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../config/ChatLogics";
import ChatContext from "../Context/chat-context";

const ScrollableChat = ({ messages }) => {

  const { user } =  useContext(ChatContext);
  const [datas, setDatas] = useState([]);
  // console.log('message:',messages);
  useEffect(async () => {
    try {
      const config = {
        headers: { "Content-type": "application/json" },
      };

      const { data } = await axios.get( "/api/user/allusers", config);
      if(data.lenth > 0){
        setDatas(data);
      }
      
    } catch (error) {
      console.log(error.message); 
    }
  }, []);

  console.log(datas);
  
  
  return (
    <ScrollableFeed>
      {messages &&
        messages.map((message, i) => (
          <div style={{ display: "flex" }} key={message._id}>
            {
            (isSameSender(messages, message, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={message.sender.name} placement="bottom-start" hasArrow>
                {/* <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={message.sender.name}
                /> */}
                <div className={message.sender.type === 1 ? 'Sender-Name bg-red' : (message.sender.type === 2) ? 'Sender-Name bg-blue': 'Sender-Name bg-green'}>
                  <p>{message.sender.name}</p>
                </div>
              </Tooltip>
            )}
            <span
              className={message.sender.type === 1 ? "red" : (message.sender.type === 2 ? "blue" : "green")}
              style={{
                backgroundColor: `${
                  message.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, message, i, user._id),
                // marginLeft:'60px',
                marginTop: isSameUser(messages, message, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {message.content}
            </span>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;