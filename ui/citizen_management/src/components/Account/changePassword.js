import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { routingPaths } from '../../stores/routingStore';
import userStore from '../../stores/userStore';
import { observer } from 'mobx-react';

class ChangePassword extends Component {
    render() {
      return (
        <div className="formCenter">
        <form className="formFields">
          <div className="formField">
            <label className="formFieldLabelChangePassword" htmlFor="oldPassword">
              Nhập mật khẩu
            </label>
            <input
              type="password"
              id="old-password"
              className="formFieldInputChangePassword"
              placeholder="Nhập mật khẩu"
              name="oldPassword"
            //  value={userStore.options.oldPassword}
              onChange={userStore.handleInputChange.bind(userStore)}
              required
            />
          </div>

          <div className="formField">
            <label className="formFieldLabelChangePassword" htmlFor="newPassword">
              Mật khẩu mới
            </label>
            <input
              type="password"
              id="new-password"
              className="formFieldInputChangePassword"
              placeholder="Nhập mật khẩu mới"
              name="newPassword"
              value={userStore.options.newPassword}
              onChange={userStore.handleInputChange.bind(userStore)}
              required
            />
          </div>
          <div className="formField">
            <label className="formFieldLabelChangePassword" htmlFor="renewPassword">
              Nhập lại mật khẩu mới
            </label>
            <input
              type="password"
              id="new-password-confirm"
              className="formFieldInputChangePassword"
              placeholder="Nhập lại mật khẩu mới"
              name="renewPassword"
           value={userStore.options.renewPassword}
              onChange={userStore.handleInputChange.bind(userStore)}
              required
            />
          </div>
        </form>
        <div className="formField submit-btn">
          <button
            className="formFieldButton"
            onClick={userStore.changePassword.bind(userStore)}
          >
            Đổi mật khẩu 
          </button>
        </div>
      </div>
      );
    }
  }

  export default observer(ChangePassword);