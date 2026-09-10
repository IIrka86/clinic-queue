import { Client } from '@stomp/stompjs'
import SockJS from 'sockjs-client'
import { API_BASE_URL } from '../config/env'

// Endpoint path assumes the backend registers STOMP at "/ws" (CLQ-34).
export function createStompClient(): Client {
  return new Client({
    webSocketFactory: () => new SockJS(`${API_BASE_URL}/ws`),
    reconnectDelay: 5000,
  })
}
