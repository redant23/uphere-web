import React, { Component } from 'react';
import ChatInput from '../ChatInput/ChatInput';
import s from './ChatRoom.css';
import Img from './uphere1.png';

class ChatRoom extends Component {
  constructor(props) {
    super(props);
  }

  componentWillUpdate () {
    let node = this.refs.scroll;
    this.scrollHeight = node.scrollHeight;
    this.scrollTop = node.scrollTop;
  }

  componentDidUpdate () {
    let node = this.refs.scroll;
    if(node.scrollTop !== node.scrollHeight){
      node.scrollTop = this.scrollHeight
    } else {
      node.scrollTop = this.scrollTop + (node.scrollHeight - this.scrollHeight);
    }
  }

  _findSenderById(id) {
    if (id && this.props.chat.participants && this.props.chat.participants.length > 0) {
      return this.props.chat.participants.filter((user) => {
        return user.uphere_id === id;
      })[0];
    }
    return {};
  }

  _msgTime(created_at) {
    let date = new Date(Date.parse(created_at));
    let date_day = ['일', '월', '화', '수', '목', '금', '토'];
    return `${date.getMonth() + 1}월 ${date.getDate()}일 ${date_day[date.getDay()]}요일 ${date.toLocaleTimeString().slice(0, 2)} ${date.toLocaleTimeString().slice(3).split(':')[0]}시 ${date.getMinutes()}분`;
  }

  isimageMessage(message) {
    if (message.text.slice(0, 19) === 'https://test-uphere') {
      return ( <div className={`${s.chatlog_message}`}><img src={`${message.text}`} className={`${s.img_message}`} /></div> )
    } return ( <p className={`${s.chatlog_message}`}>{`${message.text}`}</p> )
  }

  render() {
    let messages = this.props.chat.messages && this.props.chat.messages.length > 0 ? this.props.chat.messages : [];
    messages = messages.sort((x, y) => x.uphere_id - y.uphere_id);
    return (
        <div className={`${s.container}`} >
          <div className={`${s.content}`} ref="scroll">
            <ul className={`${s.chatlog}`}>
              { messages.length ? messages.map((message, i) => {
                  return (
                    <li key={i}
                      className={message.sender_id === this.props.user.uphere_id ? `${s.chatlog_entry_user} ${s.chatlog_entry}` : `${s.chatlog_entry}`}>
                        {message.sender_id !== this.props.user.uphere_id && <img className={`${s.chatlog_avatar}`} src={this._findSenderById(message.sender_id).profile_image_url}/>}
                          {this.isimageMessage(message)}
                            <span className={`${s.message_time}`}>
                              {this._msgTime(message.created_at)}
                            </span>
                    </li>
                  );
                }) : <div><img src={Img}/></div>
              }
            </ul>
            {this.props.chat.messages && !this.props.chat.messages.length &&
              (<div className={`${s.default}`}>
                <img src="http://semantic-ui.com/images/avatar2/small/lena.png" className={`${s.default_img}`}/>
              <div className={`${s.default_message}`}>
                <p className={`${s.default_text}`}>Send Message!</p>
                <p className={`${s.default_text_KR}`}>
                  <b>친구에게 새로운 메세지를 보내보세요.<br />이미지 보내기도 가능하답니다.</b>
                </p>
              </div>
            </div>)}
          </div>
          <div className={`${s.footer}`}>
            <ChatInput
              friendList={this.props.friendList}
              user={this.props.user}
              chat={this.props.chat}
              newMessage={this.props.newMessage}
              uploadImage={this.props.uploadImage} />
          </div>
        </div>
    );
  }
}

export default ChatRoom;
