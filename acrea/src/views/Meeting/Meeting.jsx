import React from 'react';
import { JitsiMeeting } from '@jitsi/react-sdk';
import { useLocation, useNavigate } from 'react-router-dom';
import Styles from './css/Meeting.module.css';

function Meeting() {
    const location = useLocation();
    const navigate = useNavigate();
    const { meetingId, userName } = location.state;

    return (
        <div className={Styles.meetingContainer}>
            <button 
                className={Styles.backButton}
                onClick={() => navigate(-1)}
            >
                Return to Property
            </button>
            <div className={Styles.meetingWrapper}>
            <JitsiMeeting
                domain="meet.jit.si"
                roomName={meetingId}
                configOverwrite={{
                    startWithAudioMuted: true,
                    disableModeratorIndicator: true,
                    startScreenSharing: false,
                    enableEmailInStats: false,
                    prejoinPageEnabled: false,
                    disableDeepLinking: true,
                    requireDisplayName: false,
                    enableClosePage: false,
                    enableWelcomePage: false,
                    enableNoisyMicDetection: false,
                    disableInviteFunctions: true,
                    readOnlyName: true,
                    disableInitialGUM: false,
                    remoteVideoMenu: {
                        disableKick: true
                    },
                    disableRemoteMute: true,
                    disableProfile: true,
                    hideLobbyButton: true,
                    notifications: [],
                    toolbarButtons: [
                        'microphone', 'camera', 'desktop', 'chat',
                        'raisehand', 'videoquality', 'fullscreen'
                    ]
                }}
                interfaceConfigOverwrite={{
                    DISABLE_JOIN_LEAVE_NOTIFICATIONS: true,
                    HIDE_INVITE_MORE_HEADER: true,
                    MOBILE_APP_PROMO: false,
                    SHOW_CHROME_EXTENSION_BANNER: false,
                    DISABLE_VIDEO_BACKGROUND: true,
                    DISABLE_FOCUS_INDICATOR: true,
                    DEFAULT_BACKGROUND: '#000000',
                    DISABLE_DOMINANT_SPEAKER_INDICATOR: true,
                    SETTINGS_SECTIONS: ['devices'],
                    TOOLBAR_ALWAYS_VISIBLE: true,
                    TOOLBAR_TIMEOUT: 0,
                    filmStripOnly: false
                }}
                userInfo={{
                    displayName: userName,
                    email: ''
                }}
                onApiReady={(externalApi) => {
                    // Auto-join the conference
                    externalApi.executeCommand('joinConference');
                }}
                getIFrameRef={(node) => {
                    if (node) {
                        node.style.width = '100%';
                        node.style.height = '100%';
                        node.style.border = 'none';
                    }
                }}
            />
            </div>
        </div>
    );
}

export default Meeting; 