# wakeupsoc
> A tool to test SOCs againt fake traffic through ToR

---
## Usage
- npm install
- At the top of wakeupsoc.js you can configure the following parameters :
    * NB_REQUEST : number of requests to send
    * REFRESH_IP : refresh IP every x requests
    * TIMEOUT : timeout in second for doing a request
    * At line 58 the configuration of ToR
- In rules.js you can specify the fake traffic
- In urls add your targets
- Start ToR
- node wakeupsoc.ks
