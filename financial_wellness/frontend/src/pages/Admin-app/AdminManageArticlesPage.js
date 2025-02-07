import React from "react";
import AdminNav from "../../components/Navbars/admin-navbar";
import axiosInstance from "../../axiosApi";
import { BsStar } from "react-icons/bs";
import { Link } from "react-router-dom";

/**
 * Component that contains elements and functions related to managing articles.
 * Actions such as setting featured, unfeaturing, editing articles and deleting can be done.
 * 
 * The edit articles button brings the admin to a new page, prefilled with the article's data.
 *
 * Renders out a page meant to be routed through a navbar for admin side.
 *
 * @version 2.2.0
 */
class ManageArticlesPage extends React.Component {
  MAX_FEATURED = 3;
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      activeItem: {
        id: null,
      },
      filter:"",
    };
    this.handle_update = this.handle_update.bind(this);
    this.fetchArticles = this.fetchArticles.bind(this);
  }

  componentDidMount() {
    this.fetchArticles();
  }

  async fetchArticles() {
    await axiosInstance
      .get("blog/post-list/")
      .then((result) => {
        this.setState({
          articles: result.data,
        });
      })
      .catch((error) => {
        throw error;
      });
  }

  async handle_update(article) {
    let updateArticle = article;
    updateArticle.isFeatured = !article.isFeatured;

    await axiosInstance
      .post(`blog/post-update/${article.id}/`, updateArticle)
      .then((result) => {
        this.fetchArticles();
      })
      .catch((error) => {
        throw error;
      });
  }

  async handle_delete(article) {
    await axiosInstance
      .delete(`http://localhost:8000/api/blog/post-delete/${article.id}/`)
      .then((result) => {
        this.fetchArticles();
      })
      .catch((error) => {
        throw error;
      });
  }

  handleChange = event => {
    this.setState({ filter: event.target.value });
  };

  render() {
    let FeatureCount = this.state.articles.filter(article => article.isFeatured).length;

    /* Search bar functionality. The keyword entered in the search bar is then scanned 
      through all the attributes in the Post model -
    title 
    author
    content 
    description 
    date_posted 
    category 
    isFeatured*/
    const { filter, articles } = this.state;
    const lowercasedFilter = filter.toLowerCase();
    const filteredData = articles.filter(item => {
      return Object.keys(item).some(key =>
        item[key].toString().toLowerCase().includes(lowercasedFilter)
      );
    });

    return (
      <div className="d-flex flex-row overflow-hidden min-vh-100">
        <div className="col-2">
          {/* Side navigation bar*/}
          <AdminNav handle_logout={this.props.handle_logout} />
        </div>
        <div className="col d-flex flex-column m-5 p-3 border rounded bg-light">
          <div className="container-sm my-3 text-center align-self-center align-items-center">
            <h1 className="text-center">Manage Articles</h1>
            <hr />
          </div>
          {/* Content */}
          <div className="container-fluid align-self-center">
            <div className="row px-4">
              <div className="col-md-3 d-flex flex-column pe-5">
                {/* How */}
                <h4>Featuring Articles</h4>
                <hr />
                <p>
                  Locate your desired Article in the list of articles and press the 'Make Featured'
                  button. A little star will appear to the left of the post title. Press the same button
                  to unfeature an article.
                </p>
                {/* What */}
                <h4 className="mt-3">What Does Featuring an Article do?</h4>
                <hr />
                <p>
                  Featuring an article moves the article to the top of users article's page and keeps
                  it there for as long as it is featured. Featured articles are also shown on the user's
                  dashboard.
                </p>
                <h4 className="mt-3">Deleting Articles</h4>
                <hr />
                <p>
                  Press the 'Delete' button to delete an article. <mark>WARNING:</mark> There is no confirmation for deletion,
                  so only press it if you are sure you'd like to delete it.
                </p>
              </div>
              <div
                className="col-md d-flex flex-column p-3 border rounded border-dark"
                style={{ minHeight: 600 }}
              >
                <p class="lead text-center mb-2">
                  Search for Articles
                </p>
                <form className="d-flex flex-wrap justify-content-center m-3">
                  <div className="form-floating w-75">
                    <input
                      className="form-control needs-validation"
                      type="text"
                      id="searchInput"
                      placeholder="Keywords"
                      value={filter} 
                      onChange={this.handleChange} 
                      required
                    />
                    <label htmlFor="searchInput">Keywords</label>
                  </div>
                </form>

                <div className="col-md d-flex flex-column border round border-dark">
                  <ul
                    className="list-group list-group-flush"
                    data-bs-spy="scroll"
                    data-bs-offset="0"
                  >
                    {/* Get Featured Articles */}
                    {this.state.articles.filter(article => article.isFeatured).map((article) => {
                      return (
                        <li className="list-group-item">
                          <div className="form-check"> 
                            <label className="d-flex align-items-center form-check-label" for="flexCheckDefault">
                              <div style={{minWidth:174}}>
                                <BsStar style={{color:"orange"}} className="me-2"/>
                                <strong>Title:</strong> {article.title}
                              </div>
                              <div className="ms-5 me-auto"><strong>Date Created:</strong> {article.date_posted.split("T")[0]+" "}</div>
                              <button type="button" className="btn btn-warning btn-sm me-5" id={"update"+article.id}
                                      onClick={() => this.handle_update(article)}>Unfeature</button>
                              <Link
                                to={{
                                  pathname:
                                    "/ManageArticles/article/id/" + article.id,
                                  state: article,
                                }}
                                type="button"
                                className="btn btn-secondary btn-sm me-5"
                              >
                                Edit Article
                              </Link>
                              <button type="button" className="btn btn-danger btn-sm" id={"delete"+article.id}
                                      onClick={() => this.handle_delete(article)}>Delete</button>
                            </label>
                          </div>
                        </li>
                      );
                    })}
                    {/* The filtered data according to the searchbar is then displayed through this part
                      NOTE - The object used here is 'item', and not 'articles', so to display or use
                      more properties of a specific post, use 'item.example_attribute'*/}
                    {filteredData
                      .filter((item) => !item.isFeatured)
                      .map((item, index) => {
                      return (
                        <li className="list-group-item">
                          <div className="form-check"> 
                            <label className="d-flex align-items-center form-check-label" for="flexCheckDefault">
                              <div className="ms-4" style={{minWidth:150}}><strong>Title:</strong> {item.title}</div>
                              <div className="ms-5 me-auto"><strong>Date Created:</strong> {item.date_posted.split("T")[0]+" "}</div>
                              {FeatureCount < this.MAX_FEATURED ? <button type="button" className="btn btn-warning btn-sm me-5" id={"update"+item.id} 
                                      onClick={() => this.handle_update(item)}>Feature</button> : null}
                              <Link
                                to={{
                                  pathname:
                                    "/ManageArticles/article/id/" + item.id,
                                  state: item,
                                }}
                                type="button"
                                className="btn btn-secondary btn-sm me-5"
                              >
                                Edit Article
                              </Link>
                              <button type="button" className="btn btn-danger btn-sm" id={"delete"+item.id}
                                      onClick={() => this.handle_delete(item)}>Delete</button>
                            </label>
                          </div>
                        </li>
                      );
                    })}
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default ManageArticlesPage;
