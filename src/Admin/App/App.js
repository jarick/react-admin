import React, {Component} from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import BurgerMenu from 'react-burger-menu';
import classNames from 'classnames';

const Menu = BurgerMenu['slide'];
const mql = window.matchMedia(`(min-width: 800px)`);

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      mql: mql,
      menuIsOpen: false
    };

    this.mediaQueryChanged = this.mediaQueryChanged.bind(this);
  }

  componentDidMount() {
    this.setState({ mql: mql, menuIsOpen: this.state.mql.matches });
  }

  componentWillMount() {
    mql.addListener(this.mediaQueryChanged);
  }

  componentWillUnmount() {
    this.state.mql.removeListener(this.mediaQueryChanged);
  }

  mediaQueryChanged() {
    this.setState({ menuIsOpen: this.state.mql.matches });
  }

  render() {
    const { menuIsOpen } = this.state;
    const { user } = this.props;
    return (
      <div id="outer-container" className={classNames({
        desktop: menuIsOpen, mobile: !menuIsOpen
      })}>
        {user && (
          <Menu pageWrapId={"page-wrap"} outerContainerId={"outer-container"} width={ 200 } >
            <div style={{height: 48}}></div>
            <Link className="menu-item" to="/admin">Главная</Link>
            <Link className="menu-item" to="/admin/address">Адреса</Link>
            <Link className="menu-item" to="/admin/news">Новости</Link>
            <Link className="menu-item" to="/admin/orders">Заказы</Link>
            <Link className="menu-item" to="/admin/products">Товары</Link>
            <Link className="menu-item" to="/admin/users">Клиенты</Link>
            <Link className="menu-item" to="/admin/logout">Выйти</Link>
          </Menu>
        )}
        <main id="page-wrap">
          <nav className="navbar">
            <div className="container">
              {user && (
                <ul className="navbar-list">
                  <li className="navbar-item">
                    <Link className="navbar-link" to="/admin">Главная</Link>
                  </li>
                  <li className="navbar-item">
                    <Link className="navbar-link" to="/admin/address">Адреса</Link>
                  </li>
                  <li className="navbar-item">
                    <Link className="navbar-link" to="/admin/news">Новости</Link>
                  </li>
                  <li className="navbar-item">
                    <Link className="navbar-link" to="/admin/orders">Заказы</Link>
                  </li>
                  <li className="navbar-item">
                    <Link className="navbar-link" to="/admin/products">Товары</Link>
                  </li>
                  <li className="navbar-item">
                    <Link className="navbar-link" to="/admin/users">Клиенты</Link>
                  </li>
                  <li className="navbar-item">
                    <Link className="navbar-link" to="/admin/logout">Выйти</Link>
                  </li>
                </ul>
              )}
            </div>
          </nav>
          {this.props.children}
        </main>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.node
};

export default App;