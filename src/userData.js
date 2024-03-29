let user = {
    data: null,
    getData() {
        fetch('https://madgs.ru:3002/api/get-user-data', {
        method: 'POST',
        credentials: 'include' // важно для отправки cookie с сессией
        }).then(response => response.json()).then(data => {
        if (data.user) {
            data = data.user;
        }
        }).catch((err) => {
            console.log(err);
        });
    },
    DeleteData() {
        data = null;
    },

};

export default user;