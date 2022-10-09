
class Service {

    async getall(url){
        const response = await fetch(url);
        const data = await response.json();
        return data;
    }

    async getbyid(url, id){
        const response = await fetch(url + id);
        const data = await response.json();
        return data;
    }

    async create(url, data){
        const response = await fetch(url, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }

    async update(url, data){
        const response = await fetch(url, {
            method: 'PUT',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }

    async delete(url, id){
        const data = {
            id: id
        }
        const response = await fetch(url, {
            method: 'DELETE',
            body: JSON.stringify(data),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        return response;
    }
}