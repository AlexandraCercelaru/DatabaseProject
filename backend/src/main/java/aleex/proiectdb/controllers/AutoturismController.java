package aleex.proiectdb.controllers;

import aleex.proiectdb.dtos.*;
import aleex.proiectdb.repositories.MyAutoturismRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@Transactional
@RestController
@RequestMapping("/autoturisme")
@RequiredArgsConstructor
public class AutoturismController {

    private final MyAutoturismRepository myAutoturismRepository;

    @GetMapping("/all")
    public List<AutoturismDto> getAll() {
        return myAutoturismRepository
                .selectAll()
                .stream()
                .map(autoturism -> {
                    AutoturismDto autoturismDto = new AutoturismDto();
                    BeanUtils.copyProperties(autoturism, autoturismDto);
                    return autoturismDto;
                })
                .collect(Collectors.toList());
    }


    @PostMapping("/add")
    public void addAuto(@RequestBody AutoturismDto autoturismDto) {

//        myClientRepository.signUpUser(
//                signUpDto.getNume(),
//                signUpDto.getPrenume(),
//                signUpDto.getCnp(),
//                signUpDto.getSerie(),
//                signUpDto.getNumar(),
//                signUpDto.getAdresa(),
//                signUpDto.getEmail(),
//                signUpDto.getParola()
//        );
    }

    @GetMapping("/{clientId}")
    public List<AutoClientDto> viewAutoturisme(@PathVariable Integer clientId) {
        return myAutoturismRepository
                .selectByClientId(clientId)
                .stream()
                .map(autoturism -> {
                    AutoClientDto autoClientDto = new AutoClientDto();
                    BeanUtils.copyProperties(autoturism, autoClientDto);
                    return autoClientDto;
                })
                .collect(Collectors.toList());
    }

    @GetMapping("/by-date/{data}")
    public List<AutoProgDto> viewAutoturismeWithDate(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate data) {
        return myAutoturismRepository
                .selectByDate(data)
                .stream()
                .map(autoturism -> {
                    AutoProgDto autoProgDto = new AutoProgDto();
                    BeanUtils.copyProperties(autoturism, autoProgDto);
                    return autoProgDto;
                })
                .collect(Collectors.toList());
    }

    @GetMapping("/multe")
    public List<AutoMultDto> viewAllAutoturisme() {
        return myAutoturismRepository
                .selectAutoturism()
                .stream()
                .map(autoturism -> {
                    AutoMultDto autoMultDto = new AutoMultDto();
                    BeanUtils.copyProperties(autoturism, autoMultDto);
                    return autoMultDto;
                })
                .collect(Collectors.toList());
    }

    @GetMapping("/query-complex/{adresa}")
    public List<AutoturismQC> viewAutoturismewithAngajati(@PathVariable String adresa) {
        return myAutoturismRepository
                .selectAutoturismWithAngajati(adresa)
                .stream()
                .map(autoturism -> {
                    AutoturismQC autoturismQC = new AutoturismQC();
                    BeanUtils.copyProperties(autoturism, autoturismQC);
                    return autoturismQC;
                })
                .collect(Collectors.toList());
    }

}
