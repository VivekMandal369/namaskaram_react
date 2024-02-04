import UserFunction from './UserFunction';
import UserClass from './UserClass';

const About = () => {
  return (
    <div>
     <h1>About Us</h1>
     <UserClass name="Vivek Mandal (Calss)" age="30" profession="Software Engineer" />
     <UserFunction name="Vivek Mandal (Function)" age="30" profession="Software Engineer"/>
    </div>
  );
};

export default About;