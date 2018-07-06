import React from 'react';
import PropTypes from 'prop-types';
import Loader from 'react-loader';
import { Input, Text, Image } from "../Form";

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

  const handleEditorChange = (field, e) => {
    actions.input(field, e.target.getContent());
  };

  return (
    <div className="container">
      <div className="row center">
        <div className="columns nine">
          <h4>{title}</h4>
        </div>
      </div>
      <form onSubmit={handleSubmit}>
        <Image
          className="nine"
          title="Картинка в описание"
          placeholder="Введите картинку в описание"
          id="preview_picture"
          errors={errors}
          value={data.preview_picture}
          handleInput={actions.input}
        />
        <Image
          className="nine"
          title="Картинка"
          placeholder="Введите картинку"
          id="detail_picture"
          errors={errors}
          value={data.detail_picture}
          handleInput={actions.input}
        />
        <Input
          className="nine"
          title="Наименование"
          placeholder="Введите наименование"
          id="name"
          errors={errors}
          type="text"
          value={data.name}
          handleInput={handleInput}
        />
        <Text
          title="Текст"
          id="description"
          errors={errors}
          value={data.description}
          handleEditorChange={handleEditorChange}
        />
        <Input
          className="nine"
          title="цена"
          placeholder="Введите цену"
          id="price"
          errors={errors}
          type="text"
          value={data.price}
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

  }).isRequired,
  send: PropTypes.bool.isRequired,
  errors: PropTypes.array.isRequired,
  actions: PropTypes.shape({
    input: PropTypes.func.isRequired,
    submit: PropTypes.func.isRequired
  }).isRequired
};

export default Save;
