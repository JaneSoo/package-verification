# package-verification ![Package Verification logo](https://github.com/JaneSoo/package-verification/blob/master/icons/news-32.png?raw=true)

Package-verification is a chrome extension built to verify the transaction on Ethereum Rinkeby test network. The extension works when landing on a CKAN api package list site with the following format: `/^(http|https):\/\/[^ "]+\/api\/3\/action\/package_list/`. For example: 
1. https://data.gov.sk/api/3/action/package_list
2. https://opendata.praha.eu/api/3/action/package_list

Package verification is possible to verify only if the transaction has been pushed to the network. 

### Prerequisite
Package-verification uses browserify to enable usage of node module in Javascript:
- Install [Browserify](http://browserify.org/)
- Install node and `run npm install`

### To spin up the extention
- Upload the project folder to chrome://extensions/
- From there select "load unpacked"
- Then, it will be possible to see the logo of the extension and pin for futher use
