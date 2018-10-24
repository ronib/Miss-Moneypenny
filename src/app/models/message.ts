export class Message {
  content: string;
  timestamp: Date;
  avatar: string;
  isRobot: boolean;

  constructor(content: string, avatar: string, isRobot: boolean, timestamp?: Date) {
    this.content = content;
    this.timestamp = timestamp;
    this.avatar = avatar;
    this.isRobot = isRobot;
  }
}
