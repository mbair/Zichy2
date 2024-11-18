import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class ColorService {

    colors: string[] = []       // List of available colors

    constructor() {
        this.colors = [
            'surface',
            'blue',
            'green',
            'yellow',
            'cyan',
            'pink',
            'indigo',
            'teal',
            'orange',
            'bluegray',
            'purple',
            'red',
            'gray'
        ]
    }

    getColors(): string[] {
        return this.colors
    }

    /**
     * Returns the style object for the given color.
     * The style object contains the background-color and color properties.
     * The intensity of the color is determined by the color name.
     * If the color name is 'surface', the background-color will be the 800 intensity
     * and the text color will be the 200 intensity. Otherwise, the background-color
     * will be the 200 intensity and the text color will be the 800 intensity.
     * @param color the color name
     * @returns an object with 'background-color' and 'color' properties
     */
    getStyleByColor(color: string) {
        let rootStyles = getComputedStyle(document.documentElement)
        let backgroundColorIntensity = color === 'surface' ? 800 : 200,
            textColorIntensity = color === 'surface' ? 200 : 800

        return {
            'background-color': rootStyles.getPropertyValue(`--${color}-${backgroundColorIntensity}`).trim(), 
            'color': rootStyles.getPropertyValue(`--${color}-${textColorIntensity}`).trim()
        }
    }
}
