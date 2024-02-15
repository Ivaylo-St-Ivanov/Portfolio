export interface IConfig {
    baseUrl: string
    appId: string
    apiKey: string
}

export interface IProject {
    objectId: string
    projectName: string
    screenshot: { url: string }
}