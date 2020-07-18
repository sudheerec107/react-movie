import React, { Component } from 'react';
import { connect } from 'react-redux';
import classes from './auth.module.css';
import Input from '../../components/UI/Input/input';
import Spinner from '../../components/UI/Spinner/Spinner';
import Button from '../../components/UI/Button/Button';
import { Redirect } from 'react-router-dom';
import { auth } from '../../store/actions/auth.action'

export const checkValidity = (value, rules) => {
    let isValid = true;
    if (!rules) {
        return true;
    }
    if (rules.required) {
        isValid = value.trim() !== '' && isValid;
    }

    if (rules.minLength) {
        isValid = value.length >= rules.minLength && isValid;
    }
    if (rules.maxLength) {
        isValid = value.length <= rules.maxLength && isValid;
    }
    return isValid;
}


class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Email Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                validity: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                validity: false,
                touched: false
            },
            passwordCheck: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Re Enter Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                validity: false,
                touched: false
            }
        },
        isSignup: true
    }

    inputChangedHandler = (event, controlName) => {
        const updateControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                validity: checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true
            }
        };
        this.setState({ controls: updateControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value,
            this.state.controls.password.value, this.state.controls.passwordCheck.value, this.state.isSignup);
    }

    swithAuthHandler = () => {
        this.setState(prevState => {
            return { isSignup: !prevState.isSignup }
        });
    }

    render() {
        const formElementArray = [];
        for (let key in this.state.controls) {
            formElementArray.push({
                id: key,
                config: this.state.controls[key]
            })
        }

        let form = formElementArray.map(formElement => {
            return (this.state.isSignup && formElement.id === 'passwordCheck') ? null: (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.validity}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={(event) => this.inputChangedHandler(event, formElement.id)} />
                );

        })
        if (this.props.loading) {
            form = <Spinner />
        }

        let errorMessage = null;
        if (this.props.error) {
            errorMessage = this.props.error.msg;
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to="movies" />
        }
        return (
            <div className={classes.Auth}>
                <div className={classes.Red}>{errorMessage}</div>
                {authRedirect}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <Button btnType="Success" disabled={false}>{this.state.isSignup ? 'Log in' : 'Sign up'}</Button>
                </form>
                <Button clicked={this.swithAuthHandler} btnType="Danger">Switch To {this.state.isSignup ? 'Sign up' : 'Log in'}</Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token != null,
    }

}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, passwordCheck, isSignUp) => dispatch(auth(email, password, passwordCheck, isSignUp)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);
