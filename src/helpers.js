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

export function styleSwitch(value){
    var styles = '';

    switch(value) {
        case "all":
            styles = {background: '#f5f5f5'};
            break;
        case "far-left":
            styles = {background: '#c8cce2'};
            break;
        case "left":
            styles = {background: '#c0b6d4'};
            break;
        case "center":
            styles = {background: '#d8c2dc'};
            break;
        case "right":
            styles = {background: '#dcc4cb'};
            break;
        case "far-right":
            styles = {background: '#e6caca'};
            break;
        default:
            styles = {background: '#f5f5f5'};
    }

    return  styles;

}