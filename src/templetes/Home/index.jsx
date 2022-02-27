import './style.css';
import { Component } from 'react';
import { Post } from '../../component/Post';
import { Button } from '../../component/Button';
import { loadPosts } from '../../utils/load-post'
import Input from '../../component/Input';
export class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 10,
    searchValue: ''
  }

  async componentDidMount() {
    await this.loadPosts();
  }

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  }

  loadMorePosts = () => {
    const { posts, allPosts, page, postsPerPage } = this.state
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage)
    posts.push(...nextPosts)

    this.setState({ posts, page: nextPage })
  }

  handleChange = (e) => {
    const { value } = e.target

    this.setState({ searchValue: value })
  }

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state
    const noMorePosts = page + postsPerPage >= allPosts.length
    const filterdPosts = !!searchValue ?
      posts.filter(post => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase())
      }) :
      posts
    return (
      <section className="container">
        <div className="search-container">
          {!!searchValue && (
            <h1>Search Value: {searchValue}</h1>
          )}
          <Input onChange={this.handleChange} value={searchValue} type="search" />
        </div>

        {filterdPosts.length > 0 ?
          <Post posts={filterdPosts} />
          :
          <p>Não existem posts</p>
        }
        {!searchValue && (
          <Button acao={this.loadMorePosts} disabled={noMorePosts} text="Load more posts" />
        )}
      </section>
    );
  }
}

