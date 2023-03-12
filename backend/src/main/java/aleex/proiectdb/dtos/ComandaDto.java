package aleex.proiectdb.dtos;

import lombok.Data;

import javax.persistence.Column;
import java.math.BigDecimal;

@Data
public class ComandaDto {
    private Integer comandaId;
    private Integer programareId;
    private Integer cantitate;
    private BigDecimal pretUnitate;
    private String observatii;
}
