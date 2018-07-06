import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader';
import { Input, Select } from "../Form";

const Save = ({ title, data, send, errors, actions }) => {

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
        <Input
          className="nine"
          title="Телефон"
          placeholder="Введите телефон"
          id="phone"
          errors={errors}
          type="text"
          value={data.phone}
          handleInput={handleInput}
        />
        <Input
          className="nine"
          title="Имя"
          placeholder="Введите имя"
          id="first_name"
          errors={errors}
          type="text"
          value={data.first_name}
          handleInput={handleInput}
        />
        <Input
          className="nine"
          title="Фамилия"
          placeholder="Введите фамилию"
          id="last_name"
          errors={errors}
          type="text"
          value={data.last_name}
          handleInput={handleInput}
        />
        <Input
          className="nine"
          title="Баланс"
          placeholder="Введите баланс"
          id="balance"
          errors={errors}
          type="number"
          value={data.balance}
          handleInput={handleInput}
        />
        <Input
          className="nine"
          title="Компания"
          placeholder="Введите компанию"
          id="company"
          errors={errors}
          type="text"
          value={data.company}
          handleInput={handleInput}
        />
        <Select
          className="nine"
          title="Тип аккаунта"
          placeholder="Введите тип аккаунта"
          id="type"
          errors={errors}
          options={[
            { value: 'individual', label: 'Физ. лицо' },
            { value: 'legal', label: 'Юр. лицо' }
          ]}
          value={data.type}
          handleInput={actions.input}
        />
        <Input
          className="nine"
          title="ИНН"
          placeholder="Введите ИНН"
          id="inn"
          errors={errors}
          type="text"
          value={data.inn}
          handleInput={handleInput}
        />
        <Select
          className="nine"
          title="Статус"
          placeholder="Введите статус"
          id="status"
          errors={errors}
          options={[
            { value: 'active', label: 'Активен' },
            { value: 'not active', label: 'Не активен' },
            { value: 'disable', label: 'Отключён' }
          ]}
          value={data.status}
          handleInput={actions.input}
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

  }).isRequired,
  send: PropTypes.bool.isRequired,
  errors: PropTypes.array.isRequired,
  actions: PropTypes.shape({
    input: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired
  }).isRequired
};

export default Save;
