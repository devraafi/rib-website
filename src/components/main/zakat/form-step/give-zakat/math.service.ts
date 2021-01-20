function isFormat(numb: number) {
    return Math.round(100 * Math.log(numb) / Math.log(10)) / 100;
}

export {
    isFormat
}