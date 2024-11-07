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
public class ClipListResponseDto {

    private int clipRQId;

    private String status;

    private String address;

    private String name;

    private LocalDateTime createdAt;
}
