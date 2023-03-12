package aleex.proiectdb.dtos;

import lombok.Data;

import javax.persistence.Column;
import java.math.BigDecimal;

@Data
public class ServiciuDto {
    private Integer serviciuId;
    private String nume;
    private BigDecimal pretUnitate;
}
