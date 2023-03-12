package aleex.proiectdb.controllers;

import aleex.proiectdb.dtos.*;
import aleex.proiectdb.repositories.MyClientRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@Transactional
@RestController
@RequestMapping("/clienti")
@RequiredArgsConstructor
public class ClientController {
    private final MyClientRepository myClientRepository;

    @GetMapping("/all")
    public List<ClientDto> getAll() {
        return myClientRepository
                .selectAll()
                .stream()
                .map(client -> {
                    ClientDto clientDto = new ClientDto();
                    BeanUtils.copyProperties(client, clientDto);
                    return clientDto;
                })
                .collect(Collectors.toList());
    }

    @PostMapping("/sign-up")
    public void signUp(@RequestBody SignUpDto signUpDto) {

        myClientRepository.signUpUser(
                signUpDto.getNume(),
                signUpDto.getPrenume(),
                signUpDto.getCnp(),
                signUpDto.getSerie(),
                signUpDto.getNumar(),
                signUpDto.getAdresa(),
                signUpDto.getEmail(),
                signUpDto.getParola()
        );
    }

    @PostMapping("/login")
    public ResponseDto login(@RequestBody LoginDto loginDto) {

        ClientDto client = myClientRepository.loginUser(loginDto.getEmail(),loginDto.getParola());
        if(client != null)
            return new ResponseDto("Te-ai logat cu succes");
        else
            return new ResponseDto("Eroare la logare");
    }

    @DeleteMapping("/{cnp}")
    public void deleteClient(@PathVariable String cnp) {
        myClientRepository.deleteClient(cnp);
    }

    @GetMapping("/{model}")
    public List<AutoClientDto> viewClienti(@PathVariable String model) {
        return myClientRepository
                .selectByModel(model)
                .stream()
                .map(client -> {
                    AutoClientDto autoClientDto = new AutoClientDto();
                    BeanUtils.copyProperties(client, autoClientDto);
                    return autoClientDto;
                })
                .collect(Collectors.toList());
    }

}
