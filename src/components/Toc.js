import React, { Component } from "react";

class Toc extends Component {
  shouldComponentUpdate(newProps, newState) {
    console.log(newProps.data, this.props.data);
    // list data push로 넣을 경우 원본이 변하기 때문에 비교가 불가함
    if (this.props.data === newProps.data) {
      return false;
    }

    return true;
  }

  render() {
    var lists = [];
    var data = this.props.data;
    var i = 0;
    while (i < data.length) {
      lists.push(
        <li key={data[i].id}>
          <a
            href={"/content/" + data[i].id}
            data-id={data[i].id}
            onClick={function (id, e) {
              e.preventDefault();
              //this.props.onChangePage(e.target.dataset.id);
              this.props.onChangePage(id);
            }.bind(this, data[i].id)}
          >
            {data[i].title}
          </a>
        </li>
      );
      ++i;
    }

    return (
      <nav>
        <ul>{lists}</ul>
      </nav>
    );
  }
}

export default Toc;
