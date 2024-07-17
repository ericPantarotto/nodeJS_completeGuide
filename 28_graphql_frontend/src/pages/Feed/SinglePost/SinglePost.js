import React, { Component } from 'react';

import Image from '../../../components/Image/Image';
import './SinglePost.css';

class SinglePost extends Component {
  statics = {
    url: `${
      navigator.userAgent.indexOf('Win') !== -1
        ? 'http://localhost:8080/'
        : 'http://192.168.1.30:8080/'
    }`
  };

  state = {
    title: '',
    author: '',
    date: '',
    image: '',
    content: ''
  };

  componentDidMount() {
    const postId = this.props.match.params.postId;
    const graphqlQuery = {
      query: `
        query FetchSinglePost($postId: ID!) {
          post(id: $postId) {
            _id
            title
            content
            creator {
              name
            }
            imageUrl
            createdAt
          }        
        }`,
      variables: {
        postId: postId
      }
    };

    const url = `${
      navigator.userAgent.indexOf('Win') !== -1
        ? 'http://localhost:8080/graphql'
        : 'http://192.168.1.30:8080/graphql'
    }`;
    fetch(url, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${this.props.token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(graphqlQuery)
    })
      .then(res => res.json())
      .then(resData => {
        if (resData.errors) {
          throw new Error('Fetching post failed!');
        }
        this.setState({
          title: resData.data.post.title,
          author: resData.data.post.creator.name,
          image: `${this.statics.url}${resData.data.post.imageUrl}`,
          date: new Date(resData.data.post.createdAt).toLocaleDateString(
            'en-US'
          ),
          content: resData.data.post.content
        });
      })
      .catch(err => {
        console.log(err);
      });
  }

  render() {
    return (
      <section className="single-post">
        <h1>{this.state.title}</h1>
        <h2>
          Created by {this.state.author} on {this.state.date}
        </h2>
        <div className="single-post__image">
          <Image contain imageUrl={this.state.image} />
        </div>
        <p>{this.state.content}</p>
      </section>
    );
  }
}

export default SinglePost;
