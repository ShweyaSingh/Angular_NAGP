import { NotificationService } from '@ecommerce/core';
import { of } from 'rxjs';

describe('CartService', () => {
  let toastrSpy: {
    success: jasmine.Spy;
    error: jasmine.Spy;
    warning: jasmine.Spy;
    info: jasmine.Spy;
  };
  let notificationService: NotificationService;

  beforeEach(() => {
    toastrSpy = jasmine.createSpyObj('ToastrService', [
      'success',
      'error',
      'warning',
      'info',
    ]);
    notificationService = new NotificationService(toastrSpy as any);
  });

  it('should be created.', () => {
    expect(notificationService).toBeTruthy();
  });

  it('service should have called success method of toastr.', () => {
    toastrSpy.success.and.returnValue(of({}));
    notificationService.showSuccess('test');
    expect(toastrSpy.success).toHaveBeenCalled();
  });

  it('service should have called error method of toastr.', () => {
    toastrSpy.error.and.returnValue(of({}));
    notificationService.showError('test');
    expect(toastrSpy.error).toHaveBeenCalled();
  });

  it('service should have called warning method of toastr.', () => {
    toastrSpy.warning.and.returnValue(of({}));
    notificationService.showWarning('test');
    expect(toastrSpy.warning).toHaveBeenCalled();
  });

  it('service should have called info method of toastr.', () => {
    toastrSpy.info.and.returnValue(of({}));
    notificationService.showInfo('test');
    expect(toastrSpy.info).toHaveBeenCalled();
  });
});
