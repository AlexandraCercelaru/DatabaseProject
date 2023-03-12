package aleex.proiectdb.repositories;

import aleex.proiectdb.dtos.*;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.time.LocalDate;
import java.util.ArrayList;
import java.util.List;

@Component
public class MyAutoturismRepository {

    public List<AutoturismDto> selectAll() {
        List<AutoturismDto> autoturisme = null;
        Connection conn = null;
        try {
            conn = DriverManager.getConnection("jdbc:sqlserver://localhost:51759;databaseName=Service_masini;encrypt=true;trustServerCertificate=true;", "springbootapp", "springbootapp");
            Statement statement = conn.createStatement();
            ResultSet rs = statement.executeQuery("select * from Autoturisme");

            autoturisme = mapResultSetToAutoturism(rs);

            conn.close();
        } catch (SQLException ignored) {
        }
        return autoturisme;
    }

    public List<AutoturismDto> mapResultSetToAutoturism(ResultSet rs) {
        List<AutoturismDto> autoturisme = new ArrayList<>();
        try {
            while (rs.next()) {
                AutoturismDto autoturism = new AutoturismDto();

                autoturism.setAutoturismId(rs.getInt("Autoturism_ID"));
                autoturism.setClientId(rs.getInt("Client_ID"));
                autoturism.setMarca(rs.getString("Marca"));
                autoturism.setModel(rs.getString("Model"));
                autoturism.setSerieSasiu(rs.getString("Serie_sasiu"));

                autoturisme.add(autoturism);
            }
        } catch (SQLException ignored) {
        }
        return autoturisme;
    }

    public List<AutoClientDto> selectByClientId(Integer clientId) {
        List<AutoClientDto> autoturisme = null;
        Connection conn = null;
        try {
            conn = DriverManager.getConnection("jdbc:sqlserver://localhost:51759;databaseName=Service_masini;encrypt=true;trustServerCertificate=true;", "springbootapp", "springbootapp");

            PreparedStatement preparedStatement = conn.prepareStatement("select c.Nume, c.Prenume, a.Marca, a.Model, a.Serie_sasiu " +
                                                                            "from Autoturisme a " +
                                                                            "JOIN Clienti c on a.Client_ID = c.Client_ID " +
                                                                            "where a.Client_ID = ?");
            preparedStatement.setInt(1, clientId);
            ResultSet rs = preparedStatement.executeQuery();

            autoturisme = mapResult(rs);

            conn.close();
        } catch (SQLException ignored) {
        }
        return autoturisme;
    }

    public List<AutoClientDto> mapResult(ResultSet rs) {
        List<AutoClientDto> autoturisme = new ArrayList<>();
        try {
            while (rs.next()) {
                AutoClientDto autoturism = new AutoClientDto();

                autoturism.setNume(rs.getString("Nume"));
                autoturism.setPrenume(rs.getString("Prenume"));
                autoturism.setMarca(rs.getString("Marca"));
                autoturism.setModel(rs.getString("Model"));
                autoturism.setSerieSasiu(rs.getString("Serie_sasiu"));

                autoturisme.add(autoturism);
            }
        } catch (SQLException ignored) {
        }
        return autoturisme;
    }

    public List<AutoProgDto> selectByDate(LocalDate data) {
        List<AutoProgDto> autoturisme = null;
        Connection conn = null;
        try {
            conn = DriverManager.getConnection("jdbc:sqlserver://localhost:51759;databaseName=Service_masini;encrypt=true;trustServerCertificate=true;", "springbootapp", "springbootapp");

            PreparedStatement preparedStatement = conn.prepareStatement("select a.Marca, a.Model, a.Serie_sasiu, p.Data_programare, p.Nr_loc_lucru, p.Nota_client, p.Ora_programare " +
                                                                            "from Autoturisme a " +
                                                                            "JOIN Programari p on a.Autoturism_ID = p.Autoturism_ID " +
                                                                            "where p.Data_programare = ?");
            preparedStatement.setDate(1, Date.valueOf(data));
            ResultSet rs = preparedStatement.executeQuery();

            autoturisme = mapResultByDate(rs);

            conn.close();
        } catch (SQLException ignored) {
        }
        return autoturisme;
    }

    public List<AutoProgDto> mapResultByDate(ResultSet rs) {
        List<AutoProgDto> autoturisme = new ArrayList<>();
        try {
            while (rs.next()) {
                AutoProgDto autoturism = new AutoProgDto();

                autoturism.setMarca(rs.getString("Marca"));
                autoturism.setModel(rs.getString("Model"));
                autoturism.setSerieSasiu(rs.getString("Serie_sasiu"));
                autoturism.setDataProgramare(rs.getDate("Data_programare").toLocalDate());
                autoturism.setNrLocLucru(rs.getInt("Nr_loc_lucru"));
                autoturism.setNotaClient(rs.getString("Nota_client"));
                autoturism.setOraProgramare(rs.getTime("Ora_programare").toLocalTime());

                autoturisme.add(autoturism);
            }
        } catch (SQLException ignored) {
        }
        return autoturisme;
    }

    public List<AutoMultDto> selectAutoturism() {
        List<AutoMultDto> autoturisme = null;
        Connection conn = null;
        try {
            conn = DriverManager.getConnection("jdbc:sqlserver://localhost:51759;databaseName=Service_masini;encrypt=true;trustServerCertificate=true;", "springbootapp", "springbootapp");
            Statement statement = conn.createStatement();
            ResultSet rs = statement.executeQuery("select top 1 a.Marca, a.Model, a.Serie_sasiu, ap.NumarProg " +
                                                    "from Autoturisme a " +
                                                    "JOIN ( " +
                                                    "select p2.Autoturism_ID, count(p2.Autoturism_ID) as NumarProg " +
                                                    "from Programari p2 " +
                                                    "group by p2.Autoturism_ID " +
                                                    ") ap " +
                                                    "on a.Autoturism_ID = ap.Autoturism_ID " +
                                                    "order by ap.NumarProg DESC");

            autoturisme = mapResultToAutoturism(rs);

            conn.close();
        } catch (SQLException ignored) {
        }
        return autoturisme;
    }

    public List<AutoMultDto> mapResultToAutoturism(ResultSet rs) {
        List<AutoMultDto> autoturisme = new ArrayList<>();
        try {
            while (rs.next()) {
                AutoMultDto autoturism = new AutoMultDto();

                autoturism.setMarca(rs.getString("Marca"));
                autoturism.setModel(rs.getString("Model"));
                autoturism.setSerieSasiu(rs.getString("Serie_sasiu"));
                autoturism.setNumarProg(rs.getInt("NumarProg"));

                autoturisme.add(autoturism);
            }
        } catch (SQLException ignored) {
        }
        return autoturisme;
    }

    public List<AutoturismQC> selectAutoturismWithAngajati(String adresa) {
        List<AutoturismQC> autoturisme = null;
        Connection conn = null;
        try {
            conn = DriverManager.getConnection("jdbc:sqlserver://localhost:51759;databaseName=Service_masini;encrypt=true;trustServerCertificate=true;", "springbootapp", "springbootapp");

            PreparedStatement preparedStatement = conn.prepareStatement("select a.Marca, a.Model, a.Serie_sasiu, c.Nume, c.Prenume, s.Nume, s.Pret_unitate from Autoturisme a " +
                                                                            "join Clienti c on a.Client_ID = c.Client_ID " +
                                                                            "join Programari p on a.Autoturism_ID = p.Autoturism_ID " +
                                                                            "join Programari_Servicii ps on p.Programare_ID = ps.Programare_ID " +
                                                                            "join Servicii s on ps.Serviciu_ID = s.Serviciu_ID " +
                                                                            "where p.Angajat_ID in (select Angajat_ID from Angajati " +
                                                                            "where Adresa = ?)");
            preparedStatement.setString(1, adresa);
            ResultSet rs = preparedStatement.executeQuery();

            autoturisme = mapResultToAutoturismwithAngajati(rs);

            conn.close();
        } catch (SQLException ignored) {
        }
        return autoturisme;
    }

    public List<AutoturismQC> mapResultToAutoturismwithAngajati(ResultSet rs) {
        List<AutoturismQC> autoturisme = new ArrayList<>();
        try {
            while (rs.next()) {
                AutoturismQC autoturism = new AutoturismQC();

                autoturism.setMarca(rs.getString("Marca"));
                autoturism.setModel(rs.getString("Model"));
                autoturism.setSerieSasiu(rs.getString("Serie_sasiu"));
                autoturism.setNume(rs.getString("Nume"));
                autoturism.setPrenume(rs.getString("Prenume"));
                autoturism.setNumeServiciu(rs.getString("Nume"));
                autoturism.setPretUnitate(rs.getBigDecimal("Pret_unitate"));

                autoturisme.add(autoturism);
            }
        } catch (SQLException ignored) {
        }
        return autoturisme;
    }
}
