package aleex.proiectdb.dtos;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class AngajatProgDto {
    private String nume;
    private String prenume;
    private LocalDate dataProgramare;
    private LocalTime oraProgramare;
}
