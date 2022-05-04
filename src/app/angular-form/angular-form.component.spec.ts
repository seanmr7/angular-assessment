import { ComponentFixture, TestBed } from '@angular/core/testing';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AngularFormComponent } from './angular-form.component';
import { By } from '@angular/platform-browser';

describe('AngularFormComponent', () => {
  let component: AngularFormComponent;
  let fixture: ComponentFixture<AngularFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [AngularFormComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AngularFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('form invalid when empty', () => {
    expect(component.form.valid).toBeFalsy();
  });

  it('Test form group element count', () => {
    const form = fixture.debugElement.nativeElement.querySelector('form');
    const inputElements = form.querySelectorAll('input');
    expect(inputElements.length).toEqual(3);
  });

  it('should set the default value of subscription to be Advanced', () => {
    const subscription = component.form.get('subscription');
    expect(subscription?.value).toEqual('Advanced');
  });

  it('should mark email field as invalid when input has incorrect value', () => {
    const email = component.form.get('email');

    email?.setValue('test');
    fixture.detectChanges();

    expect(email?.invalid).toBeTruthy();
  });

  it('should mark email field as valid when it has correct value', () => {
    const email = component.form.get('email');

    email?.setValue('test@test.com');
    fixture.detectChanges();

    expect(email?.valid).toBeTruthy();
  });

  it('should mark password as invalid when value does not meet min length', () => {
    const passoword = component.form.get('password');

    passoword?.setValue('Test1*');
    fixture.detectChanges();

    expect(passoword?.invalid).toBeTruthy();
  });

  it('should mark password as invalid when value does not meet character requirement', () => {
    const passoword = component.form.get('password');

    passoword?.setValue('Test1test');
    fixture.detectChanges();

    expect(passoword?.invalid).toBeTruthy();
  });

  it('should mark password as invalid when value does not meet capital letter requirement', () => {
    const passoword = component.form.get('password');

    passoword?.setValue('test1test*');
    fixture.detectChanges();

    expect(passoword?.invalid).toBeTruthy();
  });

  it('should mark password as valid when value meets character and length requirements', () => {
    const passoword = component.form.get('password');

    passoword?.setValue('Test1test*');
    fixture.detectChanges();

    expect(passoword?.valid).toBeTruthy();
  });

  it('should mark form as invalid when password inputs do not match', () => {
    const email = component.form.get('email');
    const passoword = component.form.get('password');
    const passoword2 = component.form.get('passwordVerification');

    email?.setValue('test@test.com');
    passoword?.setValue('Test1test*');
    passoword2?.setValue('Test*');
    fixture.detectChanges();

    expect(component.form.invalid).toBeTruthy();
  });

  it('should mark form as valid when all fields are valid', () => {
    const testData = {
      email: 'test@email.com',
      password: 'Test1test*',
      passwordVerification: 'Test1test*',
      subscription: 'Advanced',
    };

    component.form.patchValue(testData);
    fixture.detectChanges();

    expect(component.form.valid).toBeTruthy();
  });

  it('should mark form as invalid when fields are not all valid', () => {
    const testData = {
      email: 'test',
      password: 'Test1test*',
      passwordVerification: 'Test1test*',
      subscription: 'Advanced',
    };

    component.form.patchValue(testData);
    fixture.detectChanges();

    expect(component.form.valid).toBeFalsy();
  });
});
