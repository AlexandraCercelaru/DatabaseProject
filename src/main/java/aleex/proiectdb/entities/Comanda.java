package aleex.proiectdb.entities;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class Comanda {
    private Integer programareId;
    private Integer cantitate;
    private BigDecimal pretUnitate;
    private String observatii;
}
