
import React from 'react';
import {
  NovuProvider,
  PopoverNotificationCenter,
  NotificationBell,
} from '@novu/notification-center';

function Notification() {
    function onNotificationClick(message) {
        if (message?.cta?.data?.url) {
            window.location.href = message.cta.data.url;
        }
    }

    return (
        <NovuProvider subscriberId={'on-boarding-subscriber-id-123'} applicationIdentifier={'Hs1exqfFXN--'}>
          <PopoverNotificationCenter colorScheme={'light'}>
            {({ unseenCount }) => <NotificationBell unseenCount={unseenCount} />}
          </PopoverNotificationCenter>
        </NovuProvider>
      );
}
export default Notification;
