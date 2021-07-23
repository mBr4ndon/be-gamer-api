class HttpRequestError extends Error{
    public message: string;
    public name: string;
    public status: number;

    constructor(message: string, status: number) {
        super(message);
        this.name = "HttpRequestError";
        this.status = status;
        Object.setPrototypeOf(this, HttpRequestError.prototype);
    }

}

export { HttpRequestError };