# CAP Extension Application

In this repository you can find a [Side-by-Side](https://extensibilityexplorer.cfapps.eu10.hana.ondemand.com/ExtensibilityExplorer/#/ReadMore) extension application build with [Cloud Application Programming Model](https://cap.cloud.sap/docs/) and Fiori Tools.
![image](https://user-images.githubusercontent.com/74544010/99808444-8c37b480-2b49-11eb-9a88-da63547b0ae6.png)

It contains these folders and files, following the recommended project layout:

File or Folder | Purpose
---------|----------
`app/address-manager-ui` | UI frontend Fiori Elemets app
`srv/` | backend OData service
`mta.yaml` | build and deployment configuration
`package.json` | project metadata and configuration
`readme.md` | this getting started guide
`xs-security.json` | XSUAA service instance configuration file

## How to setup and start the app

0. Prerequisites

* Install Node.js (use the latest LTS version)
* Install @sap/cds-dk globally: `npm i -g @sap/cds-dk`
* Install SQLite if in you are using Windows: https://sqlite.org/download.html
* Install cf CLI: https://docs.cloudfoundry.org/cf-cli/install-go-cli.html
* Install MTA Build Tool: `npm install -g mbt`
* Install CLI plugin for Multi-Target Application (MTA) operations in Cloud Foundry: `cf install-plugin multiapps`
* Create a trial SAP Cloud Platform account with Cloud Foundry subaccount or request access to an account.
* Visual Studio Code, and the VS Code extension SAP Fiori tools - Extension Pack or Business Application Studio.
* Access to S/4 HANA Cloud system and communication arrangement, system and user for [Business Partner (A2X)](https://api.sap.com/api/API_BUSINESS_PARTNER/resource)

1. Clone the project

In a Terminal do:

`git clone https://github.com/stefania-santimbrean/s4hc-ext-cap-app.git`

2. Install dependencies

In a Terminal run the following commands.

Go in the project directory:

`cd s4hc-ext-cap-app`

`npm install`

Go in the UI directory:

`cd app/address-manager-ui`

`npm install`

3. Create Destination configurations in SAP Cloud Platform

In SAP Cloud Platform Cloud Foundry subaccount go in Connectivity>Destinations and create the following:

Destination for CAP:

Configuration | Value
---------|----------
Name | s4hc
Type | HTTP
URL | https://my306116-api.s4hana.ondemand.com/sap/opu/odata/sap/API_BUSINESS_PARTNER
Proxy Type | Internet
Authentication | BasicAuthentication
User | {{User name from Communication User}}
Password | {{Password from Communication User}}

Destination for SAP Cloud SDK:

Configuration | Value
---------|----------
Name | s4hc_simple
Type | HTTP
URL | https://my306116-api.s4hana.ondemand.com/
Proxy Type | Internet
Authentication | BasicAuthentication
User | {{User name from Communication User}}
Password | {{Password from Communication User}}

4. Build and deploy

In a Terminal run the following commands:

`npm run build`

`cf login`

`npm run deploy`

5. Start the app locally

In the root folder create a file named `default-env.json` with the following format:

```
{
    "VCAP_SERVICES": {your_VCAP_SERVICES_object},
    "VCAP_APPLICATION": {your_VCAP_APPLICATION_object}
}
```

In a Terminal do:

`cf env cap-adman-srv`

Copy the VCAP_SERVICES and VCAP_APPLICATION values in the default-env.json file.

In a Terminal do:

`npm start`

You can now go to http://localhost:4004 and check out the CAP backend service.

Open another Terminal or use Split Terminal and do:

`npm run ui`

It will automatically open http://localhost:8080/test/flpSandbox.html#masterDetail-display where you can test the Fiori UI.

## Development steps

If you want to see how the app was build from scratch and how it evolved, you can go through the commits and check out the modifications which were made.

Step | Commit
---------|----------
1 | [Generate extension app with mock data](https://github.com/stefania-santimbrean/s4hc-ext-cap-app/tree/212bbcb71da01bfe7f3070ae5f87fb5c746f1eff) |
2 | [Read API Business Hub sandbox data](https://github.com/stefania-santimbrean/s4hc-ext-cap-app/tree/6c093097c0ad6c9364bf4ed0afa7458bb6dadc8c) |
3 | [Debug local app](https://github.com/stefania-santimbrean/s4hc-ext-cap-app/tree/0c7b6dd59dcb917dcb99722af0e18f7935d0d175) |
4 | [Configure, build and deploy to SCP](https://github.com/stefania-santimbrean/s4hc-ext-cap-app/tree/8c7ae2afd6e5a91adc26a6f300e65028f374254c) |
5 | [Add OData V2 adapter, improved READ handlers](https://github.com/stefania-santimbrean/s4hc-ext-cap-app/tree/6f9794796f751051256d23a6921a61442cc4e20b) |
6 | [Add CREATE, UPDATE, DELETE handlers](https://github.com/stefania-santimbrean/s4hc-ext-cap-app/tree/c4e76d121ae148845723b6963731def63a341bbe) |
7 | [Generate Fiori Elements UI](https://github.com/stefania-santimbrean/s4hc-ext-cap-app/tree/357cea972f170314a71ef7f519f5506cb04e1ce8) |
8 | [List Report annotations and search implementation](https://github.com/stefania-santimbrean/s4hc-ext-cap-app/tree/6b3ded299e44b0b57dc5cb433715a516952f4b2c) |
9 | [Object Page annotations](https://github.com/stefania-santimbrean/s4hc-ext-cap-app/tree/957d05ba0eb19e16ca9c455567ad6b3e2f13eed3) |
10 | [CREATE, UPDATE, DELETE annotations](https://github.com/stefania-santimbrean/s4hc-ext-cap-app/tree/f9f702bc2515e58460c4e8a5b87d1945dadbd47d) |
10 | [READ service handlers refactoring](https://github.com/stefania-santimbrean/s4hc-ext-cap-app/commit/3b420974bafcf97c46552dc7ab5fb4168f02bca4) |


**Blogposts:**
[Part 0](https://blogs.sap.com/2020/11/27/part-0-how-to-build-an-extension-application-for-sap-s-4-hana-cloud-using-cap-sap-cloud-sdk-and-sap-fiori-elements/)
[Part 1](https://blogs.sap.com/2020/12/01/part-1-how-to-build-an-extension-application-for-sap-s-4-hana-cloud-using-cap-sap-cloud-sdk-and-sap-fiori-elements/)
[Part 2](https://blogs.sap.com/2020/12/20/part-2-how-to-build-an-extension-application-for-sap-s-4hana-cloud-using-cap-sap-cloud-sdk-and-sap-fiori-elements/)

