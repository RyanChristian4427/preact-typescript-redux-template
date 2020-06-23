// Necessary as preact exports a component type that needs `render` to be implemented
// but redux-persist does not implement this as this is not something React does.

import fs from 'fs';

const reduxPersistIntegrationPath = './node_modules/redux-persist/types/integration/react.d.ts';

fs.readFile(reduxPersistIntegrationPath, 'utf8', function(err, data) {
    if (err) {
        return console.log(err);
    }
    const result = data.replace(
        /class PersistGate extends React.PureComponent<PersistGateProps, PersistorGateState> {}/g,
        'class PersistGate extends React.PureComponent<PersistGateProps, PersistorGateState> { render(): ReactNode }',
    );

    fs.writeFile(reduxPersistIntegrationPath, result, 'utf8', function(err) {
        if (err) return console.log(err);
    });
});
