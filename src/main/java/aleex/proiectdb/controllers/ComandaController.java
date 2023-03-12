package aleex.proiectdb.controllers;

import aleex.proiectdb.dtos.*;
import aleex.proiectdb.entities.Comanda;
import aleex.proiectdb.repositories.MyComandaRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.BeanUtils;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.math.BigDecimal;
import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@CrossOrigin(origins = "http://localhost:3000")
@Transactional
@RestController
@RequestMapping("/comenzi")
@RequiredArgsConstructor
public class ComandaController {

    private final MyComandaRepository myComandaRepository;

    @GetMapping("/all")
    public List<ComandaDto> getAll() {
        return myComandaRepository
                .selectAll()
                .stream()
                .map(comanda -> {
                    ComandaDto comandaDto = new ComandaDto();
                    BeanUtils.copyProperties(comanda, comandaDto);
                    return comandaDto;
                })
                .collect(Collectors.toList());
    }

    @DeleteMapping("/{cantitate}/{pret}")
    public void deleteComanda(@PathVariable Integer cantitate,@PathVariable BigDecimal pret) {
        myComandaRepository.deleteComanda(cantitate,pret);
    }

    @PostMapping("/update")
    public void update(@RequestBody ComandaDto comandaDto) {

        myComandaRepository.updateComanda(comandaDto.getCantitate(), comandaDto.getPretUnitate(), comandaDto.getObservatii(), comandaDto.getComandaId(), comandaDto.getProgramareId());
    }

    @GetMapping("/by-cantitate/{cantitate}")
    public List<Comanda2Dto> viewComenzi(@PathVariable Integer cantitate) {
        return myComandaRepository
                .selectByCantitate(cantitate)
                .stream()
                .map(comanda -> {
                    Comanda2Dto comandaDto = new Comanda2Dto();
                    BeanUtils.copyProperties(comanda, comandaDto);
                    return comandaDto;
                })
                .collect(Collectors.toList());
    }

    @GetMapping("/by-numar/nr/{numar}")
    public List<Comanda3Dto> viewComenziwithAuto(@PathVariable Integer numar) {
        return myComandaRepository
                .selectByNumber(numar)
                .stream()
                .map(comanda -> {
                    Comanda3Dto comandaDto = new Comanda3Dto();
                    BeanUtils.copyProperties(comanda, comandaDto);
                    return comandaDto;
                })
                .collect(Collectors.toList());
    }

}
