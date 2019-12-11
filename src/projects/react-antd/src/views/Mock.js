import React from 'react';
import { Button } from 'antd';
import { getObject, getArray } from '../api/demo';

class Mock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      object: {},
      list: []
    };
    this.genMockData();
  }

  genMockData = async () => {
    const object = await getObject();
    const { list } = await getArray();
    this.setState({ object, list });
  }

  render() {
    const { object, list } = this.state;
    return (
      <div>
        <Button type="primary" onClick={this.genMockData}>
          click me to generator mock data
        </Button>
        <h4>object</h4>
        <textarea name="object" cols="30" rows="10" value={JSON.stringify(object)}>
        </textarea>
        <h4>array</h4>
        <ul>
          {list.map(item => (
            <li key={item.id}>
              {item.ip}
              -
              {item.time}
              -
              {item.number}
            </li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Mock;
