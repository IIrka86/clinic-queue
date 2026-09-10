import { useParams } from 'react-router-dom'

function TicketTrackingPage() {
  const { ticketId } = useParams()

  return (
    <section>
      <h1>Ticket #{ticketId}</h1>
      <p>Live queue position and status will show here (CLQ-33, CLQ-37, CLQ-38).</p>
    </section>
  )
}

export default TicketTrackingPage
