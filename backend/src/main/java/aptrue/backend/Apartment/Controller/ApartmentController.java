package aptrue.backend.Apartment.Controller;

import aptrue.backend.Apartment.Dto.ApartmentResponseDto;
import aptrue.backend.Apartment.Service.ApartmentService;
import aptrue.backend.Global.Code.SuccessCode;
import aptrue.backend.Global.ResultResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ApartmentController {
    private final ApartmentService apartmentService;

    @GetMapping("/apart")
    public ResponseEntity<?> getApartment(@RequestParam("aptId") int aptId, HttpServletRequest httpServletRequest) {
        ApartmentResponseDto apartmentResponseDto = apartmentService.getApart(aptId, httpServletRequest);
        ResultResponse resultResponse = ResultResponse.of(SuccessCode.APT_OK, apartmentResponseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

}