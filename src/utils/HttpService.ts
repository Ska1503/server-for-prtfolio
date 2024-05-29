import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { Logger } from '.'

export class HttpService {
  private axiosInstance: AxiosInstance

  constructor(baseURL: string) {
    this.axiosInstance = axios.create({
      baseURL,
    })
  }

  public async get<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.get(
        url,
        config
      )
      return response.data
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  public async post<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.post(
        url,
        data,
        config
      )
      return response.data
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  public async put<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.put(
        url,
        data,
        config
      )
      return response.data
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  public async delete<T>(url: string, config?: AxiosRequestConfig): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.delete(
        url,
        config
      )
      return response.data
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  public async patch<T>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await this.axiosInstance.patch(
        url,
        data,
        config
      )
      return response.data
    } catch (error) {
      this.handleError(error)
      throw error
    }
  }

  private handleError(error: any): void {
    Logger.error(error.response?.data?.message || error.message)
    throw new Error(error.response?.data?.message || error.message)
  }
}
