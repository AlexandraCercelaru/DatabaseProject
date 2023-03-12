package aleex.proiectdb.entities;

import lombok.Data;

@Data
public class Client {
    private String nume;
    private String prenume;
    private String cnp;
    private String serie;
    private Integer numar;
    private String adresa;
    private String email;
    private String parola;

}
