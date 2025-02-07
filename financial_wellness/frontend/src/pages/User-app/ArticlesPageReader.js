import React from "react";
import UserNav from "../../components/Navbars/user-navbar";
import { Link } from "react-router-dom";
import ReactHtmlParser from "react-html-parser";
import axiosInstance from "../../axiosApi";

/**
 * Component that contains elements and functions related to displaying the entirety of a single article to a user.
 *
 * Renders out a page meant to be routed through the articles page on user side.
 *
 * @version 1.1.0
 */

class ArticlesPageReader extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentArticle: null,
      authorName: "",
      categoryName: "",
    };
  }

  componentDidMount() {
    this.getArticle();
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
          currentArticle: result.data,
        });
      })
      .catch((error) => {
        throw error;
      });
  }

  render() {
    if (this.state.currentArticle == null) {
      return <div>Loading...</div>;
    }
    return (
      <div className="d-flex flex-row overflow-hidden min-vh-100">
        <div className="col-2">
          {/* Side navigation bar*/}
          <UserNav handle_logout={this.props.handle_logout} />
        </div>

        <div className="col d-flex flex-column m-5 py-3 px-5 border rounded bg-light">
          {/* Post Info */}
          <div className="d-flex mb-3 p-2 border rounded border-dark">
            <div className="container-sm">
              <h1>{this.state.currentArticle.title}</h1>
              <small className="text-muted me-5">
                Author: {this.state.currentArticle.author_name}
              </small>
              <small className="text-muted">
                Date Posted: {this.state.currentArticle.readable_date}
              </small>
            </div>
            <div className="container-sm ms-auto">
              <p className="lead">{this.state.currentArticle.description}</p>
              <small className="text-muted">
                Category: {this.state.currentArticle.category_name}
              </small>
            </div>
          </div>
          <div
            className="container-fluid p-5 border rounded border-dark"
            style={{ minHeight: 550 }}
          >
            {ReactHtmlParser(this.state.currentArticle.content)}
          </div>
          <Link
            to="/articles"
            type="button"
            className="btn btn-primary btn-lg bd-highlight mt-5 w-25"
            style={{ minWidth: 100 }}
          >
            Back to Articles
          </Link>
        </div>
      </div>
    );
  }
}
export default ArticlesPageReader;
