import React, { Component } from 'react'
import classNames from 'classnames'

class Image extends Component {

  uploadWidget(event) {
    event.preventDefault();
    const { id, handleInput } = this.props;
    window.cloudinary.openUploadWidget(
      { cloud_name: 'hf6yk8ltn', upload_preset: 'sexyu9d2' },
      (error, result) => {
        if (!error) {
          handleInput(id, result[0].url)
        }
      }
    );
  }

  clearImage(event) {
    event.preventDefault();
    const { id, handleInput } = this.props;
    handleInput(id, '')
  };

  render() {
    const { errors, className, id, title, value } = this.props;
    const fieldErrors = errors.filter(item => item.path === id);
    return (
      <div className={classNames('row', { danger: fieldErrors.length > 0 } )}>
        <div className={classNames('columns', className)}>
          <label htmlFor={id}>{title}</label>
          {value.indexOf('.') > 0 && (
            <img src={value} alt="" width={100} />
          )}
          <p>
          <button onClick={(event) => this.uploadWidget(event)} className="button">
            Загрузить
          </button>
          {value.indexOf('.') > 0 && (
            <button
              style={{marginLeft: 10}}
              onClick={(event) => this.clearImage(event)}
              className="button"
            >
              Удалить
            </button>
          )}
          </p>
          {fieldErrors.length > 0 && (
            <ul>
              {fieldErrors.map(item => (
                <li key={item.type}>{item.message}</li>
              ))}
            </ul>
          )}
        </div>
      </div>
    );
  }
}

export default Image;
