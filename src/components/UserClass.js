import React from "react"

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {
        name: 'test',
        bio: 'bio test',
        company: 'company',
        // avatar_url: 'avatar_url'
      }
    };
  };

  // componentDidMount is used for APIs call same as useEffect in functional component
  async componentDidMount() {
    const userData = await fetch('https://api.github.com/users/itsvivekmandal');
    const userInfo = await userData.json();
    console.log(userInfo);
    this.setState({
      userInfo: userInfo
    });
  };

  render() {

    const {name, avatar_url, bio, company} = this.state.userInfo;

    return (
      <div className="about">
        <img src={avatar_url} alt="avtar" />
        <h1>Name: {name}</h1>
        <h1>Profession: {bio}</h1>
        <h1>company: {company}</h1>
      </div>
    )
  };
};

export default UserClass;