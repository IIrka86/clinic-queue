package io.github.iirka86.server.ticket;

import java.util.UUID;

public record TicketResponse(
        UUID id,
        int number
) {}
