import { useWallpaper } from '../context/wallpaper'
import { useChatStore } from '../store/useChatStore';
import { useSelectedConversation } from '../hooks/useSelectedConversation';
import { useEffect } from 'react';
import ChatSidebar from '../Components/Chat/ChatSidebar';
import { ChatHeader } from '../Components/Chat/ChatHeader';
import { MessageList } from '../Components/Chat/MessageList';
import ChatComposer from '../Components/Chat/ChatComposer';


function ChatPage() {
  const {frameStyle} = useWallpaper();
  const getConversations = useChatStore((state) => state.getConversations);
  const getMessages = useChatStore((state) => state.getMessages);
  const getUsers = useChatStore((state) => state.getUsers);
  const subscribeToMessages = useChatStore((state) => state.subscribeToMessages);
  const unSubscribeFromMessages = useChatStore((state) => state.unSubscribeFromMessages);

  const { activeConversation, activeConversationId, isLargeScreen } = useSelectedConversation();
  console.log({
    activeConversation,
    activeConversationId,
    isLargeScreen,
  });

  useEffect(() => {
    getUsers();
    getConversations();
  }, [getConversations, getUsers]);

  useEffect(() => {
    if (!activeConversation) return;

    getMessages(activeConversationId);
    subscribeToMessages(activeConversationId);

    return() => unSubscribeFromMessages();
  }, [getMessages, activeConversationId, subscribeToMessages, unSubscribeFromMessages])

  
  return (
    <div className="flex h-dvh flex-col overflow-hidden p-2 sm:p-3 md:p-8" style={frameStyle}>
      <div className="mx-auto flex w-full max-w-6xl flex-1 overflow-hidden rounded-2xl border border-border bg-background text-foreground">
        <ChatSidebar />
        <div className={`flex-1 flex-col overflow-hidden ${ !isLargeScreen && !activeConversationId ? "hidden lg:flex" : "flex" }`}>
        <ChatHeader />
        <MessageList />
         {activeConversation ? <ChatComposer /> : null } 
        </div>
      </div>
    </div>
  )
}

export default ChatPage