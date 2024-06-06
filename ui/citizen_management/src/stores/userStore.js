import { action, makeObservable, observable } from 'mobx';
import { alertService } from '../components/Alert/alert.service.js';
import APIS from '../services/common.js';
import { routingPaths } from './routingStore.js';

class UserStore {
  options = {
    role: null,
    username: '',
    password: '',
    rePassword: '',
    fullname: '',
    hasAgreed: false,
    oldPassword:'',
    newPassword:'',
    renewPassword:''
  };
  changePass = {
    username: '',
    oldPassword:'',
    newPassword:'',
    renewPassword:'',
  }
  userDetail = null;
  isSignIn = null;
  isSignUp = null;
  isSignOut = null;

  constructor() {
    makeObservable(this, {
      options: observable,
      changePass:observable,
      userDetail: observable,
      isSignIn: observable,
      isSignUp: observable,
      isSignOut: observable,
      getUserDetail: action,
      handleInputChange: action,
      handlePassChange:action,
      signIn: action,
      signUp: action,
      signOut: action,
      changePassword:action,
      renderSignInAlert: action,
      renderSignUpAlert: action,
      renderSignOutAlert: action,
    });
  }

  renderSignOutAlert() {
    alertService.success('Đăng xuất thành công. Hẹn gặp lại bạn lần sau !');
    this.isSignOut = null;
  }

  renderSignInAlert() {
    alertService.success(
      `Đăng nhập thành công. Xin chào ${this.userDetail.fullname}`
    );
    this.isSignIn = null;
  }

  renderSignUpAlert() {
    alertService.success('Đăng ký tài khoản thành công. Mời bạn đăng nhập lại');
    this.isSignUp = null;
  }

  getUserDetail() {
    this.userDetail = JSON.parse(localStorage.getItem('userDetail'));
    this.isSignIn = localStorage.getItem('isSignIn');
    this.isSignUp = localStorage.getItem('isSignUp');
    this.isSignOut = localStorage.getItem('isSignOut');
    localStorage.removeItem('isSignIn');
    localStorage.removeItem('isSignUp');
    localStorage.removeItem('isSignOut');
  }

  handleInputChange(event) {
    let target = event.target;
    let value = target.type === 'checkbox' ? target.checked : target.value;
    let name = target.name;
    this.options[name] = value;
  }
  handlePassChange(event) {
    console.log("check event:", event);
    let target = event.target;
    let value = target.value;
    let name = target.name;
    this.changePass[name] = value;
    console.log(this.changePass);
  }
  validateChangePass(){
    if(this.changePass.newPassword!=this.changePass.renewPassword){
      alertService.error('Nhập lại mật khẩu khác mật khẩu đã nhập');
      return false;
    }
    return true;
  }
  validateSignUpForm() {
    if (this.options.username.length < 6) {
      alertService.error('Tên đăng nhập của bạn cần có ít nhất 6 kí tự');
      return false;
    }

    if (this.options.password.length < 6) {
      alertService.error('Mật khẩu của bạn cần có ít nhất 6 kí tự');
      return false;
    }

    if (this.options.rePassword !== this.options.password) {
      alertService.error('Nhập lại mật khẩu khác mật khẩu đã nhập');
      return false;
    }

    if (this.options.hasAgreed !== true) {
      alertService.error('Bạn chưa đồng ý với các điều khoản dịch vụ');
      return false;
    }

    return true;
  }

  signIn() {
    APIS.user
      .signIn({
        username: this.options.username,
        password: this.options.password,
      })
      .then((res) => {
        window.location.replace(routingPaths.home);
        localStorage.setItem('userDetail', JSON.stringify(res.data));
        localStorage.setItem('isSignIn', 'true');
      })
      .catch((e) => alertService.error(e.response.data));
  }

  signUp() {
    if (!this.validateSignUpForm()) return;

    APIS.user
      .signUp({
        ...this.options,
      })
      .then((res) => {
        window.location.replace(routingPaths.signIn);
        localStorage.setItem('isSignUp', 'true');
      })
      .catch((e) => alertService.error(e.response.data));
  }
  changePassword(){
    if(!this.validateChangePass())
      return;
    APIS.user
      .changePassword({
        username: this.userDetail.username,
        oldPassword: this.options.oldPassword,
        newPassword: this.options.newPassword,
      })
      .then( (res)=>{
         alertService.success(res.data.message);
      })
      .catch((e)=>{
        alertService.error(e.response.data);
      })
  }

  signOut(e) {
    e.preventDefault();
    window.location.replace(routingPaths.home);
    localStorage.removeItem('userDetail');
    localStorage.setItem('isSignOut', 'true');
  }
}

export default new UserStore();
