# Overview

The Interoperability Tasks section is dedicated to managing integration tasks. Interoperability tasks are the executable bits of the app. Each Interoperability Task uses a specific Metadata Mapping to fetch data from the sender instance, transform it according to the mapping, and send it to and load it into the receiver instance.

Before running a task, we need to configure some of its parameters. If you are working with the DHIS2 COVID-19 standardized metadata packages, you can use and modify to your own will the 5 default Interaoperability Tasks built-in the app, which may save you some time. To load them, simply go to the Interoperability Tasks overview and click on "Load default config". If not, you will need to configure some Interoperability Tasks and run them.

![](<../.gitbook/assets/image (2).png>)

Now we will look into how to configure tasks (if your project does not use the DHIS2 COVID-19 standardized metadata packages), and then we will briefly comment how to deploy the pipeline of Interoperability Tasks executions required to transfer data from your DHIS2 instance to Go.Data.
