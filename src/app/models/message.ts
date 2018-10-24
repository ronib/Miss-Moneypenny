export class Message {
  content: string;
  timestamp: Date;
  avatar: string;
  isRobot = false;

  constructor(content: string, avatar: string, timestamp?: Date, isRobot?: boolean) {
    this.content = content;
    this.timestamp = timestamp;
    this.avatar = avatar;
    this.isRobot = isRobot;
  }
}
