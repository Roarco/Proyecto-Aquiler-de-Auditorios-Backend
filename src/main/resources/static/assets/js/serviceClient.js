class ServiceClient {
    constructor() { }

    async getall(url) {
        const response = await fetch(url + 'client/' + 'client');
        const data = await response.json();
        return data.items;
    }

    async getbyid(url, id) {
        const response = await fetch(url + 'client/' + 'client' + '/' + id);
        const data = await response.json();
        return data.items;
    }

    async create(url, data) {
        const response = await fetch(url + 'client/' + 'client', {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }

    async update(url, data) {
        const response = await fetch(url + 'client/' + 'client', {
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
        const response = await fetch(url + 'client/' + 'client', {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }
}