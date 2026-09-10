import type { IMessage } from '@stomp/stompjs'
import { useEffect, useRef } from 'react'
import { createStompClient } from '../lib/stompClient'

// Subscribes to /topic/queue/{doctorId} for as long as doctorId is set.
// Event payloads (ticket_created, ticket_called, ...) are defined in CLQ-35,
// so callers are responsible for interpreting the parsed message for now.
export function useQueueSocket(
  doctorId: string | undefined,
  onMessage: (payload: unknown) => void,
) {
  const onMessageRef = useRef(onMessage)

  useEffect(() => {
    onMessageRef.current = onMessage
  })

  useEffect(() => {
    if (!doctorId) return

    const client = createStompClient()

    client.onConnect = () => {
      client.subscribe(`/topic/queue/${doctorId}`, (message: IMessage) => {
        onMessageRef.current(JSON.parse(message.body))
      })
    }

    client.activate()

    return () => {
      void client.deactivate()
    }
  }, [doctorId])
}
