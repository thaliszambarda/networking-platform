import type { IErrorResponse } from '@/types';

export async function fetchWrapper<T = unknown>(
  input: RequestInfo | URL,
  init?: RequestInit | undefined
): Promise<T> {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/${input}`,
      init
    );

    if (!response.ok) {
      const errorResponse: IErrorResponse = await response.json();
      throw new Error(
        `HTTP error ${response.status}: ${errorResponse.message}`
      );
    }

    const result = await response.json();
    return result as T;
  } catch (error) {
    console.error('Erro na requisição:', (error as Error).message);
    throw new Error('Erro na comunicação com o servidor');
  }
}
