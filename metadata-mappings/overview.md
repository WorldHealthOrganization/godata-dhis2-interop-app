# Overview

Metadata Mappings contain the associations between DHIS2 and Go.Data entities, and they are used by the app to map the data elements from one software to the other. This mapping is necessary because the schemas of DHIS2 and Go.Data can be similar, but they are not fully equivalent. For example, a DHIS2 "organization unit" is called a "Location" in Go.Data. These differences and others need to be addressed in a case-by-case manner to integrate both schemas as much as possible.

In the Metadata Mapping section's overview screen, as seen in figure 3, we can add, edit, and delete metadata mappings.

![Figure 3. Metadata Mapping overview screen](https://user-images.githubusercontent.com/91990504/161981359-96d753bc-43e0-4bc7-924d-72a2bf01ded8.png)

Note: In the Mappings overview screen, we can load four built-in default mappings by clicking on the "Load default config" button. These mappings have been specifically created for the DHIS2 COVID-19 standardized programs and allow automatised transfer of data from DHIS2 instances using those programs to Go.Data without further modifications. Any other DHIS2 programs would require the creation of a new mapping.

