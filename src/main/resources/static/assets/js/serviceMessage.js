class ServiceMessage{
    constructor(){}

    async getall(url){
        const response = await fetch(url + 'message/' + 'message');
        const data = await response.json();
        return data.items;
    }

    async getbyid(url, id){
        const response = await fetch(url + 'message/' + 'message' + '/' + id);
        const data = await response.json();
        return data.items;
    }

    async create(url, data) {
        const response = await fetch(url + 'message/' + 'message', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }

    async update(url, data) {
        const response = await fetch(url + 'message/' + 'message', {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }

    async delete(url, id) {
        const data = {
            id: id
        }
        const response = await fetch(url + 'message/' + 'message', {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }
}