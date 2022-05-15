import './index.less'
import { Layout,Button,Input,Divider,List,Radio } from 'antd'
import React, { Component } from 'react'
const { Header, Footer, Content} = Layout;
const { TextArea } = Input;

let _this;

export default class Home extends Component {
  constructor (props) {
    super(props)
    this.state = {
        contentValue:"我要去[一|二]的地方吃(三|四)可以吗？",
        result:[],
       
      
        options: [
          { label: '默认', value: '我要去[一|二]的地方吃(三|四)可以吗？' },
          { label: '多组结构', value: '我要去[一|二]的[q]地方吃(三|四)可以(五|六)吗？' },
          { label: '一组规则A', value: '我要去[一|二]的地方吃可以吗？' },
          { label: '一组规则B', value: '我要去的地方吃(三|四)可以吗？' },
          { label: '0组规则', value: '我要去的地方吃可以吗？' },
        ]
    }
    _this=this;
  }
  onChangeTest = (e) => {
    console.log('radio checked', e.target.value);
  
    this.setState({
      contentValue:e.target.value,
  })
  };
  goOutput =(e)=>{
      let source = this.state.contentValue;
      let arrayA = _this.getResultsFrom(source);
      this.setState({
          result:arrayA,
      })
  };

  getResultsFrom(str) {
    let re = /\[[\s\S][^\]]*\]/g;
    let reB = /\([\s\S][^)]*\)/g;
    let results = [];
    //rule A
    let strs= [];
    if (str != null && str.length > 0) {
      
     
     
      strs.push(str);
      let total = str.match(re);
      if(total!==null){
        for (let index = 0, m=total.length; index < m; index++) {
          //console.log(index+"-x-"+m)
          let t = total[index].replace(/\[|\]/g,"");
          let array = t.split("|");
          array[array.length]='';
          for (let indexs = 0,n=array.length; indexs < n; indexs++) {
            //console.log(indexs+"-s-"+n)
            for (let indext = 0,j=strs.length; indext < j; indext++) {
              //console.log(indext+"-t-"+j)
              let item = strs[indext].replace(total[index],array[indexs]);
              results.push(item);
            }
            
            if(indexs===n-1){
              strs = results;
              results=[]
            }

          }
          
        }
      }
      
      //rule B
      let totalB = strs[0].match(reB);
     
      if(totalB!==null){
          for (let index = 0, m=totalB.length; index < m; index++) {
        
            let t = totalB[index].replace(/\(|\)/g,"");
            let array = t.split("|");
            for (let indexs = 0,n=array.length; indexs < n; indexs++) {
              
              for (let indext = 0,j=strs.length; indext < j; indext++) {
              
                let item = strs[indext].replace(totalB[index],array[indexs])
                results.push(item);
                
              }
              if(indexs===n-1){
                strs = results;
                results=[]
              }

            }
          
          }
      }




    }
    console.log(strs)
    return strs;
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
                              <Radio.Group options={this.state.options} onChange={this.onChangeTest} value={this.state.contentValue} />
                              <Divider />
                              <Button type="primary" onClick={this.goOutput}>输出</Button>
                              <Divider />
                              <List
                                size="small"
                                bordered
                                dataSource={this.state.result}
                                renderItem={item => <List.Item>{item}</List.Item>}
                              />
                              
                            </div>
                    </Content>
                    <Footer>Footer</Footer>
                </Layout>

        </div>
    )
  }
}