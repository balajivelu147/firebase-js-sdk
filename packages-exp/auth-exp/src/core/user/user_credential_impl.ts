/**
 * @license
 * Copyright 2020 Google LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import * as externs from '@firebase/auth-types-exp';
import { PhoneOrOauthTokenResponse } from '../../api/authentication/mfa';
import { Auth } from '../../model/auth';
import { IdTokenResponse } from '../../model/id_token';
import { User, UserCredential } from '../../model/user';
import { AuthCredential } from '../credentials';
import { _authCredentialFromTokenResponse } from '../credentials/from_token_response';
import { UserImpl } from './user_impl';

export class UserCredentialImpl implements UserCredential {
  constructor(
    public readonly user: User,
    public readonly credential: AuthCredential | null,
    public readonly operationType: externs.OperationType
  ) {}

  static async _fromIdTokenResponse(
    auth: Auth,
    credential: AuthCredential | null,
    operationType: externs.OperationType,
    idTokenResponse: IdTokenResponse
  ): Promise<UserCredential> {
    const user = await UserImpl._fromIdTokenResponse(
      auth,
      idTokenResponse,
      credential?.providerId === externs.ProviderId.ANONYMOUS
    );
    const userCred = new UserCredentialImpl(user, credential, operationType);
    // TODO: handle additional user info
    // updateAdditionalUserInfoFromIdTokenResponse(userCred, idTokenResponse);
    return userCred;
  }

  static async _forOperation(
    user: User,
    operationType: externs.OperationType,
    response: PhoneOrOauthTokenResponse
  ): Promise<UserCredentialImpl> {
    const newCred = _authCredentialFromTokenResponse(response);
    await user._updateTokensIfNecessary(response, /* reload */ true);
    return new UserCredentialImpl(user, newCred, operationType);
  }
}