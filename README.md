# Keycloak Demo

This project explores using Keycloak as an SSO solution to handle identity and access management across multiple applications.

**Users**

| User | LDAP Attributes |
| --- | --- |
| `rsmith` | cn, sn, givenName, mail, postalAddress, telephonenumber, uid, userPassword |
| `jpatel` | cn, sn, givenName, mail, postalAddress, telephonenumber, uid, userPassword |
| `fwatkins` | cn, sn, givenName, mail, postalAddress, telephonenumber, uid, userPassword |

**Realm Roles**

| Role | Users | Description |
| --- | --- | --- |
| `admin` | rsmith | Grants administrative privileges. |
| `user` | rsmith, fwatkins | Grants read/write privileges.  |
| `guest` | rsmith, jpatel | Grants read privileges |
| `default-roles-demo` | rsmith, fwatkins, jpatel | Grants default Keycloak realm roles. |