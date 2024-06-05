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
            <label className="formFieldLabel" htmlFor="username">
              Nhập mật khẩu
            </label>
            <input
              type="password"
              id="old-password"
              className="formFieldInput"
              placeholder="Nhập mật khẩu"
              name="old-password"
              
              required
            />
          </div>

          <div className="formField">
            <label className="formFieldLabel" htmlFor="password">
              Mật khẩu mới
            </label>
            <input
              type="password"
              id="new-password"
              className="formFieldInput"
              placeholder="Nhập mật khẩu mới"
              name="new-password"
              required
            />
          </div>
          <div className="formField">
            <label className="formFieldLabel" htmlFor="password">
              Nhập lại mật khẩu mới
            </label>
            <input
              type="password"
              id="new-password-confirm"
              className="formFieldInput"
              placeholder="Nhập lại mật khẩu mới"
              name="new-password-confirm"
              required
            />
          </div>
        </form>
        <div className="formField submit-btn">
          <button
            className="formFieldButton"
            
          >
            Đổi mật khẩu 
          </button>
        </div>
      </div>
      );
    }
  }

  export default ChangePassword;