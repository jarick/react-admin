import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader';
import { Input, TextArea } from "../Form";

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
          title="Улица"
          placeholder="Введите улицу"
          id="street"
          errors={errors}
          type="text"
          value={data.street}
          handleInput={handleInput}
        />
        <Input
          className="nine"
          title="Дом"
          placeholder="Введите дом"
          id="house"
          errors={errors}
          type="text"
          value={data.house}
          handleInput={handleInput}
        />
        <Input
          className="nine"
          title="Этаж"
          placeholder="Введите этаж"
          id="floor"
          errors={errors}
          type="number"
          value={data.floor}
          handleInput={handleInput}
        />
        <Input
          className="nine"
          title="Подъезд"
          placeholder="Введите подъезд"
          id="entrance"
          errors={errors}
          type="number"
          value={data.entrance}
          handleInput={handleInput}
        />
        <Input
          className="nine"
          title="Квартира\Офис"
          placeholder="Введите квартиру\офис"
          id="apartment"
          errors={errors}
          type="number"
          value={data.apartment}
          handleInput={handleInput}
        />
        <TextArea
          title="Комментарий"
          id="description"
          className="nine"
          errors={errors}
          value={data.comment}
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
    street: PropTypes.string.isRequired,
    house: PropTypes.string.isRequired,
    floor: PropTypes.string.isRequired,
    entrance: PropTypes.string.isRequired,
    apartment: PropTypes.string.isRequired
  }).isRequired,
  send: PropTypes.bool.isRequired,
  errors: PropTypes.array.isRequired,
  actions: PropTypes.shape({
    input: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired,
  }).isRequired
};

export default Save;
