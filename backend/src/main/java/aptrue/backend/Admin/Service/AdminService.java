package aptrue.backend.Admin.Service;

import aptrue.backend.Admin.Dto.*;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

import java.util.List;

public interface AdminService {
    LoginResponseDto login(LoginRequestDto loginRequestDto, HttpServletResponse httpServletResponse);
    SignupResponseDto signup(SignupRequestDto adminIn, HttpServletRequest signupRequestDto);
    List<AdminListResponseDto> getAdminList(HttpServletRequest httpServletRequest, int page, int limit);
    void deleteAdmin(HttpServletRequest httpServletRequest, int adminId);
}
