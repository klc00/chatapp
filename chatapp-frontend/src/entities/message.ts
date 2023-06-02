export class Message {
  id: number;
  text: string;
  creatorId: number;
  recipientId: number;
  createdAt: Date;

  constructor(
    id: number,
    text: string,
    creatorId: number,
    recipientId: number,
    createdAt: Date,
  ) {
    this.id = id;
    this.text = text;
    this.creatorId = creatorId;
    this.recipientId = recipientId;
    this.createdAt = createdAt;
  }
}