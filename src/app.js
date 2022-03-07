import KeplerGl from 'kepler.gl';
// Kepler.gl actions
import { addDataToMap } from 'kepler.gl/actions';
// Kepler.gl Data processing APIs
import Processors from 'kepler.gl/processors';
// Kepler.gl Schema APIs
import KeplerGlSchema from 'kepler.gl/schemas';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import AutoSizer from 'react-virtualized/dist/commonjs/AutoSizer';

import matsAll from '../mats/kepler.gl_all.json';
import Button from './button';
import nycConfig from './data/nyc-config.json';
import nycTripsSubset from './data/nyc-subset.csv';
import nycTrips from './data/nyc-trips.csv';
import downloadJsonFile from "./file-download";

const MAPBOX_TOKEN = 'pk.eyJ1IjoiY2hlb25naHUiLCJhIjoiY2wwYW9iZ3VmMGJmcjNlbWlnOXJsaXFsMSJ9.BK5RbNIbuck0Rqe-71fDBQ';
// const MAPBOX_TOKEN = process.env.MapboxAccessToken; // eslint-disable-line

class App extends Component {
  getMapConfig() {
    // retrieve kepler.gl store
    const {keplerGl} = this.props;
    // retrieve current kepler.gl instance store
    const {map} = keplerGl;
  
    // create the config object
    return KeplerGlSchema.getConfigToSave(map);
  }
  
  // This method is used as reference to show how to export the current kepler.gl instance configuration
  // Once exported the configuration can be imported using parseSavedConfig or load method from KeplerGlSchema
  exportMapConfig = () => {
    // create the config object
    const mapConfig = this.getMapConfig();
    // save it as a json file
    downloadJsonFile(mapConfig, 'kepler.gl.json_'+ new Date().toLocaleDateString());
  };

  initData = () => { 
    const { datasets, config } = matsAll;
    const mapToLoad = KeplerGlSchema.load(datasets, config);

    this.props.dispatch(addDataToMap(mapToLoad));
  }

  initCsvData = () => { 
     // Use processCsvData helper to convert csv file into kepler.gl structure {fields, rows}
     const data = Processors.processCsvData(nycTrips);
     // Create dataset structure
     const dataset = {
       data,
       info: {
         id: 'my_data'
         // this is used to match the dataId defined in nyc-config.json. For more details see API documentation.
         // It is paramount that this id mathces your configuration otherwise the configuration file will be ignored.
       }
     };
     // addDataToMap action to inject dataset into kepler.gl instance
     this.props.dispatch(addDataToMap({datasets: dataset, config: nycConfig}));
  }

   // Created to show how to replace dataset with new data and keeping the same configuration
   replaceData = () => {
    // Use processCsvData helper to convert csv file into kepler.gl structure {fields, rows}
    const data = Processors.processCsvData(nycTripsSubset);
    // Create dataset structure
    const dataset = {
      data,
      info: {
        id: 'my_data',
        label: 'demo-data'
        // this is used to match the dataId defined in nyc-config.json. For more details see API documentation.
        // It is paramount that this id mathces your configuration otherwise the configuration file will be ignored.
      }
    };

    // read the current configuration
    const config = this.getMapConfig();

    // addDataToMap action to inject dataset into kepler.gl instance
    this.props.dispatch(addDataToMap({datasets: dataset,  config}));
  };
  
  render() {
    return (
      <div style={{ position: 'absolute', width: '100%', height: '100%' }}>
        <div>
          <Button onClick={this.replaceData}>Replace Data</Button>
          {/* <Button onClick={this.exportMapConfig}>Export Config</Button> */}
        </div>
        <AutoSizer>
          {({height, width}) => (
            <KeplerGl
              mapboxApiAccessToken={MAPBOX_TOKEN}
              id="map"
              appName="MATS MAP"
              version="2.0.0"
              width={width}
              height={height}
            />
          )}
        </AutoSizer>
      </div>
    );
  }

  componentDidMount() {
    this.initData();
  }

}

const mapStateToProps = state => state;
const dispatchToProps = dispatch => ({dispatch});


export default connect(mapStateToProps, dispatchToProps)(App);
