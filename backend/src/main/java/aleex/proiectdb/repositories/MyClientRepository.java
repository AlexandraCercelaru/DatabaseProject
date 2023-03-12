package aleex.proiectdb.repositories;

import aleex.proiectdb.dtos.AngajatProgDto;
import aleex.proiectdb.dtos.AutoClientDto;
import aleex.proiectdb.dtos.ClientDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Component;

import java.sql.*;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Component
public class MyClientRepository {

    public List<ClientDto> selectAll() {
        List<ClientDto> clienti = null;
        Connection conn = null;
        try {
            conn = DriverManager.getConnection("jdbc:sqlserver://localhost:51759;databaseName=Service_masini;encrypt=true;trustServerCertificate=true;", "springbootapp", "springbootapp");
            Statement statement = conn.createStatement();
            ResultSet rs = statement.executeQuery("select * from Clienti");

            clienti = mapResultSetToClient(rs);

            conn.close();
        } catch (SQLException ignored) {
        }
        return clienti;
    }

    public ClientDto loginUser(String email, String parola) {
        ClientDto client = null;
        Connection conn = null;
        try {
            conn = DriverManager.getConnection("jdbc:sqlserver://localhost:51759;databaseName=Service_masini;encrypt=true;trustServerCertificate=true;", "springbootapp", "springbootapp");
            PreparedStatement preparedStatement = conn.prepareStatement("select c.* from Clienti c where c.Email = ? and c.Parola = ?");
            preparedStatement.setString(1, email);
            preparedStatement.setString(2, parola);

            ResultSet rs = preparedStatement.executeQuery();

            client = mapResultSetToClient(rs).get(0);

            conn.close();
        } catch (SQLException ignored) {
        }
        return client;
    }

    public void signUpUser(String nume,
                           String prenume,
                           String cnp,
                           String serie,
                           Integer numar,
                           String adresa,
                           String email,
                           String parola) {
        Connection conn = null;
        try {
            conn = DriverManager.getConnection("jdbc:sqlserver://localhost:51759;databaseName=Service_masini;encrypt=true;trustServerCertificate=true;", "springbootapp", "springbootapp");
            PreparedStatement preparedStatement = conn.prepareStatement(
                    "insert into Clienti (Nume, Prenume, CNP, Serie, Numar, Adresa, Email, Parola)" +
                        "values (?, ?, ?, ?, ?, ?, ?, ?)");
            preparedStatement.setString(1, nume);
            preparedStatement.setString(2, prenume);
            preparedStatement.setString(3, cnp);
            preparedStatement.setString(4, serie);
            preparedStatement.setInt(5, numar);
            preparedStatement.setString(6, adresa);
            preparedStatement.setString(7, email);
            preparedStatement.setString(8, parola);

            preparedStatement.execute();

            conn.close();
        } catch (SQLException ignored) {
        }
    }

    public void deleteClient(String cnp) {
        Connection conn = null;
        try {
            conn = DriverManager.getConnection("jdbc:sqlserver://localhost:51759;databaseName=Service_masini;encrypt=true;trustServerCertificate=true;", "springbootapp", "springbootapp");
            PreparedStatement preparedStatement = conn.prepareStatement(
                    "delete from Clienti where CNP = ?");
            preparedStatement.setString(1, cnp);

            preparedStatement.execute();

            conn.close();
        } catch (SQLException e) {
            log.error(e.getMessage(), e);
        }
    }

    public List<ClientDto> mapResultSetToClient(ResultSet rs) {
        List<ClientDto> clienti = new ArrayList<>();
        try {
            while (rs.next()) {
                ClientDto client = new ClientDto();

                client.setClientId(rs.getInt("Client_ID"));
                client.setNume(rs.getString("Nume"));
                client.setPrenume(rs.getString("Prenume"));
                client.setCnp(rs.getString("cnp"));
                client.setSerie(rs.getString("serie"));
                client.setNumar(rs.getInt("numar"));
                client.setAdresa(rs.getString("adresa"));
                client.setEmail(rs.getString("email"));
                client.setParola(rs.getString("parola"));

                clienti.add(client);
            }
        } catch (SQLException ignored) {
        }
        return clienti;
    }

    public List<AutoClientDto> selectByModel(String model) {
        List<AutoClientDto> clienti = null;
        Connection conn = null;
        try {
            conn = DriverManager.getConnection("jdbc:sqlserver://localhost:51759;databaseName=Service_masini;encrypt=true;trustServerCertificate=true;sendTimeAsDateTime=false;", "springbootapp", "springbootapp");

            PreparedStatement preparedStatement = conn.prepareStatement("select c.Nume, c.Prenume, a.Marca, a.Model, a.Serie_sasiu " +
                                                                            "from Clienti c " +
                                                                            "join Autoturisme a on a.Client_ID = c.Client_ID " +
                                                                            "where a.Model = ? ");
            preparedStatement.setString(1, model);
            ResultSet rs = preparedStatement.executeQuery();

            clienti = mapResultByModel(rs);

            conn.close();
        } catch (SQLException e) {
        }
        return clienti;
    }

    public List<AutoClientDto> mapResultByModel(ResultSet rs) {
        List<AutoClientDto> clienti = new ArrayList<>();
        try {
            while (rs.next()) {
                AutoClientDto client = new AutoClientDto();

                client.setNume(rs.getString("Nume"));
                client.setPrenume(rs.getString("Prenume"));
                client.setMarca(rs.getString("Marca"));
                client.setModel(rs.getString("Model"));
                client.setSerieSasiu(rs.getString("Serie_sasiu"));

                clienti.add(client);
            }
        } catch (SQLException ignored) {
        }
        return clienti;
    }

}
