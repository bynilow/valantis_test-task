import { useEffect, useState } from "react"

export const useDebounce = (value: string | number, delay: number) => {
    const [debouncedValue, setDebouncedValue] = useState<string | number>('');

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value);
        }, delay)

        return () => clearTimeout(handler);
    }, [value])

    return debouncedValue
}