# Data Interoperability Pipeline

The app's main functionality is sending data to Go.Data from a DHIS2 instance where the development of a disease outbreak has been tracked using Event Capture and/or Tracker Capture.

When we want to do so for the first time, we need to start by filling a blank Go.Data instance with the data recorded in a DHIS2 instance using this app. The first thing we need to do would be[connecting-the-app.md](../getting-started/setting-up-the-app/connecting-the-app.md "mention"), [configuring-mappings](../metadata-mappings/configuring-mappings/ "mention") and then [configuring-tasks.md](../interoperability-tasks/configuring-tasks.md "mention"). However, if your system administrator has configured these for you, you only need to know how to run Interoperability Tasks. It is very important to understand that there is a very specific order in which we need to pass the data from DHIS2 to Go.Data: the Data Interoperability Pipeline, as can be seen in figure 9. This is because some of the elements in Go.Data reference other elements, so we need to transfer the "parent" element types (such as Go.Data Locations) before the "child" element types that reference them (such as Go.Data Outbreaks). The figure below illustrates the Data Interoperability Pipeline.

![The Interoperability Task Pipeline. The dashed arrows between events and cases transfer illustrate how events and cases can be transferred in any order with respect to one another.](https://user-images.githubusercontent.com/91990504/174290565-868016e8-d9b1-485e-8c7c-68cba17bf695.png)

## The Data Interoperability Pipeline

The following steps indicate in which order the different elements need to be sent from your DHIS2 instance to your new Go.Data instance. Transferring a given type of element simply means running the previously configured Interoperability Task for that element.&#x20;

### 1. Transferring Locations

The process must start with running the Interoperability Task for Locations (please consult [running-a-task.md](../interoperability-tasks/running-a-task.md "mention") to see how to run a previously configured task). It is very important that this part is carefully done, and in principle, the transfer of locations should be a one-time task.

If changes to the DHIS2 organization unit tree are introduced after a Go.Data instance has been filled with locations, it's crucial that the location tree in Go.Data is manually updated according to the changes introduced in the DHIS2 organization unit tree to avoid that any inconsistencies could cause data loss.

### 2. Transferring Outbreaks

After transferring the locations, we can transfer the outbreaks. The DHIS2 element matching the Go.Data concept of Outbreak is the Program. However, it is possible that the match is not one-to-one. This is the case of the DHIS2 COVID-19 metadata packages, where more than one DHIS2 program maps to the same Go.Data outbreak, that unifies the information from the Cases and the Contacts DHIS2 programs. This means that we may need to send cases and contacts from two different DHIS2 Programs to a single Go.Data Outbreak.

### 3. Transferring Cases / Events

Once the locations and the outbreak have been transferred, it's time to transfer either events or cases. If your DHIS2 instance is based on Event Capture, you will only need to transfer events. If your instance is based on Tracker Capture, you will need to send first your cases, and then your contacts. This last part is important because contacts should be associated to a given case, so cases need to be transferred before contacts.&#x20;

### 4. Transferring Contacts

If your DHIS2 instance is based on Tracker Capture, you will need to transfer your contacts after you have transferred your cases. This would be the last step in the process.&#x20;
