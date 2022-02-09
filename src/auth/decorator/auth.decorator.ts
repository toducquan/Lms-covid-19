import { SetMetadata } from '@nestjs/common';

export const ROLES_KEY = 'role';
export const Auth = (roles: number) => SetMetadata(ROLES_KEY, roles);
