package aleex.proiectdb.repositories;

import aleex.proiectdb.dtos.*;
import org.springframework.stereotype.Component;

import java.math.BigDecimal;
import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
public class MyServiciuRepository {

    public List<ServiciuDto> selectAll() {
        List<ServiciuDto> servicii = null;
        Connection conn = null;
        try {
            conn = DriverManager.getConnection("jdbc:sqlserver://localhost:51759;databaseName=Service_masini;encrypt=true;trustServerCertificate=true;", "springbootapp", "springbootapp");
            Statement statement = conn.createStatement();
            ResultSet rs = statement.executeQuery("select * from Servicii");

            servicii = mapResultSetToServiciu(rs);

            conn.close();
        } catch (SQLException ignored) {
        }
        return servicii;
    }

    public static List<ServiciuDto> mapResultSetToServiciu(ResultSet rs) {
        List<ServiciuDto> servicii = new ArrayList<>();
        try {
            while (rs.next()) {
                ServiciuDto serviciu = new ServiciuDto();

                serviciu.setServiciuId(rs.getInt("Serviciu_ID"));
                serviciu.setNume(rs.getString("Nume"));
                serviciu.setPretUnitate(rs.getBigDecimal("Pret_unitate"));

                servicii.add(serviciu);
            }
        } catch (SQLException ignored) {
        }
        return servicii;
    }

    public static ServiciuDto update(String nume,
                              BigDecimal pret) {
        ServiciuDto serviciu = null;
        Connection conn = null;
        try {
            conn = DriverManager.getConnection("jdbc:sqlserver://localhost:51759;databaseName=Service_masini;encrypt=true;trustServerCertificate=true;", "springbootapp", "springbootapp");
            PreparedStatement preparedStatement = conn.prepareStatement("select s.* from Servicii s where s.Nume = ? and s.Pret = ?");
            preparedStatement.setString(1, nume);
            preparedStatement.setBigDecimal(2, pret);

            ResultSet rs = preparedStatement.executeQuery();

            serviciu = mapResultSetToServiciu(rs).get(0);

            conn.close();
        } catch (SQLException ignored) {
        }
        return serviciu;
    }

    public void updateServiciu(String nume,
                               BigDecimal pret,
                               Integer serviciu_id) {
        Connection conn = null;
        try {
            conn = DriverManager.getConnection("jdbc:sqlserver://localhost:51759;databaseName=Service_masini;encrypt=true;trustServerCertificate=true;", "springbootapp", "springbootapp");
            PreparedStatement preparedStatement = conn.prepareStatement(
                    "update Servicii set Nume = ?, Pret_unitate = ? where Serviciu_ID = ?");
            preparedStatement.setString(1, nume);
            preparedStatement.setBigDecimal(2, pret);
            preparedStatement.setInt(3, serviciu_id);

            preparedStatement.execute();

            conn.close();
        } catch (SQLException ignored) {
        }
    }

    public List<ProgServDto> selectByPretAndDate(BigDecimal pret, Integer nrLocLucru) {
        List<ProgServDto> programari = null;
        Connection conn = null;
        try {
            conn = DriverManager.getConnection("jdbc:sqlserver://localhost:51759;databaseName=Service_masini;encrypt=true;trustServerCertificate=true;", "springbootapp", "springbootapp");

            PreparedStatement preparedStatement = conn.prepareStatement("select s.Nume, s.Pret_unitate, p.Data_programare, p.Ora_programare, p.Nr_loc_lucru " +
                                                                            "from Servicii s " +
                                                                            "join Programari_Servicii ps on s.Serviciu_ID = ps.Serviciu_ID " +
                                                                            "join Programari p on ps.Programare_ID = p.Programare_ID " +
                                                                            "where s.Pret_unitate >= ? and p.Nr_loc_lucru = ? ");
            preparedStatement.setBigDecimal(1, pret);
            preparedStatement.setInt(2, nrLocLucru);
            ResultSet rs = preparedStatement.executeQuery();

            programari = mapResultByPretAndData(rs);

            conn.close();
        } catch (SQLException ignored) {
        }
        return programari;
    }

    public List<ProgServDto> mapResultByPretAndData(ResultSet rs) {
        List<ProgServDto> programari = new ArrayList<>();
        try {
            while (rs.next()) {
                ProgServDto programare = new ProgServDto();

                programare.setNume(rs.getString("Nume"));
                programare.setPretUnitate(rs.getBigDecimal("Pret_unitate"));
                programare.setDataProgramare(rs.getDate("Data_programare").toLocalDate());
                programare.setOraProgramare(rs.getTime("Ora_programare").toLocalTime());
                programare.setNrLocLucru(rs.getInt("Nr_loc_lucru"));

                programari.add(programare);
            }
        } catch (SQLException ignored) {
        }
        return programari;
    }

    public List<ServiciuPrimDto> selectByPret() {
        List<ServiciuPrimDto> autoturisme = null;
        Connection conn = null;
        try {
            conn = DriverManager.getConnection("jdbc:sqlserver://localhost:51759;databaseName=Service_masini;encrypt=true;trustServerCertificate=true;", "springbootapp", "springbootapp");
            Statement statement = conn.createStatement();
            ResultSet rs = statement.executeQuery("select s.Nume, s.pret_unitate " +
                                                    "from Servicii s " +
                                                    "join Programari_Servicii ps on s.Serviciu_ID = ps.Serviciu_ID " +
                                                    "where s.Pret_unitate in (select max(ps.Pret) from Programari_Servicii as ps )");

            autoturisme = mapResultToServvv(rs);

            conn.close();
        } catch (SQLException ignored) {
        }
        return autoturisme;
    }

    public List<ServiciuPrimDto> mapResultToServvv(ResultSet rs) {
        List<ServiciuPrimDto> programari = new ArrayList<>();
        try {
            while (rs.next()) {
                ServiciuPrimDto programare = new ServiciuPrimDto();

                programare.setNume(rs.getString("Nume"));
                programare.setPretUnitate(rs.getBigDecimal("Pret_unitate"));

                programari.add(programare);
            }
        } catch (SQLException ignored) {
        }
        return programari;
    }
}
