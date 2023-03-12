package aleex.proiectdb.controllers;

import aleex.proiectdb.dtos.AutoProgDto;
import aleex.proiectdb.dtos.ProgServiciuDto;
import aleex.proiectdb.dtos.ProgramareDto;
import aleex.proiectdb.repositories.MyProgramareRepository;
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
@RequestMapping("/programari")
@RequiredArgsConstructor
public class ProgramareController {
    private final MyProgramareRepository myProgramareRepository;

    @GetMapping("/all")
    public List<ProgramareDto> getAll() {
        return myProgramareRepository
                .selectAll()
                .stream()
                .map(programare -> {
                    ProgramareDto programareDto = new ProgramareDto();
                    BeanUtils.copyProperties(programare, programareDto);
                    return programareDto;
                })
                .collect(Collectors.toList());
    }

    @PostMapping("/add")
    public void addProgram(@RequestBody ProgramareDto programareDto) {

        myProgramareRepository.addProgramare(
                programareDto.getAutoturismId(),
                programareDto.getAngajatId(),
                programareDto.getDataProgramare(),
                programareDto.getNrLocLucru(),
                programareDto.getNotaClient(),
                programareDto.getOraProgramare()
        );
    }

    @GetMapping("/by-pet/{pret}")
    public List<ProgServiciuDto> viewProgramariServicii(@PathVariable BigDecimal pret) {
        return myProgramareRepository
                .selectByPret(pret)
                .stream()
                .map(programare -> {
                    ProgServiciuDto progServiciuDto = new ProgServiciuDto();
                    BeanUtils.copyProperties(programare, progServiciuDto);
                    return progServiciuDto;
                })
                .collect(Collectors.toList());
    }

}
