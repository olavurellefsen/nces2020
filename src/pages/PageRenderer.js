import React, { Component } from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const ReactMarkdown = require('react-markdown/with-html')

const AboutContainer = styled.div`
  padding: 0px 20px 20px 20px;
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  align-content: flex-start;
  flex-direction: column;
  max-width: 1110px;
`;

class ScenarioDescriptions extends Component {
  state = {
    posts: []
  };

  async updateContent() {
    const posts = await Promise.all(
      this.props.markdownFiles.map(file => fetch(file).then(res => res.text()))
    ).catch(err => console.error(err));

    this.setState(state => ({ ...state, posts }));
  }

  componentDidMount() {
    this.updateContent();
  }

  componentDidUpdate(prevProps) {
    if (this.props.markdownFiles[0] !== prevProps.markdownFiles[0]) {
      this.updateContent();
    }
      
  }

  render() {
    const { posts } = this.state;

    return (
      <AboutContainer>
        {posts.map((post, idx) => (
          <div key={idx} style={{color: '#6F7173'}}>
            <ReactMarkdown source={post} escapeHtml={false} />
          </div>
        ))}
      </AboutContainer>
    );
  }
}

ScenarioDescriptions.propTypes = {
  markdownFiles: PropTypes.array.isRequired
};

export default ScenarioDescriptions;
