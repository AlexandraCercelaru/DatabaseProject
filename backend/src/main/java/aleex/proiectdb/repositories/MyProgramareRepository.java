package aleex.proiectdb.repositories;

import aleex.proiectdb.dtos.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.sql.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
public class MyProgramareRepository {

    public List<ProgramareDto> selectAll() {
        List<ProgramareDto> programari = null;
        Connection conn = null;
        try {
            conn = DriverManager.getConnection("jdbc:sqlserver://localhost:51759;databaseName=Service_masini;encrypt=true;trustServerCertificate=true;", "springbootapp", "springbootapp");
            Statement statement = conn.createStatement();
            ResultSet rs = statement.executeQuery("select * from Programari");

            programari = mapResultSetToProgramari(rs);

            conn.close();
        } catch (SQLException ignored) {
        }
        return programari;
    }

    public List<ProgramareDto> mapResultSetToProgramari(ResultSet rs) {
        List<ProgramareDto> programari = new ArrayList<>();
        try {
            while (rs.next()) {
                ProgramareDto programare = new ProgramareDto();

                programare.setProgramareId(rs.getInt("Programare_ID"));
                programare.setAutoturismId(rs.getInt("Autoturism_ID"));
                programare.setAngajatId(rs.getInt("Angajat_ID"));
                programare.setDataProgramare(rs.getDate("Data_programare").toLocalDate());
                programare.setNrLocLucru(rs.getInt("Nr_loc_lucru"));
                programare.setNotaClient(rs.getString("Nota_client"));
                programare.setOraProgramare(rs.getTime("Ora_programare").toLocalTime());

                programari.add(programare);
            }
        } catch (SQLException ignored) {
        }
        return programari;
    }

    public void addProgramare(
                        Integer autoturismId,
                        Integer angajatId,
                        LocalDate dataProgramare,
                        Integer nrLocLucru,
                        String notaClient,
                        LocalTime oraProgramare) {
        Connection conn = null;
        try {
            conn = DriverManager.getConnection("jdbc:sqlserver://localhost:51759;databaseName=Service_masini;encrypt=true;trustServerCertificate=true;", "springbootapp", "springbootapp");
            PreparedStatement preparedStatement = conn.prepareStatement(
                    "insert into Programari (Autoturism_ID, Angajat_ID, Data_programare, Nr_loc_lucru, Nota_client, Ora_programare)" +
                            "values (?, ?, ?, ?, ?, ?)");
            preparedStatement.setInt(1, autoturismId);
            preparedStatement.setInt(2, angajatId);
            preparedStatement.setDate(3, Date.valueOf(dataProgramare));
            preparedStatement.setInt(4, nrLocLucru);
            preparedStatement.setString(5, notaClient);
            preparedStatement.setTime(6, Time.valueOf(oraProgramare));

            preparedStatement.execute();

            conn.close();
        } catch (SQLException e) {
            log.error(e.getMessage(), e);
        }
    }

    public List<ProgServiciuDto> selectByPret(BigDecimal pret) {
        List<ProgServiciuDto> programari = null;
        Connection conn = null;
        try {
            conn = DriverManager.getConnection("jdbc:sqlserver://localhost:51759;databaseName=Service_masini;encrypt=true;trustServerCertificate=true;", "springbootapp", "springbootapp");

            PreparedStatement preparedStatement = conn.prepareStatement("select p.Data_programare, p.Nr_loc_lucru, p.Nota_client, p.Ora_programare, s.Nume, s.Pret_unitate  " +
                                                                            "from Programari p " +
                                                                            "JOIN Programari_Servicii ps on p.Programare_ID = ps.Programare_ID " +
                                                                            "join Servicii s on ps.Serviciu_ID = ps.Serviciu_ID " +
                                                                            "where s.Pret_unitate > ?;");
            preparedStatement.setBigDecimal(1, pret);
            ResultSet rs = preparedStatement.executeQuery();

            programari = mapResultByPret(rs);

            conn.close();
        } catch (SQLException ignored) {
        }
        return programari;
    }

    public List<ProgServiciuDto> mapResultByPret(ResultSet rs) {
        List<ProgServiciuDto> programari = new ArrayList<>();
        try {
            while (rs.next()) {
                ProgServiciuDto programare = new ProgServiciuDto();

                programare.setDataProgramare(rs.getDate("Data_programare").toLocalDate());
                programare.setNrLocLucru(rs.getInt("Nr_loc_lucru"));
                programare.setNotaClient(rs.getString("Nota_client"));
                programare.setOraProgramare(rs.getTime("Ora_programare").toLocalTime());
                programare.setNume(rs.getString("Nume"));
                programare.setPretUnitate(rs.getBigDecimal("Pret_unitate"));

                programari.add(programare);
            }
        } catch (SQLException ignored) {
        }
        return programari;
    }

}
