package aleex.proiectdb.dtos;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import javax.persistence.Column;
import java.time.LocalDate;
import java.time.LocalTime;

@Data
public class ProgramareDto {
    private Integer programareId;
    private Integer autoturismId;
    private Integer angajatId;
    private LocalDate dataProgramare;
    private Integer nrLocLucru;
    private String notaClient;
    private LocalTime oraProgramare;
}
