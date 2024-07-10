import { AuthRole } from "../enums/auth-role.enum";
import { IUser } from "../interfaces/user.interface";

export const DateAgo = (value: string): string => {
    if (value) {
        const seconds: number = Math.floor((+new Date() - +new Date(`${value}Z`)) / 1000);
        
        if (seconds < 29) {
          return 'Just now';
        }
  
        const intervals: { [key: string]: number } = {
          'year': 31536000,
          'month': 2592000,
          'week': 604800,
          'day': 86400,
          'hour': 3600,
          'minute': 60,
          'second': 1,
        };
        let counter;
  
        for (const i in intervals) {
          counter = Math.floor(seconds / intervals[i]);
  
          if (counter > 0) {
            if (counter === 1) {
              return `${counter} ${i} ago`;
            } else {
              return `${counter} ${i}s ago`;
            }
          }
        }
      }
      
      return value;
};

export const DateLocaleString = (value: string): string => {
    const date: Date = new Date(value);
    const opts: Intl.DateTimeFormatOptions = {
        dateStyle: 'short',
        timeStyle: 'short',
        hour12: true,
    };
    
    return date.toLocaleString(undefined, opts);
};

export const GetInitials = (user: IUser) => {
  if (user == null) {
    return '';
  }

  return `${user.first_name[0]?.toUpperCase()}${user.last_name[0]?.toUpperCase()}`;
};

export const IsUserInRole = (authRole: AuthRole, tokenRoles: string[]): boolean => {
  return tokenRoles.includes(authRole);
};

export const IsAuthUser = (authUsername: string, username: string): boolean => {
  return authUsername === username;
};

export const IsAccessAllowed = (isAuthUser: boolean, tokenRoles: string[]): boolean => {
  const administrator: boolean = IsUserInRole(AuthRole.Administrator, tokenRoles);
  const contributor: boolean = IsUserInRole(AuthRole.Contributor, tokenRoles);
  const observer: boolean = IsUserInRole(AuthRole.Observer, tokenRoles);
  
  if (administrator) {
    // Administrators can edit/delete comments and modify issues created by any user.
    return true;
  } else if (isAuthUser && contributor) {
    // Contributors can only edit/delete comments and modify issues they have created.
    return true;
  } else if (observer) {
    // Observers can't edit/delete comments or modify issues.
    return false;
  } else {
    // Refuse access for everything else.
    return false;
  }
};