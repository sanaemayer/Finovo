import React from "react";
import "./AdminNewArticlePage.css";
import AdminNav from "../../components/Navbars/admin-navbar";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import axiosInstance from "../../axiosApi";
import { Link } from "react-router-dom";

/**
 * Component that contains elements and functions related to adding Post articles to the database.
 *
 * Renders out a page meant to be routed through a navbar for admin side.
 *
 * @version 2.0.0
 */
class AdminArticleEdit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      // Data from the manual input sections
      postData: {
        title: "",
        content: "",
        description: "",
        category: "",
      },
      categoryData: {
        name: "",
      },
      // Container to hold all categories in db
      categories: [],
      // Reference to editor
      editorRef: null,
      // Post creation error-checking flags.
      updatePostWarning: false,
      updatePostSuccess: false,
      // Category creation error-checking flags.
      createCategoryWarning: false,
      createCategorySuccess: false,
    };
  }

  componentDidMount() {
    this.get_categories();
    this.getArticle();
  }

  async get_categories() {
    await axiosInstance
      .get("blog/cate-list/")
      .then((result) => {
        this.setState({
          categories: result.data,
        });
      })
      .catch((error) => {
        throw error;
      });
  }

  async getArticle() {
    // Get post id
    const pathname = window.location.href;
    let pathsplit = pathname.split("/");
    let id = pathsplit[pathsplit.length - 1];
    // Get Post object
    await axiosInstance
      .get("/blog/post-get/" + id + "/")
      .then((result) => {
        this.setState({
          postData: result.data,
        });
      })
      .catch((error) => {
        throw error;
      });
  }

  /**
   * Updates the state of postData.
   * Is called by all input fields for the article input fields.
   *
   * Requires that the name of the assigned input field is correctly set
   * to match the variable names in postData.
   *
   * @param {SyntheticEvent} e
   * @private
   */
  handle_change_post = (e) => {
    var name = e.target.name;
    var value = e.target.value;
    this.setState({
      postData: {
        ...this.state.postData,
        [name]: value,
      },
    });
  };

  /**
   * Updates the state of categoryData.
   *
   * Requires that the name of the assigned input field is correctly set
   * to match the variable name in categoryData.
   *
   * @param {SyntheticEvent} e
   * @private
   */
  handle_change_category = (e) => {
    var value = e.target.value;
    this.setState({
      categoryData: {
        name: value,
      },
    });
  };

  /**
   * Handles the actual post update call to the API.
   *
   * A POST request is sent to the API to update an existing Post entry.
   *
   * @param {SyntheticEvent} e
   * @private
   */
  handle_submit = (e) => {
    e.preventDefault();
    axiosInstance
      .post(
        "blog/post-update/" + this.state.postData.id + "/",
        this.state.postData
      )
      .then((result) => {
        this.setState({
          updatePostWarning: false,
          updatePostSuccess: true,
          createCategoryWarning: false,
          createCategorySuccess: false,
        });
      })
      .catch((error) => {
        this.setState({
          updatePostWarning: true,
          updatePostSuccess: false,
          createCategoryWarning: false,
          createCategorySuccess: false,
        });
        throw error;
      });
  };

  /**
   * Handles the actual category creation call to the API.
   *
   * A POST request is sent to the API to create a new Category entry.
   *
   * @param {SyntheticEvent} e
   * @private
   */
  handle_create_category = (e) => {
    e.preventDefault();
    axiosInstance
      .post("blog/cate-create/", this.state.categoryData)
      .then((result) => {
        this.setState({
          categoryData: {
            name: "",
          },
          updatePostWarning: false,
          updatePostSuccess: false,
          createCategoryWarning: false,
          createCategorySuccess: true,
        });
        this.get_categories();
      })
      .catch((error) => {
        this.setState({
          updatePostWarning: false,
          updatePostSuccess: false,
          createCategoryWarning: true,
          createCategorySuccess: false,
        });
        throw error;
      });
  };

  render() {
    return (
      <div className="d-flex flex-row overflow-hidden min-vh-100">
        <div className="col-2">
          {/* Side navigation bar*/}
          <AdminNav handle_logout={this.props.handle_logout} />
        </div>
        <div className="col d-flex flex-column m-5 p-3 border rounded bg-light">
          {/* Page Description */}
          <div className="container-sm text-center align-self-center align-items-center mx-5 p-3">
            <h1>Edit Article</h1>
            <hr />
            {/* Conditional Alerts */}
            {this.state.updatePostWarning > 0 && (
              <div className="alert alert-danger" role="alert">
                <strong>Post could not be updated.</strong> Please check that
                everything is inputted properly and/or contact site support.
              </div>
            )}
            {this.state.updatePostSuccess > 0 && (
              <div className="alert alert-success text-wrap" role="alert">
                <strong>Article successfully updated!</strong> Users can now see
                the new version on their Articles page, and it can be set as
                featured in the Set Featured Articles page.
              </div>
            )}
            {this.state.createCategoryWarning > 0 && (
              <div className="alert alert-danger" role="alert">
                <strong>Category could not be created.</strong> It may already
                exist. If this issue continues please contact site support.
              </div>
            )}
            {this.state.createCategorySuccess > 0 && (
              <div className="alert alert-success text-wrap" role="alert">
                <strong>Category successfully created!</strong> You can now
                select it in the dropdown menu.
              </div>
            )}
          </div>

          <div className="container-fluid">
            <div className="row d-flex flex-row-reverse flex-wrap justify-content-center">
              {/* Info Section */}
              <div className="order-2 col-md-3 d-flex flex-column py-3 ms-4">
                <h4>Publishing Articles</h4>
                <hr />
                <p>
                  In order to publish an article for users to see, please fill
                  out the form to the right. Please make sure that all input
                  fields are filled out. Once everything is to your liking,
                  press the submit button.
                </p>
                <p>
                  To set an article as featured, please go to the 'Set Featured
                  Articles' page using the side navigation bar.
                </p>
                <p>
                  The author of this post (you) and the date this post was
                  created will be automatically filled in.
                </p>
                <h4 className="mt-2">Adding New Categories</h4>
                <hr />
                <p>
                  If you'd like to add a new category, please press on the 'Add'
                  button and then enter the new category in the input box and
                  press 'Add Category'.
                </p>
                <p>
                  NOTE: This is case sensitive, so if you add both 'stocks' and
                  'Stocks', they will both show up in the dropdown.
                </p>
              </div>
              {/* Input Section */}
              <div className="order-1 col-md d-flex flex-column align-items-center mx-4">
                <div className="card my-3 p-4 w-100" style={{ minWidth: 400 }}>
                  <form
                    onSubmit={this.handle_submit}
                    className="text-center needs-validation"
                    id="articleForm"
                  >
                    <div className="row">
                      {/* Title */}
                      <div className="col">
                        <div className="form-floating mb-3">
                          <input
                            onChange={this.handle_change_post}
                            className="form-control"
                            type="text"
                            name="title"
                            value={this.state.postData.title}
                            id="titleInput"
                            placeholder="Title"
                            required
                          />
                          <label htmlFor="titleInput">Title</label>
                        </div>
                      </div>
                      {/* Category */}
                      <div className="col">
                        <div className="form-floating">
                          <select
                            className="form-select"
                            type="text"
                            name="category"
                            id="categoryInput"
                            aria-label="Floating label select"
                            value={this.state.postData.category}
                            onChange={this.handle_change_post}
                            required
                          >
                            <option value="">Choose...</option>
                            {this.state.categories.map((category) => {
                              return (
                                <option value={category.id} key={category.id}>
                                  {category.name}
                                </option>
                              );
                            })}
                          </select>
                          <label htmlFor="categoryInput">Category</label>
                        </div>
                      </div>
                      {/* Add Category Button */}
                      <button
                        type="button"
                        className="btn btn-primary w-auto h-50 mt-2 me-3"
                        data-bs-toggle="modal"
                        data-bs-target="#addCategoryModal"
                      >
                        Add
                      </button>

                      <div
                        className="modal fade"
                        id="addCategoryModal"
                        tabindex="-1"
                        aria-labelledby="addCategoryModalLabel"
                        aria-hidden="true"
                      >
                        <div className="modal-dialog modal-dialog-centered">
                          <div className="modal-content">
                            <div className="modal-header">
                              <h5
                                className="modal-title"
                                id="addCategoryModalLabel"
                              >
                                Create New Category
                              </h5>
                            </div>
                            <div className="modal-body">
                              <form id="newCategoryForm">
                                <input
                                  onChange={this.handle_change_category}
                                  className="form-control"
                                  type="text"
                                  name="categoryInput"
                                  value={this.state.categoryData.name}
                                  id="categoryInput"
                                  placeholder="Category Name"
                                  required
                                />
                              </form>
                            </div>
                            <div className="modal-footer">
                              <button
                                type="button"
                                className="btn btn-secondary"
                                data-bs-dismiss="modal"
                              >
                                Close
                              </button>
                              <button
                                type="button"
                                onClick={this.handle_create_category}
                                className="btn btn-success"
                                data-bs-dismiss="modal"
                              >
                                Add Category
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* Description */}
                    <div className="form-floating mb-3">
                      <input
                        onChange={this.handle_change_post}
                        className="form-control"
                        type="text"
                        name="description"
                        value={this.state.postData.description}
                        id="descriptionInput"
                        placeholder="A short summary"
                        required
                      />
                      <label htmlFor="descriptionInput">Description</label>
                    </div>
                    {/* Content */}
                    <CKEditor
                      editor={ClassicEditor}
                      onChange={(event, editor) => {
                        var data = editor.getData();
                        this.setState({
                          postData: {
                            ...this.state.postData,
                            content: data,
                          },
                          editorRef: editor,
                        });
                      }}
                      data={this.state.postData.content}
                      name="content"
                      id="contentInput"
                    />
                    {/* Buttons */}
                    <div className="d-flex justify-content-center">
                      <button
                        className="btn btn-lg btn-outline-success mt-3 me-2"
                        type="submit"
                      >
                        Save Changes
                      </button>
                      <Link
                        to="/admin/manage"
                        type="button"
                        className="btn btn-lg btn-outline-secondary mt-3 ms-2"
                        style={{ minWidth: 100 }}
                      >
                        Go Back
                      </Link>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default AdminArticleEdit;
