package aleex.proiectdb.entities;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class Programare {
    private Integer autoturismId;
    private Integer angajatId;
    private LocalDate dataProgramare;
    private Integer nrLocLucru;
    private String notaClient;
    private LocalTime oraProgramare;
}
