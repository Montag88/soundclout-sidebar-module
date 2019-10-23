var React = require('react');
var enzyme = require('enzyme');
// var Namelist = require('./Namelist.jsx');

class Test extends React.Component {
   constructor(props){
      super(props);
      this.state = {
         test: 'test'
      }
   }


   render(){
      return(
         <div className='test'>{'test'}</div>
      )
   }
}

var wrap = enzyme.shallow(<Test />)

describe('First React component test with Enzyme', () => {
   it('renders without crashing', () => {
      wrap;
    });
});

describe('if state contains test and if it is equal to test', () => {
   it('contains test in state', () => {
      expect(wrap.state('test')).toEqual('test')
   })
});

describe('if className = test', () => {
   it('contains className equal to test', () => {
      expect(wrap.hasClass('test')).toBe(true)
   })
});

describe('if state is defined', () => {
   it('contains a state', () => {
      expect(wrap.state()).toBeDefined()
   })
});

describe('if contains specific div', () => {
   it('contains the div tag', () => {
      expect(wrap.equals(<div className='test'>{'test'}</div>)).toBe(true)
   })
});

describe('props existence', () => {
   it('props exist', () => {
      expect(wrap.props()).toBeDefined()
   })
});