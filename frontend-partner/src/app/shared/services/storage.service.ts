import { Injectable } from '@angular/core';

export enum STORAGE_KEY {
  TOKEN = 'token',
}

export type Storage = {
  [STORAGE_KEY.TOKEN]: string;
};

@Injectable({ providedIn: 'root' })
export class StorageService {
  get(key: STORAGE_KEY): Storage[typeof key] {
    const data = JSON.parse(localStorage.getItem(key) || '');
    return data;
  }

  set(key: STORAGE_KEY, value: Storage[typeof key]) {
    localStorage.setItem(key, JSON.stringify(value));
  }
}
