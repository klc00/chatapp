import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateMessageRequest {
  @IsNotEmpty()
  @IsString()
  text: string;

  @IsNotEmpty()
  @IsNumber()
  recipientId: number;
}
