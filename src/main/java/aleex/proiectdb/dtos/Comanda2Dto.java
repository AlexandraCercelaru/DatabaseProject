package aleex.proiectdb.dtos;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class Comanda2Dto {
    private Integer cantitate;
    private BigDecimal pretUnitate;
    private String observatii;
}
