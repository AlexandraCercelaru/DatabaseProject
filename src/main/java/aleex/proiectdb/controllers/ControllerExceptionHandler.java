package aleex.proiectdb.controllers;

import aleex.proiectdb.dtos.ResponseDto;
import aleex.proiectdb.exceptions.BadRequestException;
import aleex.proiectdb.exceptions.InternalServerException;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Slf4j
//@ControllerAdvice
public class ControllerExceptionHandler {

    @ExceptionHandler(value = {RuntimeException.class})
    public ResponseEntity<ResponseDto> runtimeException(RuntimeException e) {
        log.error(e.getMessage());
        return new ResponseEntity<>(new ResponseDto("A aparut o eroare la nivelul serverului!"), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(value = {InternalServerException.class})
    public ResponseEntity<ResponseDto> internalServerException(InternalServerException e) {
        log.error(e.getMessage());
        return new ResponseEntity<>(new ResponseDto(e.getMessage()), HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @ExceptionHandler(value = {BadRequestException.class})
    public ResponseEntity<ResponseDto> badRequestException(BadRequestException e) {
        log.error(e.getMessage());
        return new ResponseEntity<>(new ResponseDto(e.getMessage()), HttpStatus.BAD_REQUEST);
    }

}
