import RobotProfileImage from '../assets/robot.jpg';
import userProfileImage from '../assets/user.png';

export function ChatMessage({ message, sender }) {
  return (
    <div>
      {sender === 'robert' && <img src={RobotProfileImage} width="50" />}
      {message}
      {sender === 'user' && <img src={userProfileImage} width="50" />}
    </div>
  );
}
