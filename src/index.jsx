import React from 'react';
import ReactDom from 'react-dom';
import Loadable from 'react-loadable';
// import Loading from './my-loading-component';
import './index.scss';

const Loading = () => {
  return (
    <div>loading</div>
  );
};

const LoadableComponent = Loadable({
  loader: () => import('./my-component'),
  loading: Loading,
});

export default class Root extends React.Component {
  render() {
    return <LoadableComponent />;
  }
}
ReactDom.render(<Root />, document.getElementById('container'));
