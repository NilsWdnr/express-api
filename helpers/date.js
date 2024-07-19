const { format } = require('date-fns');

const getCurrentDate = () => {
    return format(new Date(),'yyyy-mm-dd');
}

module.exports = {
    getCurrentDate
}