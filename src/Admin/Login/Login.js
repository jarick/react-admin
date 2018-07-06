import React from 'react';
import PropTypes from 'prop-types';
import className from 'classnames';
import Loader from 'react-loader';

const Login = ({ send, errors, error, data, actions }) => {
  const handleSubmit = event => {
    actions.handleSubmit();
    event.preventDefault();
  };

  const handleInput = field => event => {
    actions.handleInput(field, event.target.value);
    event.preventDefault();
  };

  const getErrors = (field) => errors.filter(item => item.path === field);

  return (
    <div className="container">
      <div className="row center">
        <h4>Авторизация</h4>
      </div>
      {error && (
        <div className="row danger">
          <div className="eight columns offset-by-two">
            <ul>
              <li> Пользователь с таким логином и паролем не найден </li>
            </ul>
          </div>
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className={className('row', { danger: getErrors('username').length > 0 } )}>
          <div className="eight columns offset-by-two">
            <label htmlFor="username">Логин</label>
            <input
              id="username"
              className="u-full-width"
              placeholder="Введите логин"
              onChange={handleInput('username')}
              type="text"
              value={data.username}
            />
            {getErrors('username').length > 0 && (
              <ul>
                {getErrors('username').map(item => (
                  <li key={item.type}>{item.message}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className={className('row', { danger: getErrors('password').length > 0 } )}>
          <div className="eight columns offset-by-two">
            <label htmlFor="password">Пароль</label>
            <input
              id="password"
              className="u-full-width"
              placeholder="Введите пароль"
              type="password"
              value={data.password}
              onChange={handleInput('password')}
            />
            {getErrors('password').length > 0 && (
              <ul>
                {getErrors('password').map(item => (
                  <li key={item.type}>{item.message}</li>
                ))}
              </ul>
            )}
          </div>
        </div>
        <div className="row">
          <div className="eight columns offset-by-two">
            <Loader loaded={!send} parentClassName="loader" loadedClassName="row">
              <input className="button-primary" type="submit" disabled={send} value="Сохранить" />
            </Loader>
          </div>
        </div>
      </form>
    </div>
  );
};

Login.propTypes = {
  send: PropTypes.bool.isRequired,
  data: PropTypes.shape({
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired
  }),
  errors: PropTypes.arrayOf(PropTypes.shape({
    message: PropTypes.string,
    path: PropTypes.string,
    type: PropTypes.string
  })),
  actions: PropTypes.shape({
    handleSubmit: PropTypes.func.isRequired,
    handleInput: PropTypes.func.isRequired
  })
};

export default Login;
