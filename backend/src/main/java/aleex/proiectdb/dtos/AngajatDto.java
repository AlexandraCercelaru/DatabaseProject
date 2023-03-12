package aleex.proiectdb.dtos;

import lombok.Data;

import javax.persistence.Column;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class AngajatDto {
    private Integer angajatId;
    private String nume;
    private String prenume;
    private LocalDate dataNastere;
    private String cnp;
    private String serie;
    private Integer numar;
    private String adresa;
    private LocalDate dataAngajare;
}
