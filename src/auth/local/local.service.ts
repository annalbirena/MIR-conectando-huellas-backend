import type { User } from '@api/user/user.type';
import { signToken } from '@auth/auth.service';

export function createAuthResponse(input: User) {
  const payload = {
    id: input.id,
    email: input.email,
  };

  const token = signToken(payload);

  const profile = {
    fullName: `${input.name} ${input.lastName}`,
    avatar: input.avatar,
    role: input.role,
  };

  return {
    token,
    profile,
  };
}
