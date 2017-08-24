import React, { Component } from 'react';
import './App.css';
import ReactGridLayout from 'react-grid-layout';
import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';
import axios from 'axios';

class App extends Component {
  constructor() {
    super();
    this.state = {
      name: 'React',
      listItems: [],
      widgets: []
    }
  }
  render() {
    const listItems = this.state.widgets.map((item) =>
      <div key={item.title.split(' ').join('')} data-grid={{x: item.x, y: item.y, w: item.w, h: item.h}}>
        <div className="widget-mask"></div>
        <iframe className="widget-iframe" title={item.i} src={'https://cloud.petrusenko.pro/apps/'+item.url} width="100%" height="100%">{item.title}</iframe>
      </div>
    );
    return (
      <div>
        <ReactGridLayout className="layout" cols={12} rowHeight={30} width={1200} margin={[10,10]}>
          {listItems}
        </ReactGridLayout>
      </div>
    );
  }
  componentWillMount() {
    // axios.get('https://cloud.petrusenko.pro/dashboard/apps', {
    axios.get('http://178.218.115.169:5000/dns.json', {
    }).then((response) => {
      var widgets = response.data.widgets;
      widgets.forEach(function(item, i){
        item.x = 0;
        item.y = 0;
        item.w = 6;
        item.h = 10;
        item.name = item.title.split(' ').join('');
        item.i = i.toString();
        item.y = i*10;
      });
      this.setState({widgets: widgets});
    }, (err) => {
      console.log(err)
    })
  }
}

export default App;
