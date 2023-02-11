import React, { Component } from "react";
import NewsItem from "../NewsItems/NewsItem";
import Spineer from "../Spineer";
import PropTypes from "prop-types";

// - Infinite scroll added...
import InfiniteScroll from "react-infinite-scroll-component";

export class News extends Component {

  // - Setting default propTypes...
  static defaultProps = {
    country: "in",
    pageSize: 2,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };

  articles = [];

  constructor() {
    super();
    this.state = {
      article: this.articles,
      loading: false,
      page: 1,
      totalResults: 0,
      stateArticleLength:1,
    };
  }

  async componentDidMount() {
    this.props.setProgress(10);
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=22329e0b4d774a758ce9accacb016e2a&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    this.setState({ loading: true });
    this.props.setProgress(30);
    let data = await fetch(url);
    this.props.setProgress(70);
    let parseData = await data.json();

    let dataSize = await parseData.articles.length;
    // console.log(this.state.stateArticleLength);

    await this.setState({
      article: parseData.articles,
      loading: false,
      totalResults: parseData.totalResults,
      stateArticleLength:this.state.stateArticleLength+dataSize,
    });
    this.props.setProgress(100);
  }

  // - This function fect more data for infinite scroll and concat old data with new data...
  fetchMoreData = async () => {
    this.setState({ page: this.state.page + 1 });

    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=22329e0b4d774a758ce9accacb016e2a&pageSize=${this.props.pageSize}&page=${this.state.page}`;
    let data = await fetch(url);
    let parseData = await data.json();

    let dataSize = await parseData.articles.length;
    // console.log(this.state.stateArticleLength);

    await this.setState({
      article: this.state.article.concat(parseData.articles),
      loading: false,
      totalResults: parseData.totalResults,
      stateArticleLength:this.state.stateArticleLength+dataSize,
    });
  };

  // //!- Previous Next Button hides because infinite scroll added...
  // handlePrevious = async () => {
  //   // console.log("Previous");
  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     this.props.country
  //   }&category=${
  //     this.props.category
  //   }&apiKey=22329e0b4d774a758ce9accacb016e2a&pageSize=${
  //     this.props.pageSize
  //   }&page=${this.state.page - 1}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parseData = await data.json();
  //   // console.log(parseData);
  //   this.setState({
  //     article: parseData.articles,
  //     page: this.state.page - 1,
  //     loading: false,
  //   });
  // };

  // handleNext = async () => {
  //   // console.log("Next");
  //   let url = `https://newsapi.org/v2/top-headlines?country=${
  //     this.props.country
  //   }&category=${
  //     this.props.category
  //   }&apiKey=22329e0b4d774a758ce9accacb016e2a&pageSize=${
  //     this.props.pageSize
  //   }&page=${this.state.page + 1}`;
  //   this.setState({ loading: true });
  //   let data = await fetch(url);
  //   let parseData = await data.json();
  //   // console.log(parseData);
  //   this.setState({
  //     article: parseData.articles,
  //     page: this.state.page + 1,
  //     loading: false,
  //   });
  // };

  // this.state.article.length

  render() {
    return (
      <div className="container my-3">
        <h2 className="my-5">News Jagat</h2>
        {this.state.loading && <Spineer />}

        {/* //! there is an infinite scroll... */}
        <InfiniteScroll
          dataLength={this.state.stateArticleLength}
          next={this.fetchMoreData}
          hasMore={this.state.stateArticleLength <= this.state.totalResults}
          loader={<Spineer />}
        >
          {/* Infinite scroll ended... */}

          <div className="row">
            {this.state.article.map((e) => {
              return (
                <div className="col-md-4 my-2" key={e.title}>
                  <NewsItem
                    title={e.title ? e.title : ""}
                    author={e.author}
                    dateShow={e.publishedAt ? e.publishedAt : ""}
                    description={e.description ? e.description : ""}
                    imgUrl={e.urlToImage}
                    newsUrl={e.url}
                  />
                </div>
              );
            })}
          </div>

        </InfiniteScroll>

        {/* // ! Previous Next Button...*/}
        {/* 
        <div className="d-flex justify-content-between">
          <button
            disabled={this.state.page <= 1}
            type="button"
            onClick={this.handlePrevious}
            className="btn btn-warning"
          >
            &larr; Previous
          </button>
          <button
            disabled={false}
            type="button"
            onClick={this.handleNext}
            className="btn btn-warning"
          >
            Next &rarr;
          </button>
        </div>
         */}

      </div>
    );
  }
}

export default News;
