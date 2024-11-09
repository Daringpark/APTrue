package aptrue.backend.Admin.Service;

import aptrue.backend.Admin.Dto.*;
import aptrue.backend.Global.Error.BusinessException;
import aptrue.backend.Global.Error.ErrorCode;
import aptrue.backend.Admin.Entity.Admin;
import aptrue.backend.Admin.Repository.AdminRepository;
import aptrue.backend.Global.Security.CustomAdminInfoDto;
import aptrue.backend.Global.Util.CookieUtil;
import aptrue.backend.Global.Util.JwtUtil;
import aptrue.backend.Redis.RedisService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.concurrent.TimeUnit;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class AdminServiceImpl implements AdminService {

    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;
    private final JwtUtil jwtUtil;
    private final CookieUtil cookieUtil;
    private final RedisService redisService;

    @Transactional
    public LoginResponseDto login(LoginRequestDto loginRequestDto, HttpServletResponse httpServletResponse) throws BadCredentialsException, UsernameNotFoundException {
        String account = loginRequestDto.getAccount();
        String password = loginRequestDto.getPassword();
        Admin admin = adminRepository.findByAccount(account).orElseThrow(
                () -> new BusinessException(ErrorCode.ADMIN_NOT_FOUND)
        );

        // 비밀번호 검증
        if (!passwordEncoder.matches(password, admin.getPassword())) {
            throw new BusinessException(ErrorCode.PASSWORD_DIFF);
        }

        CustomAdminInfoDto infoDto = CustomAdminInfoDto.builder()
                .adminId(admin.getAdminId())
                .account(admin.getAccount())
                .phone(admin.getPhone())
                .isSuperAdmin(false)
                .name(admin.getName())
                .password(admin.getPassword())
                .createdAt(admin.getCreatedAt())
                .build();

        String accessToken = jwtUtil.createAccessToken(infoDto);
        String refreshToken = jwtUtil.createRefreshToken(infoDto);

        Cookie accessTokenCookie = new Cookie("accessToken", accessToken);
        accessTokenCookie.setHttpOnly(true);
        accessTokenCookie.setSecure(true);
        accessTokenCookie.setPath("/");
        accessTokenCookie.setMaxAge(3600);

        String storedRefreshToken = redisService.getRefreshToken(admin.getAdminId());
        if (storedRefreshToken!=null) {
            redisService.deleteRefreshToken(admin.getAdminId());
        }

        Cookie refreshTokenCookie = new Cookie("refreshToken", refreshToken);
        refreshTokenCookie.setHttpOnly(true);
        refreshTokenCookie.setSecure(false);
        refreshTokenCookie.setPath("/");
        refreshTokenCookie.setMaxAge(604800);

        redisService.saveRefreshToken(String.valueOf(admin.getAdminId()), refreshToken, 7, TimeUnit.DAYS );

        httpServletResponse.addCookie(accessTokenCookie);
        httpServletResponse.addCookie(refreshTokenCookie);

        LoginResponseDto loginResponseDto = LoginResponseDto
                .builder()
                .adminID(admin.getAdminId())
                .account(admin.getAccount())
                .name(admin.getName())
                .isSuperAdmin(admin.isSuperAdmin())
                .build();
        return loginResponseDto;
    }

    @Transactional
    public SignupResponseDto signup(SignupRequestDto signupRequestDto, HttpServletRequest httpServletRequest){
        int superAdminId = cookieUtil.getAdminId(httpServletRequest);

        Admin superAdmin = adminRepository.findByAdminId(superAdminId)
                .orElseThrow(()-> new BusinessException(ErrorCode.ADMIN_NOT_FOUND));

        if (!superAdmin.isSuperAdmin()) {
            throw new BusinessException(ErrorCode.NOT_SUPER_ADMIN);
        }

        BCryptPasswordEncoder passwordEncoder = new BCryptPasswordEncoder();

        String account = signupRequestDto.getAccount();
        Optional<Admin> findAdmin = adminRepository.findByAccount(account);
        if (findAdmin.isPresent()) {
            throw new BusinessException(ErrorCode.ACCOUNT_EXIST);
        }
        String phone = signupRequestDto.getPhone();
        findAdmin = adminRepository.findByPhone(phone);
        if (findAdmin.isPresent()) {
            throw new BusinessException(ErrorCode.PHONE_EXIST);
        }

        Admin admin = Admin.builder()
                .name(signupRequestDto.getName())
                .account(account)
                .password(passwordEncoder.encode(signupRequestDto.getPassword()))
                .phone(phone)
                .isSuperAdmin(false)
                .createdAt(LocalDateTime.now())
                .apartment(superAdmin.getApartment())
                .build();
        adminRepository.save(admin);
        Optional<Admin> signUpAdmin = adminRepository.findByAccount(signupRequestDto.getAccount());
        int adminId = signUpAdmin.get().getAdminId();
        SignupResponseDto signupResponseDto = SignupResponseDto.builder()
                .adminID(adminId)
                .account(account)
                .name(signupRequestDto.getName())
                .build();
        return signupResponseDto;
    }

    @Transactional
    public List<AdminListResponseDto> getAdminList(HttpServletRequest httpServletRequest,int page, int limit) {
        int superAdminId = cookieUtil.getAdminId(httpServletRequest);
        log.info("SuperAdmin ID: {}", superAdminId);
        Admin superAdmin = adminRepository.findByAdminId(superAdminId)
                .orElseThrow(()-> new BusinessException(ErrorCode.ADMIN_NOT_FOUND));

        if (!superAdmin.isSuperAdmin()) {
            throw new BusinessException(ErrorCode.NOT_SUPER_ADMIN);
        }

        int start = (page-1)*limit;
        List<Admin> adminAll = adminRepository.findAll();
        List<AdminListResponseDto> adminList = new ArrayList<>();
        for (int i=start;i<start+limit;i++) {
            if (i>=adminAll.size()) {
                break;
            }
            Admin admin = adminAll.get(i);
            AdminListResponseDto adminListResponseDto = AdminListResponseDto.builder()
                    .account(admin.getAccount())
                    .adminID(admin.getAdminId())
                    .createdAt(admin.getCreatedAt())
                    .name(admin.getName())
                    .phone(admin.getPhone())
                    .password(admin.getPassword())
                    .build();
            adminList.add(adminListResponseDto);
        }
        return adminList;
    }

    @Transactional
    public void deleteAdmin(HttpServletRequest httpServletRequest, int adminId) {
        int superAdminId = cookieUtil.getAdminId(httpServletRequest);

        Admin superAdmin = adminRepository.findByAdminId(superAdminId)
                .orElseThrow(()-> new BusinessException(ErrorCode.ADMIN_NOT_FOUND));

        if (!superAdmin.isSuperAdmin()) {
            throw new BusinessException(ErrorCode.NOT_SUPER_ADMIN);
        }
        log.info("슈퍼유저 권한 확인");
        Optional<Admin> admin = adminRepository.findByAdminId(adminId);
        if (admin.isEmpty()) {
            throw new BusinessException(ErrorCode.ADMIN_NOT_FOUND);
        } else {
            adminRepository.delete(admin.get());
        }
    }
}
