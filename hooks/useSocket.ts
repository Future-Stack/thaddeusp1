import { useEffect, useRef } from 'react';
import { io, Socket } from 'socket.io-client';
import { useAppStore } from '@/store/useAppStore';

const SOCKET_URL = 'https://thaddeusp1-backend.onrender.com';

export const useSocket = () => {
  const socketRef = useRef<Socket | null>(null);
  const { accessToken, userId } = useAppStore();

  useEffect(() => {
    if (!accessToken || !userId) {
      if (socketRef.current) {
        socketRef.current.disconnect();
        socketRef.current = null;
      }
      return;
    }

    if (!socketRef.current) {
      socketRef.current = io(SOCKET_URL, {
        auth: {
          token: accessToken,
        },
        transports: ['websocket'],
      });

      socketRef.current.on('connect', () => {
        console.log('Connected to socket');
        // Join a room for the user
        socketRef.current?.emit('join', userId);
      });

      socketRef.current.on('connect_error', (error) => {
        console.error('Socket connection error:', error);
      });

      socketRef.current.on('disconnect', () => {
        console.log('Disconnected from socket');
      });
    }

    return () => {
      // We don't necessarily want to disconnect on every re-render or small unmount
      // but if the component using this hook unmounts permanently, it might be good.
      // However, usually we want a single connection for the whole session.
    };
  }, [accessToken, userId]);

  return socketRef.current;
};
