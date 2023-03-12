package aleex.proiectdb.dtos;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class AutoturismQC {
    private String marca;
    private String model;
    private String serieSasiu;
    private String nume;
    private String prenume;
    private String numeServiciu;
    private BigDecimal pretUnitate;
}
