import React from 'react';
import { Button } from '../ui/button';
import { FaArrowUp } from 'react-icons/fa';
import { useForm } from 'react-hook-form';

export type ChatFormData = {
  prompt: string;
};

type Props = {
  onSubmit: (data: ChatFormData) => void;
};

function ChatInput({ onSubmit }: Readonly<Props>) {
  const { register, handleSubmit, reset, formState } = useForm<ChatFormData>();

  const onKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleFormOnSubmit();
    }
  };

  const handleFormOnSubmit = handleSubmit(data => {
    reset({ prompt: '' });
    onSubmit(data);
  });

  return (
    <form
      onSubmit={handleFormOnSubmit}
      className="flex flex-col gap-2 items-end border-2 p-4 rounded-3xl"
    >
      <textarea
        {...register('prompt', {
          required: true,
          validate: data => data.trim().length > 0,
        })}
        autoFocus
        className="w-full border-0 focus:outline-0 resize-none"
        placeholder="Ask anything"
        maxLength={1000}
        onKeyDown={onKeyDown}
      />
      <Button disabled={!formState.isValid} className="rounded-full w-9 h-9">
        <FaArrowUp />
      </Button>
    </form>
  );
}

export default ChatInput;
