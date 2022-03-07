import KeplerGl from 'kepler.gl';
import { addDataToMap } from 'kepler.gl/actions';
import { processKeplerglJSON } from 'kepler.gl/processors';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import styled from 'styled-components';
import Button from './button';

import matsData from '../mats/kepler.gl_all';
// import sampleData from './data/sample-data';

const MAPBOX_TOKEN = 'pk.eyJ1IjoiY2hlb25naHUiLCJhIjoiY2wwYW9iZ3VmMGJmcjNlbWlnOXJsaXFsMSJ9.BK5RbNIbuck0Rqe-71fDBQ'; // eslint-disable-line
// const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line

const StyledWrapper = styled.div`
  position: absolute;
  width: 100vw;
  height: 100vh;
`;
class App extends Component { 
  state = {
    showBanner: false,
    width: window.innerWidth,
    height: window.innerHeight
  };

  componentDidMount() { 
    const data = processKeplerglJSON(matsData)
    this.props.dispatch(
      addDataToMap(data)
    );
  }
  
  render() {
    return (
      <StyledWrapper>
          <AutoSizer>
            {({height, width}) => (
              <KeplerGl mapboxApiAccessToken={MAPBOX_TOKEN} id="map-demo" width={width} height={height} />
            )}
          </AutoSizer>
      </StyledWrapper>
    )
  }
}

const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({dispatch});

export default connect(mapStateToProps, dispatchToProps)(App);
