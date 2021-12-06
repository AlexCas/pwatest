import { Injectable } from '@angular/core';
const SUCCESS_COLOR = 'verde';
const WARNING_COLOR = 'amarillo';
const ALERT_COLOR = 'rojo';

const COMPLETE_COLOR_NUMBER = 400; //blue
const SUCCESS_COLOR_NUMBER = 300; //green
const WARNING_COLOR_NUMBER = 200; //yellow
const ALERT_COLOR_NUMBER = 100; //red


@Injectable({
  providedIn: 'root',
})
export class IndicatorColorServiceService {
  constructor() {}

  public getHexadecimalColorByColorName(color: string): string {
    let _color: string;
    if (color == SUCCESS_COLOR) {
      _color = '#55BF3B';
    } else if (color == WARNING_COLOR) {
      _color = '#fdff00';
    } else if (color = ALERT_COLOR) {
      _color = '#DF5353';
    }

    return _color;
  }

  public getHexadecimalColorByColorNumber(color: number): string {
    let _color: string;
    if (color == SUCCESS_COLOR_NUMBER) {
      _color = '#55BF3B';
    } else if (color == WARNING_COLOR_NUMBER) {
      _color = '#f6ed00';
    } else if (color == ALERT_COLOR_NUMBER) {
      _color = '#DF5353';
    } else if (color == COMPLETE_COLOR_NUMBER) {
			_color = 'dodgerblue';
		}

    return _color;
  }
}
