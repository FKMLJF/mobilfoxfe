import { UserDto } from './user-dto.model';

describe('UserDto', () => {
  it('should create an instance', () => {
    // @ts-ignore
    expect(new UserDto()).toBeTruthy();
  });
});
