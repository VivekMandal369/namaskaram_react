import React from "react"

class UserClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
      count2: 1
    };
  };

  // componentDidMount is used for APIs call same as useEffect in functional component
  componentDidMount() {

  };

  render() {
    return (
      <div className="about">
        <h1>count - {this.state.count}</h1>
        <h1>count2 - {this.state.count2}</h1>
        <button onClick={()=>{
          this.setState({
            count: this.state.count + 1,
            count2: this.state.count2 + 1
          });
        }}>Update Count</button>
        <h1>Name: {this.name}</h1>
        <h1>Age: {this.age}</h1>
        <h1>Profession: {this.profession}</h1>
      </div>
    )
  };
};

export default UserClass;