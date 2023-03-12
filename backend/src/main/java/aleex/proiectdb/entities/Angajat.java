package aleex.proiectdb.entities;

import lombok.Data;

import java.time.LocalDate;

@Data
public class Angajat {
    private String nume;
    private String prenume;
    private LocalDate dataNastere;
    private String cnp;
    private String serie;
    private Integer numar;
    private String adresa;
    private LocalDate dataAngajare;
}
