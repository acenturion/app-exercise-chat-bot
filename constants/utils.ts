export function getFirstLetter(str?: string): string {
  if (typeof str === 'string' && str.trim().length > 0) {
    return str.trim()[0].toUpperCase();
  }
  return 'U';
}
import Constants from 'expo-constants';

export const generateAPIUrl = (relativePath: string) => {
  const origin = Constants.experienceUrl.replace('exp://', 'http://');

  const path = relativePath.startsWith('/') ? relativePath : `/${relativePath}`;

  if (process.env.NODE_ENV === 'development') {
    return origin.concat(path);
  }

  if (!process.env.EXPO_PUBLIC_API_BASE_URL) {
    throw new Error(
      'EXPO_PUBLIC_API_BASE_URL environment variable is not defined',
    );
  }

  return process.env.EXPO_PUBLIC_API_BASE_URL.concat(path);
};

export const InitialExamples = [
    '¿Por qué el cielo es azul?',
    '¿Qué es la ley de la gravedad?',
    '¿Cómo funciona un imán?',
  ]

