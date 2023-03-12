package aleex.proiectdb.controllers;

import aleex.proiectdb.dtos.AngajatDto;
import aleex.proiectdb.dtos.AngajatProgDto;
import aleex.proiectdb.dtos.AutoProgDto;
import aleex.proiectdb.dtos.ProgramareDto;
import aleex.proiectdb.repositories.MyAngajatRepository;
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
@RequestMapping("/angajati")
@RequiredArgsConstructor
public class AngajatController {
    private final MyAngajatRepository myAngajatRepository;

    @GetMapping("/all")
    public List<AngajatDto> getAll() {
        return myAngajatRepository
                .selectAll()
                .stream()
                .map(angajat -> {
                    AngajatDto angajatDto = new AngajatDto();
                    BeanUtils.copyProperties(angajat, angajatDto);
                    return angajatDto;
                })
                .collect(Collectors.toList());
    }

    @PostMapping("/add")
    public void addAngajat(@RequestBody AngajatDto angajatDto) {

        myAngajatRepository.addAngajat(
                angajatDto.getNume(),
                angajatDto.getPrenume(),
                angajatDto.getDataNastere(),
                angajatDto.getCnp(),
                angajatDto.getSerie(),
                angajatDto.getNumar(),
                angajatDto.getAdresa(),
                angajatDto.getDataAngajare()
        );
    }

    @DeleteMapping("/{cnp}")
    public void deleteAngajat(@PathVariable String cnp) {
        myAngajatRepository.deleteAngajat(cnp);
    }

    @GetMapping("/by-date/{data}/{ora}")
    public List<AngajatProgDto> viewAngajatiWithDateAndTime(@PathVariable @DateTimeFormat(pattern = "yyyy-MM-dd") LocalDate data,
                                                            @PathVariable String ora) {
        return myAngajatRepository
                .selectByDateAndTime(data, LocalTime.parse(ora))
                .stream()
                .map(angajat -> {
                    AngajatProgDto angajatProgDto = new AngajatProgDto();
                    BeanUtils.copyProperties(angajat, angajatProgDto);
                    return angajatProgDto;
                })
                .collect(Collectors.toList());
    }

}
