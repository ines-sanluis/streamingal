export const hexToRgba = (hex, opacity) => {
    const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
    const parsedHex = hex.replace(shorthandRegex, (m: any, r: any, g: any, b: any) => r + r + g + g + b + b);
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(parsedHex);
    return result ?
        `rgba(${parseInt(result[1], 16)}, ${parseInt(result[2], 16)}, ${parseInt(result[3], 16)}, ${opacity})` :
        "rgba(0, 0, 0, 1)";
};