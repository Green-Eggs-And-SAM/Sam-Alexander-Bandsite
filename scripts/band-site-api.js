class BandSiteApi {
    constructor(key) {
        this.apiKey = key;
        this.baseUrl = 'https://unit-2-project-api-25c1595833b2.herokuapp.com/';
    }

    //get all comments from API
    async getComments() {
        //get comments
        let response = await axios.get(
            `${this.baseUrl}comments?api_key=${this.apiKey}`
        );
        //sort newest first
        response.data.sort(function (a, b) {
            return b.timestamp - a.timestamp;
        });
        return response.data;
    }

    //post new comment to API
    async postComment(comment) {
        try {
            //post comment
            const response = await axios.post(
                `${this.baseUrl}comments?api_key=${this.apiKey}`,
                comment
            );

            return response.data;
        } catch (error) {
            console.log(error);
        }
    }

    //get all shows from API
    async getShows() {
        try {
            let response = await axios.get(
                `${this.baseUrl}showdates?api_key=${this.apiKey}`
            );

            response.data.sort(function (a, b) {
                return b.timestamp - a.timestamp;
            });
            return response.data;
        } catch (error) {
            console.log(error);
        }
    }
}

export default BandSiteApi;
