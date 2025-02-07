import React from "react";
import {Helmet} from "react-helmet";
import UserNav from "../../components/Navbars/user-navbar";
import { Link } from "react-router-dom";
import axiosInstance from "../../axiosApi";

/**
 * Component that contains elements and functions related to listing out articles for users to see.
 *
 * Renders out a page meant to be routed through a navbar for user side.
 *
 * @version 2.0.0
 */
class ArticlesPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      articles: [],
      activeItem: {
        id: null,
      },

      //filter stores the keyword that's entered in the searchbar
      filter:"",
    };
  }

  componentDidMount() {
    this.getArticles();
  }

  async getArticles() {
    await axiosInstance
      .get("/blog/post-list/")
      .then((result) => {
        this.setState({
          articles: result.data,
        });
      })
      .catch((error) => {
        throw error;
      });
  }

  //Handles the change in the searchbar dynamically
  handleChange = event => {
    this.setState({ filter: event.target.value });
  };

  render() {
    /* Search bar functionality. The keyword entered in the search bar is then scanned 
    through all the attributes in the Post model -
    title 
    author
    content 
    description 
    date_posted 
    category 
    isFeatured
      */
    const { filter, articles } = this.state;
    const lowercasedFilter = filter.toLowerCase();
    const filteredData = articles.filter(item => {
      return Object.keys(item).some(key =>
        item[key].toString().toLowerCase().includes(lowercasedFilter)
      );
    });

    return (
      <div className="d-flex flex-row overflow-hidden min-vh-100">
        <Helmet>
          <title>{ "Articles" }</title>
        </Helmet>
        <div className="col-2">
          {/* Side navigation bar*/}
          <UserNav handle_logout={this.props.handle_logout} />
        </div>
        <div className="col d-flex flex-column m-5 px-5 pb-5 border rounded bg-light">
          <h1 class="display-6 text-center mt-3">
            Search for Articles
          </h1>
          <form className="d-flex flex-wrap justify-content-center">
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
          <hr/>
          <div className="d-flex flex-wrap p-3 justify-content-around border rounded border-dark">
            {this.state.articles
              .filter((article) => article.isFeatured)
              .map((article, index) => {
                return (
                  <div key={index} className={article.id}>
                    <div className="card mb-3 border-primary" style={{width:400, minHeight:300}} id="article-card">
                      <div className="card-header">Featured Article</div>
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title text-center">{article.title}</h5>
                        <hr/>
                        <p className="card-text text-center">{article.description}</p>
                        <Link
                          to={"/articles/article/id/" + article.id}
                          type="button"
                          className="btn btn-primary w-50 mt-auto align-self-center"
                        >
                          Expand Article
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            }
            {/* The filtered data according to the searchbar is then displayed through this part
            NOTE - The object used here is 'item', and not 'articles', so to display or use
            more properties of a specific post, use 'item.example_attribute'*/}
            {filteredData
              .filter((item) => !item.isFeatured)
              .map((item, index) => {
                return (
                  <div key={index} className={item.id}>
                    <div className="card mb-3" style={{width:400, minHeight:300}} id="article-card">
                      <div className="card-body d-flex flex-column">
                        <h5 className="card-title mt-4 text-center">{item.title}</h5>
                        <hr/>
                        <p className="card-text text-center">{item.description}</p>
                        <Link
                          to={{
                            pathname:
                              "/articles/article/id/" + item.id,
                            state: item,
                          }}
                          type="button"
                          className="btn btn-primary w-50 mt-auto align-self-center"
                        >
                          Expand Article
                        </Link>
                      </div>
                    </div>
                  </div>
                );
              })
            }
          </div>
        </div>
      </div>
    );
  }
}

export default ArticlesPage;
