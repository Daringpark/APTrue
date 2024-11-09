package aptrue.backend.Admin.Controller;

import aptrue.backend.Admin.Dto.*;
import aptrue.backend.Admin.Entity.Admin;
import aptrue.backend.Admin.Repository.AdminRepository;
import aptrue.backend.Admin.Service.AdminService;
import aptrue.backend.Apartment.Entity.Apartment;
import aptrue.backend.Apartment.Repository.ApartmentRepository;
import aptrue.backend.Global.ResultResponse;
import aptrue.backend.Global.Code.SuccessCode;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Schema;
import io.swagger.v3.oas.annotations.responses.ApiResponse;
import io.swagger.v3.oas.annotations.responses.ApiResponses;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@Slf4j
@RestController
@RequiredArgsConstructor
@RequestMapping("/api")
public class AdminController {

    private final AdminService adminService;
    private final AdminRepository adminRepository;
    private final ApartmentRepository apartmentRepository;

    @PostMapping("/signup")
    public ResponseEntity<?> signup (@RequestBody SignupRequestDto signupRequestDto, HttpServletRequest httpServletRequest) {
        SignupResponseDto signupResponseDto = adminService.signup(signupRequestDto, httpServletRequest);
        ResultResponse resultResponse = ResultResponse.of(SuccessCode.SIGN_UP_OK, signupResponseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @PostMapping("/login")
    public ResponseEntity<?> login (@RequestBody LoginRequestDto loginRequestDto, HttpServletResponse httpServletResponse) {
        log.info("{}, {}", loginRequestDto.toString(), loginRequestDto.getPassword());
        LoginResponseDto loginResponseDto = adminService.login(loginRequestDto, httpServletResponse);
        ResultResponse resultResponse = ResultResponse.of(SuccessCode.LOGIN_OK, loginResponseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @GetMapping("/admin/list/{page}/{limit}")
    public ResponseEntity<?> adminList(HttpServletRequest httpServletRequest, @PathVariable int page, @PathVariable int limit) {
        List<AdminListResponseDto> adminListResponseDtos =adminService.getAdminList(httpServletRequest,page, limit);
        ResultResponse resultResponse = ResultResponse.of(SuccessCode.GET_ADMIN_LIST, adminListResponseDtos);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @DeleteMapping("/admin/{admin_id}")
    public ResponseEntity<?> deleteAdmin(HttpServletRequest httpServletRequest, @PathVariable int admin_id) {
        adminService.deleteAdmin(httpServletRequest, admin_id);
        ResultResponse resultResponse = ResultResponse.of(SuccessCode.DELETE_ADMIN, admin_id);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }


    @PostMapping("/superAdmin")
    @Operation(summary = "슈퍼 유저 회원가입 야호", description = "슈퍼 어드민 만드는 API")
    @ApiResponses(value = {
            @ApiResponse(responseCode = "200", description = "회원가입 성공",
                    content = @Content(mediaType = "application/json",
                            schema = @Schema(implementation = ResultResponse.class))),
            @ApiResponse(responseCode = "400", description = "에러")
    })
    public ResponseEntity<?> superAdmin (@RequestBody SuperAdminRequestDto superAdminRequestDto) {
        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();
        Apartment apart = Apartment.builder()
                .aptName(superAdminRequestDto.getAptName())
                .block(superAdminRequestDto.getBlock())
                .location(superAdminRequestDto.getLocation())
                .aptImg(superAdminRequestDto.getAptImg())
                .household(superAdminRequestDto.getHousehold())
                .build();
        apartmentRepository.save(apart);
        Admin admin = Admin.builder()
                .name(superAdminRequestDto.getName())
                .account(superAdminRequestDto.getAccount())
                .password(passwordEncoder.encode(superAdminRequestDto.getPassword()))
                .phone(superAdminRequestDto.getPhone())
                .isSuperAdmin(true)
                .createdAt(LocalDateTime.now())
                .apartment(apart)
                .build();
        adminRepository.save(admin);
        SignupResponseDto signupResponseDto = SignupResponseDto.builder()
                .adminID(admin.getAdminId())
                .account(admin.getAccount())
                .name(admin.getName())
                .build();
        ResultResponse resultResponse = ResultResponse.of(SuccessCode.SIGN_UP_SUPERUSER, signupResponseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }
}
