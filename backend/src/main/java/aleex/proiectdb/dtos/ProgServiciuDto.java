package aleex.proiectdb.dtos;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class ProgServiciuDto {
    private LocalDate dataProgramare;
    private Integer nrLocLucru;
    private String notaClient;
    private LocalTime oraProgramare;
    private String nume;
    private BigDecimal pretUnitate;
}
