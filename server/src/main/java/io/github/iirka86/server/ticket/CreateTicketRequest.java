package io.github.iirka86.server.ticket;

import jakarta.validation.constraints.NotBlank;

import java.util.UUID;

public record CreateTicketRequest(
        UUID doctorId,          // null, если selectionType = ANY
        SelectionType selectionType,
        @NotBlank String patientName,
        @NotBlank String patientPhone

) {}
