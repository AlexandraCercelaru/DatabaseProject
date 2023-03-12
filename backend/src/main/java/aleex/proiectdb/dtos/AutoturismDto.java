package aleex.proiectdb.dtos;

import lombok.Data;

import javax.persistence.Column;

@Data
public class AutoturismDto {
    private Integer autoturismId;
    private Integer clientId;
    private String marca;
    private String model;
    private String serieSasiu;
}
