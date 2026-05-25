export enum RoleLevel {
  ADMIN = 'ADMIN',
  EDITOR = 'EDITOR',
  USER = 'USER',
  CLIENT = 'CLIENT',
}

export enum AccountStatus {
  ON = 'ON',
  OFF = 'OFF',
}

export interface AccountFormDto {
  name: string
  email: string
  roleLevel: RoleLevel
  status: AccountStatus
}
