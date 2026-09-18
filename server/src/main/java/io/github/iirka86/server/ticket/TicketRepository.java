package io.github.iirka86.server.ticket;

import io.github.iirka86.server.doctor.Doctor;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.Instant;
import java.util.UUID;

@Repository
public interface TicketRepository extends JpaRepository<Ticket, UUID> {

    long countByDoctorAndStatus(Doctor doctor, TicketStatus status);

    long countByDoctorAndCreatedAtBetween(Doctor doctor, Instant start, Instant end);

    long countByDoctorAndStatusAndNumberLessThan(Doctor doctor, TicketStatus status, int number);
}
