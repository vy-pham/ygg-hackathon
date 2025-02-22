import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { LoginQuestManagerMutation } from '../../../graphql/types';

@Injectable({ providedIn: 'root' })
export class UserService {
  public get loginInfo(): LoginQuestManagerMutation | null {
    return this.loginInfo$.value;
  }

  public set loginInfo(v: LoginQuestManagerMutation | null) {
    this.loginInfo$.next(v);
  }

  private loginInfo$ = new BehaviorSubject<LoginQuestManagerMutation | null>(
    null
  );
}
