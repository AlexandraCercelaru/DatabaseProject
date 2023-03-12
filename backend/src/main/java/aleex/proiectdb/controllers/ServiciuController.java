package aleex.proiectdb.controllers;

import aleex.proiectdb.dtos.AutoProgDto;
import aleex.proiectdb.dtos.ProgServDto;
import aleex.proiectdb.dtos.ServiciuDto;
import aleex.proiectdb.dtos.ServiciuPrimDto;
import aleex.proiectdb.repositories.MyServiciuRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@Transactional
@RestController
@RequestMapping("/servicii")
@RequiredArgsConstructor
public class ServiciuController {
    private final MyServiciuRepository myServiciuRepository;

    @GetMapping("/all")
    public List<ServiciuDto> getAll() {
        return myServiciuRepository
                .selectAll()
                .stream()
                .map(serviciu -> {
                    ServiciuDto serviciuDto = new ServiciuDto();
                    BeanUtils.copyProperties(serviciu, serviciuDto);
                    return serviciuDto;
                })
                .collect(Collectors.toList());
    }

    @PostMapping("/update")
    public void update(@RequestBody ServiciuDto serviciuDto) {

        myServiciuRepository.updateServiciu(serviciuDto.getNume(), serviciuDto.getPretUnitate(), serviciuDto.getServiciuId());
    }

    @GetMapping("/{pret}/{nrLocLucru}")
    public List<ProgServDto> viewServicii(@PathVariable BigDecimal pret,
                                          @PathVariable Integer nrLocLucru) {
        return myServiciuRepository
                .selectByPretAndDate(pret, nrLocLucru)
                .stream()
                .map(serviciu -> {
                    ProgServDto progServDto = new ProgServDto();
                    BeanUtils.copyProperties(serviciu, progServDto);
                    return progServDto;
                })
                .collect(Collectors.toList());
    }

    @GetMapping("/multe")
    public List<ServiciuPrimDto> viewServiciitoAll() {
        return myServiciuRepository
                .selectByPret()
                .stream()
                .map(serviciu -> {
                    ServiciuPrimDto progServDto = new ServiciuPrimDto();
                    BeanUtils.copyProperties(serviciu, progServDto);
                    return progServDto;
                })
                .collect(Collectors.toList());
    }

}
