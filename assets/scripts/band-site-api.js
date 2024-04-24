class BandSiteApi {
    constructor(key) {
        this.apiKey = key;
        this.baseUrl = 'https://unit-2-project-api-25c1595833b2.herokuapp.com/';
        console.log(`${this.baseUrl} + 'comments?api_key=' + ${this.apiKey}`);
    }

    async getComments() {
        // console.log(`${this.baseUrl}comments?api_key=${this.apiKey}`);
        let comments = await axios.get(
            `${this.baseUrl}comments?api_key=${this.apiKey}`
        );
        // console.log(comments);

        return comments.data;
    }
}

// const key = '?api_key=473e656b-a5a8-4cdf-8ca9-019edb1b076e';
// api = new BandSiteApi(key);

export default BandSiteApi;
