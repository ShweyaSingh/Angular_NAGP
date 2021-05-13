import { AuthenticationService } from '@ecommerce/core';
import { of } from 'rxjs';
import { UserDetail } from '../models';

describe('AuthenticationService', () => {
  let httpClientSpy: { get: jasmine.Spy; post: jasmine.Spy };
  let authenticationService: AuthenticationService;
  let userDetail: UserDetail;

  beforeEach(() => {
    httpClientSpy = jasmine.createSpyObj('HttpClient', ['post']);
    authenticationService = new AuthenticationService(httpClientSpy as any);
    userDetail = {
      id: 1,
      name: 'Shweta',
      email: 'shweta@gmail.com',
      password: '12345',
      address: '',
      phone: '2233445566',
    };
  });

  it('should be created.', () => {
    expect(authenticationService).toBeTruthy();
  });

  it('service should logout user.', () => {
    authenticationService.logout();
    expect(authenticationService.currentUserValue).toEqual(null);
    expect(localStorage.getItem('currentUser')).toEqual(null);
  });

  it('service should login user.', () => {
    httpClientSpy.post.and.callFake(() => {
      return of(userDetail);
    });
    authenticationService
      .login('test', 'test')
      .subscribe((response: UserDetail) => {
        expect(response.id).toEqual(userDetail.id);
        expect(authenticationService.currentUserValue).toEqual(response);
        expect(localStorage.getItem('currentUser')).toEqual(
          JSON.stringify(response)
        );
      });
    expect(httpClientSpy.post.calls.count()).toBe(1);
  });
});
