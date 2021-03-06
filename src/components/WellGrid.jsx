var React = require('react'),
    ComponentTree = require('react-component-tree'),
    constants = require('../constants.js'),
    SquareBlock = require('./SquareBlock.jsx');

require('./WellGrid.less');

class WellGrid extends ComponentTree.Component {
  /**
   * Isolated matrix for the Tetriminos that landed inside the Well.
   */
  constructor(props) {
    super(props);

    this.children = {
      squareBlock: function(col, row, color) {
        return {
          component: SquareBlock,
          ref: 'c' + col + 'r' + row,
          color: color
        };
      }
    }
  }

  render() {
    return <ul className="well-grid">
      {this._renderGridBlocks()}
    </ul>;
  }

  _renderGridBlocks() {
    var blocks = [],
        rows = this.props.grid.length,
        cols = this.props.grid[0].length,
        widthPercent = 100 / cols,
        heightPercent = 100 / rows,
        row,
        col,
        blockValue;

    for (row = 0; row < rows; row++) {
      for (col = 0; col < cols; col++) {
        if (!this.props.grid[row][col]) {
          continue;
        }

        blockValue = this.props.grid[row][col];
        blocks.push(
          <li className="grid-square-block"
              key={this._getIdFromBlockValue(blockValue)}
              style={{
                width: widthPercent + '%',
                height: heightPercent + '%',
                top: (row * heightPercent) + '%',
                left: (col * widthPercent) + '%'
              }}>
            {this.loadChild('squareBlock',
                            col,
                            row,
                            this._getColorFromBlockValue(blockValue))}
          </li>);
      }
    }

    return blocks;
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.gridBlockCount !== this.props.gridBlockCount;
  }

  _getIdFromBlockValue(blockValue) {
    return blockValue.split('#')[0];
  }

  _getColorFromBlockValue(blockValue) {
    return '#' + blockValue.split('#')[1];
  }
}

module.exports = WellGrid;
