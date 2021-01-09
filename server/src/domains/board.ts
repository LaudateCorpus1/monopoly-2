import { IBoard, CellsData, CellsPriceData, CellPosition } from 'shared';

import { Player } from './player';
import { cellsData, cellsPriceData } from '../common/cells-data';

export class Board implements IBoard {
  cellsData: CellsData = {};
  cellsPriceData: CellsPriceData = {};

  constructor(board: Partial<Board>) {
    if (!board.cellsData) {
      board.cellsData = { ...cellsData };
    }

    if (!board.cellsPriceData) {
      board.cellsPriceData = { ...cellsPriceData };
    }

    Object.assign(this, board);
  }

  buyCompany(order: CellPosition['order'], player: Player) {
    const cell = this.cellsData[order];

    if (cell.type === 'company') {
      cell.ownerId = player.id;
      cell.ownerColor = player.color;
    }
  }

  static getCellDataByPosition(cell: CellPosition) {
    return cellsData[cell.order];
  }

  static getCompanyByPosition(cell: CellPosition) {
    return cellsPriceData[cell.order];
  }
}
