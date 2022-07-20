import type { UseQueryResult } from 'react-query';
import { useQuery } from 'react-query';
import axios from 'axios';



export type User = UserApiReturn;

export type Users = User[];



async function getUsers(): Promise<Users> {
  const usersToFetch = 200;

  // Comment/uncomment to set a fake await time. Beware React Query will recall on error a few times.
  // await new Promise<void>((res) => setTimeout(res, 500));

  // Comment/uncomment to set a forced error.
  // throw new Error('The system is under maintance.');

  return (await axios.get<ApiData>('https://randomuser.me/api', {
    params: {
      results: usersToFetch,
      // I specified the nations because arab RTL names were being included in the query result.
      // https://randomuser.me/documentation#nationalities
      nat: 'us,de,gb',
      // It's possible to exclude unused fields by specifying in the query (https://randomuser.me/documentation#incexc),
      // but for simplicity I will let it fetch all user's data.
    },
  })).data.results;
}

export function useUsersQuery(): UseQueryResult<Users> {
  return useQuery(['users'], getUsers, {
    staleTime: Infinity, // Avoid refetching the users (and getting new ones) due to time-staling.
  });
}


// Interfaces were generated by https://transform.tools/json-to-typescript,
// by entering the returning data from https://randomuser.me/api/?results=5.
interface ApiData {
  results: UserApiReturn[];
  info: Info;
}

interface UserApiReturn {
  gender: string;
  name: Name;
  location: Location;
  email: string;
  login: Login;
  dob: Dob;
  registered: Registered;
  phone: string;
  cell: string;
  id: Id;
  picture: Picture;
  nat: string;
}

interface Name {
  title: string;
  first: string;
  last: string;
}

interface Location {
  street: Street;
  city: string;
  state: string;
  country: string;
  postcode: number;
  coordinates: Coordinates;
  timezone: Timezone;
}

interface Street {
  number: number;
  name: string;
}

interface Coordinates {
  latitude: string;
  longitude: string;
}

interface Timezone {
  offset: string;
  description: string;
}

interface Login {
  uuid: string;
  username: string;
  password: string;
  salt: string;
  md5: string;
  sha1: string;
  sha256: string;
}

interface Dob {
  date: string;
  age: number;
}

interface Registered {
  date: string;
  age: number;
}

interface Id {
  name: string;
  value?: string;
}

interface Picture {
  large: string;
  medium: string;
  thumbnail: string;
}

interface Info {
  seed: string;
  results: number;
  page: number;
  version: string;
}
