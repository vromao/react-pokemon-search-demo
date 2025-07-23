import { useMutation } from '@tanstack/react-query';

const WEBHOOK_URL = import.meta.env.VITE_WEBHOOK_URL ?? '';
const WEBHOOK_ROUTE = 'general';

export const getChatId = () => {
  const storagedChatId = sessionStorage.getItem('chatId');

  if (storagedChatId) {
    return storagedChatId;
  }

  const chatId = `chat_${Math.random().toString(36).substr(2, 9)}`;
  sessionStorage.setItem('chatId', chatId);

  return chatId;
};

export async function sendMessage(input: string) {
  const res = await fetch(WEBHOOK_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chatId: getChatId(),
      message: input,
      route: WEBHOOK_ROUTE,
    }),
  });

  if (!res.ok) {
    throw new Error('Network error');
  }

  return res.json();
}

export const useSendMessage = () => {
  return useMutation({
    mutationFn: sendMessage,
  });
};
