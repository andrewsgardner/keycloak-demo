# Keycloak Demo

This project explores using Keycloak as an SSO solution to handle identity and access management across multiple applications.

Centralized authentication is provided using OpenLDAP, which stores the organizational unit (OU) types: People and RealmRoles.

**OU: People**

| User | LDAP Attributes |
| --- | --- |
| `rsmith` | cn, sn, givenName, mail, postalAddress, telephonenumber, uid, userPassword |
| `fwatkins` | cn, sn, givenName, mail, postalAddress, telephonenumber, uid, userPassword |
| `jpatel` | cn, sn, givenName, mail, postalAddress, telephonenumber, uid, userPassword |

**OU: RealmRoles**

| Role | Users | Description |
| --- | --- | --- |
| `administrator` | rsmith | Grants administrative privileges. |
| `contributor` | rsmith, fwatkins | Grants write privileges. |
| `observer` | rsmith, fwatkins, jpatel | Grants read privileges. |
| `default-roles-demo` | rsmith, fwatkins, jpatel | Grants default Keycloak realm roles. |