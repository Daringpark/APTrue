package aptrue.backend.Apartment.Service;

import aptrue.backend.Admin.Repository.AdminRepository;
import aptrue.backend.Apartment.Dto.ApartmentResponseDto;
import aptrue.backend.Apartment.Entity.Apartment;
import aptrue.backend.Apartment.Repository.ApartmentRepository;
import aptrue.backend.Global.Error.BusinessException;
import aptrue.backend.Global.Error.ErrorCode;
import aptrue.backend.Global.Util.CookieUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

@Slf4j
@RequiredArgsConstructor
@Service
public class ApartmentServiceImpl implements ApartmentService {

    private final ApartmentRepository apartmentRepository;
    private final CookieUtil cookieUtil;
    private final AdminRepository adminRepository;

    public ApartmentResponseDto getApart(int aptId, HttpServletRequest httpServletRequest) {

        int AdminId = cookieUtil.getAdminId(httpServletRequest);

        adminRepository.findByAdminId(AdminId)
                .orElseThrow(()-> new BusinessException(ErrorCode.ADMIN_NOT_FOUND));

        Apartment apartment = apartmentRepository.findByAptId(aptId)
                .orElseThrow(()-> new BusinessException(ErrorCode.APT_NOT_FOUND));

        ApartmentResponseDto apartmentResponseDto = ApartmentResponseDto.builder()
                .aptname(apartment.getAptName())
                .location(apartment.getLocation())
                .block(apartment.getBlock())
                .aptImg(apartment.getAptImg())
                .household(apartment.getHousehold())
                .build();

        return apartmentResponseDto;
    };
}
