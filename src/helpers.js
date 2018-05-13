export function findFlag(flag) {
    return `http://www.geonames.org/flags/x/${flag}.gif`;
}

export function formatDate(date) {
    var time = new Date(date);
    var year = time.getFullYear();
    var day = time.getDate();
    var hour = time.getHours();
    var minute = time.getMinutes();
    var month = time.getMonth() + 1;
    var composedTime =
        month +
        '/' +
        day +
        '/' +
        year +
        ' | ' +
        hour +
        ':' +
        (minute < 10 ? '0' + minute : minute);
    return composedTime;
}