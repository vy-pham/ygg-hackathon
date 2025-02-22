import { inject } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Apollo } from 'apollo-angular';
import { ToastrService } from 'ngx-toastr';
import { map, of } from 'rxjs';
import { LoginMutation, LoginMutationVariables } from '../../graphql/queries';
import { LOGIN } from '../mutations/login.mutation';
import {
  STORAGE_KEY,
  StorageService,
} from '../shared/services/storage.service';
import { UserService } from '../shared/services/user.service';

export class HomeService {
  formBuilder = new FormBuilder().nonNullable;
  toastr = inject(ToastrService);
  apollo = inject(Apollo);
  userService = inject(UserService);
  storageService = inject(StorageService);
  form = this.formBuilder.group({
    username: [
      '',
      [Validators.required, Validators.minLength(4), Validators.maxLength(12)],
    ],
    password: [
      '',
      [Validators.required, Validators.minLength(6), Validators.maxLength(12)],
    ],
  });
  login$() {
    if (this.form.valid) {
      const { username, password } = this.form.getRawValue();
      return this.apollo
        .mutate<LoginMutation, LoginMutationVariables>({
          mutation: LOGIN,
          variables: {
            input: {
              username,
              password,
            },
          },
        })
        .pipe(
          map(({ data }) => {
            if (!data) {
              this.toastr.error('Unknown error');
              return null;
            }
            const { loginQuestManager } = data;
            if (loginQuestManager.__typename === 'ErrorOutput') {
              this.toastr.error(loginQuestManager.message);
              return null;
            }
            if (
              loginQuestManager.__typename ===
              'LoginQuestManagerMutation_Mutation'
            ) {
              this.storageService.set(
                STORAGE_KEY.TOKEN,
                loginQuestManager.data.token
              );
              this.toastr.success(loginQuestManager.message);
              this.userService.loginInfo = loginQuestManager.data;
              return loginQuestManager.data;
            }
            return null;
          })
        );
    } else {
      this.form.markAllAsTouched();
      return of(null);
    }
  }
}
