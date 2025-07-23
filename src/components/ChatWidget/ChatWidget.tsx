import { useState, useRef, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Spinner from 'react-bootstrap/Spinner';
import { ChatDots, ExclamationTriangleFill, X } from 'react-bootstrap-icons';
import { useSendMessage } from '../../hooks/useSendMessage';

interface Message {
  sender: 'user' | 'bot';
  text: string;
  isError?: boolean;
}

export const ChatWidget = () => {
  const [visible, setVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { sender: 'bot', text: 'Hi 👋, how can we help?' },
  ]);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  const { register, handleSubmit, reset } = useForm<{ input: string }>({
    defaultValues: { input: '' },
  });

  const sendMessageMutation = useSendMessage();

  const onSubmit = ({ input }: { input: string }) => {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { sender: 'user', text: input }]);
    sendMessageMutation.mutate(input, {
      onSuccess: (data) => {
        setMessages((msgs) => [
          ...msgs,
          { sender: 'bot', text: data.output || "Sorry, I couldn't understand that." },
        ]);
      },
      onError: () => {
        setMessages((msgs) => [
          ...msgs,
          { sender: 'bot', text: 'Error sending message. Please, try again', isError: true },
        ]);
      },
    });
    reset();
  };

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages, visible]);

  return (
    <>
      {!visible && (
        <Button
          variant="primary"
          className="position-fixed"
          style={{
            bottom: 20,
            right: 20,
            borderRadius: '50%',
            width: 50,
            height: 50,
            zIndex: 1001,
          }}
          aria-label="Open chat"
          onClick={() => setVisible(true)}
        >
          <ChatDots size={24} />
        </Button>
      )}
      {visible && (
        <Card
          className="position-fixed shadow"
          style={{
            bottom: 20,
            right: 20,
            maxWidth: 480,
            marginLeft: 20,
            height: 500,
            zIndex: 1000,
            display: 'flex',
            flexDirection: 'column',
          }}
          aria-label="Chat widget"
        >
          <Card.Header className="d-flex justify-content-between align-items-center bg-primary text-white">
            <span>Chat</span>
            <Button
              variant="link"
              className="text-white p-0"
              aria-label="Close chat"
              onClick={() => setVisible(false)}
            >
              <X size={20} />
            </Button>
          </Card.Header>
          <Card.Body
            ref={chatBodyRef}
            className="flex-grow-1 overflow-auto px-3 d-flex flex-column"
            style={{ background: '#fff' }}
          >
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 p-2 rounded ${msg.sender === 'bot' ? 'bg-primary text-white' : 'bg-light text-dark'}`}
                style={{
                  maxWidth: '80%',
                  alignSelf: msg.sender === 'bot' ? 'flex-start' : 'flex-end',
                }}
                aria-live="polite"
                role="status"
              >
                {msg.isError && (
                  <ExclamationTriangleFill
                    className="me-1 text-warning"
                    size={18}
                    aria-label="Warning"
                    role="img"
                  />
                )}
                {msg.text}
              </div>
            ))}
          </Card.Body>
          <Card.Footer className="d-flex gap-2 border-top">
            <Form
              className="w-100 d-flex gap-2"
              onSubmit={handleSubmit(onSubmit)}
              aria-label="Chat input form"
            >
              <Form.Control
                type="text"
                placeholder="Type your message here..."
                aria-label="Type your message"
                disabled={sendMessageMutation.isPending}
                {...register('input', { required: true })}
                autoComplete="off"
              />
              <Button
                variant="primary"
                type="submit"
                aria-label="Send message"
                disabled={sendMessageMutation.isPending}
                style={{ minWidth: 70 }}
              >
                {sendMessageMutation.isPending ? (
                  <Spinner animation="border" size="sm" variant="light" role="status">
                    <span className="visually-hidden">Sending message...</span>
                  </Spinner>
                ) : (
                  'Send'
                )}
              </Button>
            </Form>
          </Card.Footer>
        </Card>
      )}
    </>
  );
};
