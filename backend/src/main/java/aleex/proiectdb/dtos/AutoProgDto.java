package aleex.proiectdb.dtos;

import lombok.Data;

import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class AutoProgDto {
    private String marca;
    private String model;
    private String serieSasiu;
    private LocalDate dataProgramare;
    private Integer nrLocLucru;
    private String notaClient;
    private LocalTime oraProgramare;
}
