/* eslint-disable no-shadow */
/* eslint-disable no-unused-vars */

export const MessageSender = {
  GROUP: 'group',
  CONTACT: 'contact',
};

export const MessageStatus = {
  STATUS_SENT: 'sent',
  STATUS_DELIVERED: 'delivered',
  STATUS_READ: 'read',
};

export const MessageEvents = {
  SEND_TEMPLATE: 'EVENT_SEND_TEMPLATE',
  SEND_MESSAGE: 'EVENT_SEND_MESSAGE',
  RECEIVE_MESSAGE: 'EVENT_RECEIVE_MESSAGE',
};

export default {
  MessageSender,
  MessageStatus,
  MessageEvents,
};
