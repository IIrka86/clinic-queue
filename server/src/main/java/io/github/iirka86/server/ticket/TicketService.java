package io.github.iirka86.server.ticket;

import io.github.iirka86.server.doctor.Doctor;
import io.github.iirka86.server.doctor.DoctorRepository;
import jakarta.transaction.Transactional;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.time.Instant;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.Comparator;
import java.util.List;
import java.util.UUID;

@Service
public class TicketService {

    private final DoctorRepository doctorRepository;
    private final TicketRepository ticketRepository;

    public TicketService(DoctorRepository doctorRepository, TicketRepository ticketRepository) {
        this.doctorRepository = doctorRepository;
        this.ticketRepository = ticketRepository;
    }

    @Transactional
    public Ticket createTicket(CreateTicketRequest request){
        Doctor doctor = resolveDoctor(request);
        int number = nextTicketNumberForToday(doctor);

        Ticket ticket = new Ticket();
        ticket.setDoctor(doctor);
        ticket.setNumber(number);
        ticket.setPatientName(request.patientName());
        ticket.setPatientPhone(request.patientPhone());
        ticket.setSelectionType(request.selectionType());
        ticket.setStatus(TicketStatus.WAITING);
        ticket.setCreatedAt(Instant.now());

        return ticketRepository.save(ticket);
    }

    private Doctor resolveDoctor(CreateTicketRequest request){
        if(request.selectionType() == SelectionType.SPECIFIC){
            Doctor doctor = doctorRepository.findById(request.doctorId())
                    .orElseThrow(() -> new ResponseStatusException(HttpStatus.BAD_REQUEST, "Doctor not found") );

            if(!doctor.isActive()){
                throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Doctor not active");
            }

            return doctor;
        }

        List<Doctor> doctors = doctorRepository.findByActiveTrue();

        if(doctors.isEmpty()){
            throw new ResponseStatusException(HttpStatus.BAD_REQUEST, "Doctor not found");
        }

        return doctors.stream()
                .min(Comparator.comparingInt(item -> Math.toIntExact(ticketRepository.countByDoctorAndStatus(item, TicketStatus.WAITING))))
                .orElseThrow();
    }

    private int nextTicketNumberForToday(Doctor doctor){
        DayBounds dayBounds = todayBounds();
        return (int) ticketRepository.countByDoctorAndCreatedAtBetween(doctor, dayBounds.start(), dayBounds.end()) + 1;
    }

    public TicketStatusResponse getTicketStatus(UUID id){
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ticket not found"));

        Doctor doctor = ticket.getDoctor();
        TicketStatus status = ticket.getStatus();
        int number = ticket.getNumber();
        DayBounds dayBounds = todayBounds();

        int queuePosition = Math.toIntExact(status == TicketStatus.WAITING
                ? ticketRepository.countByDoctorAndStatusAndNumberLessThanAndCreatedAtBetween(doctor, status, number, dayBounds.start(), dayBounds.end())
                : 0);

        return new TicketStatusResponse(
                ticket.getId(),
                number,
                doctor.getId(),
                status,
                queuePosition
        );
    }

    private DayBounds todayBounds() {
        ZoneId zone = ZoneId.systemDefault();
        LocalDate today = LocalDate.now(zone);
        return new DayBounds(
                today.atStartOfDay(zone).toInstant(),
                today.plusDays(1).atStartOfDay(zone).toInstant()
        );
    }

}
