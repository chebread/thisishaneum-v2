import { FullScreen } from 'layouts/Screens';
import { useRecoilState } from 'recoil';
import { emailState } from 'states/Contact/datasState';
import EmailInput from 'components/Contact/EmailField/EmailInput';
import EmailButton from 'components/Contact/EmailField/EmailButton';

const EmailField = () => {
  const [email, setEmail] = useRecoilState(emailState);

  return (
    <FullScreen>
      <EmailInput
        value={email}
        setValue={setEmail}
        placeholder="Enter your email"
      />
      <EmailButton value={email} type="email" />
    </FullScreen>
  );
};

export default EmailField;
