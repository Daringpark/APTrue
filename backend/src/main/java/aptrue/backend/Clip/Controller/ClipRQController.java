package aptrue.backend.Clip.Controller;

import aptrue.backend.Clip.Dto.*;
import aptrue.backend.Clip.Dto.Request.ClipRQRequestDto;
import aptrue.backend.Clip.Service.ClipRQService;
import aptrue.backend.Global.Code.SuccessCode;
import aptrue.backend.Global.ResultResponse;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Slf4j
@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ClipRQController {

    private final ClipRQService clipRQService;

    @PostMapping("/clipRQ/new")
    public ResponseEntity<?> newClipRQ(@RequestBody ClipRQRequestDto clipRQRequestDto, HttpServletRequest httpServletRequest) {
        ClipRQResponseDto clipRQResponseDto = clipRQService.newClipRQ(clipRQRequestDto, httpServletRequest);
        ResultResponse resultResponse = ResultResponse.of(SuccessCode.CLIP_RQ_OK, clipRQResponseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @GetMapping("/clip/detail/{clip_id}")
    public ResponseEntity<?> getClipDetail(@PathVariable int clip_id, HttpServletRequest httpServletRequest) {
        ClipDetailResponseDto clipDetailResponseDto = clipRQService.getDetail(clip_id, httpServletRequest);
        ResultResponse resultResponse = ResultResponse.of(SuccessCode.CLIP_DETAIL_OK, clipDetailResponseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @PostMapping("/clip/complete/{clip_id}")
    public ResponseEntity<?> completeRQ(@PathVariable int clip_id, HttpServletRequest httpServletRequest) {
        CompleteResponseDto completeResponseDto = clipRQService.completeRQ(clip_id, httpServletRequest);
        ResultResponse resultResponse = ResultResponse.of(SuccessCode.COMPLETE_RQ, completeResponseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @GetMapping("/clip/list/{clip_id}")
    public ResponseEntity<?> getVideos(@PathVariable int clip_id, HttpServletRequest httpServletRequest) {
    ClipOnlyResponseDto clipOnlyResponseDto = clipRQService.getVideosOnly(clip_id, httpServletRequest);
    ResultResponse resultResponse = ResultResponse.of(SuccessCode.VIDEOS_OK, clipOnlyResponseDto);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }

    @GetMapping("/clip/list")
    public ResponseEntity<?> getClipList(HttpServletRequest httpServletRequest) {
        List<ClipListResponseDto> clipListResponseDtoList = clipRQService.getClipList(httpServletRequest);
        ResultResponse resultResponse = ResultResponse.of(SuccessCode.CLIP_LIST_OK, clipListResponseDtoList);
        return ResponseEntity.status(resultResponse.getStatus()).body(resultResponse);
    }
}
