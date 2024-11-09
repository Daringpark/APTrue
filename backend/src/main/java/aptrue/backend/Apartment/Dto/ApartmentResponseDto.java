package aptrue.backend.Apartment.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ApartmentResponseDto {

    private String aptname;
    private String aptImg;
    private String location;
    private int block;
    private int household;

}