package io.github.iirka86.server.ticket;

import jakarta.validation.Valid;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/tickets")
public class TicketController {

    private final TicketService ticketService;

    public TicketController(TicketService ticketService) {
        this.ticketService = ticketService;
    }

    @PostMapping
    public TicketResponse createTicket(@Valid @RequestBody CreateTicketRequest request){
        Ticket ticket = ticketService.createTicket(request);
        return new TicketResponse(ticket.getId(), ticket.getNumber());
    }
}
