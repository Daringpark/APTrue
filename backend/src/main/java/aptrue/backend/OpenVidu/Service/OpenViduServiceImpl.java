package aptrue.backend.OpenVidu.Service;

import aptrue.backend.Global.Error.BusinessException;
import aptrue.backend.Global.Error.ErrorCode;
import io.openvidu.java.client.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Map;

@Slf4j
@Service
public class OpenViduServiceImpl implements OpenViduService {

    private OpenVidu openVidu;

    public OpenViduServiceImpl(@Value("${openvidu.url}") String openviduUrl,
                               @Value("${openvidu.secret}") String secret) {

    this.openVidu = new OpenVidu(openviduUrl, secret);
    }

    @Override
    public String createSession(Map<String, Object> params) {

        try {
            SessionProperties properties = SessionProperties.fromJson(params).build();
            log.info("dddddddddddddddddddddddddddd");
            Session session = openVidu.createSession(properties);
            return session.getSessionId();
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            log.error(e.getMessage());
            throw new BusinessException(ErrorCode.SESSION_CREATION_FAILED);
        }
    }

    @Override
    public String createConnection(String sessionId,Map<String, Object> params) {
        try {
            Session session = openVidu.getActiveSession(sessionId);
            if (session == null) {
                SessionProperties properties = new SessionProperties.Builder()
                        .customSessionId(sessionId)
                        .build();
                session = openVidu.createSession(properties);
            }
            ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
            Connection connection = session.createConnection(properties);
            return connection.getToken();
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            throw new BusinessException(ErrorCode.TOKEN_CREATION_FAILED);
        }
    }
}
