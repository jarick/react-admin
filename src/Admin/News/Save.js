import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader';
import { Input, Text, Select, Dictionary, Image } from "../Form";

const Save = ({ site, title, data, send, errors, actions, user }) => {

  const handleInput = (field, e) => {
    const { value } =  e.target;
    actions.input(field, value);
    e.preventDefault();
  };

  const handleEditorChange = (field, e) => {
    actions.input(field, e.target.getContent());
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
          title="Заголовок"
          placeholder="Введите заголовок"
          id="title"
          errors={errors}
          type="text"
          value={data.title}
          handleInput={handleInput}
        />
        <Text
          title="Текст"
          id="text"
          errors={errors}
          value={data.text}
          handleEditorChange={handleEditorChange}
        />
        <Select
          className="nine"
          title="Категория"
          placeholder="Введите категорию"
          id="type"
          errors={errors}
          options={[
            { value: 'main', label: 'Главные новости' },
            { value: 'special', label: 'Спец. акции' }
          ]}
          value={data.type}
          handleInput={actions.input}
        />
        <Dictionary
          user={user}
          className="nine"
          title="Продукт"
          getItem={item => item.name}
          placeholder="Введите индикатор продукт"
          id="product_id"
          url={`${site}/api/products`}
          errors={errors}
          value={data.product_id}
          handleInput={actions.input}
        />
        <Image
          className="nine"
          title="Картинка"
          placeholder="Введите картинку"
          id="image"
          errors={errors}
          value={data.image}
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
    title: PropTypes.string,
    text: PropTypes.string,
    type: PropTypes.string,
    product_id: PropTypes.number,
    image: PropTypes.string
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
