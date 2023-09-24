import React, { useState } from 'react';
import styled from 'styled-components';
import Picker from 'emoji-picker-react';
import { IoMdSend } from 'react-icons/io';
import { BsEmojiSmileFill } from 'react-icons/bs';

export default function ChatInput({ handleSendMsg }) {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [msg, setMsg] = useState('');

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };


  const handleEmojiClick = (event, emoji) => {

    const selectedEmoji = emoji.emoji;
    setMsg((prevMsg) => prevMsg + selectedEmoji);
  };

  // const handleEmojiClick = (event, emojiObject) => {
  //   let message = msg;
  //   message += emojiObject.emoji;
  //   setMsg(message);
  // };

  const sendChat = (event) => {
    event.preventDefault();
    if (msg.length > 0) {
      handleSendMsg(msg);
      setMsg("");
    }
  };
  return (
    <Container>
      <div className="button-container">
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && <Picker onEmojiClick={handleEmojiClick} />}
        </div>
      </div>
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input
          type="text"
          placeholder="Type your message"
          value={msg}
          onChange={(e) => setMsg(e.target.value)}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
}

const Container = styled.div`
  display: grid;
  align-items: center;
  grid-template-columns: 5% 95%;
  background-color: #080420;
  padding: 0 2rem;
  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }
  .button-container {
    display: flex;
    align-items: center;
    color: white;
    gap: 1rem;
    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: #ffff00c8;
        cursor: pointer;
      }

      .EmojiPickerReact {
        position: absolute;
        top: -500px;

        background-color: #080420;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3;
        .emoji-scroll-wrapper::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;
          &-thumb {
            background-color: #9a86f3;
          }
        }
        .emoji-categories {
          button {
            filter: contrast(0);
          }
        }
        .emoji-search {
          background-color: transparent;
          border-color: #9a86f3;
        }
        .emoji-group:before {
          background-color: #080420;
        }
      }
    }
  }
  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: #ffffff34;
    input {
      width: 90%;
      height: 60%;
      background-color: transparent;
      color: white;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }
      &:focus {
        outline: none;
      }
    }
    button {
      padding: 0.3rem 2rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;
        svg {
          font-size: 1rem;
        }
      }
      svg {
        font-size: 2rem;
        color: white;
      }
    }
  }
`;

// import React, { useState } from 'react';
// import styled from 'styled-components';
// import { IoMdSend } from 'react-icons/io';
// import { BsEmojiSmileFill } from 'react-icons/bs';
// import { Picker } from 'emoji-mart';
// import { Data } from 'emoji-mart';

// import { EmojiPicker } from 'interweave-emoji-picker';
// //import 'emoji-mart/css/emoji-mart.css'; // Import the emoji-mart CSS

// export default function ChatInput({ handleSendMsg }) {
//   const [showEmojiPicker, setShowEmojiPicker] = useState(false);
//   const [msg, setMsg] = useState('');

//   const handleEmojiPickerHideShow = () => {
//     setShowEmojiPicker(!showEmojiPicker);
//   };

//   const handleEmojiClick = (emoji) => {
//     console.log(emoji.native);
//     setMsg((prevMsg) => prevMsg + emoji.native);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     handleSendMsg(msg);
//     setMsg('');
//   };

//   return (
//     <Container>
//       <div className="button-container">
//         <div className="emoji">
//           <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
//           {showEmojiPicker && (
//             // <Picker
//             //   onEmojiSelect={handleEmojiClick}
//             //   data={Data}
//             //   previewPosition="none"
//             // />
//             <EmojiPicker
//               commonMode="frequently-used"
//               columnCount={15}
//               rowCount={5}
//             />
//           )}
//         </div>
//       </div>
//       <form className="input-container" onSubmit={handleSubmit}>
//         <input
//           type="text"
//           placeholder="Type your message"
//           value={msg}
//           onChange={(e) => setMsg(e.target.value)}
//         />
//         <button className="submit" type="submit">
//           <IoMdSend />
//         </button>
//       </form>
//     </Container>
//   );
// }
// const Container = styled.div`
//   display: grid;
//   align-items: center;
//   grid-template-columns: 5% 95%;
//   background-color: #080420;
//   padding: 0 2rem;
//   @media screen and (min-width: 720px) and (max-width: 1080px) {
//     padding: 0 1rem;
//     gap: 1rem;
//   }

//   .button-container {
//     display: flex;
//     align-items: center;
//     color: white;
//     gap: 1rem;

//     .emoji {
//       position: relative;

//       svg {
//         font-size: 1.5rem;
//         color: #ffff00c8;
//         cursor: pointer;
//       }

//       .interweave-emoji-picker {
//         position: absolute;
//         top: 100%;
//         left: 0;
//         z-index: 10;
//         background-color: #080420;
//         box-shadow: 0 5px 10px #9a86f3;
//         border: 1px solid #9a86f3;
//         border-radius: 8px;
//         width: 300px; /* Adjust the width as needed */
//         max-height: 300px; /* Adjust the max height as needed */
//         overflow-y: auto;
//         padding: 10px;

//         /* Scrollbar styles */
//         scrollbar-width: thin;
//         scrollbar-color: #9a86f3 #080420;

//         &::-webkit-scrollbar {
//           width: 8px;
//         }

//         &::-webkit-scrollbar-thumb {
//           background-color: #9a86f3;
//           border-radius: 4px;
//         }

//         .emoji-mart-category-label {
//           color: white;
//         }

//         .emoji-mart-emoji {
//           font-size: 1.5rem;
//           cursor: pointer;

//           &:hover {
//             transform: scale(1.2);
//           }
//         }
//       }
//     }
//   }

//   .input-container {
//     width: 100%;
//     border-radius: 2rem;
//     display: flex;
//     align-items: center;
//     gap: 2rem;
//     background-color: #ffffff34;

//     input {
//       flex: 1;
//       height: 60%;
//       background-color: transparent;
//       color: white;
//       border: none;
//       padding-left: 1rem;
//       font-size: 1.2rem;

//       &::selection {
//         background-color: #9a86f3;
//       }

//       &:focus {
//         outline: none;
//       }
//     }

//     button {
//       padding: 0.3rem 2rem;
//       border-radius: 2rem;
//       display: flex;
//       justify-content: center;
//       align-items: center;
//       background-color: #9a86f3;
//       border: none;

//       @media screen and (min-width: 720px) and (max-width: 1080px) {
//         padding: 0.3rem 1rem;
//         svg {
//           font-size: 1rem;
//         }
//       }

//       svg {
//         font-size: 2rem;
//         color: white;
//       }
//     }
//   }
// `;
