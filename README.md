# LANDRs Drone Data Portal
An example frontend for managing drone data. Created with VueJS.

### Development setup

#### Installation
Run the following command to install the application:
```bash
npm install
``` 
#### Configuration
Set the following environment variable to make API requests from the appropriate backend:
`VUE_APP_AXIOS_BASE_URL`
For example, this can be set to `https://ld.landrs.org` to retrieve the relevant schema data.


#### Development server
Run the following command to start a local server instance:
```bash
npm run serve
```


#### Production build
To build the application for production execute the following command:
```bash
npm run build
```
The above command will write the files to be hosted in the `dist` folder.

