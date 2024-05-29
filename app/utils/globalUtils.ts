

export function debounce<T extends (...args: any[]) => void>(func: T, delay: number): T {
    let timeoutId: NodeJS.Timeout;
  
    return function (...args: Parameters<T>) {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
  
      timeoutId = setTimeout(() => {
        func(...args);
      }, delay);
    } as T;
  }

  export const getFirstChars = (s1: string, s2: string) => {
    return `${s1?.charAt(0) ?? "-"}${s2.charAt(0) ?? "-"}`
  }
  
  