export function storeToLocal(name: string, data: any) {
    localStorage.setItem(name, JSON.stringify(data))
}

export function getFromLocal(name: string): any | null {
    const item = localStorage.getItem(name)
    if (!item) return null

    try {
        return JSON.parse(item)
    } catch (e) {
        console.error(`Failed to parse localStorage item '${name}':`, e)
        return null
    }
}
