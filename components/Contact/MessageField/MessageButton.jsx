import styled from 'styled-components';
import SvgCheck from 'assets/icons/SvgCheck';
import FooterScreen from 'layouts/FooterScreen';
import FooterButton from 'layouts/FooterButton';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import goPages from 'states/Contact/goPages';
import isErrorState from 'states/Contact/isErrorState';
import { emailState, messageState, nameState } from 'states/Contact/datasState';
import sendEmail from 'lib/Contact/sendEmail';

const MessageButton = () => {
  const [name, setName] = useRecoilState(nameState);
  const [email, setEmail] = useRecoilState(emailState);
  const [message, setMessage] = useRecoilState(messageState);
  const setIsError = useSetRecoilState(isErrorState);
  const goPage = useSetRecoilState(goPages);

  const onClick = async () => {
    const initValues = () => {
      setName('');
      setEmail('');
      setMessage('');
    };
    if (/\S/.test(message)) {
      await sendEmail({ name, email, message })
        .then(() => {
          // success notify
          alert('200');
        })
        .catch(err => {
          // error notify
          alert('500');
        });
      initValues();
      goPage(1); // 에러여도 이동하고 값 초기화 한다
    } else {
      // error
      setIsError(true);
    }
  };
  return (
    <FooterScreen>
      <Button onClick={onClick}>
        <SvgCheck />
      </Button>
    </FooterScreen>
  );
};

const Button = styled(FooterButton)`
  backdrop-filter: blur(15px);
  background-color: rgba(30, 27, 22, 75%); // rgba(20, 17, 12, 50%);
  &:hover {
    background-color: rgba(40, 36, 32, 75%); // + 10 // 35, 31, 27
  }
  &:active {
    background-color: rgba(49, 43, 37, 75%); // + 20
  }
`;
export default MessageButton;
