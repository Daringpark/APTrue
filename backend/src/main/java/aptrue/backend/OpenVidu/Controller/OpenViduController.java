package aptrue.backend.OpenVidu.Controller;

import aptrue.backend.Global.Error.BusinessException;
import aptrue.backend.Global.Error.ErrorCode;
import aptrue.backend.OpenVidu.Service.OpenViduService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
@Slf4j
@RequiredArgsConstructor
public class OpenViduController {

    private final OpenViduService openViduService;

    @PostMapping("/session")
    public Map<String, Object> createSession(@RequestBody(required = false) Map<String, Object> params) {
        try {
            String sessionId = openViduService.createSession(params!=null ? params : new HashMap<>());
            Map<String, Object> response = new HashMap<>();
            response.put("sessionId", sessionId);
            return response;
        } catch (BusinessException e) {
            throw e;
        } catch (Exception e) {
            throw new BusinessException(ErrorCode.SESSION_CREATION_FAILED);
        }
    }

    @PostMapping("session/{sessionId}/connections")
    public Map<String, Object> createConnections(@PathVariable String sessionId,
                                                 @RequestBody(required = false) Map<String, Object> params) {
        try {
            String token = openViduService.createConnection(sessionId, params != null ? params : new HashMap<>());
            Map<String, Object> response = new HashMap<>();
            response.put("token", token);
            return response;
        } catch (BusinessException e) {
            throw e;
        } catch (Exception e) {
            throw new BusinessException(ErrorCode.TOKEN_CREATION_FAILED);
        }
    }
}
