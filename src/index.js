import React from 'react';
import ReactDOM from 'react-dom';
import AdminApp, { AdminError404 } from './Admin/App';
import AdminCharts from './Admin/Charts';
import AdminLogin from './Admin/Login';
import AdminLogout from './Admin/Logout';
import { AddressList, AddressSave, AddressRemove } from "./Admin/Address";
import { NewsList, NewsSave, NewsRemove } from "./Admin/News";
import { OrderList, OrderSave, OrderRemove } from "./Admin/Order";
import { ProductList, ProductSave, ProductRemove } from "./Admin/Product";
import { UserList, UserSave, UserRemove } from "./Admin/User";
import Joi from 'joi-browser';
import moment from 'moment';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import registerServiceWorker from './registerServiceWorker';
import { parse } from 'query-string';
import { observable } from 'mobx'

import './index.css';

const Site = 'http://localhost:5000';
const user = observable.box(JSON.parse(localStorage.getItem('user')));

moment.updateLocale('ru', {
  calendar: {
    lastDay: '[Вчера]',
    sameDay: '[Сегодня]',
    nextDay: '[Завтра]',
    lastWeek: 'dddd',
    nextWeek: 'dddd',
    sameElse: 'DD.MM.YYYY',
  },
});

ReactDOM.render(
  <Router>
    <Switch>
      <Route path="/admin" >
        <AdminApp user={user}>
          <AdminLogin user={user} url={`${Site}/api/login`} >
            <Switch>
              <Route exact path="/admin" component={() => (
                <AdminCharts
                  user={user}
                  charts={[
                  {
                    url: `${Site}/api/users`,
                    title: 'Клиенты',
                    axiosTitle: 'Количество клиентов'
                  }
                ]} />
              )}/>
              <Route exact path="/admin/address" component={({ match, location, ...props }) => (
                  <AddressList user={user} title="Адреса" head="Наименование"
                               getTitle={item => (
                                 `${item.street ? item.street : ''}
                                  ${item.house ? item.house: '' },
                                  ${item.floor ? item.floor : '' }-${item.entrance ? item.entrance : ''}`
                               )}
                               createLabel="Добавить новый адрес"
                               sortBy={{'created_at': 'Дата создания'}}
                               filterBy="street"
                               url={`${Site}/api/address`} location={location}
                               path="/admin/address" {...props} {...parse(location.search)} />
                )}
              />
              <Route exact path="/admin/address/new" component={({ match, location, ...props }) => (
                <AddressSave
                  user={user} site={Site}
                  id={null} {...props} {...parse(location.search)} location={location}
                  title="Адрес"
                  url={`${Site}/api/address`}
                  backUrl="/admin/address"
                  notFoundUrl="/admin/404"
                  initial={{
                    created_at: 0,
                    updated_at: 0,
                    street: '',
                    floor: '',
                    house: '',
                    entrance: '',
                    apartment: ''
                  }}
                  schema={{
                    created_at: Joi.string().required().label('Дата создания'),
                    updated_at: Joi.string().required().label('Дата изменения'),
                    street: Joi.string().required().label('Улица'),
                    house: Joi.string().required().label('Дом'),
                    floor: Joi.number().integer().allow('').optional().min(1).label('Этаж'),
                    entrance: Joi.number().integer().allow('').optional().min(1).label('Подъезд'),
                    apartment: Joi.number().integer().allow('').optional().min(1).label('Квартира/Офис')
                  }}
                />
              )} />
              <Route exact path="/admin/address/:id" component={({ match, location, ...props }) => (
                <AddressSave
                  user={user} site={Site}
                  id={match.params.id} {...props} {...parse(location.search)} location={location}
                  title="Адрес"
                  url={`${Site}/api/address`}
                  backUrl="/admin/address"
                  notFoundUrl="/admin/404"
                  schema={{
                    id: Joi.number(),
                    guid: Joi.string().allow(null).optional(),
                    created_at: Joi.string().required().label('Дата создания'),
                    updated_at: Joi.string().required().label('Дата изменения'),
                    street: Joi.string().required().label('Улица'),
                    house: Joi.string().required().label('Дом'),
                    floor: Joi.number().integer().allow('').optional().min(1).label('Этаж'),
                    entrance: Joi.number().integer().allow('').optional().min(1).label('Подъезд'),
                    apartment: Joi.number().integer().allow('').optional().min(1).label('Квартира/Офис')
                  }}
                />
              )} />
              <Route exact path="/admin/address/remove/:id"
                component={({ match, location, ...props }) => (
                  <AddressRemove
                    user={user} site={Site}
                    {...props} {...parse(location.search)}
                    url={`${Site}/api/address`}
                    returnUrl="/admin/address"
                    id={match.params.id}
                    location={location}
                  />
                )}
              />
              <Route exact path="/admin/news" component={({ match, location, ...props }) => (
                <NewsList user={user} site={Site} title="Новости" head="Заголовок"
                          getTitle={item => item.title}
                          createLabel="Добавить новую новость"
                          sortBy={{'created_at': 'Дата создания'}}
                          filterBy="title"
                          url={`${Site}/api/news`} location={location}
                          path="/admin/news" {...props} {...parse(location.search)} />
              )} />
              <Route exact path="/admin/news/new" component={({ match, location, ...props }) => (
                <NewsSave
                  user={user} site={Site}
                  id={null} {...props} {...parse(location.search)} location={location}
                  title="Новость"
                  url={`${Site}/api/news`}
                  backUrl="/admin/news"
                  notFoundUrl="/admin/404"
                  initial={{
                    created_at: 0,
                    updated_at: 0,
                    title: '',
                    text: '',
                    type: 'main',
                    image: '',
                    product_id: null
                  }}
                  schema={{
                    created_at: Joi.string().required().label('Дата создания'),
                    updated_at: Joi.string().required().label('Дата изменения'),
                    title: Joi.string().required().label('Наименование'),
                    text: Joi.string().required().label('Текст'),
                    type: Joi.string().required().valid('main', 'special').label('Категория'),
                    product_id: Joi.number().integer().allow(null).optional().label('Продукт'),
                    image: Joi.string().required().label('Картинка')
                  }}
                  types={[ 'main', 'special' ]}
                  productUrl={`${Site}/api/products`}
                  productIdField="id"
                  productNameField="name"
                />
              )} />
              <Route exact path="/admin/news/:id" component={({ match, location, ...props }) => (
                <NewsSave
                  user={user} site={Site}
                  id={match.params.id} {...props} {...parse(location.search)} location={location}
                  title="Новость"
                  url={`${Site}/api/news`}
                  backUrl="/admin/news"
                  notFoundUrl="/admin/404"
                  schema={{
                    id: Joi.number(),
                    created_at: Joi.string().required().label('Дата создания'),
                    updated_at: Joi.string().required().label('Дата изменения'),
                    title: Joi.string().required().label('Наименование'),
                    text: Joi.string().required().label('Текст'),
                    type: Joi.string().required().valid('main', 'special').label('Категория'),
                    product_id: Joi.number().integer().allow(null).optional().label('Продукт'),
                    image: Joi.string().required().label('Картинка')
                  }}
                  types={[ 'main', 'special' ]}
                  productUrl={`${Site}/api/products`}
                  productIdField="id"
                  productNameField="name"
                />
              )} />
              <Route exact path="/admin/news/remove/:id"
                 component={({ match, location, ...props }) => (
                   <NewsRemove
                     user={user} site={Site}
                     {...props} {...parse(location.search)}
                     url={`${Site}/api/news`}
                     returnUrl="/admin/news"
                     id={match.params.id}
                     location={location}
                   />
                 )}
              />
              {/* orders */}
              <Route exact path="/admin/orders" component={({ match, location, ...props }) => (
                <OrderList user={user} site={Site} title="Заказы" head="Номер заказа"
                           getTitle={item => (
                             `#${item.id}, ${item.bottles} бал., ${moment(item.created_at).calendar()}
                             ${item.payment_status ? `,${item.payment_status}` : ''}`
                           )}
                           createLabel="Добавить новый заказ"
                           sortBy={{ created_at: 'Дата создания', payment_status: 'Статус' }}
                           filterBy="id"
                           url={`${Site}/api/orders`} location={location}
                           path="/admin/orders" {...props} {...parse(location.search)} />
              )} />
              <Route exact path="/admin/orders/new" component={({ match, location, ...props }) => (
                <OrderSave
                  user={user} site={Site}
                  id={null} {...props} {...parse(location.search)} location={location}
                  title="Заказ"
                  url={`${Site}/api/orders`}
                  backUrl="/admin/orders"
                  notFoundUrl="/admin/404"
                  initial={{
                    created_at: 0,
                    updated_at: 0,
                    user_id: null,
                    address_id: null,
                    date_of_delivery_variants: JSON.stringify({}),
                    date_of_delivery: '',
                    payment_method: 'cash',
                    payment_status: 'new',
                    price: '',
                    bottles: ''
                  }}
                  schema={{
                    created_at: Joi.string().required().label('Дата создания'),
                    updated_at: Joi.string().required().label('Дата изменения'),
                    user_id: Joi.number().integer().required().label('Пользователь'),
                    address_id: Joi.number().integer().required().label('Адрес'),
                    date_of_delivery_variants: Joi.string().required().label('Варианты доставки'),
                    date_of_delivery: Joi.string().required().label('Дата доставки'),
                    payment_method: Joi.string().required().valid('card', 'cash').label('Метод оплаты'),
                    payment_status: Joi.string().required().label('Статус'),
                    price: Joi.number().integer().min(1).required().label('Цена'),
                    bottles: Joi.number().integer().min(1).required().label('Количество бутылок')
                  }}
                  paymentMethods={[ 'card', 'cash' ]}
                  userUrl={`${Site}/api/users`}
                  userIdField="id"
                  userNameField="phone"
                  addressUrl={`${Site}/api/address`}
                  addressIdField="id"
                  addressNameField="name"
                />
              )} />
              <Route exact path="/admin/orders/:id" component={({ match, location, ...props }) => (
                <OrderSave
                  user={user} site={Site}
                  id={match.params.id} {...props} {...parse(location.search)} location={location}
                  title="Заказ"
                  url={`${Site}/api/orders`}
                  backUrl="/admin/orders"
                  notFoundUrl="/admin/404"
                  schema={{
                    id: Joi.number(),
                    guid: Joi.string().allow(null).optional(),
                    created_at: Joi.string().required().label('Дата создания'),
                    updated_at: Joi.string().required().label('Дата изменения'),
                    user_id: Joi.number().integer().required().label('Пользователь'),
                    address_id: Joi.number().integer().required().label('Адрес'),
                    date_of_delivery_variants: Joi.string().required().label('Варианты доставки'),
                    date_of_delivery: Joi.string().required().label('Дата доставки'),
                    payment_method: Joi.string().required().valid('card', 'cash').label('Метод'),
                    payment_status: Joi.string().required().label('Статус'),
                    price: Joi.number().integer().min(1).required().label('Цена'),
                    bottles: Joi.number().integer().min(1).required().label('Количество бутылок')
                  }}
                  paymentMethods={[ 'card', 'cash' ]}
                  userUrl={`${Site}/api/users`}
                  userIdField="id"
                  userNameField="phone"
                  addressUrl={`${Site}/api/address`}
                  addressIdField="id"
                  addressNameField="name"
                />
              )} />
              <Route exact path="/admin/orders/remove/:id"
                 component={({ match, location, ...props }) => (
                   <OrderRemove
                     user={user} site={Site}
                     {...props} {...parse(location.search)}
                     url={`${Site}/api/orders`}
                     returnUrl="/admin/orders"
                     id={match.params.id}
                     location={location}
                   />
                 )}
              />
              {/* products */}
              <Route exact path="/admin/products" component={({ match, location, ...props }) => (
                <ProductList user={user} site={Site}
                             title="Товар" head="Наименование"
                             getTitle={item => item.name}
                             sortBy={{'created_at': 'Дата создания'}}
                             filterBy="name"
                             createLabel="Добавить новый товар"
                             url={`${Site}/api/products`} location={location}
                             path="/admin/products" {...props} {...parse(location.search)} />
              )} />
              <Route exact path="/admin/products/new" component={({ match, location, ...props }) => (
                <ProductSave
                  user={user} site={Site}
                  id={null} {...props} {...parse(location.search)} location={location}
                  title="Добавление товара"
                  url={`${Site}/api/products`}
                  backUrl="/admin/products"
                  notFoundUrl="/admin/404"
                  initial={{
                    created_at: 0,
                    updated_at: 0,
                    preview_picture: '',
                    detail_picture: '',
                    name: '',
                    description: '',
                    price: ''
                  }}
                  schema={{
                    created_at: Joi.string().required().label('Дата создания'),
                    updated_at: Joi.string().required().label('Дата изменения'),
                    preview_picture: Joi.string().allow('').optional().label('Картинка в описание'),
                    detail_picture: Joi.string().allow('').optional().label('Картинка'),
                    name: Joi.string().required().label('Наименование'),
                    description: Joi.string().allow('').optional().label('Описание'),
                    price: Joi.number().min(0).required().label('Цена')
                  }}
                />
              )} />
              <Route exact path="/admin/products/:id" component={({ match, location, ...props }) => (
                <ProductSave
                  user={user} site={Site}
                  id={match.params.id} {...props} {...parse(location.search)} location={location}
                  title="Редактирование товара"
                  url={`${Site}/api/products`}
                  backUrl="/admin/products"
                  notFoundUrl="/admin/404"
                  schema={{
                    id: Joi.number(),
                    guid: Joi.string().allow(null).optional(),
                    created_at: Joi.string().required().label('Дата создания'),
                    updated_at: Joi.string().required().label('Дата изменения'),
                    preview_picture: Joi.string().allow('').optional().label('Картинка в описание'),
                    detail_picture: Joi.string().allow('').optional().label('Картинка'),
                    name: Joi.string().required().label('Наименование'),
                    description: Joi.string().allow('').optional().label('Описание'),
                    price: Joi.number().min(0).required().label('Цена')
                  }}
                />
              )} />
              <Route exact path="/admin/products/remove/:id"
                     component={({ match, location, ...props }) => (
                       <ProductRemove
                         user={user} site={Site}
                         {...props} {...parse(location.search)}
                         url={`${Site}/api/products`}
                         returnUrl="/admin/products"
                         id={match.params.id}
                         location={location}
                       />
                     )}
              />
              {/* users */}
              <Route exact path="/admin/users" component={({ match, location, ...props }) => (
                <UserList
                  user={user} site={Site}
                  isCreate={false} title="Клиенты" head="Телефон"
                  getTitle={item => `
                    ${item.first_name && item.first_name.length > 0 ? item.first_name : '' }
                    ${item.last_name && item.last_name.length > 0 ? item.last_name : '' }
                    ${item.phone}
                    ${moment(item.created_at).calendar()}
                  `}
                  sortBy={{'created_at': 'Дата создания'}}
                  filterBy="phone"
                  createLabel="Добавить нового пользователя"
                  url={`${Site}/api/users`} location={location}
                  path="/admin/users" {...props} {...parse(location.search)} />
              )} />
              <Route exact path="/admin/users/:id" component={({ match, location, ...props }) => (
                <UserSave
                  user={user} site={Site}
                  id={match.params.id} {...props} {...parse(location.search)} location={location}
                  title="Пользователь"
                  url={`${Site}/api/users`}
                  backUrl="/admin/users"
                  notFoundUrl="/admin/404"
                  schema={{
                    id: Joi.number(),
                    guid: Joi.string().allow(null).optional(),
                    created_at: Joi.string().required().label('Дата создания'),
                    updated_at: Joi.string().required().label('Дата изменения'),
                    phone: Joi.string().required().label('Телефон'),
                    first_name: Joi.string().allow('', null).optional().label('Имя'),
                    last_name: Joi.string().allow('', null).optional().label('Фамилия'),
                    balance: Joi.number().required().label('Баланс'),
                    company_name: Joi.string().allow('', null).optional().label('Компания'),
                    type: Joi.string().valid('individual', 'legal').required().label('Тип аккаунта'),
                    inn: Joi.string().allow('', null).optional().label('ИНН'),
                    status: Joi.string().valid('active', 'not active', 'disable').required().label('Статус')
                  }}
                />
              )} />
              <Route exact path="/admin/users/remove/:id"
                     component={({ match, location, ...props }) => (
                       <UserRemove
                         user={user} site={Site}
                         {...props} {...parse(location.search)}
                         url={`${Site}/api/users`}
                         returnUrl="/admin/users"
                         id={match.params.id}
                         location={location}
                       />
                     )}
              />
              <Route path="/admin/404" component={AdminError404} />
              <Route path="/admin/logout" component={() => (
                <AdminLogout user={user} site={Site} />
              )} />
              <Redirect from="/admin" to="/admin/404" />
            </Switch>
          </AdminLogin>
        </AdminApp>
      </Route>
      <Route path="/">
        <Redirect to="/admin" />
      </Route>
    </Switch>
  </Router>,
  document.getElementById('root')
);
registerServiceWorker();
