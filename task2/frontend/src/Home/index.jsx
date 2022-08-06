import React from 'react';
import DocumentTitle from 'react-document-title';
import Header from './Header';

import './static/style';
import 'antd/dist/antd.css';
import MyTable from './component/MyTable'

// 不支持移动端
class Home extends React.PureComponent {
  render() {
    return (
      <div className="home-page">
        <Header key="header" />
        <MyTable></MyTable>

      
      </div>
    );
  }
}
export default Home;
