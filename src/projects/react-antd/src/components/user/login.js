import React, { Component } from 'react';
import {
  Button, Row, Form, Input, Col, message
} from 'antd';
import { observer, inject } from 'mobx-react';
import { withRouter } from 'react-router-dom';
import { history, PATHS } from 'src/router';
import styles from './login.less';

const FormItem = Form.Item;
const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 20 },
};
@inject('user')
@observer
class Login extends Component {
  constructor(props) {
    super(props);
    const { user: { isLogin } } = props;
    if (isLogin) {
      history.replace(PATHS.HOME_PAGE);
    }
  }

  handleOk = () => {
    const {
      form: { validateFieldsAndScroll },
      user: { login }
    } = this.props;

    validateFieldsAndScroll(async (errors, data) => {
      if (errors) {
        return;
      }
      try {
        await login(data);
        history.replace(PATHS.HOME_PAGE);
      } catch (err) {
        message.error(err.message);
      }
    });
  }


  render() {
    const { form: { getFieldDecorator } } = this.props;
    return (
      <div className={styles.login}>
        <div className={styles['login-title']}>
            登录
        </div>
        <form className={styles.form}>
          <FormItem {...formItemLayout} label="账号">
            {getFieldDecorator('username', {
              rules: [
                {
                  required: true,
                  message: '请填写用户名',
                }
              ]
            })(
              <Input
                size="large"
                placeholder="请填写用户名/手机号/邮箱"
                onPressEnter={this.handleOk}
              />
            )}
          </FormItem>
          <FormItem {...formItemLayout} label="密码">
            {getFieldDecorator('password', {
              rules: [
                {
                  required: true,
                  message: '请输入密码',
                }
              ]
            })(<Input
              size="large"
              type="password"
              placeholder="请输入密码"
              onPressEnter={this.handleOk}
            />)}
          </FormItem>
          <Row>
            <Col offset={4} span={20}>
              <Button size="large" type="primary" onClick={this.handleOk}>
                登录
              </Button>
            </Col>
          </Row>
        </form>
      </div>
    );
  }
}

export default withRouter(Form.create()(Login));
