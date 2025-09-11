export class ApiClient {
    private baseUrl: string;

    constructor(baseUrl:string){
        this.baseUrl = baseUrl;
    }

    private async request<T>(
        endpoint: string,
        options: RequestInit = {}
    ): Promise<T> {
        const response = await fetch(`${this.baseUrl}${endpoint}`, {
            headers: {
                "Content-Type": "application/json",
                ...options.headers,
            },
            credentials: "include",
            ...options,
        });

        if(!response.ok) {
            throw new Error(`API error: ${response.status} ${response.statusText}`);
        }

        console.log(response);
        const data = await response.json();
        console.log(data);
        return data as T;
    }

    public get<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: "GET" });
    }

    public post<T, B = unknown>(endpoint: string, body: B): Promise<T> {
        return this.request<T>(endpoint, { 
            method: "POST",
            body: JSON.stringify(body),
        });
    }

    public put<T, B = unknown>(endpoint: string, body: B): Promise<T> {
        return this.request<T>(endpoint, {
            method: "PUT",
            body: JSON.stringify(body),
        });
    }

    public delete<T>(endpoint: string): Promise<T> {
        return this.request<T>(endpoint, { method: "DELETE" });
    }
}