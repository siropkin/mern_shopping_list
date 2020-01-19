import React, { Component } from 'react';
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Form,
  FormGroup,
  Input,
  NavLink,
  Alert
} from 'reactstrap';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { register } from "../../actions/authActions";
import { clearErrors } from "../../actions/errorsActions";


class SignUpModal extends Component {
  state = {
    modal: false,
    name: '',
    email: '',
    password: '',
    msg: null
  };

  static propTypes = {
    isAuthenticated: PropTypes.bool,
    error: PropTypes.object.isRequired,
    register: PropTypes.func.isRequired,
    clearErrors: PropTypes.func.isRequired
  };

  componentDidUpdate(prevProps) {
    const { error, isAuthenticated } = this.props;
    if (error !== prevProps.error) {
      // Check for register error
      if (error.id === 'REGISTER_FAIL') {
        this.setState({ msg: error.msg.msg });
      } else {
        this.setState({ msg: null })
      }
    }

    // If authenticated, then close modal
    if (this.state.modal && isAuthenticated) {
      this.toggle();
    }
  }

  toggle = () => {
    // Clear errors
    this.props.clearErrors();
    this.setState({
      modal: !this.state.modal
    });
  };

  onChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  onSubmit = e => {
    e.preventDefault();

    const { name, email, password} = this.state;

    // Create user object
    const newUser = { name, email, password };

    // Attempt to register
    this.props.register(newUser);
  };

  render() {
    return(
      <div>
        <NavLink onClick={this.toggle} href={"#"}>
          Sign up
        </NavLink>

        <Modal
          isOpen={this.state.modal}
          toggle={this.toggle}
        >
          <ModalHeader toggle={this.toggle}>Sign up</ModalHeader>
          <ModalBody>
            { this.state.msg ? <Alert color={"danger"}>{ this.state.msg }</Alert> : null }
            <Form onSubmit={this.onSubmit}>
              <FormGroup>
                <Input
                  className={"mb-2"}
                  type={"text"}
                  name={"name"}
                  id={"name"}
                  placeholder={"Name"}
                  onChange={this.onChange}
                />

                <Input
                  className={"mb-2"}
                  type={"email"}
                  name={"email"}
                  id={"email"}
                  placeholder={"Email"}
                  onChange={this.onChange}
                />

                <Input
                  type={"password"}
                  name={"password"}
                  id={"password"}
                  placeholder={"Password"}
                  onChange={this.onChange}
                />

                <Button
                  color={"dark"}
                  style={{marginTop: '2rem'}}
                  block
                >Sign up</Button>
              </FormGroup>
            </Form>
          </ModalBody>

        </Modal>
      </div>
    )
  };
}

const mapStateToProps = state => ({
  isAuthenticated: state.auth.isAuthenticated,
  error: state.error
});

export default connect(
  mapStateToProps,
  { register, clearErrors }
)(SignUpModal);
