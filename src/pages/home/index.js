import './index.less'
import { Layout,Button,Input,Divider } from 'antd'
import React, { Component } from 'react'


const { Header, Footer, Content} = Layout;
const { TextArea } = Input;

let _this;


export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
        contentValue:"我要去[一|二]的[q]地方吃(三|四)可以吗？",
        result:'',
    
    }
    _this=this;
  }
  

 goOutput =(e)=>{
     let result = "";
     let source = this.state.contentValue;
     let arrayA = _this.getResultsFrom(source);
     console.log(arrayA)
     result= source;
     this.setState({
         result:result,
     })
 };


  getResultsFrom(str) {
    let re = /\[[\s\S][^\]]*\]/g;
    let reB = /\([\s\S][^)]*\)/g;

    let results = [];
    let resultsB = [];
    let index=0;
 
    // 数据预处理
    if (str != null && str.length > 0) {
        while (true) {
            let temp = re.exec(str)
            if (temp) {
              let t = temp[0].replace(/\[|\]/g,"");
              let array = t.split("|");
              array[array.length-1]='';
              for (let index = 0; index < array.length; index++) {
                results.push(str.replace(temp[0],array[index]));
              }
              str = str.replace(temp[0]);
            } else {
              break
            }
          }
          while (true) {
            let temp = reB.exec(str)
            if (temp) {
              resultsB.push({
                text: temp[0], index: temp.index, 
              })
             
            } else {
              break
            }
          }
       //results = re.exec(str)
       //results.list = str.match(re);
       
    }
    
    console.log(str.replace(reB),'#');
    console.log(results)
    console.log(resultsB)
    return results;
};
  componentDidMount () {
  }
  render () {
    return (
        <div className="P-home">
                <Layout>
                    <Header>Header</Header>
                    <Content className='content'>
                            
                            <h1>给定一行文本，输出它所有可能的普通文本的排列组合</h1>
                            <div className="ipt-con">
                            <TextArea value={this.state.contentValue} onChange={e => this.setState({ contentValue: e.target.value })} rows={4} />
                            <Divider />
                            <Button type="primary" onClick={this.goOutput}>输出</Button>
                            <Divider />
                            <TextArea value={this.state.result} rows={4} />
                            </div>
                    </Content>
                    <Footer>Footer</Footer>
                </Layout>

        </div>
    )
  }
}