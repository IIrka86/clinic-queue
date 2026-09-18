package io.github.iirka86.server.doctor;

import java.util.UUID;

public record DoctorResponse(
        UUID id,
        String firstName,
        String lastName,
        String specialization,
        String room,
        boolean active
) {
}
