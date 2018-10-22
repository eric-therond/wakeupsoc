# wakeupsoc
> A tool to test SOCs against fake traffic through Tor

---
## Usage
- npm install
- At the top of wakeupsoc.js you can configure the following parameters :
    * NB_REQUEST : number of requests to send
    * REFRESH_IP : refresh IP every x requests
    * TIMEOUT : maximum time in seconds to make a request
    * At line 58 the configuration of Tor
- In rules.js you can specify the fake traffic
- In urls.js add your targets
- Start Tor
- node wakeupsoc.js
