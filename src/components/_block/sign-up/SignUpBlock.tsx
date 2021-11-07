import React from 'react';
import { useTranslation } from 'next-i18next';

import UiInput from '_ui/form/input/UiInput';
import LoginForm from 'components/login/LoginForm';

function SignInBlock() {
  const { t } = useTranslation('sign-in');

  return (
    <LoginForm isSignIn={false} t={t}>
      <div className="my-6">
        <UiInput type="text" name="name" placeholder={t('name')} />
      </div>
      <div className="my-6">
        <UiInput type="email" name="email" placeholder={t('email_placeholder')} />
      </div>
      <div className="my-6">
        <UiInput type="password" name="password" placeholder={t('password_placeholder')} />
      </div>
    </LoginForm>
  );
}

export default SignInBlock;
