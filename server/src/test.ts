import { faker } from '@faker-js/faker';
// import { faker } from '@faker-js/faker/locale/de';
interface User{
  id: string,
  avatar: string,
  name: string,
  major:string,
  grade: string,
  sex:string,
  phone: string,
  email: string
}


export const USERS: User[] = [];

export function createRandomUser(): User {
  return {
    id: faker.datatype.uuid(),
    avatar: faker.image.avatar(),
    name: faker.internet.userName(),
    major: faker.music.songName(),
    grade: faker.random.numeric(),
    sex: '男',
    phone: faker.phone.imei(),
    email: faker.internet.email()
  };
}

Array.from({ length: 10 }).forEach(() => {
  USERS.push(createRandomUser());
});

console.log(createRandomUser())
