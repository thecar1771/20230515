import React, { Component } from "react";
import Toc from "./components/Toc";
import ReadContent from "./components/ReadContent";
import Subject from "./components/Subject";
import Control from "./components/Control";
import CreateContent from "./components/CreateContent";
import UpdateContent from "./components/UpdateContent";
import "./styles.css";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: "welcome",
      selected_content_id: 2,
      subject: { title: "WEB", sub: "World Wide Web" },
      welcome: { title: "welcome", desc: "Hello, React!" },
      contents: [
        { id: 1, title: "HTML", desc: "HTML is for information" },
        { id: 2, title: "Css", desc: "Css is for design" },
        { id: 3, title: "JavaScript", desc: "JavaScript is for interactive" },
      ],
    };
  }

  getReadContet() {
    var i = 0;
    while (i < this.state.contents.length) {
      var data = this.state.contents[i];
      if (data.id === this.state.selected_content_id) {
        return data;
      }
      ++i;
    }
  }

  getContent() {
    var _title, _desc, _article;
    if (this.state.mode === "welcome") {
      _title = this.state.welcome.title;
      _desc = this.state.welcome.desc;
      _article = <ReadContent title={_title} desc={_desc} />;
    } else if (this.state.mode === "read") {
      var _data = this.getReadContet();
      _title = _data.title;
      _desc = _data.desc;
      _article = <ReadContent title={_title} desc={_desc} />;
    } else if (this.state.mode === "create") {
      _article = (
        <CreateContent
          onSubmit={function (_title, _desc) {
            //배열 복사
            var _newContents = Array.from(this.state.contents);
            _newContents.push({
              id: this.state.contents.length + 1,
              title: _title,
              desc: _desc,
            });

            this.setState({
              contents: _newContents,
              mode: "read",
              selected_content_id: _newContents[this.state.contents.length].id,
            });
          }.bind(this)}
        />
      );
    } else if (this.state.mode === "update") {
      _article = (
        <UpdateContent
          data={this.getReadContet()}
          onSubmit={function (_state) {
            //배열 복사
            var _content = Array.from(this.state.contents);

            var i = 0;
            while (i < _content.length) {
              if (_content[i].id === _state.id) {
                _content[i].title = _state.title;
                _content[i].desc = _state.desc;
                break;
              }
              ++i;
            }

            this.setState({
              contents: _content,
              mode: "read",
            });
          }.bind(this)}
        />
      );
    } else if (this.state.mode === "delete") {
      alert(this.state.selected_content_id);
    }

    return _article;
  }

  render() {
    return (
      <div className="APP">
        <Subject
          title={this.state.subject.title}
          sub={this.state.subject.sub}
          onChangePage={function () {
            this.setState({
              mode: "welcome",
            });
          }.bind(this)}
        />
        <Toc
          data={this.state.contents}
          onChangePage={function (id) {
            this.setState({
              mode: "read",
              selected_content_id: Number(id),
            });
          }.bind(this)}
        />
        <Control
          onChangeMode={function (mode) {
            if (mode === "delete") {
              if (window.confirm("real?")) {
                var _contents = Array.from(this.state.contents);
                var i = 0;
                while (i < _contents.length) {
                  if (_contents[i].id === this.state.selected_content_id) {
                    _contents.splice(i, 1);
                    break;
                  }
                  ++i;
                }

                this.setState({
                  mode: "welcome",
                  contents: _contents,
                });
              }
            } else {
              this.setState({
                mode: mode,
              });
            }
          }.bind(this)}
        />
        {/* <ReadContent title={_title} desc={_desc} /> */}
        {this.getContent()}
      </div>
    );
  }
}

export default App;
