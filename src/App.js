import React, { Component } from "react";
import Toc from "./components/Toc";
import ReadContent from "./components/ReadContent";
import Subject from "./components/Subject";
import Control from "./components/Control";
import CreateContent from "./components/CreateContent";
import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "read",
      selected_content_id: 2,
      subject: { title: "WEB", sub: "World Wide Web" },
      welcome: { title: "welcome", desc: "Hello, React!" },
      contents: [
        { id: 1, title: "HTML", desc: "HTML is for information" },
        { id: 2, title: "Css", desc: "Css is for design" },
        { id: 3, title: "JavaScript", desc: "JavaScript is for interactive" }
      ]
    };
  }

  render() {
    var _title,
      _desc,
      _article = null;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc} />;
    } else if (this.state.mode === "read") {
      var i = 0;
      while (i < this.state.contents.length) {
        var data = this.state.contents[i];
        if (data.id === this.state.selected_content_id) {
          _title = data.title;
          _desc = data.desc;
          break;
        }
        ++i;
      }
      _article = <ReadContent title={_title} desc={_desc} />;
    } else if (this.state.mode === "create") {
      _article = (
        <CreateContent
          onSubmit={function (_title, _desc) {
            // this.state.contents.push({
            //   id: this.state.contents.length + 1,
            //   title: _title,
            //   desc: _desc
            // });

            // var _contents = this.state.contents.concat({
            //   id: this.state.contents.length + 1,
            //   title: _title,
            //   desc: _desc
            // });

            //배열 복사
            var _newContents = Array.from(this.state.contents);
            _newContents.push({
              id: this.state.contents.length + 1,
              title: _title,
              desc: _desc
            });

            this.setState({
              contents: _newContents
            });
          }.bind(this)}
        />
      );
    }

    return (
      <div className="APP">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({
              mode: "welcome"
            });
          }.bind(this)}
        />
        <Toc
          data={this.state.contents}
          onChangePage={function (id) {
            this.setState({
              mode: "read",
              selected_content_id: Number(id)
            });
          }.bind(this)}
        />
        <Control
          onChangeMode={function (mode) {
            this.setState({
              mode: mode
            });
          }.bind(this)}
        />
        {/* <ReadContent title={_title} desc={_desc} /> */}
        {_article}
      </div>
    );
  }
}

export default App;
