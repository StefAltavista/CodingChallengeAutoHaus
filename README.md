MEMBERTEAM:
Autohaus-Royal coding challenge

To Start - Development mode:

Start the server
Terminal 1: npm start

Webpack create and open bundel.js in browser
Terminal 2: npm run dev

To build - Production Mode
npm run build

\*Notes:

AddData.js
Because a new user is allowed to skip this step, <AddData/> is the component dedicated to adding information to a new employee, is divided in steps, connects to missingData object in global state (called in home) in order to check which data is missing. if theres missing data a notification pops up.
It might be a bit overkill, the component could be divided into multiple smaller and reusable parts. but as it ist i thougth its an interesting add and twist to add to the challenge.

Add Employee Manually
At the end of the Manual insertion of a new user, a message saying "an email was sent to {user.email} with the password..."
this is not real even if i could have implemented it. I simply believe that would be the right approach.
the password of the newly created account is aways gonna be Name+Surname

Add Employees via CSV
The <AddCsv/> component is based on the structure sent to me by Autohaus. A german CSV without email addresses.

Session Expires in 30 minutes.

Most of the cyber-security checks have NOT been implemented.
