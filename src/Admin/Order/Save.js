import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader';
import { Input, Dictionary, Select } from "../Form";

const Save = ({ site, title, data, send, errors, actions, user }) => {

  const handleInput = (field, e) => {
    const { value } =  e.target;
    actions.input(field, value);
    e.preventDefault();
  };

  const handleSubmit = e => {
    actions.submit();
    e.preventDefault();
  };

  return (
    <div className="container">
      <div className="row center">
        <div className="columns nine">
          <h4>{title}</h4>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <Dictionary
          className="nine"
          title="Пользователь"
          getItem={item => item.phone}
          placeholder="Введите пользователя"
          id="user_id"
          url={`${site}/api/users`}
          user={user}
          errors={errors}
          value={data.user_id}
          handleInput={actions.input}
        />
        <Dictionary
          className="nine"
          title="Адрес"
          getItem={item => (
            `${item.street ? item.street : ''}
            ${item.house ? item.house: '' },
            ${item.floor ? item.floor : '' }-${item.entrance ? item.entrance : ''}`
          )}
          placeholder="Введите адрес"
          id="address_id"
          url={`${site}/api/address`}
          user={user}
          errors={errors}
          value={data.address_id}
          handleInput={actions.input}
        />
        <Input
          className="nine"
          title="Дата доставки"
          placeholder="Введите дату доставки"
          id="date_of_delivery"
          errors={errors}
          type="datetime-local"
          value={data.date_of_delivery}
          handleInput={handleInput}
        />
        <Select
          className="nine"
          title="Метод оплаты"
          placeholder="Введите метод оплаты"
          id="payment_method"
          errors={errors}
          options={[
            { value: 'cash', label: 'Наличными' },
            { value: 'card', label: 'Картой' }
          ]}
          value={data.payment_method}
          handleInput={actions.input}
        />
        <Input
          className="nine"
          title="Статус"
          placeholder="Введите статус"
          id="payment_status"
          errors={errors}
          type="text"
          value={data.payment_status}
          handleInput={handleInput}
        />
        <Input
          className="nine"
          title="Цена"
          placeholder="Введите цену"
          id="price"
          errors={errors}
          type="number"
          value={`${data.price}`}
          handleInput={handleInput}
        />
        <Input
          className="nine"
          title="Количество бутылок"
          placeholder="Введите количество бутылок"
          id="bottles"
          errors={errors}
          type="number"
          value={`${data.bottles}`}
          handleInput={handleInput}
        />
        <Loader loaded={!send} parentClassName="loader" loadedClassName="row">
          <input className="button-primary" type="submit" disabled={send} value="Сохранить" />
        </Loader>
      </form>
    </div>
  );
};

Save.propTypes = {
  data: PropTypes.shape({
    user_id: PropTypes.number,
    address_id: PropTypes.number,
    date_of_delivery: PropTypes.string,
    payment_method: PropTypes.string,
    payment_status: PropTypes.string,
    price: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ]),
    bottles: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number
    ])
  }).isRequired,
  site: PropTypes.string.isRequired,
  send: PropTypes.bool.isRequired,
  errors: PropTypes.array.isRequired,
  actions: PropTypes.shape({
    input: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired
  }).isRequired
};

export default Save;
