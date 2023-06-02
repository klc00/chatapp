export class User {
  id: number;
  email: string;
  password: string;
  nickname: string;
  privateKey: string;
  photo: string;

  constructor(
    id: number,
    email: string,
    password: string,
    nickname: string,
    privateKey: string,
    photo: string,
  ) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.nickname = nickname;
    this.privateKey = privateKey;
    this.photo = photo;
  }
}
