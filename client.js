/* globals svrx */

// Ref: https://docs.svrx.io/en/plugin/contribution.html#client
const {config } = svrx;

// TODO

// import the react-json-view component
const JsonView = require('react-json-view').default;
const ReactDom = require('react-dom');
const React = require('react');


function Index(props){
    return (<div className="mac-react" > <JsonView {...props} /> </div>);
}

const app = document.getElementById('app-entry');

config.get().then((obj)=>{
    const config = {
        src: window.__JSON_VIEW_OBJECT__,
        theme: obj.theme,
        collapsed: obj.collapsed,
        displayDataTypes: obj.type,
    }
    ReactDom.render( <Index {...config} /> , app);
})


