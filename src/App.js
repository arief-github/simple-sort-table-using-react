import React, { Component } from 'react';
import './style.css';

// Table
const headers = ['Book', 'Author', 'Languange', 'Published', 'Sale'];
const data = [
  ['A Tale of Two Cities', 'Charles Dickens', 'English', '1859', '200 million'],
  [
    'Le Petit Prince (The Little Prince)',
    'Antoine de Saint-Exupéry',
    'French',
    '1943',
    '150 million',
  ],
  [
    "Harry Potter and the Philosopher's Stone",
    'J. K. Rowling',
    'English',
    '1997',
    '120 million',
  ],
  [
    'And Then There Were None',
    'Agatha Christie',
    'English',
    '1939',
    '100 million',
  ],
  ['Dream of the Red Chamber', 'Cao Xueqin', 'Chinese', '1791', '100 million'],
  ['The Hobbit', 'J. R. R. Tolkien', 'English', '1937', '100 million'],
];

function clone(object) {
  return JSON.parse(JSON.stringify(object));
}

class App extends React.Component {
  render() {
    return (
      <>
        <Excel headers={headers} initData={data} />
      </>
    );
  }
}

// Table Headers Loop v1
// class Excel extends React.Component {
//   render() {
//     const headers = [];
//     for (const title of this.props.headers) {
//       headers.push(<th>{title}</th>);
//     }

//     return (
//       <table>
//         <thead>
//           <tr>{headers}</tr>
//         </thead>
//       </table>
//     );
//   }
// }

// Table Headers Loop v2
class Excel extends React.Component {
  constructor(props) {
    super();
    this.state = { data: props.initData };
    this.sort = this.sort.bind(this);
  }

  sort(e) {
    const column = e.target.cellIndex;
    const data = clone(this.state.data);
    data.sort((a, b) => {
      if (a[column] === b[column]) {
        return 0;
      }
      return a[column] > b[column] ? 1 : -1;
    });
    this.setState({
      data,
    });
  }

  render() {
    return (
      <table>
        {/* thead harus memiliki key */}
        <thead onClick={this.sort}>
          <tr>
            {this.props.headers.map((title, idx) => (
              <th key={idx}>{title}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {/* menampilkan isi data table */}
          {this.state.data.map((row, idx) => (
            <tr key={idx}>
              {row.map((cell, idx) => (
                <td key={idx}>{cell}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    );
  }
}
export default App;
