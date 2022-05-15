import React from 'react';
import { render} from '@testing-library/react';
import Home from './index';
const home = new Home()

test('home',()=> {
    render(<div></div>)
})

test('str含有结构', () => {
    expect(home.state.contentValue).toEqual(
        expect.stringMatching(/\[[\s\S][^\]]*\]/g),
    );
    expect(home.state.contentValue).toEqual(
        expect.stringMatching(/\([\s\S][^)]*\)/g),
    );
});
    


// test("输出排列组合", () => {
//     const str = '我要去[一|二]的地方吃(三|四)可以吗？';
//     expect(Home.result).
//     const result = Home.getResultsFrom(str);
//     expect(result).toMatchObject(['我要去一的q地方吃三可以吗？', '我要去二的q地方吃三可以吗？', '我要去的q地方吃三可以吗？', '我要去一的地方吃三可以吗？', '我要去二的地方吃三可以吗？', '我要去的地方吃三可以吗？', '我要去一的q地方吃四可以吗？', '我要去二的q地方吃四可以吗？', '我要去的q地方吃四可以吗？', '我要去一的地方吃四可以吗？', '我要去二的地方吃四可以吗？', '我要去的地方吃四可以吗？']);
// });
test("输出排列组合", () => {
    expect(home.getResultsFrom('我要去[一|二]的地方吃(三|四)可以吗？')).toEqual(['我要去一的地方吃三可以吗？', '我要去二的地方吃三可以吗？', '我要去的地方吃三可以吗？', '我要去一的地方吃四可以吗？', '我要去二的地方吃四可以吗？', '我要去的地方吃四可以吗？']);
});