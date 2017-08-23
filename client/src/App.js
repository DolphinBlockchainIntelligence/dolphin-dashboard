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
        <iframe title={item.i} src={'https://cloud.petrusenko.pro/apps/'+item.url} width="100%" height="100%">{item.title}</iframe>
      </div>
    );
    return (
      <div>
        <ReactGridLayout className="layout" cols={12} rowHeight={30} width={1200} margin={[30,30]}>
          {listItems}
        </ReactGridLayout>
      </div>
    );
  }
  componentWillMount() {
    axios.get('https://cloud.petrusenko.pro/dashboard/apps', {
    // axios.get('http://localhost:5000/dns.json', {
    }).then((response) => {
      var widgets = response.data.widgets;
      var y = 0;
      widgets.forEach(function(item, i){
        item.x = 0
        item.y = 0
        item.w = 12
        item.h = 10
        item.name = item.title.split(' ').join('')
        item.i = i.toString()
        y+=10
      });
      this.setState({widgets: widgets});
    }, (err) => {
      console.log(err)
    })
  }
}

export default App;
