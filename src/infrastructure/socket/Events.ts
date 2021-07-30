/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */
enum Events {
  DeviceIdentify = 'device:identify',
  DeviceRemoteControl ='device:remote-control',
  DeviceStartStreaming = 'device:start-streaming',
  DeviceStopStreaming = 'device:stop-streaming',
  DeviceStreaming = 'device:streaming',
  DeviceMoveCamera ='device:move-camera',
  UserIdentify = 'user:identify'
}

export default Events;
