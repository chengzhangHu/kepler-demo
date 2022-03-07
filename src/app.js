import KeplerGl from 'kepler.gl';
// Copyright (c) 2022 Uber Technologies, Inc.
//
// Permission is hereby granted, free of charge, to any person obtaining a copy
// of this software and associated documentation files (the "Software"), to deal
// in the Software without restriction, including without limitation the rights
// to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
// copies of the Software, and to permit persons to whom the Software is
// furnished to do so, subject to the following conditions:
//
// The above copyright notice and this permission notice shall be included in
// all copies or substantial portions of the Software.
//
// THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
// IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
// FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
// AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
// LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
// OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
// THE SOFTWARE.

import React, { Component } from 'react';
import { connect } from 'react-redux';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';
import styled from 'styled-components';
import { addDataToMap } from 'kepler.gl/actions';
import matsData from '../mats/kepler.gl_all';
import { processKeplerglJSON } from 'kepler.gl/processors';
// import sampleIconCsv from './data/nyc-subset.csv';
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
