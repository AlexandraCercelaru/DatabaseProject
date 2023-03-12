package aleex.proiectdb.dtos;

import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class ProgServDto {
    private String nume;
    private BigDecimal pretUnitate;
    private LocalDate dataProgramare;
    private LocalTime oraProgramare;
    private Integer nrLocLucru;
}
