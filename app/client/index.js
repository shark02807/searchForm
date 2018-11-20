import 'babel-polyfill';
import 'svgxuse';
import '../utilities/polyfill.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../../less/sightlyComponentsLess.js';
import '../../sightly-components/vendors/bootstrap-collapse.js';
import './invoke';

import { whyDidYouUpdate } from 'why-did-you-update';
import React from 'react';
import { handleComponent, REACT_COMPONENT_ATTRIBUTE, CONTROLLER_ATTRIBUTE } from './initComponents';

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'aem') {
  whyDidYouUpdate(React);
}
