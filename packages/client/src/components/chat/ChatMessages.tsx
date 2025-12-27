import React, { useEffect, useRef } from 'react';
import MarkDown from 'react-markdown';

export type MessageFeed = {
  content: string;
  role: string;
};

type Props = {
  readonly messages: MessageFeed[];
};

function ChatMessages({ messages }: Props) {
  const lastMessageRef = useRef<HTMLDivElement | null>(null);
  const onCopyMessage = (e: React.ClipboardEvent<HTMLParagraphElement>) => {
    const selection = window.getSelection()?.toString().trim();
    if (selection) {
      e.preventDefault();
      e.clipboardData.setData('text/plain', selection);
    }
  };

  useEffect(() => {
    lastMessageRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col gap-3">
      {messages.map((message, index) => (
        <div
          key={index}
          onCopy={onCopyMessage}
          ref={index === messages.length - 1 ? lastMessageRef : null}
          className={`px-3 py-1 rounded-xl 
            ${
              message.role === 'user'
                ? 'bg-blue-600 text-white self-end'
                : 'bg-gray-100 text-black self-start'
            }`}
        >
          <MarkDown>{message.content}</MarkDown>
        </div>
      ))}
    </div>
  );
}

export default ChatMessages;
