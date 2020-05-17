import React from 'react';
import { Row } from 'antd';
import '../index.css';

import StockGrid from './StockGrid';
import StockGraph from './StockGraph';
import TextGroup from './TextGroup';

const App = () => {

  return (
    <div>
      <Row style={{ textAlign: 'left', padding: "2% 0 0 4%" }}>
        <TextGroup />
      </Row>
      <div style={{ padding: "1% 4% 0 4%", justifyContent: 'center' }}>
        <StockGraph />
      </div>
      <div style={{ padding: "5% 4% 0 4%", justifyContent: 'center' }}>
        <hr />
        <div style={{}}>
          <h2 style={{ color: 'white' }}> Stock Cards </h2>
        </div>
        <StockGrid />
      </div>

    </div>
  )
}

export default App;