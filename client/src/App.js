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
      listItems: '',
      widgets: ''
    };
  }
  render() {
    var listItems;
    var widgets;
    axios.get('http://localhost:5000/dns.json', {
    }).then((response) => {
      widgets = response.data.widgets;
      var y = 0;
      widgets.forEach(function(item, i){
        item.x = 0;
        item.y = 0;
        item.w = 12;
        item.h = 10;
        item.name = item.title.split(' ').join('');
        item.i = i.toString();
        // i++
        y+=10;
      })
      // this.setState({widgets: widgets});
      // this.pages = response.data.pages
      // console.log(widgets)
      // widgets = widgets;
      // this.setState({
      //   listItems: widgets.map((number) =>
      //     <div key={number.i}>
      //       <iframe title={number.i} src={'https://cloud.petrusenko.pro/apps/'+number.url} width="100%" height="100%">{number.title}</iframe>
      //     </div>
      //   )
      // });
      listItems = widgets.map((item) =>
        <div key={item.i}>
          <div key={item.i}>
            <iframe title={item.i} src={'https://cloud.petrusenko.pro/apps/'+item.url} width="100%" height="100%">{item.title}</iframe>
          </div>
        </div>
      );
      console.log(widgets)
    }, (err) => {
      console.log(err);
    })

    // console.log(this.state.widgets);
    // var layout = this.state.widgets;
    // console.log(this.state.widgets)
    return (
      <div>
        <ReactGridLayout className="layout" layout={widgets} cols={12} rowHeight={30} width={1200}>
          {listItems}
        </ReactGridLayout>
      </div>
    );
  }
  componentWillMount() {
    // axios.get('http://localhost:5000/dns.json', {
    // }).then((response) => {
    //   let widgets = response.data.widgets
    //   var y = 0
    //   widgets.forEach(function(item, i){
    //     item.x = 0
    //     item.y = 0
    //     item.w = 12
    //     item.h = 10
    //     item.name = item.title.split(' ').join('')
    //     item.i = i.toString()
    //     // i++
    //     y+=10
    //   })
    //   this.setState({widgets: widgets})
    //   // this.pages = response.data.pages
    //   // console.log(widgets)
    //   // widgets = widgets;
    //   this.setState({
    //     listItems: widgets.map((item) =>
    //       <div key={item.i}>
    //         <iframe title={item.i} src={'https://cloud.petrusenko.pro/apps/'+item.url} width="100%" height="100%">{item.title}</iframe>
    //       </div>
    //     )
    //   });
    // }, (err) => {
    //   console.log(err)
    // })
  }
}

export default App;
