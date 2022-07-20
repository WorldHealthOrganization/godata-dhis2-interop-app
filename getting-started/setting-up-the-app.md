# Setting Up the App

The app configuration should only need to be done once, at installation time, by your DHIS2 administrator. It is key that the person configuring the app is aware of the use-case and metadata collected by both DHIS2 and Go.Data.

There are three things that need to be configured before using the app to transfer data between DHIS2 and Go.Data. First, it's necessary to connect the app to the Go.Data and DHIS2 instances. Then, we need to configure the two types of elements present in the app: Metadata Mappings, and Interoperability Tasks.

## Connecting the App

### Go.Data Configuration

The app requires your Go.Data instance's URL, complete with host and port, and the username and password for your Go.Data user. The credentials are safely encrypted and stored in DHIS2's _userDataStore_ according to DHIS2's safety and cybersecurity requirements.

Take into account that the default port for Go.Data is 8000, but it may be different in your instance. Some Go.Data instances have been set as default, in which case it's not necessary to specify a port. If you are unsure about the port or are having trouble configuring the connection, you may contact your system administrator.

![Configuring GoData](https://user-images.githubusercontent.com/91990504/172189552-fffafa9b-c1fc-4857-b06f-688b4616ed0d.png)

### DHIS2 Configuration

The app requires the username and password for your DHIS2 user. If the DHIS2 instance from which you want to transfer data is the one in which the app is installed, you don't need to modify anything else. By default, the app keeps '../../..' as a URL placeholder, referring to the same instance.

However, as a legacy function that will soon be deprecated, the possibility to introduce the URL for a second DHIS2 instance exists, using the DHIS2 instance with the app installed as middleware. In any case, the credentials are safely encrypted and stored in DHIS2's _userDataStore_.

![ConfiguringDHIS2](https://user-images.githubusercontent.com/91990504/172189045-f972b7bf-36cc-4aaa-80f2-714b14fa8ac7.png)

###
