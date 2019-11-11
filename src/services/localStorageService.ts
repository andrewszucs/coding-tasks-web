import { User } from "../types";

const RESOURCES = {
  loggedInUser: "loggedInUser"
};

export default function createLocalStorageService(localStorage: Storage) {
  return {
    getUser(): User | null {
      const userString = localStorage.getItem(RESOURCES.loggedInUser);
      if (!userString) return null;
      return JSON.parse(userString) as User;
    },
    setUser(user: User): void {
      localStorage.setItem(RESOURCES.loggedInUser, JSON.stringify(user));
    }
  };
}
