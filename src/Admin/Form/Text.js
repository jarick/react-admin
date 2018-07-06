import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import TinyMCE from 'react-tinymce';

const Text = ({ title, id, errors, value, handleEditorChange }) => {
  const fieldErrors = errors.filter(item => item.path === id);
  return (
    <div className={classNames('row', { danger: fieldErrors.length > 0 } )}>
      <label htmlFor={id}>{title}</label>
      <div className="editor">
        <TinyMCE
          content={value}
          config={{
            language_url: '/langs/ru.js',
            width: "94%",
            height: 500,
            theme: 'modern',
            plugins: [
              'advlist autolink lists link image charmap print preview hr anchor pagebreak',
              'searchreplace wordcount visualblocks visualchars fullscreen',
              'insertdatetime media nonbreaking save table contextmenu directionality',
              'emoticons template paste textcolor colorpicker textpattern imagetools codesample toc help'
            ],
            toolbar1: 'insert | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image ',
            toolbar2: 'undo redo | print preview media | forecolor backcolor emoticons | codesample help',
            image_advtab: true
          }}
          onChange={(e) => handleEditorChange(id, e)}
        />
      </div>
      {fieldErrors.length > 0 && (
        <ul>
          {fieldErrors.map(item => (
            <li key={item.type}>{item.message}</li>
          ))}
        </ul>
      )}
    </div>
  );
};

Text.defaultProps = {
  errors: []
};

Text.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  errors: PropTypes.array.isRequired,
  value: PropTypes.string.isRequired,
  handleEditorChange: PropTypes.func.isRequired
};

export default Text;

