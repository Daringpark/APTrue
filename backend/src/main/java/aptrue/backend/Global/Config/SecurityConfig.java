package aptrue.backend.Global.Config;

import aptrue.backend.Admin.Service.AdminService;
import aptrue.backend.Global.JwtAuthFilter;
import aptrue.backend.Global.Security.CustomAdminDetailsService;
import aptrue.backend.Global.Util.JwtUtil;
import aptrue.backend.Redis.RedisService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.access.AccessDeniedHandlerImpl;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import java.util.Arrays;
import java.util.Collections;

@Slf4j
@Configuration
@RequiredArgsConstructor
@EnableWebSecurity
@EnableGlobalMethodSecurity(securedEnabled = true)
public class SecurityConfig {

    private final JwtUtil jwtUtil;
    private final CustomAdminDetailsService customAdminDetailsService;
    private final RedisService redisService;

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {


        http.csrf((csrf) -> csrf.disable());        // CSRF 비활성화 -> JWT 쓰기 때문에
        http.cors(cors -> cors.configurationSource(corsConfigurationSource()));
        // 세션 관리 상태 없음으로 구성, Spring Security가 세션 생성 해주거나 사용하지 않음
        http.sessionManagement((sessionManagement) -> sessionManagement.sessionCreationPolicy(
                SessionCreationPolicy.STATELESS));

        // FormLogin, BasicHttp 비활성화
        http.formLogin((form) -> form.disable());
        http.httpBasic(AbstractHttpConfigurer::disable);

        // JwtAuthFilter를 UsernamePasswordAuthenticationFilter 앞에 추가
        http.addFilterBefore(new JwtAuthFilter(customAdminDetailsService, jwtUtil, redisService), UsernamePasswordAuthenticationFilter.class);

        http.exceptionHandling((exceptionHandling) -> exceptionHandling
                .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
                .accessDeniedHandler(new AccessDeniedHandlerImpl())
        );

        http
                .authorizeHttpRequests((authorize) -> {
                    authorize
                            .requestMatchers("/api/public/**").permitAll() // 특정 경로에 대한 접근 허용
                            .requestMatchers("/api/picture/upload").permitAll() // 업로드 경로 허용
                            .requestMatchers("/api/video/upload").permitAll() // 업로드 경로 허용
                            .requestMatchers("/api/login").permitAll() // 로그인 경로 허용
                            .requestMatchers("/api/signup").permitAll() // 모든 사용자가 signup 접근 가능
                            .requestMatchers("/api/superAdmin").permitAll() // /superAdmin에 대한 요청 허용
                            .requestMatchers("/api/ClipRQ/new").permitAll()
                            .requestMatchers("/swagger-ui/**").permitAll()
                            .requestMatchers("/v3/api-docs/**").permitAll()
                            .requestMatchers("/api/apart").permitAll()
                            .requestMatchers("/api/admin/list/**").permitAll()
                            .requestMatchers("/api/admin/**").permitAll()
                            .requestMatchers("/api/clip/detail/**").permitAll()
                            .anyRequest().authenticated(); // 그 외 경로는 인증 필요
                });

        return http.build();
    }

    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();

        config.setAllowedOriginPatterns(Collections.singletonList("*"));
        config.setAllowedMethods(Arrays.asList("GET", "POST", "DELETE", "PUT"));
        config.setAllowedHeaders(Arrays.asList("*"));
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return source;
    }
}
