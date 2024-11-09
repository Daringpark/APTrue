package aptrue.backend.OpenVidu.Service;

import java.util.Map;

public interface OpenViduService {

    public String createSession(Map<String, Object> params);

    public String createConnection(String sessionId, Map<String, Object> params);

}
