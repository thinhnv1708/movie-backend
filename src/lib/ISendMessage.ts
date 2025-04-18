export interface ISendMessage {
  sendMessage(data: { to: string; subject: string; message: string });
}
