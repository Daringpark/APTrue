package aptrue.backend.Apartment.Service;

import aptrue.backend.Apartment.Dto.ApartmentResponseDto;
import jakarta.servlet.http.HttpServletRequest;

public interface ApartmentService {
    ApartmentResponseDto getApart(int aptId, HttpServletRequest httpServletRequest);
}
