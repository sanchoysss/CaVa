import {Component, OnInit, OnDestroy, HostListener, ViewChild, ElementRef, AfterViewChecked} from '@angular/core';
import * as Stomp from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {Chat} from "../../models/chat/chat";
import {ChatService} from "../../service/chatService/chat.service";
import {Message} from "../../models/message/message";
import {MessageType} from "../../models/message/message-type/message-type";
import {MessageForSending} from "../../models/message/message-for-sending/message-for-sending";
import {ChatsForUser} from "../../models/chatsForUser/chats-for-user";
import {UserService} from "../../service/userService/user.service";
import {UsersFoundByLoginAndName} from "../../models/usersFoundByLoginAndName/users-found-by-login-and-name";
import {TimeHelper} from "../../helpers/timeHelper/time-helper";
import {AccountInfo} from "../../models/accountInfo/account-info";
import {ChatMember} from "../../models/chatMember/chat-member";
import {ChatUser} from "../../models/chatUser/chat-user";
import {Router} from '@angular/router';
import {MessageService} from "../../service/messageService/message.service";
import {ServiceHelper} from "../../service/helper/service-helper";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit, OnDestroy, AfterViewChecked {

  @ViewChild('chatHistory') private chatHistory: ElementRef;
  @ViewChild('searchBar') private searchBar: ElementRef;
  searchedUsers: UsersFoundByLoginAndName;
  private _chatsForUser: ChatsForUser;
  private stompClient: Stomp.CompatClient;
  private _selectedChatId: number | null;
  public MessageType = MessageType;
  private timeout: any;
  safeMode: boolean = false;
  safeModeText: string = '';
  private limit: number = 5;

  constructor(private chatService: ChatService,
              private userService: UserService,
              public timeHelper: TimeHelper,
              private router: Router,
              private messageService: MessageService,
              private serviceHelper : ServiceHelper,
  ) {
  }

  ngOnInit(): void {
    this._selectedChatId = null;
    this.getChats();

    this.safeMode = !(localStorage.getItem('mode') == null || localStorage.getItem('mode') == 'usual');
    this.setButtonSafeModeText();
  }

  ngAfterViewChecked() {
    this.scrollToBottom();
  }

  setButtonSafeModeText() {
    if (this.safeMode) {
      this.safeModeText = 'Safe mode enabled. Click to disable.'
    } else {
      this.safeModeText = 'Click to enable safe mode.';
    }
  }

  private connect() {
    const url = this.serviceHelper.url + '/ws?auth=Bearer ' + localStorage.getItem('token');
    const socket = new SockJS(url);
    this.stompClient = Stomp.Stomp.over(socket);
    this.stompClient.connect(
      {},
      () => {
        this.stompClient?.subscribe(
          '/topic/chat/' + this._chatsForUser.chatsReceiver.id,
          (message: any) => {
            let parsedMessage: MessageForSending = JSON.parse(message.body);
            let messages = this.getMessagesByChatId(parsedMessage.chatReceiverId);
            if (messages == null) {
              this.getNewChatFromServer(parsedMessage);
            } else {
              messages.push(parsedMessage);
              let removed = this._chatsForUser.chatsDto.splice(this.getChatIndexByChatId(parsedMessage.chatReceiverId), 1);
              this._chatsForUser.chatsDto.unshift(removed[0]);
            }
          });
      }
    );
  }

  private getChats() {
    this.chatService.getChats(0, this.limit).subscribe(
      (chatsForUser: ChatsForUser) => {
        for (let i = 0; i < chatsForUser.chatsDto.length; i++) {
          chatsForUser.chatsDto[i].loadMoreEnabled = chatsForUser.chatsDto[i].messages.length >= this.limit ;
        }
        this._chatsForUser = chatsForUser;
        console.log(chatsForUser.chatsDto);
      },
      (error: any) => {
        if (error.status == 401) {
          this.userService.resolveUnauthorizedError();
        } else {
          console.log(error)
        }
      },
      () => {
        this.connect();
      }
    )
  }

  public selectChat(id: number) {
    this.selectedChatId = id;
  }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler() {
    if (this.selectedChatId == -1) {
      this.deleteNotExistingChat();
    }
    this.selectedChatId = null;
  }

  @HostListener('scroll', ['$event'])
  onScrollHandler($event: any) {
    console.log($event);
  }

  getChatIndexByChatId(id: number): number {
    for (let i = 0; i < this._chatsForUser.chatsDto.length; i++) {
      if (this._chatsForUser.chatsDto[i].id == id) {
        return i;
      }
    }
    return -1;
  }

  getMessagesByChatId(id: number): Message[] | null {
    for (let i = 0; i < this._chatsForUser.chatsDto.length; i++) {
      if (this._chatsForUser.chatsDto[i].id == id) {
        return this._chatsForUser.chatsDto[i].messages;
      }
    }
    return null;
  }

  collectDataAndSendMessage(input: HTMLInputElement, chatId: number) {

    let message: MessageForSending = new MessageForSending(
      input.value,
      this._chatsForUser.chatsReceiver
    );
    input.value = '';

    if (chatId == -1) {
      //message.userReceiver = this.getReceiver(this.getNewChat());
      this.createChatAndThenSend(message);
      return;
    }

    this._chatsForUser.chatsDto.forEach(chat => {
      if (chat.id == chatId) {
        //message.userReceiver = this.getReceiver(chat);
        message.chatReceiverId = chatId;
        chat.messages.push(message);
        return;
      }
    });

    this.sendMessage(chatId, message);
  }

  createChatAndThenSend(message: MessageForSending) {
    let chatIndex = this.getNewChatIndex();
    let newChat = this._chatsForUser.chatsDto[chatIndex];
    this.chatService.createChat(newChat).subscribe(
      (chat: Chat) => {
        newChat.id = chat.id;
        message.chatReceiverId = chat.id;
        this.selectedChatId = chat.id;
      },
      (error) => {
        if (error.status == 401) {
          this.userService.resolveUnauthorizedError();
        } else {
          console.log(error);
        }
      },
      () => {
        this.sendMessage(newChat.id, message)
        newChat.messages.push(message);
      }
    )
  }

  sendMessage(chatId: number, message: MessageForSending) {
    this.stompClient?.send(
      '/app/chat/' + chatId,
      {},
      JSON.stringify(message!)
    );
    let ind = this.getChatIndexByChatId(chatId);
    let tempChat = this._chatsForUser.chatsDto.splice(ind, 1);
    this._chatsForUser.chatsDto.unshift(tempChat[0]);
    this.scrollToBottom();
  }

  getNameForChat(chat: Chat): string {
    return chat.name;
  }

  getLastMessage(chat: Chat): Message {
    return chat.messages[chat.messages.length - 1];
  }

  getTextOfLastMessage(chat: Chat): string {
    let lastMessage: Message = this.getLastMessage(chat);

    if (lastMessage == undefined) {
      return '';
    }

    return lastMessage.messageType == MessageType.OUTGOING ? 'You: ' + lastMessage.text : lastMessage.text;
  }

  private getReceiver(chat: Chat): ChatUser {
    return this._chatsForUser.chatsReceiver.id == chat.chatMembers[0].id ? chat.chatMembers[1] : chat.chatMembers[0];
  }

  private scrollToBottom(): void {
    try {
      this.chatHistory.nativeElement.scrollTop = this.chatHistory.nativeElement.scrollHeight;
    } catch (err) {
    }
  }

  waitAndFind() {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      if (this.searchBar.nativeElement.value.trim() != '') {
        this.userService.findUser(this.searchBar.nativeElement.value.trim()).subscribe(
          (usersFoundByLoginAndName: UsersFoundByLoginAndName) => {
            this.searchedUsers = usersFoundByLoginAndName
          },
          (error) => {
            if (error.status == 401) {
              this.userService.resolveUnauthorizedError();
            } else {
              console.log(error);
            }
          },
          () => {
          }
        )
      }
    }, 1000);
  }

  chooseUser(user: AccountInfo) {
    this.deleteNotExistingChat();
    let chatId = this.getExistingChat(user.login);
    if (chatId != -1) {
      this.selectedChatId = chatId;
      return;
    }
    let chatsReceiver = this._chatsForUser.chatsReceiver;
    let chatMembers = [
      new ChatMember(user.login, user.name, user.id),
      new ChatMember(chatsReceiver.login, chatsReceiver.name, chatsReceiver.id)]
    this._chatsForUser.chatsDto.unshift(
      new Chat(
        chatMembers,
        user.name
      )
    );
    this.selectedChatId = -1;
  }

  changeMode() {
    this.safeMode = !this.safeMode;
    if (localStorage.getItem('mode') == null || localStorage.getItem('mode') == 'usual') {
      localStorage.setItem('mode', 'safe');
      this.selectedChatId = null;
    } else {
      localStorage.setItem('mode', 'usual');
    }
    this.setButtonSafeModeText();
  }

  getExistingChat(login: string): number {
    for (let chat of this._chatsForUser.chatsDto) {
      if (chat.chatMembers.length == 2) {
        if (chat.chatMembers[0].login == login || chat.chatMembers[1].login == login) {
          return chat.id;
        }
      }
    }
    return -1;
  }

  get chats(): Chat[] {
    return this._chatsForUser?.chatsDto;
  }

  set chats(value: Chat[]) {
    this._chatsForUser.chatsDto = value;
  }

  get selectedChatId(): number | null {
    return this._selectedChatId;
  }

  set selectedChatId(value: number | null) {
    this._selectedChatId = value;
  }

  ngOnDestroy() {
    this.stompClient.disconnect();
  }

  private deleteNotExistingChat() {
    console.log(this._chatsForUser.chatsDto);
    this._chatsForUser.chatsDto = this._chatsForUser?.chatsDto.filter(chat => chat.id != -1)
  }

  private getNewChatFromServer(message: MessageForSending) {
    this.chatService.getChatById(message.chatReceiverId).subscribe(
      (chat: Chat) => {
        this._chatsForUser.chatsDto.unshift(chat);
      },
      (error) => {
        if (error.status == 401) {
          this.userService.resolveUnauthorizedError();
        }
      },
      () => {}
    );
    // let chatMembers = [message.userReceiver, message.userSender];
    // let newChat = new Chat(
    //   chatMembers,
    //   message.userSender.name,
    //   [new Message(message.text, message.sendingDate, message.messageType)],
    //   message.chatReceiverId
    // );
    // this._chatsForUser.chatsDto.unshift(newChat);
  }

  private getNewChat(): Chat {
    for (let chat of this._chatsForUser.chatsDto) {
      if (chat.id == -1) {
        return chat;
      }
    }
    return new Chat();
  }

  private getNewChatIndex(): number {
    for (let i = 0; i < this._chatsForUser.chatsDto.length; i++) {
      if (this._chatsForUser.chatsDto[i].id == -1) {
        return i;
      }
    }
    return -1;
  }

  clickOnUser(chat: Chat) {
    if (chat.chatMembers.length != 2) {
      return;
    }

    let ind = chat.chatMembers[1].login == this._chatsForUser.chatsReceiver.login ? 0 : 1;
    let login = chat.chatMembers[ind].login;
    this.router.navigateByUrl('account/' + login);
  }

  loadMessages(chatId: number) {
    let chatInd = this.getChatIndexByChatId(chatId);
    let chat = this._chatsForUser.chatsDto[chatInd];
    this.messageService.getMessages(chatId, ++chat.currentPageForMessages, this.limit).subscribe(
      (messages: Message[]) => {
        chat.loadMoreEnabled = messages.length == this.limit;
        messages = messages.reverse();
        messages.forEach((message: Message) => {
          chat.messages.unshift(message)
        });
      },
      (error) => {
        if (error.status == 401) {
          this.userService.resolveUnauthorizedError();
        } else {
          console.log(error);
        }
      },
      () => {
      }
    );
  }

  buttonIsEnabled(selectedChatId: number) {
    let ind = this.getChatIndexByChatId(selectedChatId);
    let chat : Chat = this._chatsForUser.chatsDto[ind];
    return chat.loadMoreEnabled;
  }
}
