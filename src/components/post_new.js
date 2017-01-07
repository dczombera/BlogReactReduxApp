import React, { Component, PropTypes } from 'react';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router';
import { createPost } from '../actions/index';

class PostNew extends Component {
  static contextTypes = {
    router: PropTypes.object
  };

  onSubmit(props) {
    this.props.createPost(props)
      .then(() => {
        // blog post has been created. Navigate the user to the index.
        // We navigate by calling this.context.router.push with the new path
        // to navigate to.
        this.context.router.push('/');
      });
  }

  formValidationFeedback(value) {
    return value.touched && value.invalid ? 'has-danger' : ''
  }

  render() {
    const { fields: { title, categories, content }, handleSubmit } = this.props;
    return (
      <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
        <h3>Create A New Post</h3>
        <div className={`form-group ${this.formValidationFeedback(title)}`}>
          <label className='form-control-label'>Title</label>
          <input type="text" className="form-control" {...title} />
          <div className="form-control-feedback">
            {title.touched ? title.error : ''}
          </div>
        </div>

        <div className={`form-group ${this.formValidationFeedback(categories)}`}>
          <label className="form-control-label">Categories</label>
          <input type="text" className="form-control" {...categories} />
          <div className="form-control-feedback">
            {categories.touched ? categories.error : ''}
          </div>
        </div>

        <div className={`form-group ${this.formValidationFeedback(content)}`}>
          <label className="form-control-label">Content</label>
          <textarea className="form-control" {...content} />
          <div className="form-control-feedback">
            {content.touched ? content.error : ''}
          </div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        <Link to='/' className='btn btn-danger'>Cancel</Link>
      </form>
    );
  }
}

function validate(values) {
  const errors = {}

  if(!values.title) {
    errors.title = "Enter a title"
  }

  if(!values.categories) {
    errors.categories = "Enter at least one category"
  }

  if(!values.content) {
    errors.content = "Enter a content"
  }

  return errors
}
// FYI:
// connect: 1st argument is mapStatetoProps, 2nd is mapDispatchToProps
// reduxForm: 1st is form config, 2nd is mapStatetoProps, 3rd is mapDispatchToProps
export default reduxForm({
  form: 'PostsNewForm',
  fields: ['title', 'categories', 'content'],
  validate
}, null, { createPost })(PostNew);
