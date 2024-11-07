package aptrue.backend.Clip.Service;

import aptrue.backend.Admin.Entity.Admin;
import aptrue.backend.Admin.Repository.AdminRepository;
import aptrue.backend.Clip.Dto.*;
import aptrue.backend.Clip.Dto.Request.ClipRQRequestDto;
import aptrue.backend.Clip.Entity.ClipRQ;
import aptrue.backend.Clip.Repository.ClipRQRepository;
import aptrue.backend.Global.Error.BusinessException;
import aptrue.backend.Global.Error.ErrorCode;
import aptrue.backend.Global.Util.CookieUtil;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Slf4j
@Service
@RequiredArgsConstructor
public class ClipRQServiceImpl implements ClipRQService {

    private final ClipRQRepository clipRQRepository;
    private final CookieUtil cookieUtil;
    private final AdminRepository adminRepository;

    @Transactional
    public ClipRQResponseDto newClipRQ(ClipRQRequestDto clipRQRequestDto, HttpServletRequest httpServletRequest) {
        int adminId = cookieUtil.getAdminId(httpServletRequest);

        Admin admin = adminRepository.findByAdminId(adminId)
                .orElseThrow(()->new BusinessException(ErrorCode.ADMIN_NOT_FOUND));

        List<String> empty = new ArrayList<>();
        LocalDateTime now = LocalDateTime.now();

        ClipRQ clipRQ = ClipRQ.builder()
                .admin(admin)
                .images(empty)
                .sections(clipRQRequestDto.getSections())
                .address(clipRQRequestDto.getAddress())
                .phone(clipRQRequestDto.getPhone())
                .createdAt(now)
                .photoStatus(false)
                .name(clipRQRequestDto.getName())
                .email(clipRQRequestDto.getEmail())
                .status("처리 대기")
                .password(clipRQRequestDto.getPassword())
                .startDate(clipRQRequestDto.getStartDate())
                .endDate(clipRQRequestDto.getEndDate())
                .clipList(new ArrayList<>())
                .build();

        clipRQRepository.save(clipRQ);

        ClipRQ optionalClipRQ = clipRQRepository.findByPhone(clipRQRequestDto.getPhone())
                .orElseThrow(()-> new BusinessException(ErrorCode.CLIP_RQ_FAIL));

        ClipRQResponseDto clipRQResponseDto = ClipRQResponseDto.builder()
                .clipRQId(optionalClipRQ.getClipRQId())
                .sections(optionalClipRQ.getSections())
                .address(optionalClipRQ.getAddress())
                .phone(optionalClipRQ.getPhone())
                .createdAt(optionalClipRQ.getCreatedAt())
                .name(optionalClipRQ.getName())
                .email(optionalClipRQ.getEmail())
                .status(optionalClipRQ.getStatus())
                .startDate(optionalClipRQ.getStartDate())
                .endDate(optionalClipRQ.getEndDate())
                .build();

        return clipRQResponseDto;
    }

    @Transactional
    public ClipDetailResponseDto getDetail(int clip_id, HttpServletRequest httpServletRequest) {
        int adminId = cookieUtil.getAdminId(httpServletRequest);

        Admin admin = adminRepository.findByAdminId(adminId)
                .orElseThrow(()->new BusinessException(ErrorCode.ADMIN_NOT_FOUND));

        ClipRQ optionalClipRQ = clipRQRepository.findById(clip_id)
                .orElseThrow(()-> new BusinessException(ErrorCode.CLIP_RQ_FAIL));

        ClipDetailResponseDto clipDetailResponseDto = ClipDetailResponseDto.builder()
                .clipRQId(optionalClipRQ.getClipRQId())
                .name(optionalClipRQ.getName())
                .email(optionalClipRQ.getEmail())
                .phone(optionalClipRQ.getPhone())
                .address(optionalClipRQ.getAddress())
                .startDate(optionalClipRQ.getStartDate())
                .endDate(optionalClipRQ.getEndDate())
                .sections(optionalClipRQ.getSections())
                .photoStatus(optionalClipRQ.isPhotoStatus())
                .password(optionalClipRQ.getPassword())
                .clipList(optionalClipRQ.getClipList())
                .build();

        return clipDetailResponseDto;
    }

    @Transactional
    public CompleteResponseDto completeRQ(int clip_id, HttpServletRequest httpServletRequest) {
        int adminId = cookieUtil.getAdminId(httpServletRequest);

        Admin admin = adminRepository.findByAdminId(adminId)
                .orElseThrow(()->new BusinessException(ErrorCode.ADMIN_NOT_FOUND));

        ClipRQ optionalClipRQ = clipRQRepository.findById(clip_id)
                .orElseThrow(()-> new BusinessException(ErrorCode.CLIP_RQ_FAIL));

        optionalClipRQ.setStatus("민원 완료");

        clipRQRepository.save(optionalClipRQ);

        CompleteResponseDto completeResponseDto = CompleteResponseDto.builder()
                .clipRQId(clip_id)
                .build();

        return completeResponseDto;
    }

    @Transactional
    public ClipOnlyResponseDto getVideosOnly(int clip_id, HttpServletRequest httpServletRequest) {
        int adminId = cookieUtil.getAdminId(httpServletRequest);

        Admin admin = adminRepository.findByAdminId(adminId)
                .orElseThrow(()->new BusinessException(ErrorCode.ADMIN_NOT_FOUND));

        ClipRQ optionalClipRQ = clipRQRepository.findById(clip_id)
                .orElseThrow(()-> new BusinessException(ErrorCode.CLIP_RQ_FAIL));

        ClipOnlyResponseDto clipOnlyResponseDto = ClipOnlyResponseDto.builder()
                .clipList(optionalClipRQ.getClipList())
                .build();

        return clipOnlyResponseDto;
    }

    @Transactional
    public List<ClipListResponseDto> getClipList(HttpServletRequest httpServletRequest) {
        int adminId = cookieUtil.getAdminId(httpServletRequest);

        Admin admin = adminRepository.findByAdminId(adminId)
                .orElseThrow(()->new BusinessException(ErrorCode.ADMIN_NOT_FOUND));

        List<ClipRQ> clipRQS = clipRQRepository.findAll();

        List<ClipListResponseDto> clipListResponseDtoList = new ArrayList<>();

        for (ClipRQ clipRQ : clipRQS) {
            if (clipRQ.getAdmin().getApartment()==admin.getApartment()) {
                ClipListResponseDto clipListResponseDto = ClipListResponseDto.builder()
                        .clipRQId(clipRQ.getClipRQId())
                        .status(clipRQ.getStatus())
                        .address(clipRQ.getAddress())
                        .name(clipRQ.getName())
                        .createdAt(clipRQ.getCreatedAt())
                        .build();
                clipListResponseDtoList.add(clipListResponseDto);
            }
        }

        return clipListResponseDtoList;
    }
}
