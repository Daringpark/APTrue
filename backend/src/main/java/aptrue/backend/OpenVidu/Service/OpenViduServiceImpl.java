package aptrue.backend.OpenVidu.Service;

import aptrue.backend.Global.Error.BusinessException;
import aptrue.backend.Global.Error.ErrorCode;
import io.openvidu.java.client.*;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Map;

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
            SessionProperties.Builder propertiesBuilder = new SessionProperties.Builder();
            Session session = openVidu.createSession(propertiesBuilder.build());
            return session.getSessionId();
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
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
            ConnectionProperties.Builder propertiesBuilder = new ConnectionProperties.Builder();
            Connection connection = session.createConnection(propertiesBuilder.build());
            return connection.getToken();
        } catch (OpenViduJavaClientException | OpenViduHttpException e) {
            throw new BusinessException(ErrorCode.TOKEN_CREATION_FAILED);
        }
    }
}
