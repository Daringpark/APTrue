package aptrue.backend.Global.Error;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.http.HttpStatus;

@Getter
@AllArgsConstructor
public enum ErrorCode {

    // Admin
    ADMIN_NOT_FOUND(HttpStatus.NOT_FOUND, "E001", "존재하지 않는 관리자입니다."),
    NOT_SUPER_ADMIN(HttpStatus.NOT_ACCEPTABLE, "E002", "SuperUser가 아닙니다."),
    ACCOUNT_EXIST(HttpStatus.BAD_REQUEST, "E003", "이미 존재하는 계정입니다."),
    PHONE_EXIST(HttpStatus.BAD_REQUEST, "E004", "이미 존재하는 번호입니다."),
    PASSWORD_DIFF(HttpStatus.BAD_REQUEST, "E005", "비밀번호가 틀렸습니다."),

    // CCTV
    CLIP_RQ_FAIL(HttpStatus.NOT_FOUND, "E101", "CCTV 요청이 처리되지 않았습니다."),
    PHOTO_EXCEED_9(HttpStatus.BAD_REQUEST, "E102", "사진은 9장까지 업로드할 수 있습니다."),
    IMAGES_EXIST(HttpStatus.BAD_REQUEST, "E103", "이미 업로드 된 사진이 있습니다."),
    NOT_FOUND_RQId(HttpStatus.NOT_FOUND, "E104", "요청 번호를 찾을 수 없습니다."),

    // GPU
    GPU_SERVER_REQUEST_FAILED(HttpStatus.METHOD_NOT_ALLOWED, "E201", "GPU 서버에 요청하는 데에 실패했습니다."),

    // APT
    APT_NOT_FOUND(HttpStatus.NOT_FOUND, "E301", "아파트를 조회할 수 없습니다."),

    // OpenVidu
    SESSION_NOT_FOUND(HttpStatus.NOT_FOUND, "E301", "세션을 찾을 수 없습니다."),
    SESSION_CREATION_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "E302", "세션 생성에 실패했습니다."),
    TOKEN_CREATION_FAILED(HttpStatus.INTERNAL_SERVER_ERROR, "E303", "토큰 생성에 실패했습니다.");

    private final HttpStatus status;
    private final String code;
    private final String message;
}
