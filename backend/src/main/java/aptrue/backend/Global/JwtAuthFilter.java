package aptrue.backend.Global;


import aptrue.backend.Admin.Service.AdminService;
import aptrue.backend.Global.Security.CustomAdminDetails;
import aptrue.backend.Global.Security.CustomAdminDetailsService;
import aptrue.backend.Global.Security.CustomAdminInfoDto;
import aptrue.backend.Global.Util.JwtUtil;
import aptrue.backend.Redis.RedisService;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.filter.OncePerRequestFilter;

import java.io.IOException;
import java.util.Collections;
import java.util.List;

@Slf4j
@RequiredArgsConstructor
public class JwtAuthFilter extends OncePerRequestFilter {

    private final CustomAdminDetailsService customAdminDetailsService;
    private final JwtUtil jwtUtil;
    private final RedisService redisService;

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws ServletException, IOException {
        String accessToken = getJwtFromCookies(request, "accessToken", response);
        String refreshToken = getJwtFromCookies(request, "refreshToken", response);

        // 액세스 토큰 검증
        if (accessToken != null && jwtUtil.validateToken(accessToken)) {
            int adminId = jwtUtil.getAdminId(accessToken);

            // 유저와 토큰 일치 시 CustomUserDetails 생성
            CustomAdminDetails adminDetails = (CustomAdminDetails) customAdminDetailsService.loadUserByUsername(String.valueOf(adminId));

            if (adminDetails != null) {
                UsernamePasswordAuthenticationToken authentication = new UsernamePasswordAuthenticationToken(
                        adminDetails, null, adminDetails.getAuthorities());
                SecurityContextHolder.getContext().setAuthentication(authentication);
            }
        } else if (refreshToken != null && jwtUtil.validateToken(refreshToken)) {
//            int adminIdFromRefreshToken = jwtUtil.getAdminId(refreshToken);
            int adminIdFromRefreshToken = 3;
//            log.info("dksfghjklsdgjldfhgjlsdfhgjklsdj{}", adminIdFromRefreshToken);
            // 레디스에서 저장된 리프레시 토큰과 비교
            String storedRefreshToken = redisService.getRefreshToken(adminIdFromRefreshToken);
            if (refreshToken.equals(storedRefreshToken)) {
                // 액세스 토큰 재발급
                CustomAdminDetails userDetails = (CustomAdminDetails) customAdminDetailsService.loadUserByUsername(String.valueOf(adminIdFromRefreshToken));
                String newAccessToken = jwtUtil.createAccessToken(CustomAdminInfoDto.builder()
                        .adminId(userDetails.getAdminId())
                                .account(userDetails.getAccount())
                                .password(userDetails.getPassword())
                                .name(userDetails.getUsername())
                                .phone(userDetails.getPhone())
                                .isSuperAdmin(false)
                                .createdAt(userDetails.getCreatedAt())
                        .build());


                Cookie newAccessTokenCookie = new Cookie("accessToken", newAccessToken);
                newAccessTokenCookie.setHttpOnly(true);
                newAccessTokenCookie.setSecure(true);
                newAccessTokenCookie.setPath("/");
                newAccessTokenCookie.setMaxAge(60 * 60); // 1시간

                response.addCookie(newAccessTokenCookie);
            }
        }
        filterChain.doFilter(request, response); // 다음 필터로 넘기기
    }

    private String getJwtFromCookies(HttpServletRequest request, String tokenName, HttpServletResponse response) {

        Cookie[] cookies = request.getCookies();
        log.info(request.getHeader("Cookie"));


        if (cookies == null) {

            if (tokenName.equals("refreshToken")) {
                try {
//                sendUnauthorizedResponse(response);
                    return null;
                } catch (Exception e) {
                    // todo: 오류처리 해야할듯
                    return null;
                }
            }

            log.warn("No cookies found in the request");
            return null;
        }
        for (Cookie cookie : cookies) {

            if (tokenName.equals(cookie.getName())) {
                return cookie.getValue();
            }
        }

        return null;
    }
}
