package io.github.iirka86.server.ticket;

import java.util.UUID;

public record TicketStatusResponse(
        UUID id,
        int number,
        UUID doctorId,
        TicketStatus status,
        int queuePosition
) {}
