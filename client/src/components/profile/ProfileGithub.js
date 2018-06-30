import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import axios from 'axios';

class ProfileGithub extends PureComponent {
  myRef = React.createRef();

  state = {
    clientID: '097001be19f25f2a3ea0',
    clientSecret: 'd66fc26f6640fc1c7ee431199550296c12cd1dc2',
    count: 5,
    sort: 'created: asc',
    repos: []
  };

  componentDidMount = async () => {
    const { username } = this.props;
    const { count, sort, clientID, clientSecret } = this.state;
    const config = { headers: { Authorization: null } };

    try {
      const { data } = await axios.get(
        `https://api.github.com/users/${username}/repos?per_page=${count}&sort=${sort}&client_id=${clientID}&client_secret=${clientSecret}`,
        config
      );

      if (this.myRef.current && data.length) {
        this.setState(() => ({ repos: data }));
      }
    } catch (error) {
      throw error;
    }
  };

  render() {
    const { repos } = this.state;
    const repoItems = repos.map(repo => (
      <div key={repo.id} className="card card-body mb-2">
        <div className="row">
          <div className="col-md-6">
            <h4>
              <Link to={repo.html_url} className="text-info" target="_blank">
                {repo.name}
              </Link>
            </h4>
            <p>{repo.description}</p>
          </div>

          <div className="col-md-6">
            <span className="badge badge-info mr-1">Stars: {repo.stargazers_count}</span>
            <span className="badge badge-secondary mr-1">Watchers: {repo.watchers_count}</span>
            <span className="badge badge-success mr-1">Forks: {repo.forks_count}</span>
          </div>
        </div>
      </div>
    ));

    return (
      <div ref={this.myRef}>
        <hr />

        <h3 className="mb-4">Latest Github Repos</h3>

        {repoItems}
      </div>
    );
  }
}

export default ProfileGithub;
