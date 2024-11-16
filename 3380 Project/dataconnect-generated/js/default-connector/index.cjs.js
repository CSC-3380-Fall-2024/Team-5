const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: '3380 Project',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

