export const examples = [
`const arrayDiff = (a, b) => a.filter(v => !b.some(n => v === n))`,
`const letters = {10: 'A', 11: 'B', 12: 'C', 13: 'D', 14: 'E', 15: 'F'}

const rgb = (...n) => {
    return n.map(v => {
        if (v > 255) v = 255
        else if (v < 0) v = 0

        return [
            (Math.trunc(v / 16) < 10) 
                ? Math.trunc(v / 16) 
                : letters[Math.trunc(v / 16)],
            (v % 16 < 10) ? v % 16 : letters[v % 16]
        ].join('')
    }).join('')
}`,
`fun isOnline(app: Application): Boolean {
    val cm = app.getSystemService(CONNECTIVITY_SERVICE) as ConnectivityManager
    val cp = cm.getNetworkCapabilities(cm.activeNetwork)

    return cp != null && (
        cp.hasTransport(NetworkCapabilities.TRANSPORT_CELLULAR) ||
        cp.hasTransport(NetworkCapabilities.TRANSPORT_WIFI) ||
        cp.hasTransport(NetworkCapabilities.TRANSPORT_ETHERNET)
    )
}`
]