import { hybrisGo } from 'Utilities/ajax';
import constants from 'Utilities/constants';
import { wrapFunc, getHashParams } from 'Utilities/utils';

const HYBRIS_URL = constants.get('myaccount').hybrisGoUrl;

export const inviteNewUser = wrapFunc(email => hybrisGo({
  url: `${HYBRIS_URL}/accounts/invite`,
  method: 'POST',
  data: {
    email
  }
}));

export const confirmInvitation = wrapFunc(() => hybrisGo({
  url: `${HYBRIS_URL}/accounts/join?token=${getHashParams().verificationKey}`,
  method: 'POST'
}));
