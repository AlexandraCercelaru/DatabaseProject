package aleex.proiectdb.repositories;

import aleex.proiectdb.dtos.AngajatDto;
import aleex.proiectdb.dtos.AngajatProgDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;
@Slf4j
@Component
public class MyAngajatRepository {

    public List<AngajatDto> selectAll() {
        List<AngajatDto> angajati = null;
        Connection conn = null;
        try {
            conn = DriverManager.getConnection("jdbc:sqlserver://localhost:51759;databaseName=Service_masini;encrypt=true;trustServerCertificate=true;", "springbootapp", "springbootapp");
            Statement statement = conn.createStatement();
            ResultSet rs = statement.executeQuery("select * from Angajati");

            angajati = mapResultSetToAngajat(rs);

            conn.close();
        } catch (SQLException ignored) {
        }
        return angajati;
    }

    public List<AngajatDto> mapResultSetToAngajat(ResultSet rs) {
        List<AngajatDto> angajati = new ArrayList<>();
        try {
            while (rs.next()) {
                AngajatDto angajat = new AngajatDto();

                angajat.setAngajatId(rs.getInt("Angajat_ID"));
                angajat.setNume(rs.getString("Nume"));
                angajat.setPrenume(rs.getString("Prenume"));
                angajat.setDataNastere(rs.getDate("Data_nastere").toLocalDate());
                angajat.setCnp(rs.getString("CNP"));
                angajat.setSerie(rs.getString("Serie"));
                angajat.setNumar(rs.getInt("Numar"));
                angajat.setAdresa(rs.getString("Adresa"));
                angajat.setDataAngajare(rs.getDate("Data_angajare").toLocalDate());

                angajati.add(angajat);
            }
        } catch (SQLException ignored) {
        }
        return angajati;
    }

    public void addAngajat(
            String nume,
            String prenume,
            LocalDate dataNastere,
            String cnp,
            String serie,
            Integer numar,
            String adresa,
            LocalDate dataAngajare) {
        Connection conn = null;
        try {
            conn = DriverManager.getConnection("jdbc:sqlserver://localhost:51759;databaseName=Service_masini;encrypt=true;trustServerCertificate=true;", "springbootapp", "springbootapp");
            PreparedStatement preparedStatement = conn.prepareStatement(
                    "insert into Angajati (Nume, Prenume, Data_nastere, CNP, Serie, Numar, Adresa, Data_angajare)" +
                            "values (?, ?, ?, ?, ?, ?,?,?)");
            preparedStatement.setString(1, nume);
            preparedStatement.setString(2, prenume);
            preparedStatement.setDate(3, Date.valueOf(dataNastere));
            preparedStatement.setString(4, cnp);
            preparedStatement.setString(5, serie);
            preparedStatement.setInt(6, numar);
            preparedStatement.setString(7, adresa);
            preparedStatement.setDate(8, Date.valueOf(dataAngajare));

            preparedStatement.execute();

            conn.close();
        } catch (SQLException e) {
            log.error(e.getMessage(), e);
        }
    }

    public void deleteAngajat(String cnp) {
        Connection conn = null;
        try {
            conn = DriverManager.getConnection("jdbc:sqlserver://localhost:51759;databaseName=Service_masini;encrypt=true;trustServerCertificate=true;", "springbootapp", "springbootapp");
            PreparedStatement preparedStatement = conn.prepareStatement(
                    "delete from Angajati where CNP = ?");
            preparedStatement.setString(1, cnp);

            preparedStatement.execute();

            conn.close();
        } catch (SQLException e) {
            log.error(e.getMessage(), e);
        }
    }

    public List<AngajatProgDto> selectByDateAndTime(LocalDate data, LocalTime ora) {
        List<AngajatProgDto> angajati = null;
        Connection conn = null;
        try {
            conn = DriverManager.getConnection("jdbc:sqlserver://localhost:51759;databaseName=Service_masini;encrypt=true;trustServerCertificate=true;sendTimeAsDateTime=false;", "springbootapp", "springbootapp");

            PreparedStatement preparedStatement = conn.prepareStatement("select a.Nume, a.Prenume, p.Data_programare, p.Ora_programare " +
                                                                            "from Angajati a " +
                                                                            "JOIN Programari p on a.Angajat_ID = p.Angajat_ID " +
                                                                            "where p.Data_programare = ? and p.Ora_programare = ?");
            preparedStatement.setDate(1, Date.valueOf(data));
            preparedStatement.setTime(2, Time.valueOf(ora));
            ResultSet rs = preparedStatement.executeQuery();

            angajati = mapResultByDateAndTime(rs);

            conn.close();
        } catch (SQLException e) {
        }
        return angajati;
    }

    public List<AngajatProgDto> mapResultByDateAndTime(ResultSet rs) {
        List<AngajatProgDto> angajati = new ArrayList<>();
        try {
            while (rs.next()) {
                AngajatProgDto angajat = new AngajatProgDto();

                angajat.setNume(rs.getString("Nume"));
                angajat.setPrenume(rs.getString("Prenume"));
                angajat.setDataProgramare(rs.getDate("Data_programare").toLocalDate());
                angajat.setOraProgramare(rs.getTime("Ora_programare").toLocalTime());

                angajati.add(angajat);
            }
        } catch (SQLException ignored) {
        }
        return angajati;
    }

}
