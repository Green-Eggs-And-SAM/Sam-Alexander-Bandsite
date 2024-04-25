class BandSiteApi {
    constructor(key) {
        this.apiKey = key;
        this.baseUrl = 'https://unit-2-project-api-25c1595833b2.herokuapp.com/';
        console.log(`${this.baseUrl}comments?api_key=${this.apiKey}`);
    }

    async getComments() {
        // console.log(`${this.baseUrl}comments?api_key=${this.apiKey}`);
        let response = await axios.get(
            `${this.baseUrl}comments?api_key=${this.apiKey}`
        );
        // console.log(comments);
        response.data.sort(function (a, b) {
            return b.timestamp - a.timestamp;
        });
        return response.data;
    }

    async postComment(comment) {
        console.log(`${this.baseUrl}comments?api_key=${this.apiKey}`);
        try {
            const response = await axios.post(
                `${this.baseUrl}comments?api_key=${this.apiKey}`,

                comment
            );
            console.log(response.data.timestamp);

            console.log(response.data);
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    async getShows() {
        let response = await axios.get(
            `${this.baseUrl}showdates?api_key=${this.apiKey}`
        );

        response.data.sort(function (a, b) {
            return b.timestamp - a.timestamp;
        });
        return response.data;
    }
}

// const key = '?api_key=473e656b-a5a8-4cdf-8ca9-019edb1b076e';
// api = new BandSiteApi(key);

export default BandSiteApi;
