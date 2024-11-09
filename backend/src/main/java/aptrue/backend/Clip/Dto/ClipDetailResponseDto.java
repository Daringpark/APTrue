package aptrue.backend.Clip.Dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ClipDetailResponseDto {

    private int clipRQId;

    private String name;

    private String email;

    private String phone;

    private String address;

    private LocalDateTime startDate;

    private LocalDateTime endDate;

    private List<String> sections;

    private boolean photoStatus;

    private String password;

    private List<String> clipList;

}