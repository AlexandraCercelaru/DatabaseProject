package aleex.proiectdb.repositories;

import aleex.proiectdb.dtos.AngajatProgDto;
import aleex.proiectdb.dtos.Comanda2Dto;
import aleex.proiectdb.dtos.Comanda3Dto;
import aleex.proiectdb.dtos.ComandaDto;
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
public class MyComandaRepository {

    public List<ComandaDto> selectAll() {
        List<ComandaDto> comenzi = null;
        Connection conn = null;
        try {
            conn = DriverManager.getConnection("jdbc:sqlserver://localhost:51759;databaseName=Service_masini;encrypt=true;trustServerCertificate=true;", "springbootapp", "springbootapp");
            Statement statement = conn.createStatement();
            ResultSet rs = statement.executeQuery("select * from Comenzi");

            comenzi = mapResultSetToComenzi(rs);

            conn.close();
        } catch (SQLException ignored) {
        }
        return comenzi;
    }

    public List<ComandaDto> mapResultSetToComenzi(ResultSet rs) {
        List<ComandaDto> comenzi = new ArrayList<>();
        try {
            while (rs.next()) {
                ComandaDto comanda = new ComandaDto();

                comanda.setComandaId(rs.getInt("Comanda_ID"));
                comanda.setProgramareId(rs.getInt("Programare_ID"));
                comanda.setCantitate(rs.getInt("Cantitate"));
                comanda.setPretUnitate(rs.getBigDecimal("Pret_unitate"));
                comanda.setObservatii(rs.getString("Observatii"));

                comenzi.add(comanda);
            }
        } catch (SQLException ignored) {
        }
        return comenzi;
    }

    public void deleteComanda(Integer cantitate, BigDecimal pret) {
        Connection conn = null;
        try {
            conn = DriverManager.getConnection("jdbc:sqlserver://localhost:51759;databaseName=Service_masini;encrypt=true;trustServerCertificate=true;", "springbootapp", "springbootapp");
            PreparedStatement preparedStatement = conn.prepareStatement(
                    "delete from Comenzi where Cantitate = ? and Pret_unitate = ?");
            preparedStatement.setInt(1, cantitate);
            preparedStatement.setBigDecimal(2, pret);

            preparedStatement.execute();

            conn.close();
        } catch (SQLException e) {
            log.error(e.getMessage(), e);
        }
    }

    public void updateComanda(Integer cantitate,
                               BigDecimal pret,
                               String observatii,
                               Integer comanda_id,
                              Integer programare_id) {
        Connection conn = null;
        try {
            conn = DriverManager.getConnection("jdbc:sqlserver://localhost:51759;databaseName=Service_masini;encrypt=true;trustServerCertificate=true;", "springbootapp", "springbootapp");
            PreparedStatement preparedStatement = conn.prepareStatement(
                    "update Comenzi set Cantitate = ?, Pret_unitate = ?, Observatii = ? where Comanda_ID = ?");
            preparedStatement.setInt(1, cantitate);
            preparedStatement.setBigDecimal(2, pret);
            preparedStatement.setString(3, observatii);
            preparedStatement.setInt(4, comanda_id);

            preparedStatement.execute();

            conn.close();
        } catch (SQLException ignored) {
        }
    }

    public List<Comanda2Dto> selectByCantitate(Integer cantitate) {
        List<Comanda2Dto> comenzi = null;
        Connection conn = null;
        try {
            conn = DriverManager.getConnection("jdbc:sqlserver://localhost:51759;databaseName=Service_masini;encrypt=true;trustServerCertificate=true;", "springbootapp", "springbootapp");

            PreparedStatement preparedStatement = conn.prepareStatement("select c.Cantitate, c.Pret_unitate, c.Observatii from Comenzi c " +
                                                                            "JOIN ( " +
                                                                            "select top 1 count(Programare_ID) as NrComenziPerProg, Programare_ID as PG from Comenzi " +
                                                                            "group by Programare_ID " +
                                                                            "order by NrComenziPerProg ASC ) as a " +
                                                                            "on c.Programare_ID = a.PG " +
                                                                            "group by c.Cantitate, c.Pret_unitate, c.Observatii " +
                                                                            "having c.Cantitate > ? ");
            preparedStatement.setInt(1, cantitate);
            ResultSet rs = preparedStatement.executeQuery();

            comenzi = mapResultByCantitate(rs);

            conn.close();
        } catch (SQLException ignored) {
        }
        return comenzi;
    }

    public List<Comanda2Dto> mapResultByCantitate(ResultSet rs) {
        List<Comanda2Dto> comenzi = new ArrayList<>();
        try {
            while (rs.next()) {
                Comanda2Dto comanda = new Comanda2Dto();

                comanda.setCantitate(rs.getInt("Cantitate"));
                comanda.setPretUnitate(rs.getBigDecimal("Pret_unitate"));
                comanda.setObservatii(rs.getString("Observatii"));

                comenzi.add(comanda);
            }
        } catch (SQLException ignored) {
        }
        return comenzi;
    }

    public List<Comanda3Dto> selectByNumber(Integer numar) {
        List<Comanda3Dto> comenzi = null;
        Connection conn = null;
        try {
            conn = DriverManager.getConnection("jdbc:sqlserver://localhost:51759;databaseName=Service_masini;encrypt=true;trustServerCertificate=true;", "springbootapp", "springbootapp");

            PreparedStatement preparedStatement = conn.prepareStatement("select c.Nume, c.Prenume, a.Marca, a.Model, a.Serie_sasiu, b.NrComenzi " +
                                                                            "from Autoturisme a " +
                                                                            "join Clienti c on a.Client_ID = c.Client_ID " +
                                                                            "join ( select count(co.Comanda_ID) as NrComenzi, p.Autoturism_ID as Autoturism_ID " +
                                                                            "from Programari p " +
                                                                            "join Comenzi co on co.Programare_ID = p.Programare_ID " +
                                                                            "group by p.Autoturism_ID) as b on a.Autoturism_ID = b.Autoturism_ID " +
                                                                            "where b.NrComenzi > ?");
            preparedStatement.setInt(1, numar);
            ResultSet rs = preparedStatement.executeQuery();

            comenzi = mapResultByNumar(rs);

            conn.close();
        } catch (SQLException ignored) {
        }
        return comenzi;
    }

    public List<Comanda3Dto> mapResultByNumar(ResultSet rs) {
        List<Comanda3Dto> comenzi = new ArrayList<>();
        try {
            while (rs.next()) {
                Comanda3Dto comanda = new Comanda3Dto();

                comanda.setNume(rs.getString("Nume"));
                comanda.setPrenume(rs.getString("Prenume"));
                comanda.setMarca(rs.getString("Marca"));
                comanda.setModel(rs.getString("Model"));
                comanda.setSerieSasiu(rs.getString("Serie_sasiu"));
                comanda.setNumarComenzi(rs.getInt("NrComenzi"));

                comenzi.add(comanda);
            }
        } catch (SQLException ignored) {
        }
        return comenzi;
    }

}
